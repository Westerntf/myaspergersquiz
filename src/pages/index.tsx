import Head from "next/head";
import { useEffect } from "react";
import { Lock, ShieldCheck, Clock, FlaskConical, FileText, BarChart3, Compass } from "lucide-react";

export default function Home() {
  useEffect(() => {
    const testimonials = [
      "“I finally felt seen after taking this. The insights were gentle but accurate.”",
      "“The breakdown of traits was incredibly helpful and spot on.”",
      "“Loved how respectful and professional the tone of the quiz was.”",
      "“This gave me clarity I’ve been searching for in a simple way.”",
      "“It helped me understand patterns I hadn’t recognized in myself before.”",
      "“The privacy and tone made it feel truly safe to reflect.”",
    ];
    let current = 0;
    const interval = setInterval(() => {
      const el = document.getElementById("testimonial");
      if (!el) return;
      el.style.opacity = "0";
      setTimeout(() => {
        current = (current + 1) % testimonials.length;
        el.innerText = testimonials[current];
        el.style.opacity = "1";
      }, 300);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>Free Online Autism Traits Quiz | MyAspergersQuiz.com</title>
        <meta
          name="description"
          content="Take a free, research-informed quiz to explore traits commonly associated with autism. Instant results. Private and easy to understand."
        />
        <meta property="og:title" content="Discover Your Traits – Free Autism Spectrum Quiz" />
        <meta
          property="og:description"
          content="Curious about how your mind works? Take a free quiz and explore social, sensory, and cognitive patterns linked with autism traits."
        />
        <meta property="og:image" content="https://myaspergersquiz.com/og-home.jpg" />
        <meta property="og:url" content="https://myaspergersquiz.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Autism Spectrum Traits Quiz" />
        <meta
          name="twitter:description"
          content="Take a 3–5 minute quiz and explore how your traits align with patterns found in autism."
        />
        <meta name="twitter:image" content="https://myaspergersquiz.com/og-home.jpg" />
        <link rel="canonical" href="https://myaspergersquiz.com/" />
      </Head>
      <main style={{
        background: "#fdfdfd",
        color: "#1a1a1a",
        padding: "2rem 1rem",
        fontFamily: "'Inter', sans-serif",
        width: "100vw",
        boxSizing: "border-box"
      }}>
  {/* Unified Intro, What to Expect, and Full Report sections in a single container */}
  <div style={{
    backgroundColor: "#f9fbfc",
    border: "1px solid #e4ebf0",
    borderRadius: "10px",
    padding: "1.5rem",
    margin: "2rem auto",
    maxWidth: "640px",
    width: "90vw",
    boxSizing: "border-box"
  }}>
    {/* Headline, tagline, logo title */}
    <div style={{ textAlign: "center" }}>
      <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
        <img
          src="/myaspergersquiz-logo.png"
          alt="MyAspergersQuiz logo"
          width={32}
          height={32}
          style={{
            verticalAlign: "middle",
            marginRight: "0.5rem",
            borderRadius: "6px",
            display: "inline-block"
          }}
        />
        <span style={{
          fontSize: "1.25rem",
          fontWeight: 700,
          color: "#1a1a1a",
          fontFamily: "'Inter', sans-serif",
          display: "inline-block",
          verticalAlign: "middle"
        }}>
          MyAspergersQuiz
        </span>
      </div>
      <p style={{ fontSize: "0.9rem", color: "#4A90A4", margin: "0 0 0.75rem 0", lineHeight: "1.5" }}>Explore with Ease. Reflect with Confidence.</p>
    </div>
    <div style={{ textAlign: "center", marginTop: "1.25rem" }}>
      <h1 style={{
        fontSize: "1.6rem",
        margin: "0.25rem 0 1rem",
        lineHeight: "1.3",
        fontWeight: 700,
        color: "#4A90A4"
      }}>
        Discover and Understand <br /> Your Unique Strengths
      </h1>
      <p style={{ marginBottom: "0.75rem", fontSize: "0.9rem", lineHeight: "1.5" }}>
        Built independently using research inspired by organizations such as the Aspergers Research Institute.
        Informed by academic research in social, sensory, and behavioral traits.
      </p>
    </div>
    {/* What to Expect Section */}
    <div style={{ marginTop: "2rem", textAlign: "center" }}>
      <h2 style={{ fontSize: "1.3rem", fontWeight: "bold", marginBottom: "1.5rem", color: "#4A90A4" }}>What to Expect</h2>
      <p style={{
        fontSize: "0.9rem",
        color: "#1a1a1a",
        textAlign: "center",
        maxWidth: "500px",
        margin: "0 auto 0.75rem auto",
        lineHeight: "1.5"
      }}>
        Receive a personalized summary designed to give you clarity and confidence. <br />
        Discover how your traits align with patterns in social, sensory, and behavioral dimensions.
      </p>
      <a href="/quiz" style={{ textDecoration: "none" }}>
        <button style={{
          background: "#4A90A4",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          padding: "1rem 2.4rem",
          width: "100%",
          maxWidth: "280px",
          margin: "0 auto",
          fontSize: "1rem",
          cursor: "pointer",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
          transition: "background 0.2s ease",
          marginTop: "1rem",
          marginBottom: "1.25rem",
          display: "block"
        }} onMouseOver={(e) => e.currentTarget.style.background = '#3b7183'}
          onMouseOut={(e) => e.currentTarget.style.background = '#4A90A4'}>
          Start the Quiz
        </button>
      </a>
      <p style={{ fontSize: "0.9rem", color: "#4A90A4", marginTop: "0.4rem", lineHeight: "1.5" }}>
        Takes only 5 minutes. Completely private.
      </p>
      <ul style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        rowGap: "1.5rem",
        columnGap: "2rem",
        justifyItems: "center",
        listStyle: "none",
        padding: 0,
        marginTop: "1rem",
        marginBottom: "2rem",
        color: "#333",
        fontSize: "1rem"
      }}>
        <li style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.4rem",
          color: "#222"
        }}>
          <div style={{
            backgroundColor: "#eaf2f4",
            padding: "0.5rem",
            borderRadius: "50%",
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <ShieldCheck size={24} color="#4A90A4" />
          </div>
          <span style={{ fontSize: "0.9rem", marginTop: "0.25rem" }}>Private & Anonymous</span>
          <span style={{ fontSize: "0.8rem", color: "#666", marginTop: "0.25rem" }}>Your answers are never stored.</span>
        </li>
        <li style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.4rem",
          color: "#222"
        }}>
          <div style={{
            backgroundColor: "#eaf2f4",
            padding: "0.5rem",
            borderRadius: "50%",
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <Lock size={24} color="#4A90A4" />
          </div>
          <span style={{ fontSize: "0.9rem", marginTop: "0.25rem" }}>Secure</span>
          <span style={{ fontSize: "0.8rem", color: "#666", marginTop: "0.25rem" }}>No signup or login required.</span>
        </li>
        <li style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.4rem",
          color: "#222"
        }}>
          <div style={{
            backgroundColor: "#eaf2f4",
            padding: "0.5rem",
            borderRadius: "50%",
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <Clock size={24} color="#4A90A4" />
          </div>
          <span style={{ fontSize: "0.9rem", marginTop: "0.25rem" }}>Fast</span>
          <span style={{ fontSize: "0.8rem", color: "#666", marginTop: "0.25rem" }}>Takes less than 5 minutes.</span>
        </li>
        <li style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.4rem",
          color: "#222"
        }}>
          <div style={{
            backgroundColor: "#eaf2f4",
            padding: "0.5rem",
            borderRadius: "50%",
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <FlaskConical size={24} color="#4A90A4" />
          </div>
          <span style={{ fontSize: "0.9rem", marginTop: "0.25rem" }}>Science-Informed</span>
          <span style={{ fontSize: "0.8rem", color: "#666", marginTop: "0.25rem" }}>Built from peer-reviewed studies.</span>
        </li>
      </ul>
    </div>
    {/* Full Report Section */}
    <div style={{ marginTop: "2rem", textAlign: "center" }}>
      <h2 style={{ fontSize: "1.3rem", fontWeight: "bold", marginTop: "2rem", color: "#4A90A4" }}>
        What You Get in the Full Report
      </h2>
      <p style={{ fontSize: "0.9rem", color: "#222", marginBottom: "1rem", textAlign: "center", lineHeight: "1.5" }}>
        Your free results offer an instant overview—but with the optional full report, you'll receive:
      </p>
      <ul style={{ listStyle: "none", padding: 0, marginTop: "1rem", marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <li style={{ display: "flex", alignItems: "center", gap: "0.6rem", justifyContent: "center" }}>
          <FlaskConical size={20} color="#4A90A4" />
          <span>A deeper breakdown of your social, sensory, and behavior traits</span>
        </li>
        <li style={{ display: "flex", alignItems: "center", gap: "0.6rem", justifyContent: "center" }}>
          <BarChart3 size={20} color="#4A90A4" />
          <span>Personalized insight explanations unique to your responses</span>
        </li>
        <li style={{ display: "flex", alignItems: "center", gap: "0.6rem", justifyContent: "center" }}>
          <Compass size={20} color="#4A90A4" />
          <span>Self-awareness prompts tailored to your top traits</span>
        </li>
        <li style={{ display: "flex", alignItems: "center", gap: "0.6rem", justifyContent: "center" }}>
          <FileText size={20} color="#4A90A4" />
          <span>A downloadable PDF to reflect on or share</span>
        </li>
        <li style={{ display: "flex", alignItems: "center", gap: "0.6rem", justifyContent: "center" }}>
          <Lock size={20} color="#4A90A4" />
          <span>All content remains completely private—no account needed</span>
        </li>
      </ul>
    </div>
  </div>
  {/* Testimonials section remains outside the unified container */}
  <section style={{
    backgroundColor: "#f9fbfc",
    border: "1px solid #e4ebf0",
    borderRadius: "10px",
    padding: "2rem 1.5rem",
    margin: "2rem auto",
    maxWidth: "640px",
    width: "90vw",
    boxSizing: "border-box",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto"
  }}>
    <h2 style={{ fontSize: "1.3rem", fontWeight: "bold", marginBottom: "1.5rem", color: "#4A90A4" }}>What Others Are Saying</h2>
    <blockquote id="testimonial" style={{
      fontStyle: "italic",
      color: "#333",
      fontSize: "0.95rem",
      textAlign: "center",
      transition: "opacity 0.3s ease-in-out",
      margin: "0 auto 0.5rem",
      maxWidth: "500px"
    }}>
      “I finally felt seen after taking this. The insights were gentle but accurate.”
    </blockquote>
  </section>
      </main>
    </>
  );
}