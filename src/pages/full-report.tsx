import { useEffect, useState, useRef } from "react";
import { loadFromStorage } from "../utils/storage";
import { calculateScore } from "../utils/calculateScore";
import { flagQuestions } from "../utils/flagQuestions";
import { getSelfAwarenessLevel } from "../utils/getSelfAwarenessLevel";
import { getNaturalStrengthLevel } from "../utils/getNaturalStrengthLevel";
import { getFlaggedLevel } from "../utils/getFlaggedLevel";

import FlaggedLevel1 from "../components/insights/flagged-traits/level-1";
import FlaggedLevel2 from "../components/insights/flagged-traits/level-2";
import FlaggedLevel3 from "../components/insights/flagged-traits/level-3";
import FlaggedLevel4 from "../components/insights/flagged-traits/level-4";
import FlaggedLevel5 from "../components/insights/flagged-traits/level-5";

import { getOverallLevel } from "../utils/getOverallLevel";
import {
  getSocialLevel,
  getSensoryLevel,
  getRoutineLevel,
  getFocusLevel,
  getCommunicationLevel,
} from "../utils/getTraitLevel";
import Head from "next/head";
import TraitLevelsAtAGlance from "../components/TraitLevelsAtAGlance";
import dynamic from "next/dynamic";

// --- Dynamic imports for Communication levels ---
const communicationComponents: Record<number, React.ComponentType<any>> = {
  1: dynamic(() => import("../components/insights/traits/communication/level-1")),
  2: dynamic(() => import("../components/insights/traits/communication/level-2")),
  3: dynamic(() => import("../components/insights/traits/communication/level-3")),
  4: dynamic(() => import("../components/insights/traits/communication/level-4")),
  5: dynamic(() => import("../components/insights/traits/communication/level-5")),
  6: dynamic(() => import("../components/insights/traits/communication/level-6")),
  7: dynamic(() => import("../components/insights/traits/communication/level-7")),
  8: dynamic(() => import("../components/insights/traits/communication/level-8")),
};
// --- Dynamic imports for Social levels ---
const socialComponents: Record<number, React.ComponentType<any>> = {
  1: dynamic(() => import("../components/insights/traits/social/level-1")),
  2: dynamic(() => import("../components/insights/traits/social/level-2")),
  3: dynamic(() => import("../components/insights/traits/social/level-3")),
  4: dynamic(() => import("../components/insights/traits/social/level-4")),
  5: dynamic(() => import("../components/insights/traits/social/level-5")),
  6: dynamic(() => import("../components/insights/traits/social/level-6")),
  7: dynamic(() => import("../components/insights/traits/social/level-7")),
  8: dynamic(() => import("../components/insights/traits/social/level-8")),
};

// --- Dynamic imports for Sensory levels ---
const sensoryComponents: Record<number, React.ComponentType<any>> = {
  1: dynamic(() => import("../components/insights/traits/sensory/level-1")),
  2: dynamic(() => import("../components/insights/traits/sensory/level-2")),
  3: dynamic(() => import("../components/insights/traits/sensory/level-3")),
  4: dynamic(() => import("../components/insights/traits/sensory/level-4")),
  5: dynamic(() => import("../components/insights/traits/sensory/level-5")),
  6: dynamic(() => import("../components/insights/traits/sensory/level-6")),
  7: dynamic(() => import("../components/insights/traits/sensory/level-7")),
  8: dynamic(() => import("../components/insights/traits/sensory/level-8")),
};

// --- Dynamic imports for Routine levels ---
const routineComponents: Record<number, React.ComponentType<any>> = {
  1: dynamic(() => import("../components/insights/traits/routine/level-1")),
  2: dynamic(() => import("../components/insights/traits/routine/level-2")),
  3: dynamic(() => import("../components/insights/traits/routine/level-3")),
  4: dynamic(() => import("../components/insights/traits/routine/level-4")),
  5: dynamic(() => import("../components/insights/traits/routine/level-5")),
  6: dynamic(() => import("../components/insights/traits/routine/level-6")),
  7: dynamic(() => import("../components/insights/traits/routine/level-7")),
  8: dynamic(() => import("../components/insights/traits/routine/level-8")),
};

