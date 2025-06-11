import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { questions } from "../questions";
import { db, auth } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { calculateScore } from "../utils/calculateScore";
import { getOverallLevel } from "../utils/getOverallLevel";
import { flagQuestions } from "../utils/flagQuestions";
import {
  getQuizRunId,
  setQuizRunId,
  clearQuizRunId,
  setQuizAnswers,
  clearQuizAnswers,
} from "../utils/storage";

export default function QuizPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(0));
  const [selected, setSelected] = useState<number | null>(null);
  const [showExamples, setShowExamples] = useState<boolean[]>(
    Array(questions.length).fill(false)
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // On mount, create and store a new quiz ID, clear previous answers
    const newQuizId = crypto.randomUUID();
    setQuizRunId(newQuizId);
    clearQuizAnswers();
  }, []);

  useEffect(() => {
    const editIndex = localStorage.getItem("mq_edit_index");
    if (editIndex !== null) {
      const index = parseInt(editIndex, 10);
      if (!isNaN(index) && index >= 0 && index < questions.length) {
        setCurrentIndex(index);
      }
      localStorage.removeItem("mq_edit_index");
    }
  }, []);

  const currentQuestion = questions[currentIndex];

  const handleAnswer = async (value: number) => {
    setSelected(value);
    setTimeout(async () => {
      const updated = [...answers];
      updated[currentIndex] = value;
      setAnswers(updated);

      setSelected(null);

      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setIsSubmitting(true);
        // Firestore reporting: use the same sessionId everywhere
        const user = auth.currentUser;
        const sessionId = getQuizRunId();

        try {
          if (user && sessionId) {
            // Calculate scores & flags for the report
            const { total, traitScores } = calculateScore(updated);
            const level = getOverallLevel(total);
            const triggeredFlags = flagQuestions.filter(idx => updated[idx - 1] >= 0.67);

            // Save quiz run for resuming (existing logic)
            await setDoc(doc(db, "quizRuns", sessionId), {
              uid: user.uid,
              sessionId: sessionId,
              createdAt: Date.now(),
              answers: updated
            });

            // --- NEW: Save full report data for payment unlock/profile ---
            await setDoc(doc(db, "reports", user.uid, "sessions", sessionId), {
              answers: updated,
              total,
              traitScores,
              level,
              flags: triggeredFlags,
              createdAt: Date.now(),
              paid: false // webhook will update this after payment
            });
          }
          setQuizAnswers(updated);
          router.push("/results");
        } catch (err) {
          alert("There was a problem saving your results. Please try again.");
        }
      }
    }, 250); // Shorter delay for visual feedback
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const percentComplete = Math.round((currentIndex / questions.length) * 100);

  const numQuestions = questions.length;
  const weightPerQuestion = 40 / numQuestions; // e.g., 2 if 20 questions
  const noWeight = 0;
  const maybeWeight = parseFloat((weightPerQuestion * (1 / 3)).toFixed(2));     // e.g., 0.67 when rounded to two decimals
  const kindOfWeight = parseFloat((weightPerQuestion * (2 / 3)).toFixed(2));    // e.g., 1.33 when rounded
  const yesWeight = weightPerQuestion;                                          // e.g., 2

  return (
    <>
      <Head>
        {/* Primary SEO */}
        <title>{`Question ${currentIndex + 1} – Autism Spectrum Traits Quiz | MyAspergersQuiz.com`}</title>
        <meta name="description" content="Take the research-backed MyAspergersQuiz – a 40-question self-assessment to explore autism spectrum traits. Free, anonymous, instant results. Mobile friendly, no account required." />
        <meta name="keywords" content="autism quiz, aspergers self test, online autism quiz, spectrum traits, neurodivergent, autism assessment, free autism test, ASD quiz, online autism screener, instant results, self-reflection, social, sensory, routine, communication, focus, MyAspergersQuiz" />
        <meta name="author" content="MyAspergersQuiz Team" />
        <meta name="copyright" content="MyAspergersQuiz.com" />
        <meta name="subject" content="Autism Spectrum Self-Assessment Quiz" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://myaspergersquiz.com/quiz" />
        <link rel="alternate" href="https://myaspergersquiz.com/quiz" hrefLang="en-au" />
        <link rel="alternate" href="https://myaspergersquiz.com/quiz" hrefLang="en-us" />
        <link rel="alternate" href="https://myaspergersquiz.com/quiz" hrefLang="x-default" />

        {/* Open Graph / Social */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Take the Autism Spectrum Traits Quiz | MyAspergersQuiz.com" />
        <meta property="og:description" content="Answer 40 questions and get instant insight into social, sensory, routine, and focus traits. 100% private. No sign up needed." />
        <meta property="og:image" content="https://myaspergersquiz.com/og-quiz.jpg" />
        <meta property="og:image:alt" content="Preview of the MyAspergersQuiz online autism quiz" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://myaspergersquiz.com/quiz" />
        <meta property="og:site_name" content="MyAspergersQuiz.com" />
        <meta property="og:locale" content="en_AU" />
        <meta property="og:updated_time" content="2025-06-02T00:00:00+10:00" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Take the Autism Spectrum Traits Quiz" />
        <meta name="twitter:description" content="Free, private, research-backed online quiz for autism spectrum traits. Instantly see your results." />
        <meta name="twitter:image" content="https://myaspergersquiz.com/og-quiz.jpg" />
        <meta name="twitter:image:alt" content="Screenshot of the MyAspergersQuiz autism spectrum quiz" />
        <meta name="twitter:site" content="@myaspergersquiz" />
        <meta name="twitter:creator" content="@myaspergersquiz" />

        {/* PWA/Apple/Brand */}
        <meta name="apple-mobile-web-app-title" content="MyAspergersQuiz" />
        <meta name="application-name" content="MyAspergersQuiz" />
        <meta name="theme-color" content="#4A90A4" />
        <link rel="icon" href="/myaspergersquiz-logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />

        {/* Performance */}
        <link rel="preload" href="/myaspergersquiz-logo.png" as="image" />
        <link rel="preload" href="/fonts/Inter-var-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

        {/* JSON-LD: Quiz Schema */}
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "Quiz",
            "name": "Autism Spectrum Traits Quiz",
            "description": "A science-based, private online quiz to explore your social, sensory, and routine patterns. Get instant results in minutes.",
            "about": {
              "@type": "Thing",
              "name": "Autism Spectrum Traits"
            },
            "provider": {
              "@type": "Organization",
              "name": "MyAspergersQuiz",
              "url": "https://myaspergersquiz.com/"
            },
            "inLanguage": "en",
            "audience": {
              "@type": "Audience",
              "audienceType": "People interested in self-discovery, autism, and neurodiversity"
            }
          }`}
        </script>
        {/* JSON-LD: FAQPage */}
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Is this quiz free and private?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, MyAspergersQuiz is free, private, and no registration is required unless you want to save your results."
                }
              },
              {
                "@type": "Question",
                "name": "How long does it take?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Typically takes 3–5 minutes to complete all 40 questions."
                }
              },
              {
                "@type": "Question",
                "name": "Who is this quiz for?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The quiz is suitable for adults and older teens seeking self-insight into autism traits. Not a diagnosis."
                }
              }
            ]
          }`}
        </script>
        {/* JSON-LD: BreadcrumbList */}
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://myaspergersquiz.com/" },
              { "@type": "ListItem", "position": 2, "name": "Quiz", "item": "https://myaspergersquiz.com/quiz" }
            ]
          }`}
        </script>
        {/* JSON-LD: Organization */}
        <script type="application/ld+json">
          {`{
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
          }`}
        </script>
      </Head>
      {isSubmitting && (
        <div style={{ textAlign: "center", margin: "2rem" }}>
          <span>Saving your results...</span>
        </div>
      )}
      <main
        className="quiz-container"
        role="main"
        aria-label="Autism Spectrum Quiz"
        style={{
          background: "#f9fbfc",
          color: "#1a1a1a",
          padding: "2rem 1rem",
          minHeight: "100vh",
          fontFamily: "'Inter', sans-serif",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxSizing: "border-box"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
          <img
            src="/myaspergersquiz-logo.png"
            alt="MyAspergersQuiz logo"
            width={32}
            height={32}
            style={{ borderRadius: "6px" }}
            loading="eager"
            onError={e => { (e.target as HTMLImageElement).src = "/fallback-logo.png"; }}
          />
          <h1 style={{ fontSize: "1.4rem", color: "#4A90A4", margin: 0 }}>MyAspergersQuiz</h1>
        </div>
        <section style={{ marginBottom: "1.5rem", textAlign: "center", maxWidth: "600px", marginInline: "auto" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "0.5rem" }}>
            Self-Insight Starts Here
          </h2>
          <p style={{ color: "#4A90A4", fontSize: "1rem", fontWeight: 500, marginTop: "0.25rem", marginBottom: "0.75rem" }}>
            Estimated time to complete: 3–5 minutes
          </p>
          <p style={{ fontSize: "0.95rem", lineHeight: "1.5", opacity: 0.7 }}>
            This quiz is designed to help you explore patterns in how you interact, process, and experience the world around you. Your answers may highlight meaningful insights worth reflecting on.
          </p>
        </section>
        <div
          key={currentIndex}
          className="question-box"
          style={{
            background: "#fff",
            border: "1px solid #d9e4e8",
            borderRadius: "16px",
            padding: "2rem 2rem 2.5rem 2rem",
            width: "100%",
            maxWidth: "480px",
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}
        >
          <h2
            aria-live="polite"
            tabIndex={0}
            style={{ fontWeight: 700, fontSize: "1.75rem", marginBottom: "1rem", color: "#4A90A4" }}
          >
            Question {currentIndex + 1} of {questions.length}
          </h2>
          <p
            className="question-text"
            style={{
              fontSize: "1.1rem",
              lineHeight: "1.5rem",
              height: "6rem",            // fixed height for 4 lines
              overflow: "hidden"
            }}
          >
            {currentQuestion.text}
          </p>
          {currentQuestion.example && (
            <div style={{ marginBottom: "1.5rem" }}>
              <button
                aria-describedby="example-desc"
                aria-label={
                  showExamples[currentIndex]
                    ? `Hide Example for question ${currentIndex + 1}`
                    : `Show Example for question ${currentIndex + 1}`
                }
                onClick={() => {
                  const updated = [...showExamples];
                  updated[currentIndex] = !updated[currentIndex];
                  setShowExamples(updated);
                }}
                style={{
                  background: "none",
                  color: "#5a9aa8",
                  border: "1.5px solid #5a9aa8",
                  borderRadius: "12px",
                  padding: "0.5rem 1rem",
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  marginBottom: "0.75rem",
                  transition: "all 0.2s ease-in-out",
                  fontWeight: 600,
                  width: "fit-content",
                  marginLeft: "auto",
                  marginRight: "auto"
                }}
              >
                {showExamples[currentIndex] ? "Hide Example" : "Show Example"}
              </button>
              {showExamples[currentIndex] && (
                <div
                  id="example-desc"
                  style={{
                    background: "#eaf6f8",
                    padding: "1rem 1.25rem",
                    borderRadius: "12px",
                    fontSize: "1rem",
                    color: "#1a1a1a",
                    border: "1px solid #4A90A4",
                    textAlign: "left",
                    lineHeight: 1.7
                  }}
                >
                  <strong style={{ color: "#31758a" }}>Example:</strong> {currentQuestion.example}
                </div>
              )}
            </div>
          )}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "100%",
            maxWidth: "500px",
            margin: "0 auto"
          }}>
            <button
              aria-label="Answer Yes"
              onClick={() => handleAnswer(yesWeight)}
              disabled={selected !== null}
              style={{
                width: "100%",
                padding: "0.9rem",
                background: "#5a9aa8",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: selected !== null ? "not-allowed" : "pointer",
                opacity: selected !== null ? 0.6 : 1,
              }}
            >
              Yes
            </button>

            <button
              aria-label="Answer Sometimes"
              onClick={() => handleAnswer(kindOfWeight)}
              disabled={selected !== null}
              style={{
                width: "100%",
                padding: "0.9rem",
                background: "transparent",
                border: "2px solid #5a9aa8",
                color: "#5a9aa8",
                borderRadius: "12px",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: selected !== null ? "not-allowed" : "pointer",
                opacity: selected !== null ? 0.6 : 1,
              }}
            >
              Sometimes
            </button>

            <button
              aria-label="Answer Not Really"
              onClick={() => handleAnswer(maybeWeight)}
              disabled={selected !== null}
              style={{
                width: "100%",
                padding: "0.9rem",
                background: "transparent",
                border: "2px solid #5a9aa8",
                color: "#5a9aa8",
                borderRadius: "12px",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: selected !== null ? "not-allowed" : "pointer",
                opacity: selected !== null ? 0.6 : 1,
              }}
            >
              Not really
            </button>

            <button
              aria-label="Answer No"
              onClick={() => handleAnswer(noWeight)}
              disabled={selected !== null}
              style={{
                width: "100%",
                padding: "0.9rem",
                background: "transparent",
                border: "2px solid #5a9aa8",
                color: "#5a9aa8",
                borderRadius: "12px",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: selected !== null ? "not-allowed" : "pointer",
                opacity: selected !== null ? 0.6 : 1,
              }}
            >
              No
            </button>

            {currentIndex > 0 && (
              <button
                aria-label="Go to Previous Question"
                onClick={handleBack}
                style={{
                  width: "100%",
                  padding: "0.9rem",
                  background: "transparent",
                  border: "2px solid #5a9aa8",
                  color: "#5a9aa8",
                  borderRadius: "12px",
                  fontSize: "1rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                ← Back
              </button>
            )}
          </div>
        </div>

        <div
          className="progress-container"
          style={{
            width: "100%",
            maxWidth: "480px",
            margin: "0 auto",
            marginTop: "2rem",
            marginBottom: "2rem",
            textAlign: "center"
          }}
          aria-label={`Quiz progress: ${percentComplete}% complete`}
          role="progressbar"
          aria-valuenow={percentComplete}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <p style={{ marginBottom: "0.75rem", fontSize: "1rem", fontWeight: 500, opacity: 0.8 }}>
            Progress: <span aria-live="polite">{percentComplete}%</span>
          </p>
          <div style={{
            height: "12px",
            width: "100%",
            background: "#e4ebf0",
            borderRadius: "6px"
          }}>
            <div className="progress-bar" style={{
              width: `${percentComplete}%`,
              height: "100%",
              background: "#4A90A4",
              borderRadius: "6px"
            }} />
          </div>
        </div>
      </main>
    </>
  );
}

const buttonStyle: React.CSSProperties = {
  padding: "1rem 2rem",
  fontSize: "1rem",
  width: "100%",
  maxWidth: "300px",
  background: "#4e7fff",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "background 0.2s ease-in-out",
  textAlign: "center"
};
// No redirect logic is present in this file.

// Reminder: For best accessibility and SEO, set <html lang="en"> globally in _document.js if not already done.