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
    <footer style={{
      background: "#ffffff",
      padding: "4rem 1rem 2rem",
      textAlign: "center",
      color: "#000000",
      borderTop: "1px solid #ddd",
      marginTop: "0",
      width: "100vw",
      maxWidth: "100%"
    }}>
      <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }}>
        <img
          src="/myaspergersquiz-logo.png"
          alt="MyAspergersQuiz logo"
          width="32"
          height="32"
          style={{ borderRadius: "6px" }}
        />
        <span style={{ fontWeight: 600, fontSize: "1.1rem" }}>MyAspergersQuiz</span>
      </div>
      <p style={{ marginBottom: "1rem" }}>Join our newsletter for updates & tips:</p>
      <form onSubmit={handleSubmit} style={{ display: "flex", justifyContent: "center", gap: "0.5rem", flexWrap: "wrap" }}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          disabled={submitting}
          style={{
            padding: "0.75rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            background: "#f9f9f9",
            color: "#000",
            minWidth: "240px",
            boxShadow: "inset 0 1px 3px rgba(0,0,0,0.06)"
          }}
        />
        <button type="submit" style={buttonStyle} disabled={submitting}>
          {submitting ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
      {message && (
        <div style={{ marginTop: "0.5rem", fontSize: "0.85rem", color: message.startsWith("Thank") ? "#4caf50" : "#d9534f" }}>
          {message}
        </div>
      )}
      <div style={{ marginTop: "2rem", fontSize: "0.85rem" }}>
        <p>© 2025 MyAspergersQuiz.com</p>
        <div style={{ marginTop: "0.5rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
          <a 
            href="/privacy" 
            style={footerLink}
            onMouseOver={(e) => (e.currentTarget.style.color = "#3a6779")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#4a7c90")}
          >
            Privacy
          </a>
          <a 
            href="/terms" 
            style={footerLink}
            onMouseOver={(e) => (e.currentTarget.style.color = "#3a6779")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#4a7c90")}
          >
            Terms
          </a>
          <a 
            href="/contact" 
            style={footerLink}
            onMouseOver={(e) => (e.currentTarget.style.color = "#3a6779")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#4a7c90")}
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

const buttonStyle = {
  background: "#4a7c90",
  color: "white",
  border: "none",
  borderRadius: "6px",
  padding: "0.75rem 1.5rem",
  fontSize: "1rem",
  cursor: "pointer"
};

const footerLink = {
  color: "#4a7c90",
  textDecoration: "none",
  transition: "color 0.2s ease"
};