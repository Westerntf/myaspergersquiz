// pages/contact.tsx
export default function ContactPage() {
  return (
    <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto", fontFamily: "'Inter', sans-serif", color: "#fff" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Contact Us</h1>
      <p style={{ marginBottom: "2rem" }}>
        Have a question, suggestion, or just want to say hello? Fill out the form below and we’ll get back to you soon.
      </p>
      <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          type="text"
          placeholder="Your Name"
          style={{
            padding: "0.75rem",
            borderRadius: "6px",
            border: "1px solid #333",
            background: "#101025",
            color: "#fff"
          }}
        />
        <input
          type="email"
          placeholder="Your Email"
          style={{
            padding: "0.75rem",
            borderRadius: "6px",
            border: "1px solid #333",
            background: "#101025",
            color: "#fff"
          }}
        />
        <textarea
          placeholder="Your Message"
          rows={6}
          style={{
            padding: "0.75rem",
            borderRadius: "6px",
            border: "1px solid #333",
            background: "#101025",
            color: "#fff",
            resize: "vertical"
          }}
        />
        <button
          type="submit"
          style={{
            background: "#4e7fff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            cursor: "pointer"
          }}
        >
          Send Message
        </button>
      </form>
    </main>
  );
}