// --- Dynamic imports for Focus levels ---
const focusComponents: Record<number, React.ComponentType<any>> = {
  1: dynamic(() => import("../components/insights/traits/focus/level-1")),
  2: dynamic(() => import("../components/insights/traits/focus/level-2")),
  3: dynamic(() => import("../components/insights/traits/focus/level-3")),
  4: dynamic(() => import("../components/insights/traits/focus/level-4")),
  5: dynamic(() => import("../components/insights/traits/focus/level-5")),
  6: dynamic(() => import("../components/insights/traits/focus/level-6")),
  7: dynamic(() => import("../components/insights/traits/focus/level-7")),
  8: dynamic(() => import("../components/insights/traits/focus/level-8")),
};

// --- Dynamic imports for How You Fit In levels ---
const howYouFitInComponents: Record<number, React.ComponentType<any>> = {
  1: dynamic(() => import("../components/insights/how-you-fit-in/level-1")),
  2: dynamic(() => import("../components/insights/how-you-fit-in/level-2")),
  3: dynamic(() => import("../components/insights/how-you-fit-in/level-3")),
  4: dynamic(() => import("../components/insights/how-you-fit-in/level-4")),
  5: dynamic(() => import("../components/insights/how-you-fit-in/level-5")),
  6: dynamic(() => import("../components/insights/how-you-fit-in/level-6")),
  7: dynamic(() => import("../components/insights/how-you-fit-in/level-7")),
  8: dynamic(() => import("../components/insights/how-you-fit-in/level-8")),
};

// --- Dynamic imports for Self-Awareness levels ---
const selfAwarenessComponents: Record<number, React.ComponentType<any>> = {
  1: dynamic(() => import("../components/insights/self-awareness-reflections/level-1")),
  2: dynamic(() => import("../components/insights/self-awareness-reflections/level-2")),
  3: dynamic(() => import("../components/insights/self-awareness-reflections/level-3")),
  4: dynamic(() => import("../components/insights/self-awareness-reflections/level-4")),
  5: dynamic(() => import("../components/insights/self-awareness-reflections/level-5")),
};

// --- Dynamic imports for Natural Strengths levels ---
const naturalStrengthComponents: Record<number, React.ComponentType<any>> = {
  1: dynamic(() => import("../components/insights/natural-strengths/level-1")),
  2: dynamic(() => import("../components/insights/natural-strengths/level-2")),
  3: dynamic(() => import("../components/insights/natural-strengths/level-3")),
  4: dynamic(() => import("../components/insights/natural-strengths/level-4")),
  5: dynamic(() => import("../components/insights/natural-strengths/level-5")),
};

const tableHeaderStyle = { padding: "0.75rem", background: "#2d2d4d", borderBottom: "1px solid #444", color: "#fff" };
const tableCellStyle = { padding: "0.75rem", textAlign: "center", borderBottom: "1px solid #333" };
const linkStyle = { color: "#4e7fff", textDecoration: "none" };


