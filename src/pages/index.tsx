import Head from "next/head";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    let testimonials = [
      "“I finally felt seen after taking this. The insights were gentle but accurate.”",
      "“The breakdown of traits was incredibly helpful and spot on.”",
      "“Loved how respectful and professional the tone of the quiz was.”",
      "“This gave me clarity I’ve been searching for in a simple way.”",
      "“It helped me understand patterns I hadn’t recognized in myself before.”",
      "“The privacy and tone made it feel truly safe to reflect.”"
    ];
    let current = 0;
    const interval = setInterval(() => {
      const el = document.getElementById('testimonial');
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
  <meta name="description" content="Take a free, research-informed quiz to explore traits commonly associated with autism. Instant results. Private and easy to understand." />
  <meta property="og:title" content="Discover Your Traits – Free Autism Spectrum Quiz" />
  <meta property="og:description" content="Curious about how your mind works? Take a free quiz and explore social, sensory, and cognitive patterns linked with autism traits." />
  <meta property="og:image" content="https://myaspergersquiz.com/og-home.jpg" />
  <meta property="og:url" content="https://myaspergersquiz.com/" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Free Autism Spectrum Traits Quiz" />
  <meta name="twitter:description" content="Take a 3–5 minute quiz and explore how your traits align with patterns found in autism." />
  <meta name="twitter:image" content="https://myaspergersquiz.com/og-home.jpg" />
  <link rel="canonical" href="https://myaspergersquiz.com/" />
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "https://myaspergersquiz.com/",
        "name": "MyAspergersQuiz.com",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://myaspergersquiz.com/quiz",
          "query-input": "required name=search_term_string"
        }
      })
    }}
  />
</Head>
      <main
        className="main"
        style={{
          padding: "4rem 1rem 0 1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
          boxSizing: "border-box",
          background: "linear-gradient(to bottom, #060618, #101025)",
          minHeight: "100vh",
          color: "#fff"
        }}
      >
        <div
          className="responsive-container"
          style={{
            width: "100%",
            maxWidth: "640px",
            padding: "2.5rem",
            borderRadius: "12px",
            background: "#15152a",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            boxSizing: "border-box",
            marginBottom: "2rem"
          }}
        >
          <h1 role="heading" aria-level={1}
            style={{
              fontSize: "clamp(1.75rem, 6vw, 2.5rem)",
              marginBottom: "1rem"
            }}
          >
            Welcome to <span style={{ color: "#4e7fff" }}>MyAspergersQuiz</span>
          </h1>
          <p
            style={{
              fontSize: "clamp(1rem, 3.5vw, 1.2rem)",
              fontWeight: 400,
              color: "#e0e0e0",
              marginBottom: "2rem",
              maxWidth: "600px",
              marginLeft: "auto",
              marginRight: "auto"
            }}
          >
            A life-enhancing, research-backed assessment to explore neurodivergent traits — in a private, respectful space.
          </p>
        </div>
        <div
          className="responsive-container"
          style={{
            width: "100%",
            maxWidth: "640px",
            padding: "2.5rem",
            borderRadius: "12px",
            background: "#15152a",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            boxSizing: "border-box",
            marginBottom: "2rem",
            marginTop: "0"
          }}
        >
          <h2
            style={{
              fontSize: "clamp(1.3rem, 5vw, 1.8rem)",
              fontWeight: "600",
              marginTop: 0,
              marginBottom: "1.5rem",
              color: "#fff"
            }}
          >
            Why Take This Quiz?
          </h2>
          <p
            style={{
              fontSize: "clamp(1rem, 3vw, 1.15rem)",
              color: "#e0e0e0",
              lineHeight: "1.6",
              marginBottom: "1.5rem"
            }}
          >
            This quiz is designed to help you understand your unique communication and behavior patterns. 
            It is not a diagnostic tool but can provide valuable insights and a starting point for further exploration.
          </p>

          <h2
            style={{
              fontSize: "clamp(1.1rem, 4vw, 1.4rem)",
              marginTop: 0,
              marginBottom: "1.5rem",
              fontWeight: 600,
              color: "#fff"
            }}
          >
            What You’ll Get:
          </h2>
          <ul
            role="list"
            style={{
              fontSize: "clamp(0.95rem, 3vw, 1.05rem)",
              lineHeight: "1.6",
              listStylePosition: "inside",
              paddingLeft: 0,
              textAlign: "center",
              marginBottom: 0,
              color: "#e0e0e0"
            }}
          >
            <li role="listitem">A professional summary you can save or share</li>
            <li role="listitem">Insights into your unique communication and behavior patterns</li>
            <li role="listitem">Clear breakdowns across social, sensory, and routine traits</li>
            <li role="listitem">100% private and anonymous experience</li>
          </ul>
          <h3 style={{ fontSize: "1.2rem", marginTop: "2rem", marginBottom: "1rem", color: "#fff" }}>
            What to Expect
          </h3>
          <ul role="list" style={{ listStyle: "none", padding: 0, textAlign: "center", color: "#e0e0e0", fontSize: "clamp(0.95rem, 3vw, 1.05rem)", lineHeight: "1.6", marginBottom: 0 }}>
            <li role="listitem">40 thoughtful questions</li>
            <li role="listitem">3–5 minutes to complete</li>
            <li role="listitem">Instant results, no sign-up needed</li>
          </ul>
          <a href="/quiz">
            <button
              aria-label="Start the autism traits quiz"
              style={{
                background: "linear-gradient(to right, #6c8eff, #4e7fff)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "1rem 2rem",
                fontSize: "1.1rem",
                cursor: "pointer",
                marginTop: "1.5rem"
              }}
            >
              Start the Quiz
            </button>
          </a>
        </div>
        <div
          className="responsive-container"
          style={{
            width: "100%",
            maxWidth: "640px",
            padding: "2.5rem",
            borderRadius: "12px",
            background: "#15152a",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            boxSizing: "border-box",
            marginBottom: "2rem",
            marginTop: "0"
          }}
        >
          <h2 style={{
            fontSize: "clamp(1.2rem, 4vw, 1.5rem)",
            marginTop: 0,
            marginBottom: "1.5rem",
            color: "#fff"
          }}>
            What Others Are Saying
          </h2>
          <div
            style={{
              background: "#15152a",
              borderRadius: "10px",
              boxShadow: "0 4px 20px rgba(78, 127, 255, 0.12)",
              transition: "background 0.3s ease-in-out",
              marginTop: "0",
              marginBottom: "0.5rem",
              textAlign: "center"
            }}
          >
            <p
              id="testimonial"
              role="status"
              aria-live="polite"
              style={{
                fontStyle: "italic",
                color: "#e0e0e0",
                transition: "opacity 0.3s ease-in-out",
                fontSize: "clamp(1rem, 3vw, 1.15rem)",
                margin: 0
              }}
            >
              “I finally felt seen after taking this. The insights were gentle but accurate.”
            </p>
          </div>
        </div>
      </main>
      <style jsx global>{`
        @media (max-width: 600px) {
          .responsive-container {
            padding: 2.5rem !important;
          }
        }
      `}</style>
    </>
  );
}