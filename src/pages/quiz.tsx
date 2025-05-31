// src/pages/quiz.tsx
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { questions } from "../questions";
import { db, auth } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export default function QuizPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(boolean | null)[]>(
    Array(questions.length).fill(null)
  );
  const [selected, setSelected] = useState<null | boolean>(null);
  const [showExamples, setShowExamples] = useState<boolean[]>(
    Array(questions.length).fill(false)
  );

  const router = useRouter();

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

  const handleAnswer = async (value: boolean) => {
    setSelected(value);
    setTimeout(async () => {
      const updated = [...answers];
      updated[currentIndex] = value;
      setAnswers(updated);

      setSelected(null);

      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // Firestore reporting
        const user = auth.currentUser;
        const sessionId = localStorage.getItem("mq_session_id");

        if (user && sessionId) {
          await setDoc(doc(db, "reports", user.uid), {
            startedAt: Date.now(),
            session_id: sessionId,
            status: "in_progress"
          }, { merge: true });
        }
        localStorage.setItem("mq_answers", JSON.stringify(updated));
        router.push("/review");
      }
    }, 250); // Shorter delay for visual feedback
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const percentComplete = Math.round((currentIndex / questions.length) * 100);

  return (
    <>
    <Head>
  <title>Take the Quiz – Autism Spectrum Traits Assessment</title>
  <meta name="description" content="Answer 40 thoughtful questions in a respectful and private environment. Explore how your traits align with patterns found in autism." />
  <meta property="og:title" content="Take the Quiz – Autism Spectrum Traits Assessment" />
  <meta property="og:description" content="40-question, research-informed quiz designed to help you reflect on social, sensory, and routine patterns linked to neurodivergence." />
  <meta property="og:image" content="https://myaspergersquiz.com/og-quiz.jpg" />
  <meta property="og:url" content="https://myaspergersquiz.com/quiz" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Take the Quiz – Autism Spectrum Traits Assessment" />
  <meta name="twitter:description" content="Explore how your mind works in just 3–5 minutes. No sign-up needed. Private. Instant results." />
  <meta name="twitter:image" content="https://myaspergersquiz.com/og-quiz.jpg" />
  <link rel="icon" href="/myaspergersquiz-logo.png" />
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is this quiz for?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "This quiz is designed to help individuals explore patterns in social behavior, communication, sensory processing, and routines often linked to neurodivergence."
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The quiz takes about 3–5 minutes to complete."
            }
          },
          {
            "@type": "Question",
            "name": "Is it private?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, all answers are stored locally and never sent to a server."
            }
          }
        ]
      })
    }}
  />
  <link rel="canonical" href="https://myaspergersquiz.com/quiz" />
</Head>
      <main className="quiz-container" style={{
        background: "#f9fbfc",
        color: "#1a1a1a",
        padding: "2rem 1rem",
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxSizing: "border-box"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
          <img src="/myaspergersquiz-logo.png" alt="Logo" width={32} height={32} style={{ borderRadius: "6px" }} />
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
          <h2 aria-live="polite" style={{ fontWeight: 700, fontSize: "1.75rem", marginBottom: "1rem", color: "#4A90A4" }}>
            Question {currentIndex + 1} of {questions.length}
          </h2>
          <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem" }}>
            {currentQuestion.text}
          </p>
          {currentQuestion.example && (
            <div style={{ marginBottom: "1.5rem" }}>
              <button
                aria-describedby="example-desc"
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
          <div className="button-group">
            <button
              aria-label="Answer Yes"
              onClick={() => handleAnswer(true)}
              style={{
                ...buttonStyle,
                padding: "0.9rem 1.75rem",
                background: "#5a9aa8",
                color: "#fff",
                fontWeight: 600,
                borderRadius: "12px",
                letterSpacing: "0.25px",
                fontSize: "1rem"
              }}
            >
              Yes
            </button>
            <button
              aria-label="Answer No"
              onClick={() => handleAnswer(false)}
              style={{
                ...buttonStyle,
                padding: "0.9rem 1.75rem",
                background: "transparent",
                border: "2px solid #5a9aa8",
                color: "#5a9aa8",
                fontWeight: 600,
                borderRadius: "12px",
                letterSpacing: "0.25px",
                fontSize: "1rem"
              }}
            >
              No
            </button>
            {currentIndex > 0 && (
              <button
                onClick={handleBack}
                style={{
                  ...buttonStyle,
                  padding: "0.9rem 1.75rem",
                  background: "transparent",
                  border: "2px solid #5a9aa8",
                  color: "#5a9aa8",
                  fontWeight: 600,
                  borderRadius: "12px",
                  letterSpacing: "0.25px",
                  fontSize: "1rem"
                }}
              >
                ← Back
              </button>
            )}
          </div>
        </div>

        <div className="progress-container" style={{ width: "100%", maxWidth: "480px", margin: "0 auto", marginTop: "2rem", marginBottom: "2rem", textAlign: "center" }}>
          <p style={{ marginBottom: "0.75rem", fontSize: "1rem", fontWeight: 500, opacity: 0.8 }}>
            Progress: {percentComplete}%
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
        <style jsx>{`
  .button-group {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    align-items: center;
    width: 100%;
    max-width: 480px;
  }

  @media (max-width: 600px) {
    .button-group {
      gap: 0.5rem;
      align-items: center;
    }

    .button-group button {
      font-size: 0.8rem !important;
      padding: 0.4rem 0.75rem !important;
      width: 100% !important;
      max-width: 88vw !important;
      border-radius: 8px !important;
    }
  }
`}</style>
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