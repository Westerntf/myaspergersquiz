// src/pages/api/checkout-session.ts
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-04-30.basil",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Full Report Access",
            },
            unit_amount: 999,
          },
          quantity: 1,
        },
      ],
      success_url: `${req.headers.origin}/results?success=true`,
      cancel_url: `${req.headers.origin}/results?canceled=true`,
    });

    return res.status(200).json({ sessionId: session.id });
  } catch (err) {
    console.error("Stripe session creation error:", err);
    return res.status(500).json({ error: "Unable to create Stripe session." });
  }
}