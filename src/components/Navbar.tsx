import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      style={{
        background: "#4a7c90",
        borderBottom: "none",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "none",
        padding: "0.75rem 1.5rem",
        width: "100%"
      }}
    >
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "0 1rem"
      }}>
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            gap: "0.5rem",
            transition: "opacity 0.2s ease-in-out"
          }}
          onMouseOver={(e) => (e.currentTarget.style.opacity = "0.8")}
          onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
        >
          <img
            src="/myaspergersquiz-logo.png"
            alt="Logo"
            width={28}
            height={28}
            style={{
              borderRadius: "6px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              maxHeight: "32px",
              width: "auto"
            }}
          />
          <span style={{ fontWeight: 700, fontSize: "1.1rem", color: "#ffffff" }}>
            MyAspergers<span style={{ color: "#ffffff" }}>Quiz</span>
          </span>
        </Link>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          style={{
            background: "none",
            border: "none",
            color: "#ffffff",
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
          padding: "1rem 0.5rem",
          boxShadow: "none",
        }}
      >
        <Link
          href="/quiz"
          style={navLink}
          onMouseOver={(e) => (e.currentTarget.style.textDecoration = "underline")}
          onMouseOut={(e) => (e.currentTarget.style.textDecoration = "none")}
        >
          Take Quiz
        </Link>
        <Link
          href="/results"
          style={navLink}
          onMouseOver={(e) => (e.currentTarget.style.textDecoration = "underline")}
          onMouseOut={(e) => (e.currentTarget.style.textDecoration = "none")}
        >
          Your Results
        </Link>
        <Link
          href="/resources"
          style={navLink}
          onMouseOver={(e) => (e.currentTarget.style.textDecoration = "underline")}
          onMouseOut={(e) => (e.currentTarget.style.textDecoration = "none")}
        >
          Resources
        </Link>
      </div>

      <style jsx>{`
        @media(min-width: 768px) {
          button {
            display: none;
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
  color: "#ffffff",
  textDecoration: "none",
  fontSize: "1rem",
  transition: "all 0.2s ease-in-out",
  textUnderlineOffset: "3px"
};