export default function FullReportPage() {
  const [isClient, setIsClient] = useState(false);
  const [summary, setSummary] = useState<{
    total: number;
    traitScores: { social: number; sensory: number; routine: number; communication: number; focus: number };
    flags: number[];
  }>({
    total: 0,
    traitScores: { social: 0, sensory: 0, routine: 0, communication: 0, focus: 0 },
    flags: [],
  });

  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const sessionId = new URLSearchParams(window.location.search).get("session_id");
      if (sessionId) {
        localStorage.setItem("mq_session_id", sessionId);
      }

      const answers = loadFromStorage<(boolean | null)[]>("mq_answers");

      const urlParams = new URLSearchParams(window.location.search);
      const isBypass = urlParams.get("bypass") === "true";
      const isPaid = localStorage.getItem("mq_paid") === "true" || isBypass;

      if (!answers) {
        window.location.href = "/results";
        return;
      }

      const overridePaidCheck = process.env.NODE_ENV === "development";
      if (!isPaid && !overridePaidCheck) {
        window.location.href = "/results";
        return;
      }

      const { total, traitScores } = calculateScore(answers);
      // Determine which questions are flagged
      const flaggedIds = flagQuestions.filter((id) => answers[id - 1] === true);
      setSummary({ total, traitScores, flags: flaggedIds });
    }
  }, []);

  // Dynamic trait insight components removed during MDX transition

  if (!isClient) return null;

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

  // Dynamic trait insight components removed during MDX transition


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
          background: "#ffffff",
          color: "#1a1a1a",
          fontFamily: "'Inter', sans-serif",
          minHeight: "100vh",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "2rem", fontSize: "2.2rem", color: "#4A90A4" }}>
          Full Report
        </h1>

        {/* --- Dynamic MDX Sections removed --- */}

        <div
          ref={reportRef}
          style={{
            background: "#f9fbfc",
            border: "1px solid #e4ebf0",
            borderRadius: "12px",
            padding: "2rem",
            maxWidth: "800px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          {/* Dynamic trait insight components removed during MDX transition */}
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div
              style={{
                margin: "0 auto 1rem auto",
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                border: "3px solid #4A90A4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.4rem",
                fontWeight: "600",
                color: "#4A90A4",
              }}
            >
              {summary.total}/40
            </div>
            <p style={{ fontSize: "1rem", color: "#4A4A4A", maxWidth: "600px", margin: "0 auto" }}>
              {/* Dynamic overall category description removed during MDX transition */}
            </p>
          </div>
{/* How You Fit In: render one matching level */}
          {(() => {
            const level = getOverallLevel(summary.total);
            const HowComponent = howYouFitInComponents[level] || null;
            return HowComponent ? <HowComponent /> : null;
          })()}
          {/* Trait Visual Breakdown */}
          <div
            className="avoid-break"
            style={{
              background: "#f9fbfc",
              padding: "1.5rem",
              borderRadius: "12px",
              border: "1px solid #e4ebf0",
              marginBottom: "3rem",
              marginTop: 0,
              pageBreakInside: "avoid",
              breakInside: "avoid",
              boxShadow: "0 0 10px rgba(74, 144, 164, 0.05)",
            }}
          >
            <div style={{ marginBottom: "2rem", textAlign: "center" }}>
              <h3 style={{ fontSize: "1.4rem", marginBottom: "1rem", color: "#4A90A4" }}>Trait Visual Breakdown</h3>
            </div>

            <TraitLevelsAtAGlance scores={summary.traitScores} />

          </div>

{/* Flagged Traits Section (render matching level) */}
{(() => {
  const count = summary.flags.length;
  const level = getFlaggedLevel(count);

  switch (level) {
    case 1:
      return <FlaggedLevel1 />;
    case 2:
      return <FlaggedLevel2 flaggedIds={summary.flags} />;
    case 3:
      return <FlaggedLevel3 flaggedIds={summary.flags} />;
    case 4:
      return <FlaggedLevel4 flaggedIds={summary.flags} />;
    case 5:
      return <FlaggedLevel5 flaggedIds={summary.flags} />;
    default:
      return null;
  }
})()}

          <div className="insight-section">
            {/* Grouped Trait Insights Container */}
            <div
              style={{
                background: "#ffffff",                   // pure white background
                border: "1px solid #e4ebf0",             // light border
                borderRadius: "12px",
                padding: "1.5rem 2rem",
                marginBottom: "3rem",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",  // subtle drop shadow
              }}
            >
              <h2 style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "1.75rem",
                fontWeight: 600,
                color: "#31758a",
                marginBottom: "1rem",
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#31758a" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
                Trait Insights
              </h2>

              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem"                              // reduced gap between cards
              }}>
                {/* Communication Insight */}
                {(() => {
                  const commLevel = getCommunicationLevel(summary.traitScores.communication);
                  const CommComponent = communicationComponents[commLevel] || null;
                  return CommComponent ? <CommComponent /> : null;
                })()}

                <hr style={{
                  border: 0,
                  borderTop: "1px solid #e4ebf0",         // updated HR color
                  margin: "1rem 0"                        // reduced HR margin
                }} />

                {/* Social Insight */}
                {(() => {
  const socLevel = getSocialLevel(summary.traitScores.social);
  const SocComponent = socialComponents[socLevel] || null;
  return SocComponent ? <SocComponent /> : null;
})()}

                <hr style={{
                  border: 0,
                  borderTop: "1px solid #e4ebf0",         // updated HR color
                  margin: "1rem 0"                        // reduced HR margin
                }} />

                {/* Sensory Insight */}
         {(() => {
  const senLevel = getSensoryLevel(summary.traitScores.sensory);
  const SenComponent = sensoryComponents[senLevel] || null;
  return SenComponent ? <SenComponent /> : null;
})()}

                <hr style={{
                  border: 0,
                  borderTop: "1px solid #e4ebf0",         // updated HR color
                  margin: "1rem 0"                        // reduced HR margin
                }} />

                {/* Routine Insight */}
        {(() => {
  const rouLevel = getRoutineLevel(summary.traitScores.routine);
  const RouComponent = routineComponents[rouLevel] || null;
  return RouComponent ? <RouComponent /> : null;
})()}

                <hr style={{
                  border: 0,
                  borderTop: "1px solid #e4ebf0",         // updated HR color
                  margin: "1rem 0"                        // reduced HR margin
                }} />

                {/* Focus Insight */}
       {(() => {
  const focLevel = getFocusLevel(summary.traitScores.focus);
  const FocComponent = focusComponents[focLevel] || null;
  return FocComponent ? <FocComponent /> : null;
})()}
              </div>
            </div>
            {/* Self-Awareness Reflection: render one matching level */}
  {/* Self-Awareness Reflection: render one matching level */}
{(() => {
  const level = getSelfAwarenessLevel(summary.total);
  const SelfComponent = selfAwarenessComponents[level] || null;
  return SelfComponent ? <SelfComponent /> : null;
})()}
{/* Natural Strengths: render one matching level */}
{(() => {
  const minScore = Math.min(
    summary.traitScores.social,
    summary.traitScores.sensory,
    summary.traitScores.routine,
    summary.traitScores.communication,
    summary.traitScores.focus
  );
  const level = getNaturalStrengthLevel(minScore);
  const NatComponent = naturalStrengthComponents[level] || null;
  return NatComponent ? <NatComponent /> : null;
})()}
          </div>
          {/* Dynamic trait insight components removed during MDX transition */}
        </div>

        {/* Disclaimer and PDF download button, grouped together */}
        <div
          style={{
            maxWidth: "800px",
            margin: "3rem auto 0 auto",
            background: "#f9fbfc",
            padding: "1rem 1.5rem",
            borderRadius: "12px",
            border: "1px solid #e4ebf0",
            fontStyle: "italic",
            color: "#4A4A4A",
            textAlign: "center",
            boxShadow: "0 0 10px rgba(74, 144, 164, 0.05)",
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
                background: "#4A90A4",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Download as PDF
            </button>
          </div>
        </div>

{/* Resources & Support Section (static) */}
<div
  style={{
    maxWidth: "800px",
    margin: "3rem auto 0 auto",
    background: "#ffffff",
    padding: "2rem",
    borderRadius: "12px",
    border: "1px solid #e4ebf0",
    boxShadow: "0 0 15px rgba(0,0,0,0.05)",
  }}
>
  {/* Header with icon */}
  <div
    style={{
      textAlign: "center",
      marginBottom: "1.5rem",
      paddingBottom: "0.75rem",
      borderBottom: "1px solid #e4ebf0",
    }}
  >
    <h2
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        fontSize: "1.75rem",
        color: "#31758a",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        fill="#31758a"
        viewBox="0 0 24 24"
      >
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </svg>
      Resources & Support
    </h2>
  </div>

  {/* Introductory Text */}
  <p
    style={{
      fontSize: "1rem",
      color: "#4a4a4a",
      marginBottom: "1.5rem",
      textAlign: "center",
    }}
  >
    A curated list of organizations, helplines, and online resources for support and information:
  </p>

  {/* Two-column layout for resource links */}
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: "1rem 2rem",
    }}
  >
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <a
        href="https://www.autismspeaks.org"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontWeight: 600,
          color: "#4e7fff",
          textDecoration: "none",
          borderBottom: "1px solid #e4ebf0",
          paddingBottom: "0.5rem",
        }}
      >
        Autism Speaks
      </a>
      <p style={{ margin: 0, fontSize: "0.95rem", color: "#333" }}>
        Comprehensive resources, toolkits, and local support group information.
      </p>

      <a
        href="https://nationalautismassociation.org"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontWeight: 600,
          color: "#4e7fff",
          textDecoration: "none",
          borderBottom: "1px solid #e4ebf0",
          paddingBottom: "0.5rem",
        }}
      >
        National Autism Association
      </a>
      <p style={{ margin: 0, fontSize: "0.95rem", color: "#333" }}>
        Safety resources, free toolkits, and parent support networks.
      </p>

      <a
        href="https://autisticadvocacy.org"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontWeight: 600,
          color: "#4e7fff",
          textDecoration: "none",
          borderBottom: "1px solid #e4ebf0",
          paddingBottom: "0.5rem",
        }}
      >
        Autistic Self Advocacy Network (ASAN)
      </a>
      <p style={{ margin: 0, fontSize: "0.95rem", color: "#333" }}>
        Advocacy, policy updates, and community stories from autistic individuals.
      </p>

      <a
        href="https://childmind.org"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontWeight: 600,
          color: "#4e7fff",
          textDecoration: "none",
          borderBottom: "1px solid #e4ebf0",
          paddingBottom: "0.5rem",
        }}
      >
        Child Mind Institute
      </a>
      <p style={{ margin: 0, fontSize: "0.95rem", color: "#333" }}>
        Guides on diagnosis, therapy options, and coping strategies for families.
      </p>
    </div>

    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <a
        href="https://www.autism-society.org"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontWeight: 600,
          color: "#4e7fff",
          textDecoration: "none",
          borderBottom: "1px solid #e4ebf0",
          paddingBottom: "0.5rem",
        }}
      >
        Autism Society
      </a>
      <p style={{ margin: 0, fontSize: "0.95rem", color: "#333" }}>
        Nationwide listings of local chapters, events, and assistance programs.
      </p>

      <a
        href="tel:988"
        style={{
          fontWeight: 600,
          color: "#4e7fff",
          textDecoration: "none",
          borderBottom: "1px solid #e4ebf0",
          paddingBottom: "0.5rem",
        }}
      >
        National Suicide Prevention Lifeline: 988
      </a>
      <p style={{ margin: 0, fontSize: "0.95rem", color: "#333" }}>
        Call 988 (U.S. only) for 24/7 crisis support.
      </p>

      <a
        href="sms:741741"
        style={{
          fontWeight: 600,
          color: "#4e7fff",
          textDecoration: "none",
          borderBottom: "1px solid #e4ebf0",
          paddingBottom: "0.5rem",
        }}
      >
        Crisis Text Line: 741741
      </a>
      <p style={{ margin: 0, fontSize: "0.95rem", color: "#333" }}>
        Text 741741 to connect with a trained counselor (U.S. & Canada).
      </p>

      <a
        href="tel:1-800-799-7233"
        style={{
          fontWeight: 600,
          color: "#4e7fff",
          textDecoration: "none",
          borderBottom: "1px solid #e4ebf0",
          paddingBottom: "0.5rem",
        }}
      >
        National Domestic Violence Hotline: 1-800-799-7233
      </a>
      <p style={{ margin: 0, fontSize: "0.95rem", color: "#333" }}>
        24/7 support for individuals facing domestic violence (U.S.).
      </p>

      <a
        href="tel:211"
        style={{
          fontWeight: 600,
          color: "#4e7fff",
          textDecoration: "none",
          borderBottom: "1px solid #e4ebf0",
          paddingBottom: "0.5rem",
        }}
      >
        211
      </a>
      <p style={{ margin: 0, fontSize: "0.95rem", color: "#333" }}>
        Dial 211 for local health and human services information in the U.S.
      </p>
    </div>
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