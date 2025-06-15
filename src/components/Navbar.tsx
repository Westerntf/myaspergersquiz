import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../lib/firebase";
import CategoryAccordion from "./CategoryAccordion";

const navStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "linear-gradient(90deg, #2a7b8c 0%, #388b9e 100%)",
  padding: "1.2rem 2.5rem",
  color: "#fff",
  boxShadow: "0 2px 16px rgba(49,117,138,0.13)",
  position: "relative",
  zIndex: 10,
  borderRadius: "0 0 18px 18px",
};

const logoStyle: React.CSSProperties = {
  fontWeight: 800,
  fontSize: "1.35rem",
  letterSpacing: "-0.5px",
  color: "#fff",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: 10,
};

const logoImgStyle: React.CSSProperties = {
  width: 38,
  height: 38,
  marginRight: 10,
  borderRadius: "50%",
  background: "#fff",
  boxShadow: "0 2px 8px rgba(49,117,138,0.10)",
};

const hamburgerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: 40,
  height: 40,
  background: "none",
  border: "none",
  cursor: "pointer",
  gap: 6,
  marginLeft: "auto",
  zIndex: 101,
  transition: "transform 0.3s cubic-bezier(.4,2,.6,1)",
};

const barStyle = (open: boolean): React.CSSProperties => ({
  display: "block",
  height: 4,
  width: 28,
  background: "#fff",
  borderRadius: 2,
  margin: 0,
  transition: "0.3s cubic-bezier(.4,2,.6,1)",
  transform: open ? "rotate(45deg) translateY(8px)" : "none",
});
const barStyle2 = (open: boolean): React.CSSProperties => ({
  display: "block",
  height: 4,
  width: 28,
  background: "#fff",
  borderRadius: 2,
  margin: 0,
  transition: "0.3s cubic-bezier(.4,2,.6,1)",
  opacity: open ? 0 : 1,
});
const barStyle3 = (open: boolean): React.CSSProperties => ({
  display: "block",
  height: 4,
  width: 28,
  background: "#fff",
  borderRadius: 2,
  margin: 0,
  transition: "0.3s cubic-bezier(.4,2,.6,1)",
  transform: open ? "rotate(-45deg) translateY(-8px)" : "none",
});

const linksStyle = (open: boolean): React.CSSProperties =>
  open
    ? {
        display: "flex",
        flexDirection: "column",
        gap: "1.3rem",
        alignItems: "flex-start",
        listStyle: "none",
        margin: 0,
        padding: "2rem 2rem 2.5rem 2rem",
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
        background: "linear-gradient(180deg, #fff 90%, #eaf4fa 100%)",
        borderRadius: "0 0 18px 18px",
        boxShadow: "0 8px 32px rgba(49,117,138,0.13)",
        width: "100%",
        zIndex: 100,
        transition: "all 0.2s cubic-bezier(.4,2,.6,1)",
        borderTop: "1px solid #eaf4fa",
      }
    : { display: "none" };

const linkBase: React.CSSProperties = {
  color: "#2a7b8c",
  textDecoration: "none",
  fontWeight: 700,
  width: "100%",
  padding: "0.5rem 2rem",
  boxSizing: "border-box",
  fontSize: "1.25rem",
  textAlign: "left",
  borderRadius: "8px",
  transition: "background 0.15s, color 0.15s, box-shadow 0.15s",
  cursor: "pointer",
};

const ctaStyle: React.CSSProperties = {
  background: "#eaf4fa",
  color: "#2a7b8c",
  padding: "0.8rem 1.2rem",
  borderRadius: "8px",
  fontWeight: 800,
  textDecoration: "none",
  boxShadow: "0 1px 4px rgba(49,117,138,0.10)",
  border: "none",
  display: "inline-block",
  transition: "background 0.2s, color 0.2s, box-shadow 0.2s",
  width: "100%",
  textAlign: "center",
  fontSize: "1.25rem",
  marginTop: "0.5rem",
  cursor: "pointer",
};

