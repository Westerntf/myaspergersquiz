// src/pages/api/checkout-session.ts
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
apiVersion: "2025-04-30.basil",});

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
    console.log("Request origin:", req.headers.origin);
    const origin = req.headers.origin || "https://myaspergersquiz.com";

    if (!req.body.priceId) {
      return res.status(400).json({ error: "Missing priceId in request body" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: req.body.priceId,
          quantity: 1,
        },
      ],
      success_url: `${origin}/results?success=true`,
      cancel_url: `${origin}/results?canceled=true`,
    });

    console.log("Stripe session creation response:", session);
    return res.status(200).json({ sessionId: session.id, session });
  } catch (err) {
    console.error("Stripe session creation error:", err instanceof Error ? err.message : String(err));
    return res.status(500).json({ error: "Unable to create Stripe session." });
  }
}