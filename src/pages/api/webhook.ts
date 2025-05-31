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

  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"]!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook error:", err);
    return res.status(400).send(`Webhook Error: ${err instanceof Error ? err.message : "Unknown error"}`);
  }

  // Handle the event type
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log("✅ Payment completed:", session.id);

    // Initialize Firebase Admin SDK only once
    if (!getApps().length) {
      initializeApp({
        credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!)),
      });
    }

    const db = getFirestore();

    // Extract relevant metadata from the session
    const uid = session.metadata?.uid;
    const quizRunId = session.metadata?.quizRunId;

    if (uid && quizRunId) {
      await db.collection("purchases").add({
        uid,
        quizRunId,
        paid: true,
        createdAt: Timestamp.now(),
      });

      console.log("✅ Purchase saved to Firestore:", { uid, quizRunId });
    } else {
      console.warn("⚠️ Missing UID or quizRunId in Stripe metadata.");
    }
  }

  res.status(200).json({ received: true });
}