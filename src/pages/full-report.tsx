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
import TraitLevelsAtAGlance from "../components/TraitLevelsAtAGlance";
import {
  getSocialLevel,
  getSensoryLevel,
  getRoutineLevel,
  getFocusLevel,
  getCommunicationLevel,
} from "../utils/getTraitLevel";
import Head from "next/head";
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
  const reportRef = useRef<HTMLDivElement>(null);
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

  const handleImageDownload = async () => {
    if (!reportRef.current) return;
    const html2canvas = (await import("html2canvas")).default;
    const canvas = await html2canvas(reportRef.current);
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "quiz-results.png";
    link.click();
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
        {/* --- HEADER --- */}
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto 2.5rem auto",
            background: "#f9fbfc",
            border: "1.5px solid #e4ebf0",
            borderRadius: "16px",
            boxShadow: "0 4px 18px rgba(49,117,138,0.07)",
            padding: "2.5rem 2rem 2rem 2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem"
          }}>
            <span style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              fontSize: "clamp(2.2rem, 6vw, 2.8rem)",
              fontWeight: 800,
              color: "#31758a",
              letterSpacing: "0.01em",
              textShadow: "0 2px 8px rgba(49,117,138,0.07)"
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" fill="#31758a" viewBox="0 0 24 24">
                <path d="M5 4v16h14V4H5zm13 15H6V5h12v14zm-5-9H8v-1h5v1zm0 3H8v-1h5v1zm0 3H8v-1h5v1zm6-9h-2V5h2v2zm0 3h-2V8h2v2zm0 3h-2v-2h2v2zm0 3h-2v-2h2v2z"/>
              </svg>
              Full Report
            </span>
            <span style={{
              fontSize: "1.15rem",
              color: "#4a6e7a",
              fontWeight: 500,
              marginTop: "0.25rem",
              letterSpacing: "0.01em",
              textAlign: "center"
            }}>
              Your personalized autism &amp; Asperger’s spectrum results
            </span>
          </div>
          <div style={{
            display: "flex",
            gap: "1.5rem",
            justifyContent: "center",
            flexWrap: "wrap"
          }}>
            <button
              onClick={handleDownload}
              style={buttonStyle}
              onMouseOver={e => (e.currentTarget.style.background = "#285e6e")}
              onMouseOut={e => (e.currentTarget.style.background = "#31758a")}
            >
              Download as PDF
            </button>
            <button
              onClick={handleImageDownload}
              style={buttonStyle}
              onMouseOver={e => (e.currentTarget.style.background = "#285e6e")}
              onMouseOut={e => (e.currentTarget.style.background = "#31758a")}
            >
              Download as Image
            </button>
          </div>
        </div>

        {/* --- MAIN REPORT CONTENT --- */}
        <div ref={reportRef} style={{ width: "100%", maxWidth: 1100, margin: "0 auto" }}>
          {/* Section Helper for consistent headers */}
          {/** Helper function for section headers */}
          {/*
            function SectionHeader({ children }: { children: React.ReactNode }) {
              return (
                <div
                  style={{
                    background: "#f9fbfc",
                    border: "1px solid #e4ebf0",
                    borderRadius: "10px",
                    padding: "0.75rem 1rem",
                    marginBottom: "1.2rem",
                    textAlign: "center",
                    fontWeight: 700,
                    fontSize: "1.25rem",
                    color: "#31758a",
                    letterSpacing: "0.01em",
                    boxShadow: "0 2px 8px rgba(49,117,138,0.04)"
                  }}
                >
                  {children}
                </div>
              );
            }
          */}

          {/* 1. Overall Score */}
          <section style={{ marginBottom: "2.5rem" }}>
            <div style={sectionHeaderStyle}>Your Overall Results</div>
            <TraitLevelsAtAGlance scores={summary.traitScores} />
          </section>

          {/* 2. How You Fit In */}
          <section style={{ marginBottom: "2.5rem" }}>
            <div style={sectionHeaderStyle}>How You Fit In</div>
            {(() => {
              const level = getOverallLevel(summary.total);
              const HowYouFitIn = howYouFitInComponents[level];
              return HowYouFitIn ? <HowYouFitIn key={`howyoufitin-${level}`} /> : null;
            })()}
          </section>

          {/* 3. Natural Strengths */}
          <section style={{ marginBottom: "2.5rem" }}>
            <div style={sectionHeaderStyle}>Natural Strengths</div>
            {(() => {
              const level = getNaturalStrengthLevel(summary.total);
              const NaturalStrength = naturalStrengthComponents[level];
              return NaturalStrength ? <NaturalStrength key={`strength-${level}`} /> : null;
            })()}
          </section>

          {/* 4. Key Traits Worth Noting & Trait Insights side by side */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "2rem",
              marginBottom: "2.5rem",
              alignItems: "stretch",
            }}
          >
            {/* Key Traits Worth Noting */}
            <section
              style={{
                flex: 1,
                minWidth: 320,
                display: "flex",
                flexDirection: "column",
                height: "700px",
                background: "none",
                border: "none",
                padding: 0,
                boxSizing: "border-box",
              }}
            >
              <div style={sectionHeaderStyle}>Key Traits Worth Noting</div>
              <div style={{ flex: 1, minHeight: 0, overflowY: "auto" }}>
                {(() => {
                  const count = summary.flags.length;
                  if (count === 0) return <FlaggedLevel1 />;
                  if (count <= 4) return <FlaggedLevel2 flaggedIds={summary.flags} />;
                  if (count <= 8) return <FlaggedLevel3 flaggedIds={summary.flags} />;
                  if (count <= 12) return <FlaggedLevel4 flaggedIds={summary.flags} />;
                  return <FlaggedLevel5 flaggedIds={summary.flags} />;
                })()}
              </div>
            </section>

            {/* Trait Insights */}
            <section
              style={{
                flex: 2,
                minWidth: 320,
                display: "flex",
                flexDirection: "column",
                height: "700px",
                background: "none",
                border: "none",
                padding: 0,
                boxSizing: "border-box",
              }}
            >
              <div style={sectionHeaderStyle}>Trait Insights</div>
              <div style={{ flex: 1, minHeight: 0, overflowY: "auto" }}>
                <div style={{ marginBottom: "1.5rem" }}>
                  {(() => {
                    const level = getCommunicationLevel(summary.traitScores.communication);
                    const Comm = communicationComponents[level];
                    return Comm ? <Comm key={`comm-${level}`} /> : null;
                  })()}
                </div>
                <div style={{ marginBottom: "1.5rem" }}>
                  {(() => {
                    const level = getSocialLevel(summary.traitScores.social);
                    const Social = socialComponents[level];
                    return Social ? <Social key={`social-${level}`} /> : null;
                  })()}
                </div>
                <div style={{ marginBottom: "1.5rem" }}>
                  {(() => {
                    const level = getSensoryLevel(summary.traitScores.sensory);
                    const Sensory = sensoryComponents[level];
                    return Sensory ? <Sensory key={`sensory-${level}`} /> : null;
                  })()}
                </div>
                <div style={{ marginBottom: "1.5rem" }}>
                  {(() => {
                    const level = getRoutineLevel(summary.traitScores.routine);
                    const Routine = routineComponents[level];
                    return Routine ? <Routine key={`routine-${level}`} /> : null;
                  })()}
                </div>
                <div>
                  {(() => {
                    const level = getFocusLevel(summary.traitScores.focus);
                    const Focus = focusComponents[level];
                    return Focus ? <Focus key={`focus-${level}`} /> : null;
                  })()}
                </div>
              </div>
            </section>
          </div>

          {/* 5. Self-Awareness Reflections */}
          <div style={{ width: "100%", maxWidth: 1100, margin: "0 auto 2.5rem auto" }}>
            <div style={sectionHeaderStyle}>Self-Awareness Reflections</div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <section style={{ width: "100%", maxWidth: 650 }}>
                {(() => {
                  const level = getSelfAwarenessLevel(summary.total);
                  const SelfAwareness = selfAwarenessComponents[level];
                  return SelfAwareness ? <SelfAwareness key={`selfaware-${level}`} /> : null;
                })()}
              </section>
            </div>
          </div>
        </div>

        {/* --- RESOURCES & SUPPORT --- */}
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
          <div style={sectionHeaderStyle}>
            <span style={{ display: "flex", alignItems: "center", gap: "0.5rem", justifyContent: "center" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#31758a" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
              Resources & Support
            </span>
          </div>
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
        {/* Report generated info at the very bottom */}
        <div style={{ marginTop: "3rem", fontSize: "0.95rem", opacity: 0.6, textAlign: "center" }}>
          <p>Report generated on: {new Date().toLocaleDateString()}</p>
          <p>Quiz version: v1.0.0</p>
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
              style={buttonStyle}
              onMouseOver={e => (e.currentTarget.style.background = "#285e6e")}
              onMouseOut={e => (e.currentTarget.style.background = "#31758a")}
            >
              Download as PDF
            </button>
            <button
              onClick={handleImageDownload}
              style={{ ...buttonStyle, marginLeft: "1rem" }}
              onMouseOver={e => (e.currentTarget.style.background = "#285e6e")}
              onMouseOut={e => (e.currentTarget.style.background = "#31758a")}
            >
              Download as Image
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

const sectionHeaderStyle = {
  background: "#f9fbfc",
  border: "1px solid #e4ebf0",
  borderRadius: "10px",
  padding: "0.75rem 1rem",
  marginBottom: "1.2rem",
  textAlign: "center" as const,
  fontWeight: 700,
  fontSize: "1.25rem",
  color: "#31758a",
  letterSpacing: "0.01em",
  boxShadow: "0 2px 8px rgba(49,117,138,0.04)"
};

const buttonStyle = {
  background: "#31758a",
  color: "#fff",
  border: "none",
  borderRadius: "12px",
  padding: "1rem 2rem",
  fontSize: "1rem",
  fontWeight: 600,
  cursor: "pointer",
  transition: "background 0.2s"
};
