import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { auth, db } from "../lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { calculateScore } from "../utils/calculateScore";
import { flagQuestions } from "../utils/flagQuestions";
import { getSelfAwarenessLevel } from "../utils/getSelfAwarenessLevel";
import { getNaturalStrengthLevel } from "../utils/getNaturalStrengthLevel";
import { getFlaggedLevel } from "../utils/getFlaggedLevel";
import { onAuthStateChanged, User } from "firebase/auth";
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
import { questions } from "../questions";
import {
  getQuizRunId,
  getQuizAnswers,
} from "../utils/storage";

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


// Define the Summary type above the component
type Summary = {
  total: number;
  traitScores: {
    social: number;
    sensory: number;
    routine: number;
    communication: number;
    focus: number;
  };
  flags: number[];
};

export default function FullReportPage() {
  // Auth state handling
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Summary state (initial values)
  const [summary, setSummary] = useState<Summary>({
    total: 0,
    traitScores: { social: 0, sensory: 0, routine: 0, communication: 0, focus: 0 },
    flags: [],
  });
  const reportRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u: User | null) => {
      setUser(u);
      setAuthLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // --- MAIN LOGIC (WAIT FOR AUTH) ---
  useEffect(() => {
    if (authLoading) return; // Wait for Firebase Auth to load

    if (!user) {
      router.replace("/login");
      return;
    }

    const init = async () => {
      // Prefer sessionId from query string, fallback to storage
      const urlSessionId = router.query.sessionId as string | undefined;
      const sessionId = urlSessionId ?? getQuizRunId();
      if (typeof sessionId !== "string" || !sessionId) {
        router.replace("/results");
        return;
      }

      // Check payment status
      try {
        const res = await fetch(`/api/verify-payment?uid=${user?.uid}&sessionId=${sessionId}`);
        const data = await res.json();
        if (!data.paid) {
          router.replace("/results");
          return;
        }
      } catch (err) {
        console.error("Error verifying payment:", err);
        router.replace("/results");
        return;
      }

      // Fetch answers from Firestore, fallback to storage
      let answers: number[] | null = null;
      try {
        const runDoc = await getDoc(doc(db, "quizRuns", sessionId));
        if (runDoc.exists()) {
          const runData = runDoc.data();
          if (Array.isArray(runData.answers) && runData.answers.length === questions.length) {
            answers = runData.answers;
          }
        }
      } catch {
        // fallback to local storage
        const raw = getQuizAnswers();
        if (raw && raw.length === questions.length) {
          answers = raw;
        }
      }

      if (!answers || answers.length !== questions.length) {
        console.error("Invalid or missing answers for session:", sessionId);
        router.replace("/results");
        return;
      }

      // Compute summary
      const { total, traitScores } = calculateScore(answers);
      const flags = flagQuestions.filter(qId => {
        const val = answers[qId - 1];
        return typeof val === "number" && val >= 0.67;
      });

      const roundedTraitScores = {
        social: Math.round(traitScores.social),
        sensory: Math.round(traitScores.sensory),
        routine: Math.round(traitScores.routine),
        communication: Math.round(traitScores.communication),
        focus: Math.round(traitScores.focus),
      };
      const roundedTotal = Math.round(total);

      // Save report to Firestore
      try {
        await setDoc(
          doc(db, "reports", user.uid, "sessions", sessionId),
          {
            paid: true,
            totalScore: roundedTotal,
            traitScores: roundedTraitScores,
            flags,
            answers,
            generatedAt: new Date(),
          },
          { merge: true }
        );
      } catch (error) {
        console.error("Error saving report to Firestore:", error);
      }

      setSummary({ total: roundedTotal, traitScores: roundedTraitScores, flags });
      setLoading(false);
    };

    init();
  }, [authLoading, user, router]);

  if (authLoading) {
    return <div style={{ textAlign: "center", marginTop: "5rem" }}>Checking login status…</div>;
  }
  if (!isClient || loading) {
    return <div style={{ textAlign: "center", marginTop: "5rem" }}>Checking access...</div>;
  }

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

  // All trait/insight rendering below uses summary, which is always based on the session-specific answers loaded above.

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
  {/* Primary SEO */}
  <title>Full Diagnostic Report | Autism & Asperger’s Trait Insights – MyAspergersQuiz.com</title>
  <meta name="description" content="Your complete, science-backed autism and Asperger’s full report: trait analysis, strengths, self-awareness reflections, and personalized recommendations. Private, instant, and downloadable as PDF." />
  <meta name="keywords" content="autism report, autism quiz results, Asperger's report, diagnostic report, spectrum traits, neurodiversity, autism test, ASD, quiz insights, trait breakdown, personalized autism report, full assessment, MyAspergersQuiz.com" />
  <meta name="author" content="MyAspergersQuiz Team" />
  <meta name="copyright" content="MyAspergersQuiz.com" />
  <meta name="subject" content="Personal Autism Spectrum Full Report" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  <meta name="referrer" content="origin-when-cross-origin" />
  <meta name="theme-color" content="#31758a" />
  <meta httpEquiv="content-language" content="en" />
  <link rel="canonical" href="https://myaspergersquiz.com/full-report" />
  <link rel="alternate" href="https://myaspergersquiz.com/full-report" hrefLang="en-au" />
  <link rel="alternate" href="https://myaspergersquiz.com/full-report" hrefLang="en-us" />
  <link rel="alternate" href="https://myaspergersquiz.com/full-report" hrefLang="x-default" />

  {/* Open Graph / Facebook / LinkedIn */}
  <meta property="og:type" content="article" />
  <meta property="og:title" content="Full Report – Personalized Autism & Asperger’s Insights" />
  <meta property="og:description" content="Get your private, in-depth autism spectrum results with trait analysis, insights, strengths, and personalized recommendations. Download as PDF." />
  <meta property="og:image" content="https://myaspergersquiz.com/og-full-report.jpg" />
  <meta property="og:image:alt" content="Screenshot of a full autism report from MyAspergersQuiz.com" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:url" content="https://myaspergersquiz.com/full-report" />
  <meta property="og:site_name" content="MyAspergersQuiz.com" />
  <meta property="og:locale" content="en_AU" />
  <meta property="article:section" content="Results" />
  <meta property="article:author" content="MyAspergersQuiz Team" />
  <meta property="article:published_time" content="2025-05-25T09:00:00+10:00" />
  <meta property="article:modified_time" content={new Date().toISOString()} />

  {/* Twitter/X */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Full Report – Personalized Autism & Asperger’s Insights" />
  <meta name="twitter:description" content="Your unique spectrum report with insights, strengths, and trait breakdown. Instantly downloadable. Private and secure." />
  <meta name="twitter:image" content="https://myaspergersquiz.com/og-full-report.jpg" />
  <meta name="twitter:image:alt" content="Preview of your autism report from MyAspergersQuiz.com" />
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

  {/* JSON-LD: Article, MedicalWebPage, FAQPage, BreadcrumbList, Organization */}
  <script type="application/ld+json">{`
    {
      "@context": "https://schema.org",
      "@type": ["Article", "MedicalWebPage", "FAQPage"],
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://myaspergersquiz.com/full-report"
      },
      "headline": "Full Report – Detailed Autism & Asperger’s Trait Analysis",
      "description": "A personalized summary of autism and Asperger’s traits including strengths, insights, and helpful tools. Instantly generated from your quiz results at MyAspergersQuiz.com.",
      "image": "https://myaspergersquiz.com/og-full-report.jpg",
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
          "name": "Is this autism report a diagnosis?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. This full report is educational and for self-reflection only. For a clinical diagnosis, please consult a licensed professional."
          }
        },
        {
          "@type": "Question",
          "name": "How do I download my report?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Click the 'Download PDF' button on your report page to save or print your personalized summary instantly."
          }
        },
        {
          "@type": "Question",
          "name": "Are my results private?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, your report and answers are private and protected. Only you can view and download your full report."
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
        { "@type": "ListItem", "position": 2, "name": "Full Report", "item": "https://myaspergersquiz.com/full-report" }
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
      <main
        role="main"
        aria-label="Full Diagnostic Report"
        style={{
          padding: "4rem 1rem",
          background: "#ffffff",
          color: "#1a1a1a",
          fontFamily: "'Inter', sans-serif",
          minHeight: "100vh",
          width: "100%",
          overflowX: "hidden",
          boxSizing: "border-box",
        }}
      >
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "2rem"
        }}>
          <h1 style={{
            fontSize: "clamp(1.7rem, 5vw, 2.2rem)",
            color: "#4A90A4",
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }}>
            {/* Inline SVG icon to the left of the text */}
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#4A90A4" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
              <path d="M5 4v16h14V4H5zm13 15H6V5h12v14zm-5-9H8v-1h5v1zm0 3H8v-1h5v1zm0 3H8v-1h5v1zm6-9h-2V5h2v2zm0 3h-2V8h2v2zm0 3h-2v-2h2v2zm0 3h-2v-2h2v2z"/>
            </svg>
            Full Report
          </h1>
          <button
            onClick={handleDownload}
            style={{
              background: "#31758a",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              padding: "1rem 2rem",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 0.2s"
            }}
            onMouseOver={e => (e.currentTarget.style.background = "#285e6e")}
            onMouseOut={e => (e.currentTarget.style.background = "#31758a")}
          >
            Download PDF
          </button>
        </div>

        {/* --- Dynamic MDX Sections removed --- */}

        <div
          ref={reportRef}
          style={{
            background: "#ffffff",
            border: "1px solid #e4ebf0",
            borderRadius: "12px",
            padding: "2rem",
            maxWidth: "800px",
            margin: "0 auto",
            width: "100%",
            boxSizing: "border-box",
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
              <h3 style={{ fontSize: "clamp(1.1rem, 3vw, 1.4rem)", marginBottom: "1rem", color: "#4A90A4" }}>Trait Visual Breakdown</h3>
            </div>

            <TraitLevelsAtAGlance scores={summary.traitScores} />

          </div>
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
{/* Self-Awareness Reflection: render one matching level */}
{(() => {
  const level = getSelfAwarenessLevel(summary.total);
  const SelfComponent = selfAwarenessComponents[level] || null;
  return SelfComponent ? <SelfComponent /> : null;
})()}

          <div className="insight-section">
            {/* Trait Insights header */}
            <h2 style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "clamp(1.3rem, 4vw, 1.75rem)",
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
              gap: "1rem"
            }}>
              {/* Communication Insight */}
              {(() => {
                const commLevel = getCommunicationLevel(summary.traitScores.communication);
                const CommComponent = communicationComponents[commLevel] || null;
                return CommComponent ? <CommComponent /> : null;
              })()}

              <hr style={{
                border: 0,
                borderTop: "1px solid #e4ebf0",
                margin: "1rem 0"
              }} />

              {/* Social Insight */}
              {(() => {
                const socLevel = getSocialLevel(summary.traitScores.social);
                const SocComponent = socialComponents[socLevel] || null;
                return SocComponent ? <SocComponent /> : null;
              })()}

              <hr style={{
                border: 0,
                borderTop: "1px solid #e4ebf0",
                margin: "1rem 0"
              }} />

              {/* Sensory Insight */}
              {(() => {
                const senLevel = getSensoryLevel(summary.traitScores.sensory);
                const SenComponent = sensoryComponents[senLevel] || null;
                return SenComponent ? <SenComponent /> : null;
              })()}

              <hr style={{
                border: 0,
                borderTop: "1px solid #e4ebf0",
                margin: "1rem 0"
              }} />

              {/* Routine Insight */}
              {(() => {
                const rouLevel = getRoutineLevel(summary.traitScores.routine);
                const RouComponent = routineComponents[rouLevel] || null;
                return RouComponent ? <RouComponent /> : null;
              })()}

              <hr style={{
                border: 0,
                borderTop: "1px solid #e4ebf0",
                margin: "1rem 0"
              }} />

              {/* Focus Insight */}
              {(() => {
                const focLevel = getFocusLevel(summary.traitScores.focus);
                const FocComponent = focusComponents[focLevel] || null;
                return FocComponent ? <FocComponent /> : null;
              })()}
            </div>
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
                background: "#31758a",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                padding: "1rem 2rem",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "background 0.2s"
              }}
              onMouseOver={e => (e.currentTarget.style.background = "#285e6e")}
              onMouseOut={e => (e.currentTarget.style.background = "#31758a")}
            >
              Download as PDF
            </button>
          </div>
        </div>

{/* Resources & Support Section (static) */}
    <div
      style={{
        maxWidth: "960px",
        margin: "3rem auto",
        background: "#ffffff",
        padding: "2.5rem",
        borderRadius: "12px",
        border: "1px solid #d9e4e8",
        boxShadow: "0 4px 12px rgba(49, 117, 138, 0.06)"
      }}
    >
      <h2
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          fontSize: "clamp(1.4rem, 5vw, 2rem)",
          color: "#31758a",
          marginBottom: "1.5rem",
          borderBottom: "1px solid #d9e4e8",
          paddingBottom: "0.75rem"
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#31758a" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
        Resources & Support
      </h2>
      <p style={{ fontSize: "0.9rem", color: "#5a6e74", marginBottom: "1rem", textAlign: "center" }}>
        Tap or click any heading below to open the full resource in a new tab.
      </p>
      <p style={{ fontSize: "1rem", color: "#4a4a4a", marginBottom: "2rem" }}>
        A curated list of helpful organizations, crisis helplines, and support networks:
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1.5rem"
        }}
      >
        {[
          {
            name: "Autism Speaks",
            url: "https://www.autismspeaks.org",
            desc: "Comprehensive resources, toolkits, and local support group information."
          },
          {
            name: "National Autism Association",
            url: "https://nationalautismassociation.org",
            desc: "Safety resources, free toolkits, and parent support networks."
          },
          {
            name: "Autistic Self Advocacy Network (ASAN)",
            url: "https://autisticadvocacy.org",
            desc: "Policy updates, self-advocacy, and community stories."
          },
          {
            name: "Child Mind Institute",
            url: "https://childmind.org",
            desc: "Guides on diagnosis, therapy, and coping strategies for families."
          },
          {
            name: "Autism Society",
            url: "https://www.autism-society.org",
            desc: "Nationwide chapters, events, and services."
          },
          {
            name: "211 Helpline",
            url: "tel:211",
            desc: "Dial 211 for local health and human services (U.S.)."
          }
        ].map(({ name, url, desc }) => (
          <div
            key={name}
            style={{
              background: "#ffffff",
              border: "1px solid #e4ebf0",
              borderRadius: "10px",
              padding: "1rem",
              height: "160px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "box-shadow 0.3s ease",
              boxShadow: "0 0 10px rgba(74, 144, 164, 0.05)"
            }}
            onMouseOver={(e) => (e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)")}
            onMouseOut={(e) => (e.currentTarget.style.boxShadow = "0 0 10px rgba(74, 144, 164, 0.05)")}
          >
            <a
              href={url}
              target={url.startsWith("http") ? "_blank" : "_self"}
              rel="noopener noreferrer"
              style={{
                fontWeight: 600,
                fontSize: "1.1rem",
                color: "#31758a",
                textDecoration: "none",
                display: "block",
                marginBottom: "0.5rem"
              }}
            >
              {name}
            </a>
            <p style={{ fontSize: "0.95rem", color: "#333", margin: 0 }}>{desc}</p>
          </div>
        ))}
      </div>
    </div>
    </main>
    {/* Report generated info at the very bottom */}
    <div style={{ marginTop: "3rem", fontSize: "0.95rem", opacity: 0.6, textAlign: "center" }}>
      <p>Report generated on: {new Date().toLocaleDateString()}</p>
      <p>Quiz version: v1.0.0</p>
    </div>
  </>
  );
}
/* setIsClient is now handled by useState; no implementation needed here. */
