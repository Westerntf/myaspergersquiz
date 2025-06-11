import { buffer } from "micro";
import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

export const config = { api: { bodyParser: false } };

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}
const db = getFirestore();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }

  const sig = req.headers["stripe-signature"] as string;
  const buf = await buffer(req);

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err) {
    console.error("Webhook signature verification failed.", err);
    return res.status(400).send(`Webhook Error: ${err instanceof Error ? err.message : String(err)}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const uid = session.metadata?.uid;
    const sessionId = session.metadata?.sessionId;
    console.log("Webhook received for uid:", uid, "sessionId:", sessionId);
    if (uid && sessionId) {
      await db
        .collection("reports")
        .doc(uid)
        .collection("sessions")
        .doc(sessionId)
        .set({ paid: true }, { merge: true });
      console.log("Firestore updated for paid:true");
    } else {
      console.error("Missing uid or sessionId in webhook metadata");
    }
  }

  res.status(200).json({ received: true });
}