const dividerStyle: React.CSSProperties = {
  width: "100%",
  borderTop: "1px solid #eaf4fa",
  margin: "1rem 0 0.5rem 0",
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setOpen(false);
    router.push("/");
  };

  return (
    <>
      <nav style={navStyle} role="navigation" aria-label="Main navigation">
        <a href="/" style={logoStyle}>
          <img src="/myaspergersquiz-logo.png" alt="Logo" style={logoImgStyle} />
          MyAspergersQuiz
        </a>
        <button
          style={hamburgerStyle}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span style={barStyle(open)} />
          <span style={barStyle2(open)} />
          <span style={barStyle3(open)} />
        </button>
        <ul
          style={{
            ...linksStyle(open),
            padding: 0,
            background: "linear-gradient(180deg, #fff 90%, #eaf4fa 100%)",
            borderRadius: "0 0 18px 18px",
            boxShadow: "0 8px 32px rgba(49,117,138,0.13)",
            width: "100%",
            borderTop: "1px solid #eaf4fa",
            minWidth: 0,
            margin: 0,
          }}
        >
          <li
            style={{
              width: "100%",
              padding: "2rem 0 0 0",
              margin: 0,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.7rem",
                width: "100%",
                maxWidth: 340,
                margin: "1rem 0 1.5rem 0",
              }}
            >
              <CategoryAccordion />
              {user ? (
                <>
                  <a
                    href="/profile"
                    style={{
                      ...linkBase,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.7rem",
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      justifyContent: "center",
                      background: "none",
                      padding: 0,
                    }}
                    onClick={() => setOpen(false)}
                  >
                    <img
                      src={user.photoURL || "/myaspergersquiz-logo.png"}
                      alt="Profile"
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        border: "1.5px solid #eaf4fa",
                        background: "#eaf4fa",
                      }}
                    />
                    {user.displayName || user.email || "Profile"}
                  </a>
                  <button
                    style={{
                      ...ctaStyle,
                      background: "#31758a",
                      color: "#fff",
                      marginTop: 0,
                      fontWeight: 700,
                      border: "none",
                      cursor: "pointer",
                      width: "100%",
                      fontSize: "1.2rem",
                    }}
                    onClick={handleLogout}
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <a
                    href="/login"
                    style={{ ...ctaStyle, width: "100%", background: "#31758a", color: "#fff", boxShadow: "0 2px 8px rgba(49,117,138,0.13)" }}
                    onClick={() => setOpen(false)}
                  >
                    Log in
                  </a>
                  <a
                    href="/signup"
                    style={{ ...ctaStyle, background: "linear-gradient(90deg, #2a7b8c 0%, #388b9e 100%)", color: "#fff", width: "100%", boxShadow: "0 2px 8px rgba(49,117,138,0.13)" }}
                    onClick={() => setOpen(false)}
                  >
                    Sign up
                  </a>
                </>
              )}
            </div>
          </li>
        </ul>
        <style jsx>{`
          ul li a:hover, ul li a:focus {
            background: #eaf4fa;
            color: #23687a;
            box-shadow: 0 2px 8px rgba(49,117,138,0.07);
          }
          ul li a[style*='background: linear-gradient'] {
            background: linear-gradient(90deg, #2a7b8c 0%, #388b9e 100%) !important;
            color: #fff !important;
          }
          ul li a[style*='background: #31758a'] {
            background: #31758a !important;
            color: #fff !important;
          }
          ul li a[style*='background: #eaf4fa'] {
            background: #eaf4fa !important;
            color: #2a7b8c !important;
          }
          button[style*='background: #31758a'] {
            background: #31758a !important;
            color: #fff !important;
          }
          @media (max-width: 900px) {
            .unified-dropdown {
              flex-direction: column !important;
              gap: 0 !important;
              padding: 0.5rem !important;
              border-radius: 18px !important;
            }
            .dropdown-section {
              width: 100% !important;
              min-width: 0 !important;
              border-radius: 18px !important;
              border-right: none !important;
              border-bottom: 1.5px solid #b2d6e6 !important;
              margin-bottom: 0 !important;
            }
            .dropdown-section:last-child {
              border-bottom: none !important;
            }
            .dropdown-header {
              border-radius: 18px 18px 0 0 !important;
              padding: 1rem 1.1rem 1rem 1.1rem !important;
              font-size: 1.13rem !important;
            }
            .dropdown-content {
              border-radius: 0 0 18px 18px !important;
              background: #f7fbfd !important;
              box-shadow: none !important;
              padding: 0 1.1rem !important;
            }
            .dropdown-content.open {
              padding: 0.5rem 1.1rem 1rem 1.1rem !important;
              max-height: 500px !important;
            }
          }
        `}</style>
      </nav>
    </>
  );
}