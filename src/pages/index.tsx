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

  // Responsive helpers
  const containerStyle: React.CSSProperties = {
    background: "linear-gradient(180deg, #fafdff 0%, #f4fafd 100%)",
    border: "2px solid #d2e6ee",
    borderRadius: "18px",
    padding: "2rem 1.2rem",
    margin: "0 auto",
    maxWidth: 700,
    width: "100%",
    boxShadow: "0 8px 32px rgba(49,117,138,0.10)",
    display: "flex",
    flexDirection: "column",
    gap: "1.3rem"
  };

  const heroStyle: React.CSSProperties = {
    textAlign: "center",
    padding: "2rem 1rem 1.2rem 1rem",
    background: "linear-gradient(90deg, #eaf6fa 0%, #f6fbfd 100%)",
    borderRadius: "16px",
    border: "1.5px solid #d2e6ee",
    boxShadow: "0 2px 12px rgba(49,117,138,0.06)",
    marginBottom: "0.5rem"
  };

  // Responsive grid for features
  const featuresGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "0.8rem",
    listStyle: "none",
    padding: 0,
    margin: "0.8rem 0 0 0"
  };

  // Responsive adjustments for mobile
  const mobileMedia = `
    @media (max-width: 600px) {
      .main-container {
        padding: 1rem 0.2rem !important;
      }
      .content-box {
        padding: 1.2rem 0.3rem !important;
        border-radius: 12px !important;
      }
      .hero-section {
        padding: 1.2rem 0.2rem 0.8rem 0.2rem !important;
        border-radius: 10px !important;
      }
      .features-grid {
        grid-template-columns: 1fr 1fr !important;
        gap: 0.6rem !important;
      }
      .full-report-section {
        padding: 1rem 0.5rem 1rem 0.5rem !important;
        border-radius: 10px !important;
        max-width: 100% !important;
      }
      .tip-section {
        flex-direction: column !important;
        gap: 0.7rem !important;
        padding: 0.8rem 0.7rem !important;
      }
      .start-quiz-btn {
        width: 100% !important;
        font-size: 1rem !important;
        padding: 0.7rem 0 !important;
      }
    }
  `;

  return (
    <>
      <style>{mobileMedia}</style>
      <Head>
        <title>Free Online Autism Traits Quiz | MyAspergersQuiz.com</title>
        <meta name="description" content="Science-based, private, and anonymous online autism/Asperger’s traits quiz. Free for all ages. Instantly see your results and unlock a full personalized report." />
        <meta name="keywords" content="autism quiz, aspergers checklist, ASD self test online, private autism assessment, anonymous autism quiz, neurodivergent test, research-based autism screening, science-based, instant results, free ASD quiz, autism symptoms test, autism spectrum disorder, 2025 autism screener, autism questionnaire free, is my child autistic, asd online screener 2025" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://myaspergersquiz.com/" />
        <link rel="alternate" href="https://myaspergersquiz.com/" hrefLang="en-au" />
        <link rel="alternate" href="https://myaspergersquiz.com/" hrefLang="en-us" />
        <link rel="alternate" href="https://myaspergersquiz.com/" hrefLang="x-default" />
        <meta property="og:title" content="Discover Your Traits – Free Autism Spectrum Quiz" />
        <meta property="og:description" content="Curious about how your mind works? Take a free quiz and explore social, sensory, and cognitive patterns linked with autism traits." />
        <meta property="og:image" content="https://myaspergersquiz.com/og-home.jpg" />
        <meta property="og:image:alt" content="MyAspergersQuiz logo and tagline" />
        <meta property="og:url" content="https://myaspergersquiz.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_AU" />
        <meta property="og:site_name" content="MyAspergersQuiz.com" />
        <meta property="og:updated_time" content="2025-06-02T00:00:00+10:00" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Autism Spectrum Traits Quiz" />
        <meta name="twitter:description" content="Take a 3–5 minute quiz and explore how your traits align with patterns found in autism." />
        <meta name="twitter:image" content="https://myaspergersquiz.com/og-home.jpg" />
        <meta name="twitter:image:alt" content="MyAspergersQuiz logo and tagline" />
        <meta name="twitter:site" content="@myaspergersquiz" />
        <meta name="twitter:creator" content="@myaspergersquiz" />
        <meta name="twitter:label1" content="Quiz duration" />
        <meta name="twitter:data1" content="5 minutes" />
        <meta name="twitter:label2" content="Privacy" />
        <meta name="twitter:data2" content="Anonymous, science-based" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="author" content="MyAspergersQuiz Team" />
        <meta name="copyright" content="MyAspergersQuiz.com" />
        <meta name="theme-color" content="#4A90A4" />
        <meta name="color-scheme" content="light dark" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="MyAspergersQuiz" />
        <meta name="format-detection" content="telephone=no" />
        {/* Optional: Search engine verification meta tags */}
        <meta name="google-site-verification" content="your-google-site-verification-code-here" />
        <meta name="msvalidate.01" content="your-bing-site-verification-code-here" />
        <meta name="yandex-verification" content="your-yandex-verification-code-here" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        {/* Preloads */}
        <link rel="preload" as="image" href="/myaspergersquiz-logo.png" />
        <link rel="preload" href="/fonts/Inter-var-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        {/* -- Structured Data -- */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: `{
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://myaspergersquiz.com/",
            "name": "MyAspergersQuiz",
            "publisher": {
              "@type": "Organization",
              "name": "MyAspergersQuiz Team",
              "url": "https://myaspergersquiz.com/",
              "logo": {
                "@type": "ImageObject",
                "url": "https://myaspergersquiz.com/myaspergersquiz-logo.png",
                "width": 32,
                "height": 32,
                "caption": "MyAspergersQuiz logo"
              }
            },
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://myaspergersquiz.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }`
        }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: `{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Is this autism quiz free and private?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! The quiz is free, anonymous, and your answers are not stored unless you choose to save your results in your account."
                }
              },
              {
                "@type": "Question",
                "name": "Can I get a full report after the quiz?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You get instant results. You can optionally unlock a detailed report with deeper insight and a downloadable PDF."
                }
              },
              {
                "@type": "Question",
                "name": "How long does the quiz take to complete?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The quiz typically takes about 5 minutes to complete."
                }
              },
              {
                "@type": "Question",
                "name": "Is this quiz suitable for all ages?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, the quiz is designed for individuals aged 16 and older to explore their traits."
                }
              },
              {
                "@type": "Question",
                "name": "Is this quiz accessible for screen readers?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, the quiz and all main features are designed to be accessible for screen readers and keyboard navigation. If you encounter any issues, please let us know."
                }
              },
              {
                "@type": "Question",
                "name": "Do you sell or share my data?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. We do not sell or share your data. Your responses are private and not stored unless you create an account and choose to save your results."
                }
              },
              {
                "@type": "Question",
                "name": "Can I take this quiz on my phone?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely! The quiz is fully mobile-friendly and works on all modern smartphones and tablets."
                }
              }
            ]
          }`
        }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: `{
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://myaspergersquiz.com/" },
              { "@type": "ListItem", "position": 2, "name": "Quiz", "item": "https://myaspergersquiz.com/quiz" },
              { "@type": "ListItem", "position": 3, "name": "Full Report", "item": "https://myaspergersquiz.com/full-report" }
            ]
          }`
        }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: `{
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "MyAspergersQuiz Team",
            "url": "https://myaspergersquiz.com/",
            "logo": {
              "@type": "ImageObject",
              "url": "https://myaspergersquiz.com/myaspergersquiz-logo.png",
              "width": 32,
              "height": 32,
              "caption": "MyAspergersQuiz logo"
            },
            "sameAs": [
              "https://twitter.com/myaspergersquiz"
            ]
          }`
        }} />
      </Head>

      <main
        id="main-content"
        tabIndex={-1}
        className="main-container"
        style={{
          background: "#fff",
          color: "#1a1a1a",
          padding: "2.5rem 2.5rem 2.5rem",
          fontFamily: "'Inter', sans-serif",
          minHeight: "100vh",
          width: "100vw",
          boxSizing: "border-box"
        }}
      >
        <div className="content-box" style={containerStyle}>
          {/* HERO SECTION */}
          <div className="hero-section" style={heroStyle}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.7rem" }}>
              <img
                src="/myaspergersquiz-logo.png"
                alt="MyAspergersQuiz logo"
                width={40}
                height={40}
                style={{
                  borderRadius: "10px",
                  boxShadow: "0 2px 8px rgba(49,117,138,0.10)"
                }}
              />
              <span style={{
                fontSize: "2rem",
                fontWeight: 900,
                color: "#31758a",
                letterSpacing: "0.01em",
                fontFamily: "'Inter', sans-serif"
              }}>
                MyAspergersQuiz
              </span>
            </div>
            <div>
              <span style={{
                fontSize: "1.1rem",
                color: "#4a6e7a",
                fontWeight: 500,
                letterSpacing: "0.01em"
              }}>
                Explore with Ease. Reflect with Confidence.
              </span>
            </div>
          </div>

          {/* Discover Section */}
          <section style={{ textAlign: "center", marginBottom: "0.2rem" }}>
            <h1 style={{
              fontSize: "1.45rem",
              margin: "0 0 0.5rem 0",
              lineHeight: "1.2",
              fontWeight: 800,
              color: "#31758a"
            }}>
              Discover and Understand Your Unique Strengths
            </h1>
            <p style={{
              margin: "0 auto 0.2rem auto",
              fontSize: "1rem",
              color: "#4a6e7a",
              maxWidth: 500,
              lineHeight: "1.5"
            }}>
              Built independently using research inspired by organizations such as the Aspergers Research Institute. Informed by academic research in social, sensory, and behavioral traits.
            </p>
          </section>

          {/* Start Quiz Button */}
          <section style={{ textAlign: "center", marginTop: "0.2rem" }}>
            <a href="/quiz" style={{ textDecoration: "none" }}>
              <button
                className="start-quiz-btn"
                aria-label="Start the Autism Traits Quiz"
                style={{
                  background: "linear-gradient(90deg, #31758a 0%, #4A90A4 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "10px",
                  padding: "0.85rem 2.2rem",
                  fontSize: "1.08rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 2px 12px rgba(49,117,138,0.10)",
                  margin: "0 auto 0.4rem auto",
                  display: "block",
                  transition: "background 0.2s"
                }}
                onMouseOver={e => (e.currentTarget.style.background = "#285e6e")}
                onMouseOut={e => (e.currentTarget.style.background = "linear-gradient(90deg, #31758a 0%, #4A90A4 100%)")}
              >
                Start the Quiz
              </button>
            </a>
          </section>

          {/* Takes only 5 minutes text */}
          <p style={{
            fontSize: "0.93rem",
            color: "#4a6e7a",
            margin: "0.2rem 0 0 0",
            lineHeight: "1.5",
            textAlign: "center"
          }}>
            Takes only 5 minutes. Completely private.
          </p>

          {/* Tip Section */}
          <section
            className="tip-section"
            style={{
              background: "#eaf6fa",
              border: "1px solid #b6d6e2",
              color: "#31758a",
              borderRadius: "10px",
              padding: "1.1rem 2rem",
              margin: "0.9rem auto 0.7rem auto",
              maxWidth: 620,
              display: "flex",
              alignItems: "center",
              gap: "1.2rem",
              fontSize: "1.04rem",
              boxShadow: "0 2px 8px rgba(49,117,138,0.04)",
              justifyContent: "center",
              flexWrap: "wrap"
            }}
          >
            <svg width="26" height="26" fill="#31758a" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10" fill="#eaf6fa" stroke="#31758a" strokeWidth="2"/>
              <path d="M12 8v4m0 4h.01" stroke="#31758a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ flex: 1, minWidth: 200 }}>
              <strong>Tip:</strong> <span style={{ fontWeight: 500 }}>Want to save your full results?</span>
            </span>
            <div style={{ display: "flex", gap: "0.7rem" }}>
              <a href="/signup" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    background: "#31758a",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    padding: "0.5rem 1.4rem",
                    fontWeight: 600,
                    fontSize: "1rem",
                    cursor: "pointer",
                    transition: "background 0.2s"
                  }}
                  onMouseOver={e => (e.currentTarget.style.background = "#24505e")}
                  onMouseOut={e => (e.currentTarget.style.background = "#31758a")}
                >
                  Sign up
                </button>
              </a>
              <a href="/login" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    background: "#fff",
                    color: "#31758a",
                    border: "1.5px solid #31758a",
                    borderRadius: "6px",
                    padding: "0.5rem 1.4rem",
                    fontWeight: 600,
                    fontSize: "1rem",
                    cursor: "pointer",
                    transition: "background 0.2s, color 0.2s"
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.background = "#31758a";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.background = "#fff";
                    e.currentTarget.style.color = "#31758a";
                  }}
                >
                  Log in
                </button>
              </a>
            </div>
          </section>

          {/* What You Get in the Full Report */}
          <section
            className="full-report-section"
            style={{
              background: "#f7fbfd",
              border: "1.5px solid #d2e6ee",
              borderRadius: "14px",
              boxShadow: "0 2px 10px rgba(49,117,138,0.04)",
              padding: "1.5rem 1.5rem 1.2rem 1.5rem",
              margin: "1.2rem auto 0.8rem auto",
              maxWidth: 540,
              textAlign: "left"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "1rem" }}>
              <BarChart3 size={22} color="#31758a" />
              <h2 style={{
                fontSize: "1.15rem",
                fontWeight: 700,
                margin: 0,
                color: "#31758a"
              }}>
                What You Get in the Full Report
              </h2>
            </div>
            <ul style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "1.1rem"
            }}>
              <li style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <FlaskConical size={24} color="#31758a" />
                <span>
                  <strong>Deeper breakdown</strong> of your social, sensory, and behavior traits
                </span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <BarChart3 size={24} color="#31758a" />
                <span>
                  <strong>Personalized insight explanations</strong> unique to your responses
                </span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <Compass size={24} color="#31758a" />
                <span>
                  <strong>Self-awareness prompts</strong> tailored to your top traits
                </span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <FileText size={24} color="#31758a" />
                <span>
                  <strong>Downloadable PDF</strong> to reflect on or share
                </span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <Lock size={24} color="#31758a" />
                <span>
                  <strong>Completely private</strong>—no account needed
                </span>
              </li>
            </ul>
          </section>

          {/* Features grid */}
          <section style={{ textAlign: "center" }}>
            <ul
              className="features-grid"
              style={featuresGridStyle}
            >
              <li style={{
                background: "#f9fbfc",
                border: "1px solid #e4ebf0",
                borderRadius: "10px",
                padding: "0.8rem 0.5rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.3rem",
                boxShadow: "0 1px 4px rgba(49,117,138,0.03)"
              }}>
                <ShieldCheck size={22} color="#31758a" />
                <span style={{ fontWeight: 600, color: "#31758a", fontSize: "0.98rem" }}>Private & Anonymous</span>
                <span style={{ fontSize: "0.89rem", color: "#4a6e7a", textAlign: "center" }}>Your answers are never stored.</span>
              </li>
              <li style={{
                background: "#f9fbfc",
                border: "1px solid #e4ebf0",
                borderRadius: "10px",
                padding: "0.8rem 0.5rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.3rem",
                boxShadow: "0 1px 4px rgba(49,117,138,0.03)"
              }}>
                <Lock size={22} color="#31758a" />
                <span style={{ fontWeight: 600, color: "#31758a", fontSize: "0.98rem" }}>Secure</span>
                <span style={{ fontSize: "0.89rem", color: "#4a6e7a", textAlign: "center" }}>No signup or login required.</span>
              </li>
              <li style={{
                background: "#f9fbfc",
                border: "1px solid #e4ebf0",
                borderRadius: "10px",
                padding: "0.8rem 0.5rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.3rem",
                boxShadow: "0 1px 4px rgba(49,117,138,0.03)"
              }}>
                <Clock size={22} color="#31758a" />
                <span style={{ fontWeight: 600, color: "#31758a", fontSize: "0.98rem" }}>Fast</span>
                <span style={{ fontSize: "0.89rem", color: "#4a6e7a", textAlign: "center" }}>Takes less than 5 minutes.</span>
              </li>
              <li style={{
                background: "#f9fbfc",
                border: "1px solid #e4ebf0",
                borderRadius: "10px",
                padding: "0.8rem 0.5rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.3rem",
                boxShadow: "0 1px 4px rgba(49,117,138,0.03)"
              }}>
                <FlaskConical size={22} color="#31758a" />
                <span style={{ fontWeight: 600, color: "#31758a", fontSize: "0.98rem" }}>Science-Informed</span>
                <span style={{ fontSize: "0.89rem", color: "#4a6e7a", textAlign: "center" }}>Built from peer-reviewed studies.</span>
              </li>
            </ul>
          </section>

          {/* Additional Info Section (Desktop Only) */}
          <section className="desktopOnly" style={{
            background: "#fff",
            border: "1.5px solid #e4ebf0",
            borderRadius: "16px",
            boxShadow: "0 4px 24px rgba(49,117,138,0.07)",
            padding: "clamp(1.2rem, 4vw, 2rem) clamp(0.7rem, 3vw, 1.5rem) clamp(1.7rem, 5vw, 2.2rem)",
            marginBottom: "2.2rem",
            maxWidth: 600,
            width: "95vw",
            marginInline: "auto",
            textAlign: "center",
            boxSizing: "border-box"
          }}>
            {/* ...your box content... */}
          </section>
        </div>
      </main>
    </>
  );
}