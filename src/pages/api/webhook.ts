import { buffer } from "micro";
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  try {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];
    if (!sig) throw new Error("Missing Stripe signature");

    const event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);

    console.log("✅ Event received:", event.type);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("💰 Payment successful for session:", session.id);
    }

    res.status(200).json({ received: true });

  } catch (err) {
    console.error("❌ Webhook handler failed:", err);
    res.status(500).send(`Webhook Error: ${err instanceof Error ? err.message : "Unknown error"}`);
  }
}