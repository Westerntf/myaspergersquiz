// components/Footer.tsx
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Thank you for subscribing!");
        setEmail("");
      } else {
        setMessage(data.error || "Subscription failed. Please try again.");
      }
    } catch {
      setMessage("Subscription failed. Please try again.");
    }
    setSubmitting(false);
  };

  return (
    <footer
      style={{
        marginTop: "3rem",
        padding: "2.5rem 0 1.2rem 0",
        background: "linear-gradient(90deg, #2a7b8c 0%, #388b9e 100%)",
        color: "#fff",
        textAlign: "center",
        boxShadow: "0 -2px 16px rgba(49,117,138,0.10)",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      }}
    >
      {/* Brand */}
      <div style={{ fontWeight: 800, fontSize: "1.35rem", letterSpacing: "-0.5px", marginBottom: "0.3rem" }}>
        MyAspergersQuiz.com
      </div>
      <div style={{ marginBottom: "1.1rem", fontSize: "1.08rem", opacity: 0.92 }}>
        Empowering self-understanding, one quiz at a time.
      </div>

      {/* Newsletter Signup */}
      <form
        action="/api/newsletter-signup"
        method="POST"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.5rem",
          margin: "1.2rem auto 0.5rem auto",
          maxWidth: 420,
          background: "rgba(255,255,255,0.13)",
          borderRadius: "10px",
          padding: "0.7rem 1rem",
          boxShadow: "0 1px 6px rgba(49,117,138,0.08)",
        }}
      >
        <label htmlFor="newsletter-email" style={{ display: "none" }}>Email address</label>
        <input
          type="email"
          id="newsletter-email"
          name="email"
          required
          placeholder="Your email address"
          style={{
            flex: 1,
            padding: "0.7rem 1rem",
            borderRadius: "6px",
            border: "none",
            fontSize: "1rem",
            outline: "none",
            background: "#fff",
            color: "#31758a",
            minWidth: 0,
          }}
        />
        <button
          type="submit"
          style={{
            padding: "0.7rem 1.2rem",
            borderRadius: "6px",
            border: "none",
            background: "#2a7b8c",
            color: "#fff",
            fontWeight: 700,
            fontSize: "1rem",
            cursor: "pointer",
            transition: "background 0.2s",
            boxShadow: "0 1px 4px rgba(49,117,138,0.10)",
          }}
        >
          Subscribe
        </button>
      </form>
      <div style={{ fontSize: "0.93rem", color: "#eaf4fa", opacity: 0.8, marginBottom: "1.1rem" }}>
        No spam. Unsubscribe anytime.
      </div>

      {/* Footer Links */}
      <div style={{ marginBottom: "1.1rem", fontSize: "1.05rem" }}>
        <a href="/about" style={{ color: "#eaf4fa", margin: "0 1rem", textDecoration: "underline", fontWeight: 500 }}>About</a>
        <a href="/blog" style={{ color: "#eaf4fa", margin: "0 1rem", textDecoration: "underline", fontWeight: 500 }}>Blog</a>
        <a href="/privacy" style={{ color: "#eaf4fa", margin: "0 1rem", textDecoration: "underline", fontWeight: 500 }}>Privacy Policy</a>
        <a href="/terms" style={{ color: "#eaf4fa", margin: "0 1rem", textDecoration: "underline", fontWeight: 500 }}>Terms</a>
        <a href="/contact" style={{ color: "#eaf4fa", margin: "0 1rem", textDecoration: "underline", fontWeight: 500 }}>Contact</a>
      </div>

      {/* Social Icons */}
      <div style={{ marginBottom: "1.1rem", display: "flex", justifyContent: "center", gap: "1.2rem" }}>
        <a href="https://twitter.com/yourbrand" aria-label="Twitter" target="_blank" rel="noopener" style={{ display: "inline-block" }}>
          <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="12" fill="#eaf4fa" fillOpacity="0.13"/>
            <path d="M22.46 5.924c-.793.352-1.646.59-2.542.697a4.48 4.48 0 0 0 1.964-2.475 8.94 8.94 0 0 1-2.828 1.082A4.48 4.48 0 0 0 11.07 9.03c0 .352.04.695.116 1.022A12.72 12.72 0 0 1 3.11 5.13a4.48 4.48 0 0 0 1.39 5.976 4.47 4.47 0 0 1-2.03-.56v.057a4.48 4.48 0 0 0 3.59 4.393 4.5 4.5 0 0 1-2.025.077 4.48 4.48 0 0 0 4.18 3.11A8.98 8.98 0 0 1 2 19.54a12.7 12.7 0 0 0 6.88 2.017c8.26 0 12.78-6.84 12.78-12.77 0-.195-.004-.39-.013-.583A9.14 9.14 0 0 0 24 4.59a8.93 8.93 0 0 1-2.54.697z" fill="#eaf4fa"/>
          </svg>
        </a>
        <a href="https://facebook.com/yourbrand" aria-label="Facebook" target="_blank" rel="noopener" style={{ display: "inline-block" }}>
          <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="12" fill="#eaf4fa" fillOpacity="0.13"/>
            <path d="M15.5 8.5H14V7.5C14 7.224 14.224 7 14.5 7H15.5V5H14.5C13.119 5 12 6.119 12 7.5V8.5H10.5V10.5H12V19H14V10.5H15.5V8.5Z" fill="#eaf4fa"/>
          </svg>
        </a>
        <a href="https://instagram.com/yourbrand" aria-label="Instagram" target="_blank" rel="noopener" style={{ display: "inline-block" }}>
          <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="12" fill="#eaf4fa" fillOpacity="0.13"/>
            <rect x="7" y="7" width="10" height="10" rx="3" stroke="#eaf4fa" strokeWidth="1.5"/>
            <circle cx="12" cy="12" r="2.5" stroke="#eaf4fa" strokeWidth="1.5"/>
            <circle cx="15.5" cy="8.5" r="0.8" fill="#eaf4fa"/>
          </svg>
        </a>
      </div>

      {/* Trust Badge Example */}
      <div style={{ fontSize: "0.93rem", color: "#eaf4fa", opacity: 0.8, marginBottom: "0.7rem" }}>
        <span style={{ background: "rgba(255,255,255,0.13)", padding: "0.2rem 0.7rem", borderRadius: "6px" }}>
          SSL Secured &middot; Trusted by 100,000+ users
        </span>
      </div>

      {/* Accessibility Statement */}
      <div style={{ fontSize: "0.93rem", color: "#eaf4fa", opacity: 0.8, marginBottom: "0.7rem" }}>
        <a href="/accessibility" style={{ color: "#eaf4fa", textDecoration: "underline" }}>
          Accessibility Statement
        </a>
      </div>

      {/* Disclaimer & Copyright */}
      <div style={{ fontSize: "0.97rem", color: "#eaf4fa", opacity: 0.8, marginBottom: "0.3rem" }}>
        This site does not provide medical advice. For informational purposes only.
      </div>
      <div style={{ fontSize: "0.97rem", color: "#eaf4fa", opacity: 0.7 }}>
        © {new Date().getFullYear()} MyAspergersQuiz.com. All rights reserved.
      </div>
    </footer>
  );
}