import { useEffect, useState, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import { categoryLevelInsights } from "../utils/categoryLevelInsights";
import { calculateScore, Trait } from "../utils/calculateScore";
import { dynamicStrengths } from "../utils/dynamicStrengths";
import { flagQuestions } from "../utils/flagQuestions";
import { getLowestTraits } from "../utils/getLowestTraits";
import { getOverallLevel } from "../utils/getOverallLevel";
import { getResultLabel } from "../utils/getResultLabel";
import { getTopTraits } from "../utils/getTopTraits";
import { getTraitLevel } from "../utils/getTraitLevel";
import { loadFromStorage } from "../utils/storage";
import { questions } from "../questions";

const traitComponents: Record<Trait, (level: number) => any> = {
  social: (level) => dynamic(() => import(`../content/results/social/level-${level}.mdx`)),
  sensory: (level) => dynamic(() => import(`../content/results/sensory/level-${level}.mdx`)),
  routine: (level) => dynamic(() => import(`../content/results/routine/level-${level}.mdx`)),
  communication: (level) => dynamic(() => import(`../content/results/communication/level-${level}.mdx`)),
  focus: (level) => dynamic(() => import(`../content/results/focus/level-${level}.mdx`)),
};

const stripePromise = typeof window !== "undefined"
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
  : Promise.resolve(null);

export default function ResultsPage() {
  const [summary, setSummary] = useState<{
    total: number;
    traitScores: {
      social: number;
      sensory: number;
      routine: number;
      communication: number;
      focus: number;
    };
    flags: number[];
    level: number;
  }>({
    total: 0,
    traitScores: {
      social: 0,
      sensory: 0,
      routine: 0,
      communication: 0,
      focus: 0,
    },
    flags: [],
    level: 1,
  });

  const [isClient, setIsClient] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const answers = loadFromStorage<(boolean | null)[]>("mq_answers");
    const sessionId = new URLSearchParams(window.location.search).get("session_id");
    console.log("sessionId:", sessionId);
    console.log("mq_paid from storage:", localStorage.getItem("mq_paid"));

    if (!answers) {
      window.location.href = "/";
      return;
    }

    if (sessionId) {
      fetch(`/api/verify-payment?session_id=${sessionId}`)
        .then(res => res.json())
        .then(data => {
          if (data.paid) {
            setIsPaid(true);
            localStorage.setItem("mq_paid", "true");
          } else {
            setIsPaid(false);
          }
        });
    } else {
      setIsPaid(false);
    }

    const { total, traitScores } = calculateScore(answers);
    const flags = flagQuestions.filter((id) => answers[id - 1] === true);
    const level = getOverallLevel(total);
    setSummary({ total, traitScores, flags, level });
  }, []);

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const quizId = crypto.randomUUID();
    localStorage.setItem("mq_quiz_id", quizId);

    const res = await fetch("/api/checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ quizId }),
    });
    const data = await res.json();
    if (!stripe || !data.id) return alert("Stripe not available.");
    console.log("Redirecting to Stripe checkout");
    await stripe.redirectToCheckout({ sessionId: data.id });
  };

  const reportRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;
    const html2pdf = (await import("html2pdf.js")).default;
    html2pdf()
      .from(reportRef.current)
      .set({
        margin: 1,
        filename: "MyAspergersQuiz_Report.pdf",
        html2canvas: { scale: 2 },
        jsPDF: { format: "a4", orientation: "portrait" },
      });
    console.log("PDF download initiated");
    html2pdf().save();
  };

  const topTraits = useMemo(() => getTopTraits(summary.traitScores, 3), [summary.traitScores]);
  const strengthTraits = useMemo(() => getLowestTraits(summary.traitScores, 1), [summary.traitScores]);

 return isClient ? (
 <>
  <Head>
    <title>Results – Autism Traits Summary | MyAspergersQuiz.com</title>
    <meta name="description" content="See your personalized breakdown of social, sensory, and behavioral traits. Based on your responses, this summary offers insights into how you experience the world." />
    <meta property="og:title" content="Your Autism Traits Results – See Your Summary" />
    <meta property="og:description" content="A professional and respectful review of your unique communication, sensory, and behavioral patterns. Get clarity in just a few minutes." />
    <meta property="og:image" content="https://myaspergersquiz.com/og-results.jpg" />
    <meta property="og:url" content="https://myaspergersquiz.com/results" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Your Autism Traits Results – See Your Summary" />
    <meta name="twitter:description" content="Explore your traits with a private and science-informed quiz. See what your score reveals." />
    <meta name="twitter:image" content="https://myaspergersquiz.com/og-results.jpg" />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://myaspergersquiz.com/results"
          },
          "headline": "Your Autism Traits Results – See Your Summary",
          "description": "A professional and respectful review of your unique communication, sensory, and behavioral patterns. Get clarity in just a few minutes.",
          "image": "https://myaspergersquiz.com/og-results.jpg",
          "author": {
            "@type": "Organization",
            "name": "MyAspergersQuiz.com"
          },
          "publisher": {
            "@type": "Organization",
            "name": "MyAspergersQuiz.com",
            "logo": {
              "@type": "ImageObject",
              "url": "https://myaspergersquiz.com/logo.png"
            }
          },
          "datePublished": "2025-05-25",
          "dateModified": new Date().toISOString().split("T")[0]
        })
      }}
    />
    <link rel="canonical" href="https://myaspergersquiz.com/results" />
  </Head>

  <main style={{ background: "#060618", color: "#fff", padding: "4rem 1rem" }}>
    <div className="container">
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Your Quiz Results</h1>
      <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "2rem" }}>
        {summary.level && (
          <div style={{
            flex: "1 1 100%",
            background: "#1a1a2e",
            borderRadius: "8px",
            padding: "1.5rem",
            border: "1px solid rgba(255,255,255,0.05)"
          }}>
            <h2 style={{ fontSize: "1.6rem", marginBottom: "1rem" }}>How You Fit In</h2>
            <p style={{ fontSize: "1.1rem", color: "#ccc", lineHeight: 1.7 }}>
              {categoryLevelInsights[summary.level]}
            </p>
          </div>
        )}

    {summary?.flags?.length > 0 && (
      <div style={{ flex: "1 1 300px", background: "#1c1c30", borderRadius: "8px", padding: "1.25rem", border: "1px solid rgba(255,255,255,0.05)" }}>
        <h3 style={{ fontSize: "1.4rem", color: "#ffffff", fontWeight: "600", marginBottom: "0.5rem" }}>
          Key Traits Worth Noting
        </h3>
        <p style={{ color: "#ffffff", marginBottom: "1rem" }}>
          Based on your answers, a few areas stood out that align with common neurodivergent patterns.
        </p>
        <div style={{
          maxHeight: "300px",
          overflowY: "auto",
          paddingRight: "0.5rem",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          borderRadius: "6px",
          background: "#1c1c2d",
          marginBottom: "1rem"
        }}>
          <ul style={{
            color: "#d8d8ff",
            listStyleType: "none",
            padding: "0.75rem 1rem",
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem"
          }}>
            {summary.flags.map((id) => (
              <li
                key={id}
                style={{
                  padding: "0.5rem 0.75rem",
                  background: "rgba(100, 100, 255, 0.08)",
                  borderRadius: "4px",
                  fontSize: "1rem",
                  lineHeight: 1.5,
                  color: "#d8d8ff"
                }}
              >
                <strong>Q{id}:</strong> {questions.find(q => q.id === id)?.text}
              </li>
            ))}
          </ul>
        </div>
        <p style={{ marginTop: "1rem", color: "#a7a7d6" }}>
          This isn’t a diagnosis — just thoughtful insight that may help guide your journey or discussions with a clinician.
        </p>
      </div>
    )}
  </div>
    <div
    role="region"
    aria-labelledby="personalized-insights"
    style={{
      background: "#1a1a2e",
      borderRadius: "8px",
      padding: "1.5rem",
      marginBottom: "2rem",
      boxShadow: "0 0 8px rgba(78,127,255,0.1)",
      border: "1px solid rgba(255,255,255,0.05)"
    }}
  >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
        <svg width="20" height="20" fill="#fff" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 2a8 8 0 105.29 14.29l4.58 4.59 1.42-1.42-4.59-4.58A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z" /></svg>
        <h2
          style={{
            fontSize: "2rem",
            marginBottom: "1.25rem",
            color: "#ffffff",
            letterSpacing: "1px",
            textShadow: "0 0 8px rgba(78, 127, 255, 0.3)"
          }}
          id="personalized-insights"
        >
          Personalized insights
        </h2>
      </div>
      <div style={{
        marginTop: "2rem",
        marginBottom: "2rem",
        background: "linear-gradient(145deg, #0f0f22, #1a1a2e)",
        padding: "2rem",
        borderRadius: "10px",
        border: "1px solid rgba(126, 231, 135, 0.2)",
        boxShadow: "0 0 15px rgba(126, 231, 135, 0.15)"
      }}>
        <h3 style={{
          fontSize: "1.6rem",
          marginBottom: "1.5rem",
          color: "#7ee787",
          textShadow: "0 0 3px rgba(126, 231, 135, 0.5)",
          textAlign: "center"
        }}>
          🌟 Your Natural Strengths
        </h3>
        <ul style={{
          color: "#d0f0d0",
          lineHeight: 1.8,
          listStyle: "disc",
          paddingLeft: "2rem",
          fontSize: "1.1rem"
        }}>
          {dynamicStrengths[strengthTraits[0] as Trait]?.map((line: string, idx: number) => (
            <li key={idx} style={{ marginBottom: "0.75rem" }}>{line}</li>
          ))}
        </ul>
      </div>
      {isPaid ? (
        <>
          <div ref={reportRef}>
            {(Object.entries(summary.traitScores) as [Trait, number][]).map(([trait, score]) => {
              const levelInfo = getTraitLevel(trait, score);
              const TraitMDX = traitComponents[trait](levelInfo.level);
              try {
                return <TraitMDX key={trait} />;
              } catch (err) {
                return <p key={trait} style={{ color: "#f88" }}>Insight not available for {trait} (level {levelInfo.level})</p>;
              }
            })}
          </div>
          <div style={{ marginTop: "1rem" }}>
            <Link href="/full-report">
              <button style={buttonStyle} aria-label="View your full report">View Full Report</button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              filter: "blur(4px)",
              pointerEvents: "none",
              userSelect: "none",
              opacity: 0.7
            }}
          >
            {(Object.entries(summary.traitScores) as [Trait, number][]).map(([trait, score]) => {
              const levelInfo = getTraitLevel(trait, score);
              const TraitMDX = traitComponents[trait](levelInfo.level);
              try {
                return <TraitMDX key={trait} />;
              } catch (err) {
                return <p key={trait} style={{ color: "#f88" }}>Insight not available for {trait} (level {levelInfo.level})</p>;
              }
            })}
          </div>
          <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", color: "#ccc" }}>
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 17a1.5 1.5 0 001.5-1.5h-3A1.5 1.5 0 0012 17zm6-6h-1V9a5 5 0 00-10 0v2H6a2 2 0 00-2 2v7a2 2 0 002 2h12a2 2 0 002-2v-7a2 2 0 00-2-2zm-3 0H9V9a3 3 0 016 0v2z" /></svg>
            <span>Your full report is locked. Please purchase to unlock detailed results.</span>
          </div>
          <button onClick={handleCheckout} style={buttonStyle} aria-label="Purchase to unlock your full report">
            Unlock Full Report ($9.99)
          </button>
        </>
      )}
    </div>
    <div style={{
      marginTop: "2rem",
      padding: "1.25rem",
      background: "#14142b",
      borderRadius: "8px",
      textAlign: "left",
      border: "1px solid rgba(255,255,255,0.05)"
    }}>
      <h3 style={{ fontSize: "1.3rem", color: "#a7a7d6", marginBottom: "0.5rem" }}>Next Steps</h3>
      <ul style={{ paddingLeft: "1rem", color: "#ccc", lineHeight: 1.6 }}>
        <li>Visit our <strong>Resource Hub</strong> for support groups, books, and tools.</li>
        <li>Print or save your PDF to discuss with a clinician.</li>
        <li>Take time to reflect — this quiz is just a starting point.</li>
      </ul>
    </div>
    </div>
  </main>
  </>
  ) : null;
}

const buttonStyle = {
  margin: "1rem",
  padding: "1rem 2rem",
  fontSize: "1.1rem",
  background: "#4e7fff",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "background 0.2s ease-in-out"
};
