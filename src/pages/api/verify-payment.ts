// src/pages/api/verify-payment.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID!,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    }),
  });
}
const db = getFirestore();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  const uid = req.query.uid as string | undefined;
  const sessionId = req.query.sessionId as string | undefined;
  if (!uid || !sessionId) {
    return res.status(400).json({ error: "Missing uid or sessionId" });
  }
  try {
    const docRef = db.collection("reports").doc(uid).collection("sessions").doc(sessionId);
    const snap = await docRef.get();
    if (!snap.exists) {
      return res.status(200).json({ paid: false });
    }
    const data = snap.data();
    const paid = data?.paid === true;
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({ paid });
  } catch (err) {
    console.error("VERIFY PAYMENT: Firestore error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}