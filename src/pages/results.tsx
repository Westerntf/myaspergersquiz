import { useEffect, useState, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
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
import { loadStripe } from "@stripe/stripe-js";

const traitComponents: Record<Trait, (level: number) => any> = {
  social: (level) => dynamic(() => import(`../content/results/social/level-${level}.mdx`)),
  sensory: (level) => dynamic(() => import(`../content/results/sensory/level-${level}.mdx`)),
  routine: (level) => dynamic(() => import(`../content/results/routine/level-${level}.mdx`)),
  communication: (level) => dynamic(() => import(`../content/results/communication/level-${level}.mdx`)),
  focus: (level) => dynamic(() => import(`../content/results/focus/level-${level}.mdx`)),
};


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
  console.log("Stripe key:", process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    alert("Stripe public key not found.");
    return;
  }

  const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

  if (!stripe) {
    alert("Stripe not available.");
    return;
  }

  // Generate quizId and sessionUid and store in localStorage
  const quizId = crypto.randomUUID();
  const sessionUid = crypto.randomUUID();
  localStorage.setItem("mq_quiz_id", quizId);
  localStorage.setItem("mq_session_uid", sessionUid);

  const res = await fetch("/api/checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      priceId: "price_1RSYJRFSjDoe9Z2nWpm9GqkG", // LIVE price ID
      metadata: {
        quiz_id: quizId,
        session_uid: sessionUid
      }
    }),
  });

  const data = await res.json();

  console.log("Stripe checkout response:", data);

  if (!data || !data.sessionId) {
    console.error("Stripe session creation failed:", data);
    alert("Unable to create Stripe session.");
    return;
  }

  await stripe.redirectToCheckout({ sessionId: data.sessionId });
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
    <link rel="canonical" href="https://myaspergersquiz.com/results" />,
  </Head>
    <main
      style={{
        background: "#fdfdfd",
        color: "#1a1a1a",
        padding: "2rem 1rem",
        maxWidth: "100%",
        boxSizing: "border-box"
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: "100%",
          padding: "0 1rem"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
          <img src="/myaspergersquiz-logo.png" alt="MyAspergersQuiz Logo" style={{ height: "50px", width: "50px" }} />
          <h1 style={{ fontSize: "2.5rem", color: '#31758a', margin: 0 }}>
            Your Quiz Results
          </h1>
        </div>
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "2rem" }}>
        </div>
    <div
      role="region"
      aria-labelledby="personalized-insights"
      style={{
        background: "#ffffff",
        borderRadius: "10px",
        padding: "2rem",
        border: "1px solid #d9e4e8",
        boxShadow: "0 2px 6px rgba(49, 117, 138, 0.05)"
      }}
    >
      {/* How You Fit In content moved directly inside region box */}
      {summary.level && (
        <>
          <h2 style={{
            fontSize: "1.5rem",
            marginBottom: "1.5rem",
            color: "#31758a",
            textAlign: "left",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#31758a" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4S8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            How You Fit In
          </h2>
          <div style={{
            border: "3px solid #31758a",
            borderRadius: "50%",
            width: "120px",
            height: "120px",
            margin: "0 auto 1.5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#1e6f7d",
            fontWeight: 700
          }}>
            <div style={{ fontSize: "0.8rem" }}>
              {(() => {
                const label = getResultLabel(summary.traitScores);
                if (typeof label === "string") return label;
                if (typeof label === "object" && "label" in label && typeof label.label === "string") return label.label;
                return "";
              })()}
            </div>
            <div style={{ fontSize: "1.5rem" }}>
              {summary.total}/40
            </div>
          </div>
          <p style={{ fontSize: "0.95rem", color: "#333", lineHeight: 1.5, textAlign: "center", marginBottom: "2rem" }}>
            {categoryLevelInsights[summary.level]}
          </p>
        </>
      )}
      {/* Key Traits Worth Noting section */}
      {summary?.flags?.length > 0 && (
        <>
          <h3 style={{
            fontSize: "1.5rem",
            color: "#31758a",
            fontWeight: "600",
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#31758a" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 9h4v2h-6V7h2v4z"/></svg>
            Key Traits Worth Noting
          </h3>
          <p style={{ color: "#1a1a1a", marginBottom: "1.25rem", fontSize: "1rem" }}>
            Based on your answers, a few areas stood out that align with common neurodivergent patterns:
          </p>
          <ul style={{
            listStyle: "none",
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem"
          }}>
            {summary.flags.map((id) => (
              <li
                key={id}
                style={{
                  background: "#eef6f8",
                  padding: "0.85rem 1rem",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  borderLeft: "4px solid #31758a",
                  color: "#1e3a42",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
                }}
              >
                <strong style={{ marginRight: "0.5rem", color: "#31758a" }}>Q{id}:</strong> {questions.find(q => q.id === id)?.text}
              </li>
            ))}
          </ul>
          <p style={{ marginTop: "1.5rem", color: "#445962", fontSize: "0.95rem", marginBottom: "2rem" }}>
            These traits stood out because they reflect common patterns seen in neurodivergent individuals — particularly those with autistic traits. They may signal areas where certain social or sensory demands feel more intense or draining. Recognizing these patterns can be the first step toward understanding your needs, finding support strategies that fit, and making sense of your experiences.
          </p>
        </>
      )}
      <div style={{ marginTop: "0" }}>
        <h3 style={{
          fontSize: "1.5rem",
          marginBottom: "1.5rem",
          color: "#31758a",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem"
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#31758a" viewBox="0 0 24 24"><path d="M3 17h3v-7H3v7zm5 0h3V7H8v10zm5 0h3v-4h-3v4zm5 0h3v-2h-3v2z"/></svg>
          Trait Levels at a Glance
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1.5rem" }}>
          {(Object.entries(summary.traitScores) as [Trait, number][]).map(([trait, score]) => {
            const percentage = Math.round((score / 8) * 100);
            return (
              <div key={trait} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
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
                  <text x="18" y="20.35" fill="#000" fontSize="4" textAnchor="middle">
                    {percentage}%
                  </text>
                </svg>
                <span style={{ marginTop: "0.5rem", fontSize: "1rem", color: "#1a1a1a", fontWeight: 500 }}>
                  {trait.charAt(0).toUpperCase() + trait.slice(1)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{
        marginTop: "2rem"
      }}>
        <h3 style={{
          fontSize: "1.5rem",
          marginBottom: "1.5rem",
          color: "#31758a",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem"
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#31758a" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
          Your Natural Strengths Based Off These Trait Levels
        </h3>
        <ul style={{
          color: "#1d3c3a",
          lineHeight: 1.8,
          listStyle: "disc",
          paddingLeft: "2rem",
          fontSize: "1.05rem"
        }}>
          {dynamicStrengths[strengthTraits[0] as Trait]?.map((line: string, idx: number) => (
            <li key={idx} style={{ marginBottom: "0.75rem" }}>{line}</li>
          ))}
        </ul>
        <p style={{ marginTop: "1.25rem", color: "#4c5f66", fontSize: "0.95rem", textAlign: "center" }}>
          Deeper analysis available in full report.
        </p>
      </div>
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
        // Unified card with unlock banner above locked preview, both inside one container with unified style
        <div
          style={{
            background: "linear-gradient(to right, #337d91, #275b6f)",
            color: "#fff",
            padding: "2rem",
            borderRadius: "12px",
            marginBottom: "2rem",
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
            position: "relative",
            overflow: "hidden",
            width: "100%",
            maxWidth: "100%",
            marginLeft: "auto",
            marginRight: "auto"
          }}
        >
          {/* Unlock Banner */}
          <div>
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem"
            }}>
              <div style={{
                background: "#fff",
                borderRadius: "50%",
                padding: "0.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "3rem",
                height: "3rem",
                marginBottom: "0.5rem"
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#337d91" viewBox="0 0 24 24">
                  <path d="M12 17a2 2 0 1 0 .001-3.999A2 2 0 0 0 12 17zm6-8h-1V7a5 5 0 0 0-10 0h2a3 3 0 1 1 6 0v2H6c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-9c0-1.1-.9-2-2-2z"/>
                </svg>
              </div>
              <h3 style={{ fontSize: "1.75rem", fontWeight: "700", margin: 0 }}>
                Unlock Your Full Report for $9.99
              </h3>
              <p style={{ fontSize: "1.05rem", color: "#d7f5f7", maxWidth: "580px", lineHeight: 1.6 }}>
                Get personalized insights and detailed strategies for all 5 traits — Social, Sensory, Routine, Communication, and Focus. 
                Each section includes expert-backed interpretations of your results, tailored tips and coping strategies, 
                plus downloadable PDF access to share with clinicians or keep for future reference.
              </p>
              <button
                onClick={handleCheckout}
                style={{
                  padding: "0.9rem 2rem",
                  background: "#e6f5f8",
                  border: "2px solid #31758a",
                  borderRadius: "8px",
                  color: "#31758a",
                  fontSize: "1.1rem",
                  cursor: "pointer",
                  fontWeight: "600",
                  transition: "all 0.3s ease"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "#d0ecf1";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "#e6f5f8";
                }}
              >
                Unlock Full Report
              </button>
            </div>
          </div>
          {/* Locked Preview, now visually unified with the unlock banner */}
          <div
            style={{
              marginTop: "2rem",
              borderRadius: "12px",
              padding: "2rem",
              position: "relative",
              background: "#ffffff",
              border: "1px solid #d9e4e8",
              boxShadow: "0 2px 6px rgba(49, 117, 138, 0.05)",
              color: "#1a1a1a",
              maxWidth: "100%",
              overflow: "hidden"
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                background: "#31758a",
                color: "#fff",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                fontSize: "0.9rem",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fff" viewBox="0 0 24 24">
                <path d="M12 17a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm6-7h-1V9a5 5 0 0 0-10 0v1H6c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2zm-8-1a3 3 0 0 1 6 0v1h-6V9z"/>
              </svg>
              Locked Preview
            </div>

            <div style={{ color: "#1a1a1a", fontSize: "1rem", lineHeight: 1.6 }}>
              <h4 style={{ color: "#31758a", fontSize: "1.25rem", marginBottom: "0.5rem" }}>Social – Level 4</h4>
              <p style={{ marginBottom: "1rem" }}>
                You may often feel mentally drained after social situations, especially in larger or unfamiliar groups.
                Understanding group dynamics might feel unpredictable, and starting conversations can bring anxiety or hesitation.
              </p>

              <h5 style={{ marginTop: "1rem", color: "#31758a", fontWeight: "600", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#31758a" viewBox="0 0 24 24"><path d="M10 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16zm2.29 9.71 1.3 1.29-1.42 1.42-1.3-1.29-1.29 1.3-1.42-1.42 1.29-1.3-1.3-1.29 1.42-1.42 1.3 1.29 1.29-1.3 1.42 1.42-1.29 1.3z"/></svg>
                What This Might Mean
              </h5>
              <p style={{ marginBottom: "1rem" }}>
                These patterns suggest your brain works harder to track social cues, manage expectations, and process interactions.
                It's not about lacking ability — it's about processing differently, and needing more recovery time.
              </p>

              <h5 style={{ marginTop: "1rem", color: "#31758a", fontWeight: "600", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#31758a" viewBox="0 0 24 24"><path d="M22.7 19.3 18.4 15l-1.4 1.4 4.3 4.3 1.4-1.4zM13 6.8V3h-2v3.8l-1.5 1.4c-1 .8-1.5 2-1.5 3.3V21h8v-9.5c0-1.3-.5-2.5-1.5-3.3L13 6.8z"/></svg>
                Supportive Strategies
              </h5>
              <ul style={{ paddingLeft: "1.25rem", marginBottom: "1rem", lineHeight: 1.7 }}>
                <li>Try structured social formats (like classes or game nights) where expectations are clearer.</li>
                <li>Use visual aids or conversation scripts to reduce cognitive load.</li>
                <li>Practice “small social reps” — short, low-pressure interactions to build comfort over time.</li>
              </ul>

              <p style={{ fontStyle: "italic", fontSize: "0.95rem", color: "#4c5f66", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#4c5f66" viewBox="0 0 24 24"><path d="M12 17a2 2 0 1 0 .001-3.999A2 2 0 0 0 12 17zm6-8h-1V7a5 5 0 0 0-10 0h2a3 3 0 1 1 6 0v2H6c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-9c0-1.1-.9-2-2-2z"/></svg>
                This is just a preview of one trait. Unlock the full report to explore all five areas — with deeper strategies personalized to your responses.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
    <div style={{
      marginTop: "2rem",
      padding: "2rem",
      background: "#ffffff",
      borderRadius: "12px",
      border: "1px solid #d9e4e8",
      boxShadow: "0 2px 6px rgba(49, 117, 138, 0.05)",
      maxWidth: "100%",
      marginLeft: "auto",
      marginRight: "auto",
      width: "100%",
      boxSizing: "border-box"
    }}>
      <h3 style={{
        fontSize: "1.6rem",
        color: "#31758a",
        marginBottom: "1rem",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem"
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#31758a" viewBox="0 0 24 24">
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/>
        </svg>
        Next Steps
      </h3>
      <ul style={{
        paddingLeft: "1.5rem",
        color: "#1a1a1a",
        fontSize: "1.05rem",
        lineHeight: 1.75,
        listStyle: "disc"
      }}>
        <li><strong>Explore the Resource Hub:</strong> Access hand-picked support groups, therapy tools, and educational resources.</li>
        <li><strong>Share with a clinician:</strong> Save or print your results PDF to support future assessments or discussions.</li>
        <li><strong>Reflect and revisit:</strong> Use these insights as a foundation — your growth journey is ongoing.</li>
      </ul>
    </div>
    </main>
  </>
  ) : null;
};

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
