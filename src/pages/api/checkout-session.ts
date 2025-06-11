// src/pages/api/checkout-session.ts
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

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

// FIX: Use a valid Stripe API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("Missing STRIPE_SECRET_KEY in environment variables");
    } else {
      console.log("Using STRIPE_SECRET_KEY (last 4):", process.env.STRIPE_SECRET_KEY.slice(-4));
    }
    const origin = req.headers.origin || "https://myaspergersquiz.com";
    const { priceId, sessionId, uid, userEmail } = req.body;
    if (!priceId || !uid || !sessionId) {
      return res.status(400).json({ error: "Missing priceId, sessionId, or uid in request body" });
    }
    await db
      .collection("reports")
      .doc(uid)
      .collection("sessions")
      .doc(sessionId)
      .set({
        paid: false,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: userEmail,
      success_url: `${origin}/full-report?sessionId=${sessionId}`,
      cancel_url: `${origin}/results?canceled=true`,
      metadata: {
        uid,
        sessionId,
      },
    });
    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe session creation error:", err instanceof Error ? err.message : String(err));
    return res.status(500).json({ error: "Unable to create Stripe session." });
  }
}