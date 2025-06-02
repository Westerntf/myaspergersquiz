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
        style={{
          background: "#fdfdfd",
          color: "#1a1a1a",
          padding: "2rem 1rem",
          fontFamily: "'Inter', sans-serif",
          width: "100vw",
          boxSizing: "border-box"
        }}
      >
        <div style={{
          backgroundColor: "#4A90A4",
          border: "1px solid #4A90A4",
          color: "#fff",
          padding: "1rem 1.25rem",
          borderRadius: "8px",
          fontSize: "0.9rem",
          lineHeight: "1.5",
          marginBottom: "2rem",
          maxWidth: "640px",
          marginLeft: "auto",
          marginRight: "auto",
          boxSizing: "border-box"
        }}>
          <strong style={{ color: "#fff", fontWeight: "600" }}>Important:</strong> To save your full results and access them later, you'll need to create a free account.
          <br />
          Just <a href="/signup" style={{ color: "#fff", textDecoration: "underline", fontWeight: 500 }}>sign up</a> before you take the quiz or <a href="/login" style={{ color: "#fff", textDecoration: "underline", fontWeight: 500 }}>log in</a> if you already have an account. Your results will be saved privately to your profile.
        </div>
  {/* Unified Intro, What to Expect, and Full Report sections in a single container */}
  <div style={{
    backgroundColor: "#4A90A4",
    border: "1px solid #4A90A4",
    borderRadius: "10px",
    padding: "1.5rem",
    marginTop: "2rem",
    marginBottom: "2rem",
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
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
          color: "#fff",
          fontFamily: "'Inter', sans-serif",
          display: "inline-block",
          verticalAlign: "middle"
        }}>
          MyAspergersQuiz
        </span>
      </div>
      <p style={{ fontSize: "0.9rem", color: "#fff", margin: "0 0 0.75rem 0", lineHeight: "1.5" }}>Explore with Ease. Reflect with Confidence.</p>
      {/* Visually hidden breadcrumb navigation for SEO & accessibility */}
      <nav aria-label="Breadcrumb" style={{ position: "absolute", left: "-10000px", top: "auto", width: "1px", height: "1px", overflow: "hidden" }}>
        <ol>
          <li><a href="/">Home</a></li>
          <li><a href="/quiz">Quiz</a></li>
          <li><a href="/full-report">Full Report</a></li>
        </ol>
      </nav>
    </div>
    <div style={{ textAlign: "center", marginTop: "1.25rem" }}>
      <h1 style={{
        fontSize: "1.6rem",
        margin: "0.25rem 0 1rem",
        lineHeight: "1.3",
        fontWeight: 700,
        color: "#fff"
      }}>
        Discover and Understand <br /> Your Unique Strengths
      </h1>
      <p style={{ marginBottom: "0.75rem", fontSize: "0.9rem", lineHeight: "1.5", color: "#fff" }}>
        Built independently using research inspired by organizations such as the Aspergers Research Institute.
        Informed by academic research in social, sensory, and behavioral traits.
      </p>
    </div>
    {/* What to Expect Section */}
    <div style={{ marginTop: "2rem", textAlign: "center" }}>
      <h2 style={{ fontSize: "1.3rem", fontWeight: "bold", marginBottom: "1.5rem", color: "#fff" }}>What to Expect</h2>
      <p style={{
        fontSize: "0.9rem",
        color: "#fff",
        textAlign: "center",
        maxWidth: "500px",
        margin: "0 auto 0.75rem auto",
        lineHeight: "1.5"
      }}>
        Receive a personalized summary designed to give you clarity and confidence. <br />
        Discover how your traits align with patterns in social, sensory, and behavioral dimensions.
      </p>
      <a href="/quiz" style={{ textDecoration: "none" }}>
        <button
          aria-label="Start the Autism Traits Quiz"
          style={{
            background: "#fff",
            color: "#4A90A4",
            border: "2px solid #4A90A4",
            borderRadius: "6px",
            padding: "1rem 2.4rem",
            width: "100%",
            maxWidth: "280px",
            margin: "0 auto",
            fontSize: "1rem",
            cursor: "pointer",
            boxShadow: "none",
            transition: "all 0.3s ease",
            marginTop: "1rem",
            marginBottom: "1.25rem",
            display: "block",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#4A90A4';
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(74, 144, 164, 0.4)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = '#fff';
            e.currentTarget.style.color = '#4A90A4';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Start the Quiz
        </button>
      </a>
      <p style={{ fontSize: "0.9rem", color: "#fff", marginTop: "0.4rem", lineHeight: "1.5" }}>
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
        color: "#fff",
        fontSize: "1rem"
      }}>
        <li style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.4rem",
          color: "#fff"
        }}>
          <div style={{
            backgroundColor: "transparent",
            padding: "0.5rem",
            borderRadius: "50%",
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <ShieldCheck size={24} color="#fff" />
          </div>
          <span style={{ fontSize: "0.9rem", marginTop: "0.25rem", color: "#fff" }}>Private & Anonymous</span>
          <span style={{ fontSize: "0.8rem", color: "#eaf6f8", marginTop: "0.25rem" }}>Your answers are never stored.</span>
        </li>
        <li style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.4rem",
          color: "#fff"
        }}>
          <div style={{
            backgroundColor: "transparent",
            padding: "0.5rem",
            borderRadius: "50%",
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <Lock size={24} color="#fff" />
          </div>
          <span style={{ fontSize: "0.9rem", marginTop: "0.25rem", color: "#fff" }}>Secure</span>
          <span style={{ fontSize: "0.8rem", color: "#eaf6f8", marginTop: "0.25rem" }}>No signup or login required.</span>
        </li>
        <li style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.4rem",
          color: "#fff"
        }}>
          <div style={{
            backgroundColor: "transparent",
            padding: "0.5rem",
            borderRadius: "50%",
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <Clock size={24} color="#fff" />
          </div>
          <span style={{ fontSize: "0.9rem", marginTop: "0.25rem", color: "#fff" }}>Fast</span>
          <span style={{ fontSize: "0.8rem", color: "#eaf6f8", marginTop: "0.25rem" }}>Takes less than 5 minutes.</span>
        </li>
        <li style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.4rem",
          color: "#fff"
        }}>
          <div style={{
            backgroundColor: "transparent",
            padding: "0.5rem",
            borderRadius: "50%",
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <FlaskConical size={24} color="#fff" />
          </div>
          <span style={{ fontSize: "0.9rem", marginTop: "0.25rem", color: "#fff" }}>Science-Informed</span>
          <span style={{ fontSize: "0.8rem", color: "#eaf6f8", marginTop: "0.25rem" }}>Built from peer-reviewed studies.</span>
        </li>
      </ul>
    </div>
    {/* Full Report Section */}
    <div style={{ marginTop: "2rem", textAlign: "center" }}>
      <h2 style={{ fontSize: "1.3rem", fontWeight: "bold", marginTop: "2rem", color: "#fff" }}>
        What You Get in the Full Report
      </h2>
      <p style={{ fontSize: "0.9rem", color: "#fff", marginBottom: "1rem", textAlign: "center", lineHeight: "1.5" }}>
        Your free results offer an instant overview but with the optional paid full report, you'll receive:
      </p>
      <ul style={{ listStyle: "none", padding: 0, marginTop: "1rem", marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <li style={{ display: "flex", alignItems: "center", gap: "0.6rem", justifyContent: "center", color: "#fff" }}>
          <FlaskConical size={20} color="#fff" />
          <span style={{ color: "#fff" }}>A deeper breakdown of your social, sensory, and behavior traits</span>
        </li>
        <li style={{ display: "flex", alignItems: "center", gap: "0.6rem", justifyContent: "center", color: "#fff" }}>
          <BarChart3 size={20} color="#fff" />
          <span style={{ color: "#fff" }}>Personalized insight explanations unique to your responses</span>
        </li>
        <li style={{ display: "flex", alignItems: "center", gap: "0.6rem", justifyContent: "center", color: "#fff" }}>
          <Compass size={20} color="#fff" />
          <span style={{ color: "#fff" }}>Self-awareness prompts tailored to your top traits</span>
        </li>
        <li style={{ display: "flex", alignItems: "center", gap: "0.6rem", justifyContent: "center", color: "#fff" }}>
          <FileText size={20} color="#fff" />
          <span style={{ color: "#fff" }}>A downloadable PDF to reflect on or share</span>
        </li>
        <li style={{ display: "flex", alignItems: "center", gap: "0.6rem", justifyContent: "center", color: "#fff" }}>
          <Lock size={20} color="#fff" />
          <span style={{ color: "#fff" }}>All content remains completely private—no account needed</span>
        </li>
      </ul>
    </div>
  </div>
      </main>
    </>
  );
}