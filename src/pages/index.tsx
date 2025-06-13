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

// Add this to your global CSS (e.g. styles/globals.css) or in a CSS module and import it
// .desktopOnly { display: block; }
// @media (max-width: 599px) { .desktopOnly { display: none !important; } }

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
        const user = auth.currentUser;
        const sessionId = getQuizRunId();

        try {
          if (user && sessionId) {
            const { total, traitScores } = calculateScore(updated);
            const level = getOverallLevel(total);
            const triggeredFlags = flagQuestions.filter(idx => updated[idx - 1] >= 0.67);

            await setDoc(doc(db, "quizRuns", sessionId), {
              uid: user.uid,
              sessionId: sessionId,
              createdAt: Date.now(),
              answers: updated
            });

            await setDoc(doc(db, "reports", user.uid, "sessions", sessionId), {
              answers: updated,
              total,
              traitScores,
              level,
              flags: triggeredFlags,
              createdAt: Date.now(),
              paid: false
            });
          }
          setQuizAnswers(updated);
          router.push("/results");
        } catch (err) {
          alert("There was a problem saving your results. Please try again.");
        }
      }
    }, 250);
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const percentComplete = Math.round((currentIndex / questions.length) * 100);

  const numQuestions = questions.length;
  const weightPerQuestion = 40 / numQuestions;
  const noWeight = 0;
  const maybeWeight = parseFloat((weightPerQuestion * (1 / 3)).toFixed(2));
  const kindOfWeight = parseFloat((weightPerQuestion * (2 / 3)).toFixed(2));
  const yesWeight = weightPerQuestion;

  const boxStyle: React.CSSProperties = {
    background: "#fff",
    border: "1.5px solid #e4ebf0",
    borderRadius: "16px",
    boxShadow: "0 4px 24px rgba(49,117,138,0.07)",
    padding: "clamp(1.2rem, 4vw, 2rem) clamp(0.7rem, 3vw, 1.5rem) clamp(1.7rem, 5vw, 2.2rem)",
    marginBottom: "2.2rem",
    maxWidth: 600,
    width: "95vw",
    marginInline: "auto",
    textAlign: "center",
    boxSizing: "border-box"
  };

  const buttonStyle: React.CSSProperties = {
    width: "100%",
    padding: "clamp(0.8rem, 2vw, 0.9rem)",
    fontSize: "clamp(1rem, 2.5vw, 1.1rem)",
    borderRadius: "12px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    margin: 0
  };

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
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Take the Autism Spectrum Traits Quiz" />
        <meta name="twitter:description" content="Free, private, research-backed online quiz for autism spectrum traits. Instantly see your results." />
        <meta name="twitter:image" content="https://myaspergersquiz.com/og-quiz.jpg" />
        <meta name="twitter:image:alt" content="Screenshot of the MyAspergersQuiz autism spectrum quiz" />
        <meta name="twitter:site" content="@myaspergersquiz" />
        <meta name="twitter:creator" content="@myaspergersquiz" />
        <meta name="apple-mobile-web-app-title" content="MyAspergersQuiz" />
        <meta name="application-name" content="MyAspergersQuiz" />
        <meta name="theme-color" content="#4A90A4" />
        <link rel="icon" href="/myaspergersquiz-logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
        <link rel="preload" href="/myaspergersquiz-logo.png" as="image" />
        <link rel="preload" href="/fonts/Inter-var-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
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
      <main style={{ background: "#fff", minHeight: "100vh", padding: "clamp(1.5rem, 5vw, 2.5rem) 0" }}>
        {/* Self-Insight box: only show on desktop */}
        <section className="desktopOnly" style={boxStyle}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.8rem",
              marginBottom: "1.1rem",
              flexWrap: "wrap"
            }}
          >
            <img
              src="/myaspergersquiz-logo.png"
              alt="MyAspergersQuiz logo"
              width={32}
              height={32}
              style={{
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(49,117,138,0.10)",
                flexShrink: 0,
                minWidth: 32,
                minHeight: 32
              }}
              loading="eager"
              onError={e => { (e.target as HTMLImageElement).src = "/fallback-logo.png"; }}
            />
            <h2
              style={{
                fontSize: "clamp(1.2rem, 4vw, 2.1rem)",
                fontWeight: 900,
                margin: 0,
                color: "transparent",
                background: "linear-gradient(90deg, #31758a 30%,rgb(80, 163, 186) 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "0.01em",
                fontFamily: "'Inter', sans-serif",
                textShadow: "0 2px 8px rgba(49, 88, 100, 0.1)",
                lineHeight: 1.1,
                wordBreak: "break-word"
              }}
            >
              Self-Insight Starts Here
            </h2>
          </div>
          <div style={{
            marginBottom: "0.7rem",
            fontSize: "clamp(0.95rem, 2.5vw, 1.08rem)"
          }}>
            <span style={{
              color: "#4A90A4",
              fontWeight: 800
            }}>
              Estimated time to complete: 3–5 minutes
            </span>
          </div>
          <p style={{
            fontSize: "clamp(0.98rem, 2.5vw, 1.05rem)",
            color: "#3a4a54",
            lineHeight: 1.7,
            opacity: 0.92,
            margin: 0
          }}>
            This quiz is designed to help you explore patterns in how you interact, process, and experience the world around you. Your answers may highlight meaningful insights worth reflecting on.
          </p>
        </section>

        {/* Question Box */}
        <div
          key={currentIndex}
          className="question-box"
          style={{
            background: "#fff",
            border: "1.5px solid #d2e6ee",
            borderRadius: "18px",
            boxShadow: "0 8px 32px rgba(49,117,138,0.10)",
            padding: "clamp(1.2rem, 4vw, 2.2rem) clamp(0.7rem, 3vw, 1.2rem) clamp(2.2rem, 5vw, 2.7rem)",
            width: "95vw",
            maxWidth: "600px",
            textAlign: "center",
            margin: "0 auto",
            transition: "box-shadow 0.2s",
            boxSizing: "border-box"
          }}
        >
          <h2
            aria-live="polite"
            tabIndex={0}
            style={{
              fontWeight: 700,
              fontSize: "clamp(1.2rem, 4vw, 1.75rem)",
              marginBottom: "1rem",
              color: "#4A90A4"
            }}
          >
            Question {currentIndex + 1} of {questions.length}
          </h2>
          <p
            className="question-text"
            style={{
              fontSize: "clamp(1rem, 3vw, 1.1rem)",
              lineHeight: "1.5rem",
              minHeight: "4.5rem",
              marginBottom: "1.2rem",
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
                  fontSize: "clamp(0.9rem, 2vw, 1rem)",
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
                    fontSize: "clamp(0.98rem, 2vw, 1rem)",
                    color: "#1a1a1a",
                    border: "1px solid #4A90A4",
                    textAlign: "left",
                    lineHeight: 1.7,
                    marginTop: "0.7rem"
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
            maxWidth: "600px",
            margin: "0 auto"
          }}>
            <button
              aria-label="Answer Yes"
              onClick={() => handleAnswer(yesWeight)}
              disabled={selected !== null}
              style={{
                ...buttonStyle,
                background: "#5a9aa8",
                color: "#fff",
                border: "none",
                opacity: selected !== null ? 0.6 : 1
              }}
            >
              Yes
            </button>

            <button
              aria-label="Answer Sometimes"
              onClick={() => handleAnswer(kindOfWeight)}
              disabled={selected !== null}
              style={{
                ...buttonStyle,
                background: "transparent",
                border: "2px solid #5a9aa8",
                color: "#5a9aa8",
                opacity: selected !== null ? 0.6 : 1
              }}
            >
              Sometimes
            </button>

            <button
              aria-label="Answer Not Really"
              onClick={() => handleAnswer(maybeWeight)}
              disabled={selected !== null}
              style={{
                ...buttonStyle,
                background: "transparent",
                border: "2px solid #5a9aa8",
                color: "#5a9aa8",
                opacity: selected !== null ? 0.6 : 1
              }}
            >
              Not really
            </button>

            <button
              aria-label="Answer No"
              onClick={() => handleAnswer(noWeight)}
              disabled={selected !== null}
              style={{
                ...buttonStyle,
                background: "transparent",
                border: "2px solid #5a9aa8",
                color: "#5a9aa8",
                opacity: selected !== null ? 0.6 : 1
              }}
            >
              No
            </button>

            {currentIndex > 0 && (
              <button
                aria-label="Go to Previous Question"
                onClick={handleBack}
                style={{
                  ...buttonStyle,
                  background: "transparent",
                  border: "2px solid #5a9aa8",
                  color: "#5a9aa8"
                }}
              >
                ← Back
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div
          className="progress-container"
          style={{
            width: "95vw",
            maxWidth: "600px",
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
          <p style={{
            marginBottom: "0.75rem",
            fontSize: "clamp(1rem, 2vw, 1.1rem)",
            fontWeight: 500,
            opacity: 0.8
          }}>
            Progress: <span aria-live="polite">{percentComplete}%</span>
          </p>
          <div style={{
            height: "16px",
            width: "100%",
            background: "#e4ebf0",
            borderRadius: "8px",
            overflow: "hidden",
            marginBottom: "0.5rem"
          }}>
            <div style={{
              width: `${percentComplete}%`,
              height: "100%",
              background: "linear-gradient(90deg, #4A90A4 0%, #31758a 100%)",
              borderRadius: "8px",
              transition: "width 0.4s cubic-bezier(.4,2,.6,1)"
            }} />
          </div>
        </div>
      </main>
    </>
  );
}