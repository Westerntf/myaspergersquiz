import type { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import Stripe from "stripe";
import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

export const config = {
  api: {
    bodyParser: false, // Disable Next.js body parsing so we can verify Stripe signature
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID!,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    }),
  });
}
const db = getFirestore();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  let event: Stripe.Event;
  try {
    // Read raw body for signature verification
    const rawBody = (await buffer(req)).toString("utf8");
    const signature = req.headers["stripe-signature"] as string;
    event = stripe.webhooks.constructEvent(rawBody, signature, endpointSecret);
  } catch (err: any) {
    console.error("🔴 Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Only handle checkout.session.completed events
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata || {};
    const sessionId = metadata.sessionId as string;
    const uid = metadata.uid as string;
    console.log("▶︎ checkout.session.completed metadata:", { uid, sessionId });

    if (uid && sessionId) {
      try {
        const docRef = db
          .collection("reports")
          .doc(uid)
          .collection("sessions")
          .doc(sessionId);
        await docRef.set({ paid: true, updatedAt: Date.now() }, { merge: true });
        console.log(`✔︎ Firestore write succeeded at /reports/${uid}/sessions/${sessionId}`);
      } catch (firebaseErr) {
        console.error("🔴 Firestore write error:", firebaseErr);
        return res.status(500).json({ error: "Firestore write failed" });
      }
    }
  }

  // Acknowledge receipt of the event
  res.status(200).json({ received: true });
}