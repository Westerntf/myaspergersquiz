import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX, // e.g. 'us21'
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email } = req.body;

  // Basic email validation
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return res.status(400).json({ error: "A valid email address is required." });
  }

  try {
    await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID, {
      email_address: email,
      status: "subscribed",
    });
    res.status(200).json({ message: "Subscribed!" });
  } catch (error) {
    // Mailchimp error messages are often in error.response.body.detail
    const detail = error?.response?.body?.detail || error.message;
    res.status(400).json({ error: detail });
  }
}