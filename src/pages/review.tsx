// src/pages/review.tsx
import { useEffect, useState } from "react";
import { questions } from "../questions";
import { useRouter } from "next/router";

export default function ReviewPage() {
  const [answers, setAnswers] = useState<(boolean | null)[]>([]);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("mq_answers");
    if (saved) {
      setAnswers(JSON.parse(saved));
    }
  }, []);

  const handleEdit = (index: number) => {
    localStorage.setItem("mq_edit_index", index.toString());
    router.push("/quiz");
  };

  const handleConfirm = () => {
    localStorage.setItem("mq_paid", "true");
    router.push("/results");
  };

  return (
    <main style={{
      padding: "4rem 1rem",
      maxWidth: "700px",
      margin: "0 auto",
      fontFamily: "'Inter', sans-serif",
      color: "#1a1a1a",
      background: "#fdfdfd",
      minHeight: "100vh"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h1 style={{ margin: 0, color: "#4A90A4", fontSize: "2rem", fontWeight: "700" }}>Review Your Answers</h1>
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
            fontWeight: 500
          }}
        >
          Skip to Results
        </button>
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {questions.map((q, i) => (
          <li key={i} style={{ marginBottom: "1.5rem", background: "#f9fbfc", border: "1px solid #e4ebf0", padding: "1rem 1.5rem", borderRadius: "10px" }}>
            <p style={{ color: "#1a1a1a" }}><strong>Q{i + 1}:</strong> {q.text}</p>
            <p style={{ color: "#1a1a1a" }}>Answer: <strong>{answers[i] === true ? "Yes" : answers[i] === false ? "No" : "Not answered"}</strong></p>
            <button onClick={() => handleEdit(i)} style={{ marginTop: "0.5rem", padding: "0.5rem 1rem", background: "#4A90A4", border: "none", borderRadius: "6px", color: "#fff", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: "1rem" }}>
              Edit
            </button>
          </li>
        ))}
      </ul>
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <button onClick={handleConfirm} style={{ padding: "1rem 2rem", background: "#4A90A4", border: "none", borderRadius: "8px", color: "#fff", fontSize: "1.1rem", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
          Confirm and View Results
        </button>
      </div>
    </main>
  );
}