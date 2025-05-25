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
    router.push("/results");
  };

  return (
    <main style={{
      padding: "4rem 1rem",
      maxWidth: "700px",
      margin: "0 auto",
      fontFamily: "'Inter', sans-serif",
      color: "#fff",
      background: "linear-gradient(to bottom, #060618, #101025)",
      minHeight: "100vh"
    }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Review Your Answers</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {questions.map((q, i) => (
          <li key={i} style={{ marginBottom: "1.5rem", background: "#1a1a2e", padding: "1rem 1.5rem", borderRadius: "8px" }}>
            <p><strong>Q{i + 1}:</strong> {q.text}</p>
            <p>Answer: <strong>{answers[i] === true ? "Yes" : answers[i] === false ? "No" : "Not answered"}</strong></p>
            <button onClick={() => handleEdit(i)} style={{ marginTop: "0.5rem", padding: "0.5rem 1rem", background: "#4e7fff", border: "none", borderRadius: "6px", color: "#fff", cursor: "pointer" }}>
              Edit
            </button>
          </li>
        ))}
      </ul>
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <button onClick={handleConfirm} style={{ padding: "1rem 2rem", background: "#4e7fff", border: "none", borderRadius: "8px", color: "#fff", fontSize: "1.1rem", cursor: "pointer" }}>
          Confirm and View Results
        </button>
      </div>
    </main>
  );
}