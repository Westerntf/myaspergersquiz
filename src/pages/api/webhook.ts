import { buffer } from "micro";
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { initializeApp, cert, getApps } from "firebase-admin/app";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const sig = req.headers["stripe-signature"];
  if (!sig) {
    console.error("Missing Stripe signature header");
    return res.status(400).send("Missing Stripe signature");
  }

  let event: Stripe.Event;
  let buf: Buffer;
  try {
    buf = await buffer(req);
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return res.status(400).send(
      `Webhook Error: ${err instanceof Error ? err.message : "Unknown error"}`
    );
  }

  // Handle the event type
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log("✅ Payment completed:", session.id);

    try {
      // Initialize Firebase Admin SDK only once
      if (!getApps().length) {
        initializeApp({
          credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!)),
        });
      }

      const db = getFirestore();
      const uid = session.metadata?.uid as string | undefined;
      const sessionId = session.metadata?.sessionId as string | undefined;

      if (!uid || !sessionId) {
        console.warn("⚠️ Missing metadata (uid or sessionId) in Stripe session:", session.metadata);
        return res.status(400).send("Missing uid or sessionId in Stripe metadata");
      }

      await db
        .collection("reports")
        .doc(uid)
        .collection("sessions")
        .doc(sessionId)
        .set(
          {
            paid: true,
            paidAt: Timestamp.now(),
          },
          { merge: true }
        );

      console.log(`✅ Marked session ${sessionId} as paid for user ${uid}`);
    } catch (err) {
      console.error("❌ Firestore update failed:", err);
      return res.status(500).send("Firestore update failed");
    }
  }

  // Always return 200 if nothing failed above
  res.status(200).json({ received: true });
}