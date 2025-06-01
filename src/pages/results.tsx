// src/pages/results.tsx

import { useEffect, useState, useRef, useMemo } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";
import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { calculateScore } from "../utils/calculateScore";
import { getOverallLevel } from "../utils/getOverallLevel";
import { getResultLabel } from "../utils/getResultLabel";
import { loadFromStorage } from "../utils/storage";
import { db, auth } from "../lib/firebase"; // adjust paths if necessary
import { questions } from "../questions";
import { flagQuestions } from "../utils/flagQuestions";

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

  // 3) Gating logic: load answers, quizId, compute summary, check payment
  useEffect(() => {
    const answers = loadFromStorage<number[]>("mq_answers") as number[] | null;
    const storedQuizId = localStorage.getItem("mq_quiz_id");
    setQuizId(storedQuizId);

    if (answers === null || storedQuizId === null) {
      setTimeout(() => {
        const checkAnswers = loadFromStorage<number[]>("mq_answers") as number[] | null;
        const checkQuizId = localStorage.getItem("mq_quiz_id");
        if (checkAnswers === null || checkQuizId === null) {
          router.replace("/");
        }
      }, 100);
      return;
    }

    if (
      !answers ||
      !Array.isArray(answers) ||
      answers.length === 0 ||
      !storedQuizId ||
      typeof storedQuizId !== "string"
    ) {
      console.warn("Invalid quiz state: redirecting to homepage");
      router.replace("/");
      return;
    }

    // Compute summary
    const { total, traitScores } = calculateScore(answers as any);
    const flags = flagQuestions.filter((qId) => {
      const val = answers[qId - 1];
      return typeof val === "number" && val >= 0.67;
    });
    const level = getOverallLevel(total);
    setSummary({ total, traitScores, flags, level });

    // If logged in, verify payment
    if (user && storedQuizId) {
      fetch(`/api/verify-payment?uid=${user.uid}&sessionId=${storedQuizId}`)
        .then((res) => res.json())
        .then((data) => {
          setIsPaid(data.paid === true);
        })
        .catch((err) => {
          console.error("Error checking payment status:", err);
          setIsPaid(false);
        });
    }
  }, [user, router]);

  // 4) Handle checkout redirect
  const handleCheckout = async () => {
    if (!user) {
      router.replace("/login");
      return;
    }
    const storedQuizId = localStorage.getItem("mq_quiz_id");
    if (!storedQuizId) {
      alert("Quiz ID not found. Please retake the quiz.");
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
    const { sessionId: stripeSessionId } = await response.json();
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
    if (stripeSessionId) {
      await stripe!.redirectToCheckout({ sessionId: stripeSessionId });
    }
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
        <title>Results – Autism Traits Summary | MyAspergersQuiz.com</title>
        <meta
          name="description"
          content="See your personalized breakdown of social, sensory, and behavioral traits."
        />
        <meta property="og:title" content="Your Autism Traits Results – See Your Summary" />
        <meta
          property="og:description"
          content="A private, science-informed summary of your unique traits."
        />
        <meta property="og:image" content="https://myaspergersquiz.com/og-results.jpg" />
        <meta property="og:url" content="https://myaspergersquiz.com/results" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Your Autism Traits Results – See Your Summary" />
        <meta
          name="twitter:description"
          content="Explore your traits with a private, science-based quiz."
        />
        <meta name="twitter:image" content="https://myaspergersquiz.com/og-results.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": "https://myaspergersquiz.com/results",
              },
              headline: "Your Autism Traits Results – See Your Summary",
              description:
                "A professional and respectful review of your unique communication, sensory, and behavioral patterns.",
              image: "https://myaspergersquiz.com/og-results.jpg",
              author: {
                "@type": "Organization",
                name: "MyAspergersQuiz.com",
              },
              publisher: {
                "@type": "Organization",
                name: "MyAspergersQuiz.com",
                logo: {
                  "@type": "ImageObject",
                  url: "https://myaspergersquiz.com/logo.png",
                },
              },
              datePublished: "2025-05-25",
              dateModified: new Date().toISOString().split("T")[0],
            }),
          }}
        />
        <link rel="canonical" href="https://myaspergersquiz.com/results" />
      </Head>

      <main
        style={{
          background: "#fdfdfd",
          color: "#1a1a1a",
          padding: "1.5rem 1rem",
          maxWidth: "100%",
          boxSizing: "border-box",
        }}
      >
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
          <h1 style={{ fontSize: "2.5rem", color: "#31758a", margin: 0 }}>
            Your Quiz Results
          </h1>
        </div>

        <div
          role="region"
          aria-labelledby="personalized-insights"
          style={{
            background: "#ffffff",
            borderRadius: "10px",
            padding: "2rem",
            border: "1px solid #d9e4e8",
            boxShadow: "0 2px 6px rgba(49, 117, 138, 0.05)",
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
                <a
                  href="https://twitter.com/intent/tweet?text=I%20just%20tried%20the%20MyAspergersQuiz%20free%20preview%20—%20see%20your%20own%20results%20at%20https%3A%2F%2Fmyaspergersquiz.com%2Fquiz"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    backgroundColor: "#1DA1F2",
                    color: "#fff",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "6px",
                    textDecoration: "none",
                    fontSize: "0.75rem",
                    whiteSpace: "nowrap",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    order: 1,
                    flexShrink: 0,
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#fff" viewBox="0 0 24 24">
                    <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.608 1.794-1.574 2.163-2.723-.95.555-2.005.959-3.127 1.184-.897-.959-2.178-1.559-3.594-1.559-2.723 0-4.928 2.205-4.928 4.917 0 .39.045.765.127 1.124-4.091-.205-7.719-2.165-10.148-5.144-.423.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.247-2.228-.616v.061c0 2.385 1.697 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.917-.086.631 1.953 2.445 3.377 4.604 3.416-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 14-7.496 14-13.986 0-.21 0-.42-.015-.63.961-.695 1.8-1.562 2.46-2.549l-.047-.02z"/>
                  </svg>
                  Share on Twitter
                </a>
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



              {/* Unlock Full Report CTA */}
              <div
                style={{
                  background: "linear-gradient(to right, #337d91, #275b6f)",
                  color: "#fff",
                  padding: "2rem",
                  borderRadius: "12px",
                  marginBottom: "2rem",
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
                  width: "100%",
                  maxWidth: "100%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <div
                    style={{
                      background: "#fff",
                      borderRadius: "50%",
                      padding: "0.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "3rem",
                      height: "3rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="#337d91"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17a2 2 0 1 0 .001-3.999A2 2 0 0 0 12 17zm6-8h-1V7a5 5 0 0 0-10 0h2a3 3 0 1 1 6 0v2H6c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2z" />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: "1.75rem", fontWeight: "700", margin: 0 }}>
                    Unlock Your Full Report for $9.99
                  </h3>
                  <p
                    style={{
                      fontSize: "1.05rem",
                      color: "#d7f5f7",
                      maxWidth: "90%",
                      lineHeight: 1.6,
                      textAlign: "center",
                    }}
                  >
                    Get personalized insights and detailed strategies for all 5 traits — Social,
                    Sensory, Routine, Communication, and Focus.
                    Each section includes expert-backed interpretations, tailored tips,
                    and a downloadable PDF.
                  </p>
                  <button
                    onClick={handleCheckout}
                    style={{
                      width: "100%",
                      padding: "0.9rem",
                      background: "#e6f5f8",
                      border: "2px solid #31758a",
                      borderRadius: "8px",
                      color: "#31758a",
                      fontSize: "1.1rem",
                      cursor: "pointer",
                      fontWeight: "600",
                      transition: "all 0.3s ease",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = "#d0ecf1";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = "#e6f5f8";
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#31758a" viewBox="0 0 24 24" style={{ marginRight: "0.5rem" }}>
                      <path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6-7h-1V7a5 5 0 0 0-10 0v3H6c-1.103 0-2 .897-2 2v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7c0-1.103-.897-2-2-2zm-7 0V7a3 3 0 0 1 6 0v3h-6z"/>
                    </svg>
                    Unlock Full Report – $9.99
                  </button>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "#d7f5f7",
                      maxWidth: "90%",
                      lineHeight: 1.4,
                      textAlign: "center",
                      marginTop: "0.5rem",
                    }}
                  >
                    Get all 5 trait breakdowns, expert-backed strategies, and a downloadable PDF.
                  </p>
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "#d7f5f7",
                      fontStyle: "italic",
                      marginTop: "0.5rem",
                    }}
                  >
                    Your answers are 100% private—only you can access them.
                  </p>

                  {/* Share Your Experience */}
                </div>
              </div>

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

              <div style={{ maxWidth: "95%", margin: "1rem auto 2rem" }}>
                {/* FAQ Dropdown Header */}
                <div
                  onClick={() => setFaqOpen(!faqOpen)}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "#ffffff",
                    padding: "0.75rem 1rem",
                    borderRadius: "8px 8px 0 0",
                    border: "1px solid #31758a",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    color: "#31758a",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
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
      </main>
    </>
  );
}