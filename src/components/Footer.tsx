// components/Footer.tsx
export default function Footer() {
  return (
    <footer style={{
      background: "#060618",
      padding: "3rem 1rem 2rem",
      textAlign: "center",
      color: "#999",
      borderTop: "1px solid rgba(255, 255, 255, 0.1)",
      marginTop: "0"
    }}>
      <p style={{ marginBottom: "1rem" }}>Join our newsletter for updates & tips:</p>
      <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", flexWrap: "wrap" }}>
        <input
          type="email"
          placeholder="Enter your email"
          style={{
            padding: "0.75rem",
            borderRadius: "6px",
            border: "1px solid #333",
            background: "#101025",
            color: "white",
            minWidth: "240px"
          }}
        />
        <button style={buttonStyle}>Subscribe</button>
      </div>
      <div style={{ marginTop: "2rem", fontSize: "0.85rem" }}>
        <p>© 2025 MyAspergersQuiz.com</p>
        <div style={{ marginTop: "0.5rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
          <a href="/privacy" style={footerLink}>Privacy</a>
          <a href="/terms" style={footerLink}>Terms</a>
          <a href="/contact" style={footerLink}>Contact</a>
        </div>
      </div>
    </footer>
  );
}

const buttonStyle = {
  background: "#4e7fff",
  color: "white",
  border: "none",
  borderRadius: "6px",
  padding: "0.75rem 1.5rem",
  fontSize: "1rem",
  cursor: "pointer"
};

const footerLink = {
  color: "#aaa",
  textDecoration: "none"
};