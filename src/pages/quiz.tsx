// src/pages/quiz.tsx
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { questions } from "../questions";

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

  const handleAnswer = (value: boolean) => {
    setSelected(value);
    setTimeout(() => {
      const updated = [...answers];
      updated[currentIndex] = value;
      setAnswers(updated);

      setSelected(null);

      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
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
      <main style={{
        padding: "4rem 1rem",
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
        textAlign: "center",
        background: "linear-gradient(to bottom, #060618, #101025)",
        color: "#fff",
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
        margin: 0,
      }}>
        <section style={{ marginBottom: "1.5rem", textAlign: "center", maxWidth: "600px", marginInline: "auto" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "0.5rem" }}>
            Self-Insight Starts Here
          </h2>
          <p style={{ opacity: 0.6, fontSize: "0.85rem", marginTop: "0.25rem", marginBottom: "0.75rem" }}>
            Estimated time to complete: 3–5 minutes
          </p>
          <p style={{ fontSize: "0.95rem", lineHeight: "1.5", opacity: 0.7 }}>
            This quiz is designed to help you explore patterns in how you interact, process, and experience the world around you. Your answers may highlight meaningful insights worth reflecting on.
          </p>
        </section>
        <div
          key={currentIndex}
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            padding: "2rem 1.25rem",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            width: "100%",
            maxWidth: "700px",
            margin: "0 auto",
            opacity: selected !== null ? 0.5 : 1,
            transition: "opacity 0.3s ease",
            textAlign: "center"
          }}
        >
          <h2 aria-live="polite" style={{ fontSize: "1.8rem", marginBottom: "1.25rem" }}>
            Question {currentIndex + 1} of {questions.length}
          </h2>
          <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem" }}>
            {currentQuestion.text}
          </p>
          {currentQuestion.example && (
            <div style={{ marginBottom: "1.25rem" }}>
              <button
                aria-describedby="example-desc"
                onClick={() => {
                  const updated = [...showExamples];
                  updated[currentIndex] = !updated[currentIndex];
                  setShowExamples(updated);
                }}
                style={{
                  background: "none",
                  color: "#4e7fff",
                  border: "1px solid #4e7fff",
                  borderRadius: "6px",
                  padding: "0.4rem 0.75rem",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  marginBottom: "0.75rem",
                  transition: "all 0.2s ease-in-out"
                }}
              >
                {showExamples[currentIndex] ? "Hide Example" : "Show Example"}
              </button>
              {showExamples[currentIndex] && (
                <div
                  id="example-desc"
                  style={{
                    background: "#121226",
                    padding: "1rem",
                    borderRadius: "8px",
                    fontSize: "0.95rem",
                    color: "#cdd4f6",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <strong>Example:</strong> {currentQuestion.example}
                </div>
              )}
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
            <button
              aria-label="Answer Yes"
              onClick={() => handleAnswer(true)}
              style={{
                ...buttonStyle,
                background: selected === true ? "#3b4dff" : "#4e7fff",
              }}
            >
              Yes
            </button>
            <button
              aria-label="Answer No"
              onClick={() => handleAnswer(false)}
              style={{
                ...buttonStyle,
                background: selected === false ? "#3b4dff" : "#4e7fff",
              }}
            >
              No
            </button>
            {currentIndex > 0 && (
              <button
                onClick={handleBack}
                style={buttonStyle}
              >
                ← Back
              </button>
            )}
          </div>
        </div>

        <div style={{ marginBottom: "2rem", width: "100%", maxWidth: "700px", marginInline: "auto", padding: "0 1rem" }}>
          <p style={{ marginBottom: "0.75rem", fontSize: "1.1rem", opacity: 0.8 }}>
            Progress: {percentComplete}%
          </p>
          <div style={{
            height: "12px",
            width: "100%",
            background: "#2c2c4a",
            borderRadius: "6px",
            overflow: "hidden"
          }}>
            <div style={{
              height: "100%",
              width: `${percentComplete}%`,
              background: "#4e7fff",
              transition: "width 0.5s ease, background 0.3s ease"
            }} />
          </div>
        </div>
      </main>
    </>
  );
}

const buttonStyle = {
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