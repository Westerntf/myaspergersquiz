import { useEffect, useState, useRef, useMemo } from "react";
import { loadFromStorage } from "../utils/storage";
import { calculateScore } from "../utils/calculateScore";
import { getResultLabel } from "../utils/scoreRanges";
import dynamic from "next/dynamic";
import { getTraitLevel } from "../utils/getTraitLevel";
import { Trait } from "../utils/calculateScore";
import { selfAwarenessReflections } from "../utils/selfAwarenessReflections";
import { getTopTraits } from "../utils/getTopTraits";
import { overallCategoryDescriptions } from "../utils/overallCategoryDescriptions";
import { dynamicStrengths } from "../utils/dynamicStrengths";
import { traitRecommendationsByLevel } from "../utils/traitRecommendationsByLevel";
import { traitResourceLinks } from "../utils/traitResourceLinks";
import Head from "next/head";

// Dynamic MDX loader
const traitComponents: Record<Trait, (level: number) => any> = {
  social: (level) => dynamic(() => import(`../content/results/social/level-${level}.mdx`)),
  sensory: (level) => dynamic(() => import(`../content/results/sensory/level-${level}.mdx`)),
  routine: (level) => dynamic(() => import(`../content/results/routine/level-${level}.mdx`)),
  communication: (level) => dynamic(() => import(`../content/results/communication/level-${level}.mdx`)),
  focus: (level) => dynamic(() => import(`../content/results/focus/level-${level}.mdx`)),
};

import { flagQuestions } from "../utils/flagQuestions";

const tableHeaderStyle = { padding: "0.75rem", background: "#2d2d4d", borderBottom: "1px solid #444", color: "#fff" };
const tableCellStyle = { padding: "0.75rem", textAlign: "center", borderBottom: "1px solid #333" };
const linkStyle = { color: "#4e7fff", textDecoration: "none" };

