// src/pages/results.tsx

import { useEffect, useState, useRef, useMemo } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { calculateScore } from "../utils/calculateScore";
import { getOverallLevel } from "../utils/getOverallLevel";
import { getResultLabel } from "../utils/getResultLabel";
import { db, auth } from "../lib/firebase";
import { questions } from "../questions";
import { flagQuestions } from "../utils/flagQuestions";
import {
  getQuizRunId,
  getQuizAnswers,
} from "../utils/storage";

type Trait = "social" | "sensory" | "routine" | "communication" | "focus";

interface Summary {
  total: number;
  traitScores: Record<Trait, number>;
  flags: number[];
  level: number | null;
}

export default function ResultsPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isPaid, setIsPaid] = useState(false);
  const [quizId, setQuizId] = useState<string | null>(null);
  const [summary, setSummary] = useState<Summary>({
    total: 0,
    traitScores: { social: 0, sensory: 0, routine: 0, communication: 0, focus: 0 },
    flags: [],
    level: null,
  });
  const reportRef = useRef<HTMLDivElement>(null);
  const [faqOpen, setFaqOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // 1) Ensure client-only rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 2) Track current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  // 3) Gating logic: load answers, quizId, compute summary, check payment (updated version)
  useEffect(() => {
    let attempts = 0;
    let cancelled = false;

    const tryLoad = async () => {
      // Prefer sessionId from query string
      const urlSessionId = router.query.sessionId as string | undefined;
      const storedQuizId = urlSessionId ?? getQuizRunId();
      setQuizId(storedQuizId ?? null);

      let answers: number[] | null = null;
      const storedAnswers = getQuizAnswers();
      if (storedAnswers && storedAnswers.length === questions.length) {
        answers = storedAnswers;
      }

      // If no answers and have sessionId and user, try Firestore
      if ((!answers || answers.length !== questions.length) && user && storedQuizId) {
        try {
          const runDoc = await getDoc(doc(db, "quizRuns", storedQuizId));
          if (runDoc.exists()) {
            const runData = runDoc.data();
            if (Array.isArray(runData.answers) && runData.answers.length === questions.length) {
              answers = runData.answers as number[];
            }
          }
        } catch (e) {
          console.error("Error fetching quizRuns from Firestore:", e);
        }
      }

      // Retry if no answers yet
      if ((!storedQuizId || !answers || answers.length === 0) && attempts < 30 && !cancelled) {
        attempts += 1;
        setTimeout(tryLoad, 200);
        return;
      }

      if (!storedQuizId || !answers || answers.length === 0) {
        // After retries, redirect to home
        alert("Could not load your quiz results. Please retake the quiz.");
        router.replace("/");
        return;
      }

      // Compute summary
      const { total, traitScores } = calculateScore(answers);
      const flags = flagQuestions.filter((qId) => {
        const val = answers![qId - 1];
        return typeof val === "number" && val >= 0.67;
      });
      const level = getOverallLevel(total);
      setSummary({ total, traitScores, flags, level });

      // Verify payment if logged in
      if (user && storedQuizId) {
        try {
          const res = await fetch(`/api/verify-payment?uid=${user.uid}&sessionId=${storedQuizId}`);
          const data = await res.json();
          setIsPaid(data.paid === true);
        } catch (err) {
          console.error("Error checking payment status:", err);
          setIsPaid(false);
        }
      }
    };

    if (isClient) {
      tryLoad();
      return () => { cancelled = true; };
    }
  }, [user, isClient, router]);

  // 4) Handle checkout redirect
  const handleCheckout = async () => {
    setLoading(true);
    if (!user) {
      router.replace("/login");
      setLoading(false);
      return;
    }
    const storedQuizId = getQuizRunId();
    if (!storedQuizId) {
      alert("Quiz ID not found. Please retake the quiz.");
      setLoading(false);
      return;
    }
    const response = await fetch("/api/checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        priceId: "price_1RSYJRFSjDoe9Z2nWpm9GqkG",
        sessionId: storedQuizId,
        uid: user.uid,
        userEmail: user.email,
      }),
    });
    const { url } = await response.json();
    setLoading(false);
    if (!url) {
      console.error("Checkout session URL not returned");
      return;
    }
    window.location.href = url;
  };

  // 5) Download PDF via window.print()
  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;
    window.print();
  };

  // 6) Top traits for tip
  const topTraits = useMemo(
    () => Object.entries(summary.traitScores).sort((a, b) => b[1] - a[1]).slice(0, 3),
    [summary.traitScores]
  );

  if (!isClient) {
    return null;
  }

  return (
    <>
      <Head>
        {/* Primary SEO */}
        <title>Your Results | Autism & Asperger’s Trait Quiz – MyAspergersQuiz.com</title>
        <meta name="description" content="See your private, science-based autism and Asperger’s trait summary. Instant results with trait breakdown, insights, and next steps. Discover your unique neurodivergent profile." />
        <meta name="keywords" content="autism results, aspergers results, autism trait quiz, quiz outcome, neurodivergent results, trait analysis, autism assessment, spectrum profile, personalized autism quiz, MyAspergersQuiz.com" />
        <meta name="author" content="MyAspergersQuiz Team" />
        <meta name="copyright" content="MyAspergersQuiz.com" />
        <meta name="subject" content="Personal Autism Quiz Results" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="referrer" content="origin-when-cross-origin" />
        <meta name="theme-color" content="#31758a" />
        <meta httpEquiv="content-language" content="en" />
        <link rel="canonical" href="https://myaspergersquiz.com/results" />
        <link rel="alternate" href="https://myaspergersquiz.com/results" hrefLang="en-au" />
        <link rel="alternate" href="https://myaspergersquiz.com/results" hrefLang="en-us" />
        <link rel="alternate" href="https://myaspergersquiz.com/results" hrefLang="x-default" />

        {/* Open Graph / Facebook / LinkedIn */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Your Results – Autism & Asperger’s Quiz Outcome" />
        <meta property="og:description" content="A private, research-based trait summary. See your personalized spectrum profile instantly and get next steps for self-discovery." />
        <meta property="og:image" content="https://myaspergersquiz.com/og-results.jpg" />
        <meta property="og:image:alt" content="Results summary preview from MyAspergersQuiz.com" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://myaspergersquiz.com/results" />
        <meta property="og:site_name" content="MyAspergersQuiz.com" />
        <meta property="og:locale" content="en_AU" />
        <meta property="article:section" content="Results" />
        <meta property="article:author" content="MyAspergersQuiz Team" />
        <meta property="article:published_time" content="2025-05-25T09:00:00+10:00" />
        <meta property="article:modified_time" content={new Date().toISOString()} />

        {/* Twitter/X */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Your Results – Autism & Asperger’s Quiz Outcome" />
        <meta name="twitter:description" content="Discover your unique neurodivergent strengths and insights. View your results and next steps with MyAspergersQuiz.com." />
        <meta name="twitter:image" content="https://myaspergersquiz.com/og-results.jpg" />
        <meta name="twitter:image:alt" content="Preview of your quiz results from MyAspergersQuiz.com" />
        <meta name="twitter:site" content="@MyAspergersQuiz" />
        <meta name="twitter:creator" content="@MyAspergersQuiz" />

        {/* Brand / PWA */}
        <meta name="apple-mobile-web-app-title" content="MyAspergersQuiz" />
        <meta name="application-name" content="MyAspergersQuiz" />
        <link rel="icon" href="/myaspergersquiz-logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />

        {/* Performance */}
        <link rel="preload" href="/myaspergersquiz-logo.png" as="image" />
        <link rel="preload" href="/fonts/Inter-var-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

        {/* JSON-LD: Article, FAQPage, BreadcrumbList, Organization */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": ["Article", "FAQPage"],
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://myaspergersquiz.com/results"
            },
            "headline": "Your Results – Personalized Autism & Asperger’s Trait Summary",
            "description": "Private summary of your autism spectrum traits, including social, sensory, routine, communication, and focus strengths.",
            "image": "https://myaspergersquiz.com/og-results.jpg",
            "publisher": {
              "@type": "Organization",
              "name": "MyAspergersQuiz.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://myaspergersquiz.com/myaspergersquiz-logo.png"
              }
            },
            "datePublished": "2025-05-25",
            "dateModified": "${new Date().toISOString().split("T")[0]}",
            "about": [
              "autism",
              "Asperger's",
              "trait analysis",
              "neurodiversity",
              "self-assessment",
              "autism spectrum"
            ],
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How accurate is this quiz?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "It’s based on research-backed questions but not a clinical diagnosis. Use it for self-reflection."
                }
              },
              {
                "@type": "Question",
                "name": "Can I share my results?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You’re welcome to share your overall score, and if you purchase the full report, you can share your detailed trait breakdowns."
                }
              },
              {
                "@type": "Question",
                "name": "How quickly will I get my Full Report?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Immediately after purchase, you’ll be redirected to download your PDF in seconds."
                }
              }
            ]
          }
        `}</script>
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://myaspergersquiz.com/" },
              { "@type": "ListItem", "position": 2, "name": "Results", "item": "https://myaspergersquiz.com/results" }
            ]
          }
        `}</script>
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "MyAspergersQuiz",
            "url": "https://myaspergersquiz.com/",
            "logo": {
              "@type": "ImageObject",
              "url": "https://myaspergersquiz.com/myaspergersquiz-logo.png",
              "width": 32,
              "height": 32,
              "caption": "MyAspergersQuiz logo"
            },
            "sameAs": ["https://twitter.com/myaspergersquiz"]
          }
        `}</script>
      </Head>
      <main role="main" aria-label="Quiz Results Summary"
        style={{
          background: "#fdfdfd",
          color: "#1a1a1a",
          padding: "1.5rem 1rem",
          maxWidth: "100%",
          boxSizing: "border-box",
        }}
      >
        <article
          itemScope
          itemType="https://schema.org/Article"
          aria-label="Quiz Results Article"
          style={{ margin: "0 auto", maxWidth: 850 }}
        >
          <header>
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "1rem",
      marginBottom: "1rem",
      flexWrap: "wrap",
    }}
  >
    <img
      src="/myaspergersquiz-logo.png"
      alt="MyAspergersQuiz Logo"
      style={{ height: "50px", width: "50px" }}
    />
    {/* SEO-optimized H1 */}
    <h1 style={{ fontSize: "2.5rem", color: "#31758a", margin: 0 }}>
      Your Autism & Aspergers Quiz Results
    </h1>
  </div>
  {/* SEO-optimized intro paragraph */}
  <p style={{
    fontSize: "1.15rem",
    color: "#3a4a54",
    margin: "0 0 1.5rem 0",
    lineHeight: 1.7,
    textAlign: "center"
  }}>
    Here’s your personalized summary of autism spectrum traits. Review your strengths, challenges, and next steps for self-discovery. Your results are private and based on your quiz responses.
  </p>
</header>
          <section aria-labelledby="personalized-insights">
            <div
              role="region"
              aria-labelledby="personalized-insights"
              style={{
                background: "#ffffff",
                borderRadius: "10px",
                padding: "2rem",
                border: "1px solid #d9e4e8",
                boxShadow: "0 2px 6px rgba(49,117,138,0.05)",
              }}
            >
          {summary.level !== null && (
            <>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.75rem",
                flexWrap: "wrap",
                gap: "0.5rem",
              }}>
                <h2 style={{
                  order: 0,
                  fontSize: "1.5rem",
                  margin: 0,
                  color: "#31758a",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  flexGrow: 1,
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#31758a" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4S8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  How You Fit In
                </h2>
              </div>
              <div
                style={{
                  border: "3px solid #31758a",
                  borderRadius: "50%",
                  width: "120px",
                  height: "120px",
                  margin: "0 auto 1rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#1e6f7d",
                  fontWeight: 700,
                }}
              >
                <div style={{ fontSize: "0.8rem" }}>
                  {(() => {
                    const label = getResultLabel(summary.traitScores);
                    if (typeof label === "string") return label;
                    if (
                      typeof label === "object" &&
                      "label" in label &&
                      typeof label.label === "string"
                    )
                      return label.label;
                    return "";
                  })()}
                </div>
                <div style={{ fontSize: "1.5rem" }}>{summary.total}/40</div>
              </div>
              <p
                style={{
                  fontSize: "0.95rem",
                  color: "#333",
                  lineHeight: 1.5,
                  textAlign: "center",
                  marginBottom: "0.75rem",
                }}
              >
                You fall into the “{summary.level}” category for overall autistic traits.
              </p>
              <p style={{
                fontSize: "0.9rem",
                color: "#555",
                textAlign: "center",
                marginBottom: "2rem",
              }}>
                This score reflects where your overall trait profile falls relative to established norms.
                Use this as a starting point to understand your unique strengths and challenges.
              </p>

              {!isPaid && (
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "#888",
                    textAlign: "center",
                  }}
                >
                  This is a preview. Unlock your full results below.
                </p>
              )}

              {!isPaid && (
                <>
                  {/* ——— Progress Bar (Free Preview) ——— */}
                  <div
                    style={{
                      maxWidth: "90%",
                      margin: "1rem auto 2rem",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        background: "#e0e0e0",
                        borderRadius: "8px",
                        height: "12px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: "25%",
                          background: "#31758a",
                          height: "100%",
                          transition: "width 0.4s ease-in-out",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        marginTop: "0.4rem",
                        fontSize: "0.8rem",
                        color: "#555",
                      }}
                    >
                      Preview (25% complete)
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          {summary.flags.length > 0 && (
            <>
              <h3
                style={{
                  fontSize: "1.5rem",
                  color: "#31758a",
                  fontWeight: "600",
                  marginBottom: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginTop: "1rem",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#31758a"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 9h4v2h-6V7h2v4z" />
                </svg>
                Key Trait Worth Noting

                {/* “Why This Matters” tooltip */}
                <span
                  style={{
                    marginLeft: "0.25rem",
                    fontSize: "1.1rem",
                    color: "#888",
                    cursor: "help",
                    position: "relative",
                  }}
                  title="Why It Matters: Understanding your most prominent trait can guide you toward small habit changes. Unlock the full report for detailed, personalized strategies in all areas."
                >
                  ⓘ
                </span>
              </h3>
              <p
                style={{
                  color: "#1a1a1a",
                  marginBottom: "1.25rem",
                  fontSize: "1rem",
                }}
              >
                Based on your answers, one area stood out most. Discover the rest in
                your full report.
              </p>
              <ul style={{
                listStyle: "none",
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                width: "100%",
                maxWidth: "95%",
              }}>
                {/* Primary flagged trait */}
                <li key={summary.flags[0]} style={{
                  background: "#eef6f8",
                  padding: "0.85rem 1rem",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  borderLeft: "4px solid #31758a",
                  color: "#1e3a42",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                }}>
                  <strong style={{ marginRight: "0.5rem", color: "#31758a" }}>
                    Q{summary.flags[0]}:
                  </strong>
                  {questions.find((q) => q.id === summary.flags[0])?.text}
                </li>
                {/* Second flagged trait */}
                {summary.flags[1] != null && (
                  <li key={summary.flags[1]} style={{
                    background: "#eef6f8",
                    padding: "0.85rem 1rem",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    borderLeft: "4px solid #31758a",
                    color: "#1e3a42",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  }}>
                    <strong style={{ marginRight: "0.5rem", color: "#31758a" }}>
                      Q{summary.flags[1]}:
                    </strong>
                    {questions.find((q) => q.id === summary.flags[1])?.text}
                  </li>
                )}
                {/* Third flagged trait (blurred) */}
                {summary.flags[2] != null && (
                  <li key={summary.flags[2]} style={{
                    background: "#eef6f8",
                    padding: "0.85rem 1rem",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    borderLeft: "4px solid #31758a",
                    color: "#1e3a42",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                    filter: "blur(2px)",
                  }}>
                    <strong style={{ marginRight: "0.5rem", color: "#31758a" }}>
                      Q{summary.flags[2]}:
                    </strong>
                    {questions.find((q) => q.id === summary.flags[2])?.text}
                  </li>
                )}
              </ul>
              {/* Description under third (blurred) key trait */}
              {summary.flags[2] != null && (
                <p style={{
                  fontSize: "0.9rem",
                  color: "#445962",
                  marginTop: "0.5rem",
                  marginLeft: "0.5rem"
                }}>
                  Each flagged trait represents a core strength or challenge in how you navigate the world.
                  By focusing on these dimensions—social, sensory, routine, communication, and focus—you can
                  discover strategies that amplify your strengths and address areas of difficulty. These
                  insights pave the way for more effective routines, clearer communication, and an overall
                  better understanding of yourself.
                </p>
              )}
              <p
                style={{
                  marginTop: "1.5rem",
                  color: "#445962",
                  fontSize: "0.95rem",
                  marginBottom: "2rem",
                }}
              >
                You also show tendencies in {summary.flags.length - 1} other areas.
                Unlock your full report to see them all.
              </p>
            </>
          )}

          {isPaid && (
            <div style={{ marginTop: "0" }}>
              <h3
                style={{
                  fontSize: "1.5rem",
                  marginBottom: "1.5rem",
                  color: "#31758a",
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#31758a"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 17h3v-7H3v7zm5 0h3V7H8v10zm5 0h3v-4h-3v4zm5 0h3v-2h-3v2z" />
                </svg>
                Trait Levels at a Glance
              </h3>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "1.5rem",
                }}
              >
                {(Object.entries(summary.traitScores) as [Trait, number][]).map(
                  ([trait, score]) => {
                    const percentage = Math.round((score / 8) * 100);
                    return (
                      <div
                        key={trait}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <svg width="80" height="80" viewBox="0 0 36 36">
                          <path
                            stroke="#e6f0f3"
                            strokeWidth="3"
                            fill="none"
                            d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                            stroke="#31758a"
                            strokeWidth="1"
                            fill="none"
                            strokeDasharray={`${percentage}, 100`}
                            d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <text
                            x="18"
                            y="20.35"
                            fill="#000"
                            fontSize="4"
                            textAnchor="middle"
                          >
                            {percentage}%
                          </text>
                        </svg>
                        <span
                          style={{
                            marginTop: "0.5rem",
                            fontSize: "1rem",
                            color: "#1a1a1a",
                            fontWeight: 500,
                          }}
                        >
                          {trait.charAt(0).toUpperCase() + trait.slice(1)}
                        </span>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          )}

          {isPaid && quizId && (
            <div style={{ marginTop: "1rem" }}>
              <button
                onClick={() => router.push(`/full-report?sessionId=${quizId}`)}
                style={{
                  width: "100%",
                  padding: "0.75rem 1.5rem",
                  backgroundColor: "#31758a",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                }}
              >
                View Full Report
              </button>
            </div>
          )}

          {/* Mini‐Tip section for free users */}
          {!isPaid && (
            <>
              <div style={{ marginTop: "1rem", marginBottom: "2rem" }}>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    color: "#31758a",
                    fontWeight: "600",
                    marginBottom: "1rem",
                    textAlign: "left",
                  }}
                >
                  Quick Tip for{" "}
                  {topTraits[0]?.[0].charAt(0).toUpperCase() + topTraits[0]?.[0].slice(1)}
                </h3>
                <p style={{ color: "#1a1a1a", fontSize: "1rem", marginBottom: "0.5rem" }}>
                  {(() => {
                    const trait = topTraits[0]?.[0];
                    if (trait === "routine")
                      return "Schedule a 5-minute transition buffer between tasks to reduce stress when plans change.";
                    if (trait === "social")
                      return "Take brief breaks in social settings to help recharge when overwhelmed.";
                    if (trait === "sensory")
                      return "Use noise-cancelling headphones in loud environments to protect sensory comfort.";
                    if (trait === "communication")
                      return "Write down key points before conversations to keep track of what you want to say.";
                    if (trait === "focus")
                      return "Use a timer to break tasks into shorter intervals with mini-breaks in between.";
                    return "";
                  })()}
                </p>
                <p style={{ color: "#445962", fontSize: "0.9rem" }}>
                  Unlock your full report to get 4 more personalized tips—one for each trait.
                </p>
                <div style={{
                  background: "#f9f9f9",
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  border: "1px solid #d9e4e8",
                  fontSize: "0.9rem",
                  color: "#333",
                  marginTop: "1rem",
                }}>
                  <strong>Another Tip:</strong> Consider jotting down moments when you notice your top trait in action.
                  Tracking over a week can reveal patterns that help you tailor daily routines.
                </div>
              </div>
    <section
      style={{
        background: "linear-gradient(260deg,rgb(18, 64, 73) 0%,rgb(78, 152, 168) 100%)",
        borderRadius: "22px",
        boxShadow: "0 4px 24px rgba(49,117,138,0.13)",
        padding: "2.2rem 1.5rem 2rem 1.5rem",
        margin: "2.5rem auto 2rem auto",
        maxWidth: 800,
        textAlign: "center",
        color: "#fff",
        position: "relative"
      }}
    >
      {/* Lock Icon */}
<div style={{ marginBottom: "1.2rem" }}>
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="24" fill="#fff" fillOpacity="0.13"/>
    <path
      d="M32 22V18a8 8 0 1 0-16 0v4"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <rect
      x="14"
      y="22"
      width="20"
      height="14"
      rx="4"
      stroke="#fff"
      strokeWidth="2"
      fill="none"
    />
    <circle cx="24" cy="29" r="2" fill="#fff"/>
  </svg>
</div>
    {/* Personalization */}
      <div style={{
        color: "#eaf4fa",
        fontWeight: 1000,
        fontSize: "1.08rem",
        margin: "0.2rem 0 0.5rem 0"
      }}>
       Limited time offer! See your detailed breakdown for <b>Social</b> and all other traits in your full report.
      </div>
<div
  style={{
    display: "inline-block",
    padding: "0.5rem 1.2rem",
    border: "2px solidrgba(37, 55, 65, 0.6)",
    borderRadius: "10px",
    background: "rgb(255, 255, 255)",
    color: "#2a7b8c",
    fontWeight: 700,
    fontSize: "1.08rem",
    marginBottom: "1.1rem",
    marginTop: "0.2rem",
    width: "100%",
    boxShadow: "0 1px 6px rgba(38, 58, 64, 0.65)"
  }}
>
  Limited-time: Unlock your full report for{" "}
  <span style={{ textDecoration: "line-through", color: "#b0b0b0", fontWeight: 500 }}>$19.99</span>{" "}
  <span style={{ color: "#2a7b8c", fontWeight: 900 }}>$9.99</span>
</div>

      {/* Value Proposition Checklist */}
      <div
        style={{
          background: "rgba(255,255,255,0.13)",
          border: "1.5px solid rgba(255,255,255,0.18)",
          borderRadius: "16px",
          boxShadow: "0 2px 12px rgba(49,117,138,0.10)",
          padding: "1.1rem 1.1rem 0.7rem 1.1rem",
          margin: "0 auto 1.2rem auto",
          maxWidth: 800,
          color: "#fff",
          fontWeight: 600,
          fontSize: "1.08rem",
          backdropFilter: "blur(2px)"
        }}
      >
        <div style={{ marginBottom: "0.7rem", fontWeight: 800, fontSize: "1.13rem", color: "#fff" }}>
          What’s in your Full Report?
        </div>
        <ul style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          color: "#eaf4fa",
          fontWeight: 500,
          fontSize: "1rem",
          textAlign: "left",
          lineHeight: 1.7
        }}>
          <li style={{ marginBottom: 6, display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="18" height="18" fill="#2ad48c" viewBox="0 0 24 24"><path d="M20.285 6.709a1 1 0 0 0-1.414-1.418l-9.192 9.193-4.242-4.243a1 1 0 1 0-1.415 1.415l4.95 4.95a1 1 0 0 0 1.414 0l9.899-9.897z"/></svg>
            All 5 trait breakdowns (Social, Sensory, Routine, Communication, Focus)
          </li>
          <li style={{ marginBottom: 6, display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="18" height="18" fill="#2ad48c" viewBox="0 0 24 24"><path d="M20.285 6.709a1 1 0 0 0-1.414-1.418l-9.192 9.193-4.242-4.243a1 1 0 1 0-1.415 1.415l4.95 4.95a1 1 0 0 0 1.414 0l9.899-9.897z"/></svg>
            Personalized strategies for each area
          </li>
          <li style={{ marginBottom: 6, display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="18" height="18" fill="#2ad48c" viewBox="0 0 24 24"><path d="M20.285 6.709a1 1 0 0 0-1.414-1.418l-9.192 9.193-4.242-4.243a1 1 0 1 0-1.415 1.415l4.95 4.95a1 1 0 0 0 1.414 0l9.899-9.897z"/></svg>
            Downloadable PDF for your records
          </li>
          <li style={{ marginBottom: 6, display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="18" height="18" fill="#2ad48c" viewBox="0 0 24 24"><path d="M20.285 6.709a1 1 0 0 0-1.414-1.418l-9.192 9.193-4.242-4.243a1 1 0 1 0-1.415 1.415l4.95 4.95a1 1 0 0 0 1.414 0l9.899-9.897z"/></svg>
            Lifetime access to your results
          </li>
          <li style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="18" height="18" fill="#2ad48c" viewBox="0 0 24 24"><path d="M20.285 6.709a1 1 0 0 0-1.414-1.418l-9.192 9.193-4.242-4.243a1 1 0 1 0-1.415 1.415l4.95 4.95a1 1 0 0 0 1.414 0l9.899-9.897z"/></svg>
            Shareable summary for your own use
          </li>
        </ul>
      </div>

      {/* Visual Comparison Table */}
      <div style={{
        background: "rgba(255,255,255,0.13)",
        border: "1.5px solid rgba(255,255,255,0.18)",
        borderRadius: "16px",
        boxShadow: "0 2px 12px rgba(49,117,138,0.10)",
        margin: "0 auto 1.5rem auto",
        maxWidth: 800,
        overflow: "hidden",
        backdropFilter: "blur(2px)"
      }}>
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "0.98rem",
          color: "#fff"
        }}>
          <thead>
            <tr style={{ background: "rgba(234,244,250,0.10)" }}>
              <th style={{ padding: "0.7rem", fontWeight: 700, letterSpacing: "0.01em" }}></th>
              <th style={{ padding: "0.7rem", fontWeight: 700, letterSpacing: "0.01em" }}>Free</th>
              <th style={{ padding: "0.7rem", fontWeight: 700, letterSpacing: "0.01em" }}>Full Report</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "0.6rem", textAlign: "left" }}>Overall Score</td>
              <td style={{ textAlign: "center" }}>
                <svg width="18" height="18" fill="#2ad48c" viewBox="0 0 24 24"><path d="M20.285 6.709a1 1 0 0 0-1.414-1.418l-9.192 9.193-4.242-4.243a1 1 0 1 0-1.415 1.415l4.95 4.95a1 1 0 0 0 1.414 0l9.899-9.897z"/></svg>
              </td>
              <td style={{ textAlign: "center" }}>
                <svg width="18" height="18" fill="#2ad48c" viewBox="0 0 24 24"><path d="M20.285 6.709a1 1 0 0 0-1.414-1.418l-9.192 9.193-4.242-4.243a1 1 0 1 0-1.415 1.415l4.95 4.95a1 1 0 0 0 1.414 0l9.899-9.897z"/></svg>
              </td>
            </tr>
            <tr style={{ background: "rgba(255,255,255,0.06)" }}>
              <td style={{ padding: "0.6rem", textAlign: "left" }}>Trait Breakdown</td>
              <td style={{ textAlign: "center" }}>
                <svg width="18" height="18" fill="#ff6b6b" viewBox="0 0 24 24"><path d="M18.364 5.636a1 1 0 0 0-1.414 0L12 10.586 7.05 5.636a1 1 0 1 0-1.414 1.414L10.586 12l-4.95 4.95a1 1 0 1 0 1.414 1.414L12 13.414l4.95 4.95a1 1 0 0 0 1.414-1.414L13.414 12l4.95-4.95a1 1 0 0 0 0-1.414z"/></svg>
              </td>
              <td style={{ textAlign: "center" }}>
                <svg width="18" height="18" fill="#2ad48c" viewBox="0 0 24 24"><path d="M20.285 6.709a1 1 0 0 0-1.414-1.418l-9.192 9.193-4.242-4.243a1 1 0 1 0-1.415 1.415l4.95 4.95a1 1 0 0 0 1.414 0l9.899-9.897z"/></svg>
              </td>
            </tr>
            <tr>
              <td style={{ padding: "0.6rem", textAlign: "left" }}>Personalized Strategies</td>
              <td style={{ textAlign: "center" }}>
                <svg width="18" height="18" fill="#ff6b6b" viewBox="0 0 24 24"><path d="M18.364 5.636a1 1 0 0 0-1.414 0L12 10.586 7.05 5.636a1 1 0 1 0-1.414 1.414L10.586 12l-4.95 4.95a1 1 0 1 0 1.414 1.414L12 13.414l4.95 4.95a1 1 0 0 0 1.414-1.414L13.414 12l4.95-4.95a1 1 0 0 0 0-1.414z"/></svg>
              </td>
              <td style={{ textAlign: "center" }}>
                <svg width="18" height="18" fill="#2ad48c" viewBox="0 0 24 24"><path d="M20.285 6.709a1 1 0 0 0-1.414-1.418l-9.192 9.193-4.242-4.243a1 1 0 1 0-1.415 1.415l4.95 4.95a1 1 0 0 0 1.414 0l9.899-9.897z"/></svg>
              </td>
            </tr>
            <tr style={{ background: "rgba(255,255,255,0.06)" }}>
              <td style={{ padding: "0.6rem", textAlign: "left" }}>Downloadable PDF</td>
              <td style={{ textAlign: "center" }}>
                <svg width="18" height="18" fill="#ff6b6b" viewBox="0 0 24 24"><path d="M18.364 5.636a1 1 0 0 0-1.414 0L12 10.586 7.05 5.636a1 1 0 1 0-1.414 1.414L10.586 12l-4.95 4.95a1 1 0 1 0 1.414 1.414L12 13.414l4.95 4.95a1 1 0 0 0 1.414-1.414L13.414 12l4.95-4.95a1 1 0 0 0 0-1.414z"/></svg>
              </td>
              <td style={{ textAlign: "center" }}>
                <svg width="18" height="18" fill="#2ad48c" viewBox="0 0 24 24"><path d="M20.285 6.709a1 1 0 0 0-1.414-1.418l-9.192 9.193-4.242-4.243a1 1 0 1 0-1.415 1.415l4.95 4.95a1 1 0 0 0 1.414 0l9.899-9.897z"/></svg>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* CTA Button */}
      <button
        onClick={handleCheckout}
        disabled={loading}
        style={{
          width: "100%",
          padding: "1rem",
          background: "#eaf4fa",
          border: "none",
          borderRadius: "12px",
          color: "#31758a",
          fontSize: "1.13rem",
          cursor: loading ? "not-allowed" : "pointer",
          fontWeight: "700",
          margin: "0 0 1.2rem 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.6rem",
          boxShadow: "0 2px 8px rgba(49,117,138,0.06)",
          opacity: loading ? 0.7 : 1,
        }}
      >
        <svg width="24" height="24" fill="none" stroke="#31758a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect x="6" y="11" width="12" height="8" rx="3" />
    <path d="M8 11V7a4 4 0 1 1 8 0v4" />
    <circle cx="12" cy="15" r="1" />
  </svg>
        {loading ? "Redirecting..." : "Unlock Full Report – $9.99"}
      </button>

      {/* Privacy */}
      <div style={{
        color: "#eaf4fa",
        fontSize: "0.97rem",
        fontStyle: "italic",
        opacity: 0.85,
        marginTop: "1.2rem"
      }}>
        Your answers are 100% private—only you can access them.
        <br />
        <span style={{ fontSize: "0.93rem", color: "#eaf4fa", opacity: 0.8 }}>
          7-day money-back guarantee.
        </span>
      </div>

      {/* Contact/Support */}
      <div style={{ textAlign: "center", marginTop: "1.2rem" }}>
        <a href="/contact" style={{ color: "#eaf4fa", fontWeight: 600, textDecoration: "underline", fontSize: "0.97rem" }}>
          Questions? Contact us
        </a>
      </div>
    </section>

              {/* “Did You Know?” Factoid */}
              <div
                style={{
                  background: "#eef6f8",
                  padding: "1rem",
                  borderRadius: "8px",
                  marginBottom: "2rem",
                  fontSize: "0.9rem",
                  color: "#333",
                  border: "1px solid #d1e6eb",
                }}
              >
                <strong>Did You Know?</strong> Approximately 1 in 100 adults on the autism spectrum
                experience heightened sensory sensitivity.{" "}
                <span style={{ fontStyle: "italic", color: "#555" }}>
                  (Source: National Autism Center)
                </span>
              </div>

              <div style={{ maxWidth: "100%", margin: "1rem auto 2rem" }}>
                {/* FAQ Dropdown Header */}
                <div
                  onClick={() => setFaqOpen(!faqOpen)}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "#ffffff",
                    padding: "0.75rem 1rem",
                    borderRadius: "8px 8px",
                    border: "1px solid #31758a",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    color: "#31758a",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.11)",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.background = "#f0f8fb")}
                  onMouseOut={(e) => (e.currentTarget.style.background = "#ffffff")}
                >
                  <span>Frequently Asked Questions</span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#31758a"
                      viewBox="0 0 24 24"
                      style={{
                        transform: faqOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s ease-in-out",
                      }}
                    >
                      <path d="M7 10l5 5 5-5H7z" />
                    </svg>
                  </span>
                </div>
                {faqOpen && (
                  <div
                    style={{
                      background: "#f0f8fb",
                      border: "1px solid #31758a",
                      borderTop: "none",
                      borderRadius: "0 0 8px 8px",
                      padding: "1rem",
                      fontSize: "0.85rem",
                      color: "#444",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    }}
                  >
                    <p style={{ margin: "0.5rem 0" }}>
                      <strong>Q:</strong> How accurate is this quiz? <br />
                      <strong>A:</strong> It’s based on research-backed questions but not a clinical diagnosis. Use it to explore your unique patterns.
                    </p>
                    <p style={{ margin: "0.5rem 0" }}>
                      <strong>Q:</strong> Can I share my results? <br />
                      <strong>A:</strong> You’re welcome to share your overall score (e.g., “25/40”), and if you purchase the full report, you can share your detailed trait breakdowns as well.
                    </p>
                    <p style={{ margin: "0.5rem 0 0" }}>
                      <strong>Q:</strong> How quickly will I get my Full Report? <br />
                      <strong>A:</strong> Immediately after purchase, you’ll be redirected to download your PDF in seconds.
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
            </div>
          </section>

          {/* --- SEO/Info Sections --- */}
          <section style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <h2 style={{
              fontSize: "1.3rem",
              margin: "0 0 0.5rem 0",
              lineHeight: "1.2",
              fontWeight: 700,
              color: "#31758a"
            }}>
              Understanding Your Aspergers & Autism Spectrum Quiz Results
            </h2>
            <p style={{
              margin: "0 auto 0.2rem auto",
              fontSize: "1rem",
              color: "#4a6e7a",
              maxWidth: 500,
              lineHeight: "1.5"
            }}>
              Your results reflect your responses to questions about social, sensory, and behavioral traits commonly associated with autism and Asperger’s. This personalized summary is based on research-backed criteria and is designed to help you better understand your unique neurodivergent profile.
            </p>
          </section>
          {/* ...add more <section> blocks here as needed... */}

        </article>
      </main>
    </>
  );
}
