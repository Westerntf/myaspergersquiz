import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      style={{
        background: "#060618",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        padding: "1rem 1.5rem",
      }}
    >
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: "1000px",
        margin: "0 auto",
      }}>
        <Link href="/" style={{
          color: "#4e7fff",
          fontWeight: 700,
          fontSize: "1.25rem",
          textDecoration: "none",
        }}>
          MyAspergersQuiz
        </Link>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          style={{
            background: "none",
            border: "none",
            color: "#ccc",
            fontSize: "1.5rem",
            cursor: "pointer",
            display: "block",
          }}
        >
          ☰
        </button>
      </div>

      <div
        style={{
          display: menuOpen ? "flex" : "none",
          flexDirection: "column",
          gap: "1rem",
          marginTop: "1rem",
          paddingLeft: "0.5rem",
        }}
      >
        <Link href="/quiz" style={navLink}>Take Quiz</Link>
        <Link href="/results" style={navLink}>Your Results</Link>
        <Link href="/resources" style={navLink}>Resources</Link>
      </div>

      <div
        style={{
          display: "none",
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
        }}
        className="desktop-nav"
      >
        <Link href="/quiz" style={navLink}>Take Quiz</Link>
        <Link href="/results" style={navLink}>Your Results</Link>
        <Link href="/resources" style={navLink}>Resources</Link>
      </div>

      <style jsx>{`
        @media(min-width: 768px) {
          button {
            display: none;
          }
          .desktop-nav {
            display: flex !important;
            margin-top: 1rem;
          }
          div[style*="display: flex"][style*="flexDirection: column"] {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
}

const navLink = {
  color: "#ccc",
  textDecoration: "none",
  fontSize: "1rem",
  transition: "color 0.2s ease-in-out",
};