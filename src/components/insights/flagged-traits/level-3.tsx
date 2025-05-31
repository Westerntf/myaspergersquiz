// src/components/insights/flagged-traits/level-3.tsx
import React from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { questions } from "../../../questions";
import { flagExplanations } from "../../../utils/flagExplanations";

type Level3Props = {
  // This component should be rendered when exactly 8 flags were triggered
  flaggedIds: number[];
};

export default function Level3({ flaggedIds }: Level3Props) {
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
          <FiAlertTriangle
            size={24}
            color="#E08C00"
            style={{ marginRight: "0.5rem" }}
          />
          <h2 className="insight-title" style={{ color: "#E08C00", margin: 0 }}>
            Flagged Traits – Level 3
          </h2>
        </div>

        <p
          className="insight-summary"
          style={{ fontSize: "1.05rem", color: "#333", margin: 0 }}
        >
          You have <strong>8 flagged traits</strong>. These represent a broader pattern
          of responses that align with autism‐related indicators. Please review the
          details below to learn why each was highlighted.
        </p>

        <div className="insight-block" style={{ marginTop: "1.5rem" }}>
          <h3 className="section-heading" style={{ color: "#E08C00" }}>
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