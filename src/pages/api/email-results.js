import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { email, results } = req.body;
  try {
    await resend.emails.send({
      from: "Your Name <your@email.com>",
      to: email,
      subject: "Your Quiz Results",
      html: `<h1>Your Results</h1><p>${results}</p>`,
    });
    res.status(200).json({ message: "Email sent!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}