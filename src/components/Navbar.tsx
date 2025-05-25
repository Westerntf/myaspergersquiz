// components/Navbar.tsx
import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{
      background: "#060618",
      padding: "1rem 2rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      position: "sticky",
      top: 0,
      zIndex: 1000,
    }}>
      <Link
  href="/"
  style={{
    textDecoration: "none",
    color: "#4e7fff",
    fontWeight: 700,
    fontSize: "1.25rem"
  }}
>
  MyAspergersQuiz
</Link>

      <div style={{ display: "flex", gap: "1.5rem" }}>
        <Link href="/quiz" style={navLink}>Take Quiz</Link>
        <Link href="/results" style={navLink}>Your Results</Link>
        <Link href="/resources" style={navLink}>Resources</Link>
      </div>
    </nav>
  );
}

const navLink = {
  color: "#ccc",
  textDecoration: "none",
  fontSize: "1rem",
  transition: "color 0.2s ease-in-out",
};