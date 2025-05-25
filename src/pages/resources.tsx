import React from "react";

export default function ResourcesPage() {
  return (
    <main
      style={{
        padding: "4rem 1rem",
        background: "linear-gradient(to bottom, #060618, #101025)",
        color: "#fff",
        fontFamily: "'Inter', sans-serif",
        minHeight: "100vh",
      }}
    >
      <style>{`
        a:hover {
          color: #7fa7ff !important;
        }
      `}</style>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1.5rem", textAlign: "center" }}>
          Helpful Resources
        </h1>

        <section style={{ marginBottom: "2.5rem", background: "#1f1f3a", padding: "2rem", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.05)" }}>
          <h2 style={{ fontSize: "1.6rem", marginBottom: "0.5rem" }}>Understanding Autism</h2>
          <p style={{ fontSize: "1rem", color: "#ccc", lineHeight: 1.6 }}>
            Learn more about autism traits and neurodiversity from reliable sources.
          </p>
          <p style={{ fontSize: "1rem", color: "#ccc", marginTop: "0.75rem" }}>
            Autism is a spectrum, meaning traits and challenges vary for each person. Reading blogs or watching content by autistic individuals can offer real-world perspectives.
          </p>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            marginTop: "1rem"
          }}>
            <a
              href="https://www.youtube.com/watch?v=RbwRrVw-CRo"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "linear-gradient(90deg, #6b5cff, #b48aff)",
                color: "#fff",
                padding: "0.75rem 1.25rem",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 500,
                boxShadow: "0 4px 12px rgba(120,100,255,0.3)",
                transition: "transform 0.2s ease"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1.0)"}
            >
              📘 Watch: What is Autism?
            </a>
            <a
              href="https://neuroclastic.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "linear-gradient(90deg, #6b5cff, #b48aff)",
                color: "#fff",
                padding: "0.75rem 1.25rem",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 500,
                boxShadow: "0 4px 12px rgba(120,100,255,0.3)",
                transition: "transform 0.2s ease"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1.0)"}
            >
              🧠 NeuroClastic: Voices of the Neurodivergent
            </a>
          </div>
        </section>

        <section style={{ marginBottom: "2.5rem", background: "#1f1f3a", padding: "2rem", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.05)" }}>
          <h2 style={{ fontSize: "1.6rem", marginBottom: "0.5rem" }}>Coping Strategies</h2>
          <p style={{ fontSize: "1rem", color: "#ccc", lineHeight: 1.6 }}>
            Strategies to manage daily challenges, sensory overwhelm, and routine changes.
          </p>
          <ul style={{ marginTop: "0.75rem", paddingLeft: "1.25rem", color: "#a7a7d6", lineHeight: 1.6 }}>
            <li>🌿 Mindfulness and grounding techniques</li>
            <li>🎧 Use of noise-canceling headphones</li>
            <li>📋 Routine planners and visual schedules</li>
          </ul>
          <p style={{ fontSize: "1rem", color: "#ccc", marginTop: "1rem" }}>
            These strategies can be customized for your specific needs. Consider using mobile apps for scheduling, joining online support groups, or working with a therapist experienced in neurodiversity.
          </p>
        </section>

        <section style={{ marginBottom: "2.5rem", background: "#1f1f3a", padding: "2rem", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.05)" }}>
          <h2 style={{ fontSize: "1.6rem", marginBottom: "0.5rem" }}>Support Networks</h2>
          <p style={{ fontSize: "1rem", color: "#ccc", lineHeight: 1.6 }}>
            You're not alone. Reach out to trusted communities or helplines.
          </p>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            marginTop: "1rem"
          }}>
            <a
              href="https://www.autismspeaks.org"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "linear-gradient(90deg, #6b5cff, #b48aff)",
                color: "#fff",
                padding: "0.75rem 1.25rem",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 500,
                boxShadow: "0 4px 12px rgba(120,100,255,0.3)",
                transition: "transform 0.2s ease"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1.0)"}
            >
              Autism Speaks
            </a>
            <a
              href="https://reframingautism.org.au"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "linear-gradient(90deg, #6b5cff, #b48aff)",
                color: "#fff",
                padding: "0.75rem 1.25rem",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 500,
                boxShadow: "0 4px 12px rgba(120,100,255,0.3)",
                transition: "transform 0.2s ease"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1.0)"}
            >
              Reframing Autism (Australia)
            </a>
            <a
              href="https://www.lifeline.org.au"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "linear-gradient(90deg, #6b5cff, #b48aff)",
                color: "#fff",
                padding: "0.75rem 1.25rem",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 500,
                boxShadow: "0 4px 12px rgba(120,100,255,0.3)",
                transition: "transform 0.2s ease"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1.0)"}
            >
              Lifeline: 13 11 14
            </a>
          </div>
          <p style={{ fontSize: "1rem", color: "#ccc", marginTop: "1rem" }}>
            Community support is essential. Consider joining local meetups or Facebook groups. Peer validation and shared experiences can reduce isolation and offer encouragement.
          </p>
        </section>

        <section style={{ marginTop: "2rem", background: "#1f1f3a", padding: "2rem", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.05)" }}>
          <h2 style={{ fontSize: "1.6rem", marginBottom: "0.5rem" }}>Further Reading</h2>
          <p style={{ fontSize: "1rem", color: "#ccc", lineHeight: 1.6 }}>
            Dive deeper into autism research and community support.
          </p>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            marginTop: "1rem"
          }}>
            <a
              href="https://thinkingautismguide.blogspot.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "linear-gradient(90deg, #6b5cff, #b48aff)",
                color: "#fff",
                padding: "0.75rem 1.25rem",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 500,
                boxShadow: "0 4px 12px rgba(120,100,255,0.3)",
                transition: "transform 0.2s ease"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1.0)"}
            >
              🧩 Thinking Person's Guide to Autism
            </a>
            <a
              href="https://autisticadvocacy.org"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "linear-gradient(90deg, #6b5cff, #b48aff)",
                color: "#fff",
                padding: "0.75rem 1.25rem",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 500,
                boxShadow: "0 4px 12px rgba(120,100,255,0.3)",
                transition: "transform 0.2s ease"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1.0)"}
            >
              🌐 Autistic Self Advocacy Network
            </a>
            <a
              href="https://www.altogetherautism.org.nz"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "linear-gradient(90deg, #6b5cff, #b48aff)",
                color: "#fff",
                padding: "0.75rem 1.25rem",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 500,
                boxShadow: "0 4px 12px rgba(120,100,255,0.3)",
                transition: "transform 0.2s ease"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1.0)"}
            >
              📚 Altogether Autism (NZ)
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
