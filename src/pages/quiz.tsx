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
import InfoAccordions from "../components/InfoAccordions";

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

  // Responsive box style for both desktop and mobile
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

  // Responsive button style
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
      <main style={{ background: "#f9fbfc", minHeight: "100vh", padding: "clamp(1.5rem, 5vw, 2.5rem) 0" }}>
        {/* Self-Insight box with logo/title header inside */}
        <div
  className="self-insight-box"
  style={{
    background: "linear-gradient(90deg, #fafdff 0%, #eaf4fa 100%)",
    border: "1.5px solid #d2e6ee",
    borderRadius: "22px",
    boxShadow: "0 6px 32px rgba(49,117,138,0.10)",
    padding: "1.0rem 1.5rem 1.0rem 1.5rem",
    margin: "0 auto 2.2rem auto",
    maxWidth: 630,
    textAlign: "center",
    position: "relative",
    overflow: "hidden"
  }}
>
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "1rem",
      marginBottom: "1.2rem",
      flexWrap: "wrap"
    }}
  >
    <img
      src="/myaspergersquiz-logo.png"
      alt="MyAspergersQuiz logo"
      width={38}
      height={38}
      style={{
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(49,117,138,0.10)",
        flexShrink: 0,
        minWidth: 38,
        minHeight: 38,
        background: "#eaf4fa"
      }}
      loading="eager"
      onError={e => { (e.target as HTMLImageElement).src = "/fallback-logo.png"; }}
    />
    <h2
      style={{
        fontSize: "clamp(1.3rem, 4vw, 2.2rem)",
        fontWeight: 900,
        margin: 0,
        color: "transparent",
        background: "linear-gradient(90deg, #31758a 30%, #50a3ba 100%)",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        letterSpacing: "0.01em",
        fontFamily: "'Inter', sans-serif",
        textShadow: "0 2px 8px rgba(49, 88, 100, 0.10)",
        lineHeight: 1.1,
        wordBreak: "break-word"
      }}
    >
      Self-Insight Starts Here
    </h2>
  </div>
  <div style={{
    marginBottom: "0.8rem",
    fontSize: "clamp(0.97rem, 2.5vw, 1.12rem)",
    fontWeight: 700,
    color: "#4A90A4",
    letterSpacing: "0.01em"
  }}>
    Estimated time to complete: <span style={{ fontWeight: 900 }}>3–5 minutes</span>
  </div>
  <p style={{
    fontSize: "clamp(0.97rem, 2.5vw, 1.07rem)",
    color: "#3a4a54",
    lineHeight: 1.7,
    opacity: 0.96,
    margin: 0,
    fontWeight: 500
  }}>
    Answer 40 quick questions to discover how your traits align with patterns found in autism and Asperger’s. This quiz is private, anonymous, and based on the latest research in neurodiversity.
  </p>
</div>
<InfoAccordions />
        {/* Question Box */}
        <div
          key={currentIndex}
          className="question-box"
          style={{
            background: "#fff",
            border: "1.5px solid #d2e6ee",
            borderRadius: "18px",
            boxShadow: "0 8px 32px rgba(49,117,138,0.10)",
            padding: "clamp(1.5rem, 4vw, 2.2rem) clamp(0.7rem, 3vw, 1.2rem) clamp(2.2rem, 5vw, 2.7rem)",
            width: "95vw",
            maxWidth: "630px",
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
            maxWidth: "630px",
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