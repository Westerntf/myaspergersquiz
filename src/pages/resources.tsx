import React from "react";

export default function ResourcesPage() {
  return (
    <main
      style={{
        padding: "4rem 1rem",
        background: "#fff",
        color: "#000",
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
        <h1 style={{
          fontSize: "2.5rem",
          marginBottom: "2rem",
          textAlign: "center",
          color: "#31758a",
          fontWeight: 700
        }}>
          Helpful Resources
        </h1>

        <section style={{
          marginBottom: "2.5rem",
          background: "#ffffff",
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.06)",
          padding: "2rem",
          borderRadius: "12px",
          border: "1px solid #e4ebf0"
        }}>
          <h2 style={{
            fontSize: "1.5rem",
            marginBottom: "0.75rem",
            color: "#31758a",
            fontWeight: 600
          }}>Understanding Autism</h2>
          <p style={{
            fontSize: "1rem",
            color: "#444",
            lineHeight: 1.7
          }}>
            Learn more about autism traits and neurodiversity from reliable sources.
          </p>
          <p style={{
            fontSize: "1rem",
            color: "#444",
            lineHeight: 1.7,
            marginTop: "0.75rem"
          }}>
            Autism is a spectrum, meaning traits and challenges vary for each person. Reading blogs or watching content by autistic individuals can offer real-world perspectives.
          </p>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            marginTop: "1rem"
          }}>
            <a
              href="https://www.youtube.com/watch?v=3cTNZp0QyJ0"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#31758a",
                color: "#fff",
                padding: "0.75rem 1.25rem",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 500,
                boxShadow: "0 3px 10px rgba(49,117,138,0.25)",
                transition: "transform 0.2s ease",
                textAlign: "center"
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1.0)"}
            >
              🎥 Watch: What is Autism? (Autistica UK)
            </a>
            <a
              href="https://neuroclastic.com/autistic-perspectives/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#31758a",
                color: "#fff",
                padding: "0.75rem 1.25rem",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 500,
                boxShadow: "0 3px 10px rgba(49,117,138,0.25)",
                transition: "transform 0.2s ease",
                textAlign: "center"
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1.0)"}
            >
              🧠 NeuroClastic: Autistic Voices and Insights
            </a>
          </div>
        </section>

        <section style={{
          marginBottom: "2.5rem",
          background: "#ffffff",
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.06)",
          padding: "2rem",
          borderRadius: "12px",
          border: "1px solid #e4ebf0"
        }}>
          <h2 style={{
            fontSize: "1.5rem",
            marginBottom: "0.75rem",
            color: "#31758a",
            fontWeight: 600
          }}>Coping Strategies</h2>
          <p style={{
            fontSize: "1rem",
            color: "#444",
            lineHeight: 1.7
          }}>
            Strategies to manage daily challenges, sensory overwhelm, and routine changes.
          </p>
          <ul style={{
            marginTop: "0.75rem",
            paddingLeft: "1.25rem",
            color: "#444",
            lineHeight: 1.7,
            fontSize: "1rem"
          }}>
            <li>🌿 Mindfulness and grounding techniques</li>
            <li>🎧 Use of noise-canceling headphones</li>
            <li>📋 Routine planners and visual schedules</li>
            <li>📲 Use digital timers or reminders to manage transitions</li>
          </ul>
          <p style={{
            fontSize: "1rem",
            color: "#444",
            lineHeight: 1.7,
            marginTop: "1rem"
          }}>
            These strategies can be customized for your specific needs. Consider using mobile apps for scheduling, joining online support groups, or working with a therapist experienced in neurodiversity.
          </p>
        </section>

        <section style={{
          marginBottom: "2.5rem",
          background: "#ffffff",
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.06)",
          padding: "2rem",
          borderRadius: "12px",
          border: "1px solid #e4ebf0"
        }}>
          <h2 style={{
            fontSize: "1.5rem",
            marginBottom: "0.75rem",
            color: "#31758a",
            fontWeight: 600
          }}>Support Networks</h2>
          <p style={{
            fontSize: "1rem",
            color: "#444",
            lineHeight: 1.7
          }}>
            You're not alone. Reach out to trusted communities or helplines.
          </p>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            marginTop: "1rem"
          }}>
            <a
              href="https://autismsociety.org"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#31758a",
                color: "#fff",
                padding: "0.75rem 1.25rem",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 500,
                boxShadow: "0 3px 10px rgba(49,117,138,0.25)",
                transition: "transform 0.2s ease",
                textAlign: "center"
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1.0)"}
            >
              🧭 Autism Society (U.S.)
            </a>
            <a
              href="https://reframingautism.org.au"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#31758a",
                color: "#fff",
                padding: "0.75rem 1.25rem",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 500,
                boxShadow: "0 3px 10px rgba(49,117,138,0.25)",
                transition: "transform 0.2s ease",
                textAlign: "center"
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1.0)"}
            >
              🌏 Reframing Autism (Australia)
            </a>
            <a
              href="https://www.beyondblue.org.au"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#31758a",
                color: "#fff",
                padding: "0.75rem 1.25rem",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 500,
                boxShadow: "0 3px 10px rgba(49,117,138,0.25)",
                transition: "transform 0.2s ease",
                textAlign: "center"
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1.0)"}
            >
              📞 Beyond Blue: Mental Health Support (AU)
            </a>
          </div>
          <p style={{
            fontSize: "1rem",
            color: "#444",
            lineHeight: 1.7,
            marginTop: "1rem"
          }}>
            Community support is essential. Consider joining local meetups or Facebook groups. Peer validation and shared experiences can reduce isolation and offer encouragement.
          </p>
        </section>

        <section style={{
          marginTop: "2rem",
          background: "#ffffff",
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.06)",
          padding: "2rem",
          borderRadius: "12px",
          border: "1px solid #e4ebf0"
        }}>
          <h2 style={{
            fontSize: "1.5rem",
            marginBottom: "0.75rem",
            color: "#31758a",
            fontWeight: 600
          }}>Further Reading</h2>
          <p style={{
            fontSize: "1rem",
            color: "#444",
            lineHeight: 1.7
          }}>
            Dive deeper into autism research and community support.
          </p>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            marginTop: "1rem"
          }}>
            <a
              href="https://thinkingautismguide.blogspot.com/p/resources.html"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#31758a",
                color: "#fff",
                padding: "0.75rem 1.25rem",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 500,
                boxShadow: "0 3px 10px rgba(49,117,138,0.25)",
                transition: "transform 0.2s ease",
                textAlign: "center"
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1.0)"}
            >
              🧩 Thinking Person's Guide to Autism
            </a>
            <a
              href="https://autisticadvocacy.org/resources/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#31758a",
                color: "#fff",
                padding: "0.75rem 1.25rem",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 500,
                boxShadow: "0 3px 10px rgba(49,117,138,0.25)",
                transition: "transform 0.2s ease",
                textAlign: "center"
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1.0)"}
            >
              🌐 Autistic Self Advocacy Network
            </a>
            <a
              href="https://www.altogetherautism.org.nz/autism-guides/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#31758a",
                color: "#fff",
                padding: "0.75rem 1.25rem",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 500,
                boxShadow: "0 3px 10px rgba(49,117,138,0.25)",
                transition: "transform 0.2s ease",
                textAlign: "center"
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1.0)"}
            >
              📚 Altogether Autism (NZ)
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
