// src/pages/review.tsx
import { useEffect, useState } from "react";
import { questions } from "../questions";
import { useRouter } from "next/router";
import { calculateScore } from "../utils/calculateScore";
import { getOverallLevel } from "../utils/getOverallLevel";
import { flagQuestions } from "../utils/flagQuestions";
import { getAuth } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";

export default function ReviewPage() {
  const [answers, setAnswers] = useState<number[]>([]);
  const router = useRouter();

  useEffect(() => {
    const quizId = localStorage.getItem("quizRunId");
    const answersJson = localStorage.getItem("quizAnswers");
    let savedAnswers: number[] = [];

    if (answersJson) {
      try {
        const parsed = JSON.parse(answersJson);
        if (Array.isArray(parsed)) {
          savedAnswers = parsed;
        }
      } catch {
        savedAnswers = [];
      }
    }

    if (!quizId || savedAnswers.length === 0) {
      router.replace("/");
      return;
    }
    setAnswers(savedAnswers);
  }, []);

  const handleEdit = (index: number) => {
    localStorage.setItem("quizEditIndex", index.toString());
    router.push("/quiz");
  };

  const handleConfirm = async () => {
    const user = getAuth().currentUser;
    const sessionId = localStorage.getItem("quizRunId");
    if (user && sessionId) {
      const db = getFirestore();

      // Calculate scores and flags
      const { total, traitScores } = calculateScore(answers);
      const level = getOverallLevel(total);
      const triggeredFlags = flagQuestions.filter(idx => answers[idx - 1] >= 0.67);

      await setDoc(doc(db, "reports", user.uid, "sessions", sessionId), {
        answers,
        total,
        traitScores,
        level,
        flags: triggeredFlags,
        createdAt: Date.now(),
        paid: false // webhook will update this to true after payment
      }, { merge: true });

      router.push("/results");
    } else {
      router.push("/results");
    }
  };

  return (
    <main style={   {
      padding: "4rem 1rem",
      maxWidth: "700px",
      margin: "0 auto",
      fontFamily: "'Inter', sans-serif",
      color: "#1a1a1a",
      background: "#fdfdfd",
      minHeight: "100vh"
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "0.5rem",
        marginBottom: "1.5rem"
      }}>
        <h1 style={{
          margin: 0,
          color: "#4A90A4",
          fontSize: "2rem",
          fontWeight: "700",
          flexGrow: 1
        }}>
          Review Your Answers
        </h1>
        <button
          onClick={() => router.push("/results")}
          style={{
            padding: "0.6rem 1.2rem",
            background: "#4A90A4",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "0.95rem",
            cursor: "pointer",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            flexShrink: 0
          }}
        >
          Skip to Results
        </button>
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {questions.map((q, i) => (
          <li key={i} style={{ marginBottom: "1.5rem", background: "#f9fbfc", border: "1px solid #e4ebf0", padding: "1rem 1.5rem", borderRadius: "10px" }}>
            <p style={{ color: "#1a1a1a" }}><strong>Q{i + 1}:</strong> {q.text}</p>
            <p style={{ color: "#1a1a1a" }}>
              Answer:{" "}
              <strong>
                {answers[i] === 1
                  ? "Yes"
                  : answers[i] === 0.67
                  ? "Sometimes"
                  : answers[i] === 0.33
                  ? "Not really"
                  : answers[i] === 0
                  ? "No"
                  : "Not answered"}
              </strong>
            </p>
            <button
              onClick={() => handleEdit(i)}
              style={{
                marginTop: "0.5rem",
                padding: "0.5rem 1rem",
                background: "#4A90A4",
                border: "none",
                borderRadius: "6px",
                color: "#fff",
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
                fontSize: "1rem",
                width: "100%"
              }}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <button
          onClick={() => handleConfirm()}
          style={{
            padding: "1rem 2rem",
            background: "#4A90A4",
            border: "none",
            borderRadius: "8px",
            color: "#fff",
            fontSize: "1.1rem",
            cursor: "pointer",
            fontFamily: "'Inter', sans-serif",
            width: "100%"
          }}
        >
          Confirm and Proceed to Payment
        </button>
      </div>
    </main>
  );
}