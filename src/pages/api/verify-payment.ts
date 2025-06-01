import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

// ——— DEBUG: Check that env vars are loaded ———
console.log(">> ENV FIREBASE_PROJECT_ID:", process.env.FIREBASE_PROJECT_ID);
console.log(">> ENV FIREBASE_CLIENT_EMAIL:", process.env.FIREBASE_CLIENT_EMAIL);
console.log(">> ENV FIREBASE_PRIVATE_KEY (first 20 chars):", process.env.FIREBASE_PRIVATE_KEY?.slice(0, 20));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID!,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n")!,
    }),
  });
}
const db = getFirestore();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("▶︎ /api/verify-payment called with query:", req.query);
  const { uid, sessionId } = req.query as { uid?: string; sessionId?: string };

  if (!uid || !sessionId) {
    console.log("✘ Missing uid or sessionId!", { uid, sessionId });
    return res.status(400).json({ error: "Missing uid or sessionId" });
  }

  try {
    const path = `/reports/${uid}/sessions/${sessionId}`;
    console.log(`→ Looking up Firestore at: ${path}`);
    const docRef = db.collection("reports").doc(uid).collection("sessions").doc(sessionId);
    const snap = await docRef.get();
    if (!snap.exists) {
      console.log("✘ No document at", path);
      return res.status(200).json({ paid: false });
    }
    const data = snap.data();
    console.log("✔ Found document, paid =", data?.paid === true);
    return res.status(200).json({ paid: data?.paid === true });
  } catch (err) {
    console.error("verify-payment error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}