export default function FullReportPage() {
  const [summary, setSummary] = useState({
    total: 0,
    traitScores: {
      social: 0,
      sensory: 0,
      routine: 0,
      communication: 0,
      focus: 0,
    },
    label: "",
  });

  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Extract session_id from URL query string
      const sessionId = new URLSearchParams(window.location.search).get("session_id");
      if (sessionId) {
        localStorage.setItem("mq_session_id", sessionId);
      }

      const answers = loadFromStorage<(boolean | null)[]>("mq_answers");
      const isPaid = localStorage.getItem("mq_paid") === "true";

      if (!answers || !isPaid) {
        window.location.href = "/results";
        return;
      }

      const { total, traitScores } = calculateScore(answers);
      const label = getResultLabel(total);
      setSummary({ total, traitScores, label });
    }
  }, []);

  const handleDownload = () => {
    if (!reportRef.current) return;
    import("html2pdf.js").then(({ default: html2pdf }) => {
      html2pdf().from(reportRef.current!).set({
        margin: 0.5,
        filename: "Full_Report.pdf",
        html2canvas: { scale: 2 },
        jsPDF: { format: "a4", orientation: "portrait" },
      }).save();
    });
  };

  const traitInsights: Record<string, { low: string; medium: string; high: string }> = {
    social: {
      low: "You are socially comfortable and likely adapt well in social settings.",
      medium: "You may experience some challenges with social cues occasionally.",
      high: "Struggles with social cues and social interactions are common.",
    },
    sensory: {
      low: "You experience low sensory impact and are generally comfortable with stimuli.",
      medium: "You have some sensitivity to sensory stimuli.",
      high: "Highly sensitive to sensory stimuli, which may impact daily life.",
    },
    routine: {
      low: "You are flexible with changes and adapt well to new routines.",
      medium: "You prefer some structure but can handle changes with effort.",
      high: "Strong need for structure and routine to feel comfortable.",
    },
    communication: {
      low: "Good communication skills and ease expressing yourself.",
      medium: "Some challenges in communication but generally manage well.",
      high: "Significant challenges in communication and expression.",
    },
    focus: {
      low: "Able to focus well and maintain attention.",
      medium: "Occasional difficulty maintaining focus.",
      high: "Difficulty maintaining focus and sustaining attention.",
    },
  };

  const traitRecommendations: Record<string, string> = {
    routine: "You may benefit from more structured daily routines.",
    sensory: "Try sensory-friendly environments for relaxation.",
    social: "Consider communication strategies like social scripts or role-play.",
    communication: "Practice active listening and clear expression techniques.",
    focus: "Try mindfulness and focus-enhancing exercises.",
  };

  const renderTraitInsight = (trait: string, score: number) => {
    const levelInfo = getTraitLevel(trait as Trait, score);
    if (levelInfo.level <= 2) return traitInsights[trait].low;
    if (levelInfo.level <= 4) return traitInsights[trait].medium;
    return traitInsights[trait].high;
  };

  const traitQuestionCounts: Record<string, number> = {
    social: 8,
    sensory: 8,
    routine: 8,
    communication: 8,
    focus: 8,
  };

  // Memoize top traits for consistent dynamic data usage
  const topTraits = useMemo(() => getTopTraits(summary.traitScores, 3), [summary.traitScores]);
  const top1 = topTraits[0];
  const top2 = topTraits[1];
  const top3 = topTraits[2];

  // Memoize lowest scoring trait for strengths section
  const lowestTrait = useMemo(() => {
    return Object.entries(summary.traitScores).reduce(
      (minTrait, [trait, score]) =>
        score < summary.traitScores[minTrait as Trait] ? trait : minTrait,
      "social"
    ) as Trait;
  }, [summary.traitScores]);

  return (
    <>
      <style>{`
        .page-break {
          page-break-before: always;
          break-before: page;
        }
        .avoid-break {
          page-break-inside: avoid;
          break-inside: avoid;
        }
        /* PDF-only layout for vertical centering and page grouping */
        @media print {
          .pdf-page-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            min-height: 97vh;
            height: 100vh;
            page-break-after: always;
          }
          .pdf-page-container:last-child {
            page-break-after: auto;
          }
        }
        /* Only apply PDF layout for html2pdf.js output (it uses print media) */
      `}</style>
      <Head>
        <title>Full Report – Detailed Autism Trait Analysis | MyAspergersQuiz.com</title>
        <meta name="description" content="Access your full diagnostic-style report, including trait analysis, self-awareness insights, and personalized tools." />
        <meta property="og:title" content="Full Report – Detailed Autism Trait Analysis" />
        <meta property="og:description" content="A detailed breakdown of your autism trait scores, personal reflections, and helpful resources – based on your quiz results." />
        <meta property="og:image" content="https://myaspergersquiz.com/og-full-report.jpg" />
        <meta property="og:url" content="https://myaspergersquiz.com/full-report" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Full Report – Detailed Autism Trait Analysis" />
        <meta name="twitter:description" content="Explore your complete trait profile and gain meaningful insights to help on your self-understanding journey." />
        <meta name="twitter:image" content="https://myaspergersquiz.com/og-full-report.jpg" />
        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://myaspergersquiz.com/full-report"
              },
              "headline": "Full Report – Detailed Autism Trait Analysis",
              "description": "A personalized summary of autism-related traits including strengths, insights, and helpful tools. Based on quiz responses from MyAspergersQuiz.com.",
              "image": "https://myaspergersquiz.com/og-full-report.jpg",
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
        <link rel="canonical" href="https://myaspergersquiz.com/full-report" />
      </Head>
      <main
        role="main"
        aria-label="Full Diagnostic Report"
        style={{
          padding: "4rem clamp(1rem, 5vw, 2rem)",
          background: "linear-gradient(to bottom, #060618, #101025)",
          color: "#fff",
          fontFamily: "'Inter', sans-serif",
          minHeight: "100vh",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "2rem", fontSize: "2.2rem" }}>
          Full Report
        </h1>

        <div
          ref={reportRef}
          style={{
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "12px",
            padding: "2rem",
            maxWidth: "800px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          <div
            style={{
              background: "#1c1c30",
              padding: "1.5rem",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.05)",
              marginBottom: "2rem",
            }}
          >
            <h2 style={{ fontSize: "1.4rem", marginBottom: "0.5rem" }}>How You Fit In</h2>
            <p style={{ fontSize: "1.15rem", color: "#ccc", marginBottom: "0.25rem" }}>
              <strong>Total Score:</strong> {summary.total}
            </p>
            <p style={{ fontSize: "1rem", color: "#ccc" }}>
              {overallCategoryDescriptions[summary.label] || ""}
            </p>
          </div>

          {/* PDF Page 1: Strengths + Self-Awareness (Self-Awareness block moved above "What This Means") */}
          <div className="pdf-page-container" style={{}}>
            <div
              className="avoid-break"
              aria-label="Your Strengths Based on Your Lowest Trait Score"
              style={{ marginBottom: "3rem", background: "#1c1c30", padding: "1rem 1.5rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <h3 style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}>Your Strengths</h3>
              <ul style={{ paddingLeft: "1rem", color: "#ccc", lineHeight: 1.6 }}>
                {dynamicStrengths[lowestTrait]?.map((line, idx) => (
                  <li key={idx}>{line}</li>
                ))}
              </ul>
            </div>
          {/* Suggested Tools or Strategies block, below detailed trait breakdowns */}
          <div className="pdf-page-container" style={{}}>
            <div className="avoid-break" style={{ marginBottom: "3rem", background: "#1c1c30", padding: "1.5rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
              <h3 style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}>Suggested Tools or Strategies</h3>
              <ul style={{ paddingLeft: "1.2rem", color: "#ccc", lineHeight: 1.6 }}>
                {[top1, top2].map((trait) => {
                  const score = summary.traitScores[trait];
                  const level = getTraitLevel(trait, score).level;
                  const rec = traitRecommendationsByLevel[trait][Math.min(level - 1, 3)];
                  return <li key={trait}>{rec}</li>;
                })}
              </ul>
            </div>
          </div>
            <div className="avoid-break" style={{ marginBottom: "3rem", background: "#1c1c30", padding: "1.5rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)", pageBreakInside: "avoid", breakInside: "avoid" }}>
              <h3 style={{ fontSize: "1.3rem", marginBottom: "1rem" }}>💡 Self-Awareness Reflections</h3>
              <ul style={{ color: "#ccc", lineHeight: 1.6, paddingLeft: "1.2rem", listStyle: "disc" }}>
                {[top1, top2, top3].map((trait) => {
                  const level = getTraitLevel(trait, summary.traitScores[trait]).level;
                  const text = selfAwarenessReflections[trait][level - 1];
                  return <li key={trait}>{text}</li>;
                })}
              </ul>
            </div>
            <div className="avoid-break" style={{ marginBottom: "3rem", background: "#1c1c30", padding: "1rem 1.5rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)", pageBreakInside: "avoid", breakInside: "avoid" }}>
              <h3 style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}>What This Means</h3>
              <p style={{ color: "#aaa" }}>
                This summary is based on common behavioral patterns and is not a clinical diagnosis. Use it to better understand how you think and interact, and feel free to share it with someone you trust or a clinician.
              </p>
            </div>
            {/* Bar Graph (Trait Visual Breakdown) in styled box */}
            <div
              className="avoid-break"
              style={{
                background: "#1c1c30",
                padding: "1.5rem",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.05)",
                marginBottom: "3rem",
                marginTop: 0,
                pageBreakInside: "avoid",
                breakInside: "avoid",
              }}
            >
              <div style={{ marginBottom: "2rem", textAlign: "center" }}>
                <h3 style={{ fontSize: "1.3rem", marginBottom: "1rem" }}>Trait Visual Breakdown</h3>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  gap: "1rem",
                  flexWrap: "nowrap",
                  overflowX: "auto",
                  maxWidth: "100%",
                  margin: "0 auto",
                  textAlign: "center",
                  minHeight: "240px",
                  padding: "0.5rem 0",
                }}
              >
                {Object.keys(summary.traitScores).map((trait) => {
                  const value = summary.traitScores[trait as keyof typeof summary.traitScores];
                  const score = value;
                  const level = score >= 3 ? "high" : score === 2 ? "medium" : "low";
                  const label = traitInsights[trait]?.[level] || "";
                  return (
                    <div
                      key={trait}
                      role="img"
                      aria-label={`Bar for ${trait} trait, score: ${value} out of ${traitQuestionCounts[trait]}`}
                      style={{
                        width: "120px",
                        minHeight: "220px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <p style={{ marginBottom: "0.5rem", fontWeight: 500, fontSize: "0.85rem", textAlign: "center", lineHeight: 1.3, minHeight: "3.5rem" }}>{label}</p>
                      <div style={{
                        height: "100px",
                        width: "100%",
                        background: "#2c2c45",
                        borderRadius: "6px",
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "center",
                        minHeight: "100px",
                      }}>
                        <div style={{
                          height: `${(value / traitQuestionCounts[trait]) * 100}%`,
                          width: "100%",
                          background: "#4e7fff",
                          transition: "height 0.5s",
                        }} />
                      </div>
                      <p style={{ marginTop: "0.5rem", fontWeight: "bold", fontSize: "0.95rem" }}>
                        {value} / {traitQuestionCounts[trait]}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* (Removed duplicate PDF Page 2 as it's now included above) */}

          {/* PDF Page 2: Detailed Breakdown (all traits, grouped in pairs to avoid mid-section breaks) */}
          <h2 style={{ fontSize: "1.6rem", marginBottom: "1rem", marginTop: "2rem", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "0.5rem" }}>
            Detailed Breakdown
          </h2>
          {/* Group trait breakdowns in pairs for PDF pages */}
          {(Object.entries(summary.traitScores) as [Trait, number][])
            .reduce((acc: [Trait, number][][], curr, idx, arr) => {
              if (idx % 2 === 0) acc.push([curr]);
              else acc[acc.length - 1].push(curr);
              return acc;
            }, [])
            .map((pair, i, arr) => (
              <div
                key={i}
                className={`pdf-page-container${i === arr.length - 1 ? "" : ""}`}
                style={{}}
              >
                {pair.map(([trait, score]) => {
                  const levelInfo = getTraitLevel(trait, score);
                  const TraitMDX = traitComponents[trait](levelInfo.level);
                  return (
                    <div
                      key={trait}
                      className="avoid-break"
                      style={{
                        background: "#1c1c30",
                        padding: "1.5rem",
                        borderRadius: "8px",
                        border: "1px solid rgba(255,255,255,0.05)",
                        marginBottom: "3rem",
                        marginTop: 0,
                        pageBreakInside: "avoid",
                        breakInside: "avoid",
                      }}
                    >
                      <TraitMDX />
                    </div>
                  );
                })}
              </div>
            ))}

          {/* PDF Page: Flagged Traits + Helpful Resources (single visual block) */}
          <div className="pdf-page-container" style={{}}>
            <div
              className="avoid-break"
              style={{
                maxWidth: "800px",
                margin: "0 auto 3rem auto",
                background: "#1c1c30",
                padding: "1.25rem",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.05)",
                marginBottom: "3rem",
                pageBreakInside: "avoid",
                breakInside: "avoid",
              }}
            >
              <h3 style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}>Flagged Traits Summary</h3>
              <p style={{ color: "#ccc", marginBottom: "2rem" }}>
                You triggered {
                  (() => {
                    const answers = loadFromStorage("mq_answers") as (boolean | null)[] | undefined;
                    if (!answers) return 0;
                    return flagQuestions.filter(id => answers[id - 1] === true).length;
                  })()
                } diagnostic-aligned traits.
              </p>
              <h3 style={{ fontSize: "1.3rem", marginBottom: "1rem" }}>🔗 Helpful Resources</h3>
              <ul style={{ listStyle: "none", paddingLeft: 0, color: "#ccc", lineHeight: 1.8 }}>
                {[top1, top2].flatMap((trait) => (traitResourceLinks[trait] || []).map((link) => ({ link, trait }))).map(({ link, trait }, idx) => (
                  <li key={idx} style={{ marginBottom: "1rem" }}>
                    <a
                      href={link.url}
                      style={linkStyle}
                      aria-label={`Resource: ${link.title} for ${trait} trait`}
                    >
                      {link.icon} <strong>{link.title}</strong><br />
                      <span style={{ fontSize: "0.9rem", color: "#aaa" }}>{link.description}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer and PDF download button, grouped together */}
        <div
          style={{
            maxWidth: "800px",
            margin: "3rem auto 0 auto",
            background: "#1c1c30",
            padding: "1rem 1.5rem",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.05)",
            fontStyle: "italic",
            color: "#aaa",
            textAlign: "center",
          }}
        >
          <p style={{ marginBottom: "1.7rem" }}>
            This summary is educational and not a clinical diagnosis. For personalized advice, consult a licensed healthcare provider.
          </p>
          <div style={{ textAlign: "center", marginTop: 0 }}>
            <button
              onClick={handleDownload}
              style={{
                padding: "1rem 2rem",
                fontSize: "1.1rem",
                background: "#4e7fff",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Download as PDF
            </button>
          </div>
        </div>

        {/* Report generated info at the very bottom */}
        <div style={{ marginTop: "3rem", fontSize: "0.95rem", opacity: 0.6, textAlign: "center" }}>
          <p>Report generated on: {new Date().toLocaleDateString()}</p>
          <p>Quiz version: v1.0.0</p>
        </div>

      </main>
    </>
  );
}