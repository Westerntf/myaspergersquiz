// src/components/insights/flagged-traits/level-2.tsx
import React from "react";
import { FiAlertCircle } from "react-icons/fi";
import { questions } from "../../../questions";
import { flagExplanations } from "../../../utils/flagExplanations";

type Level2Props = {
  // This component should be rendered only when exactly 4 flags were triggered
  flaggedIds: number[];
};

export default function Level2({ flaggedIds }: Level2Props) {
  return (
    <div
      className="insight-box"
      style={{
        background: "#f9fcfd",
        padding: "2rem",
        borderRadius: "12px",
        marginBottom: "2rem",
        border: "1px solid #e2edf2",
      }}
    >
      <section className="insight-container">
        {/* Title */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <FiAlertCircle
            size={24}
            color="#D9534F"
            style={{ marginRight: "0.5rem" }}
          />
          <h2 className="insight-title" style={{ color: "#D9534F", margin: 0 }}>
            Flagged Traits – Level 2
          </h2>
        </div>

        <p
          className="insight-summary"
          style={{ fontSize: "1.05rem", color: "#333", margin: 0 }}
        >
          You have <strong>4 flagged traits</strong>. These indicate areas where your
          responses closely match patterns we look out for. Review each item below
          to understand why it was flagged.
        </p>

        <div className="insight-block" style={{ marginTop: "1.5rem" }}>
          <h3 className="section-heading" style={{ color: "#D9534F" }}>
            Flagged Questions
          </h3>
          <ul style={{ paddingLeft: "1.25rem", lineHeight: 1.7, margin: 0 }}>
            {flaggedIds.map((id) => (
              <li key={id} style={{ marginBottom: "1rem" }}>
                {/* Question text */}
                <strong>Q{id}:</strong> {questions.find((q) => q.id === id)?.text}
                {/* Explanation below */}
                <p
                  style={{
                    marginTop: "0.35rem",
                    fontSize: "0.9rem",
                    color: "#445962",
                    fontStyle: "italic",
                  }}
                >
                  {flagExplanations[id]}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}