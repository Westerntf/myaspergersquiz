// /pages/api/verify-payment.ts
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { session_id } = req.query;

  if (!session_id || typeof session_id !== "string") {
    return res.status(400).json({ error: "Missing session_id" });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    const isPaid = session.payment_status === "paid";
    const quizId = session.metadata?.quiz_id || null;
    const sessionUid = session.metadata?.session_uid || null;

    res.status(200).json({ paid: isPaid, quiz_id: quizId, session_uid: sessionUid });
  } catch (err: any) {
    console.error("Failed to verify payment", err);
    res.status(500).json({ error: err.message });
  }
}