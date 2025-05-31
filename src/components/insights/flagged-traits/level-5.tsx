// src/components/insights/flagged-traits/level-5.tsx
import React from "react";
import { FiXCircle } from "react-icons/fi";
import { questions } from "../../../questions";
import { flagExplanations } from "../../../utils/flagExplanations";

type Level5Props = {
  // This component should be rendered when all 15 flags were triggered
  flaggedIds: number[];
};

export default function Level5({ flaggedIds }: Level5Props) {
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
          <FiXCircle
            size={24}
            color="#B92C28"
            style={{ marginRight: "0.5rem" }}
          />
          <h2 className="insight-title" style={{ color: "#B92C28", margin: 0 }}>
            Flagged Traits – Level 5
          </h2>
        </div>

        <p
          className="insight-summary"
          style={{ fontSize: "1.05rem", color: "#333", margin: 0 }}
        >
          All <strong>15 flagged traits</strong> were triggered. This indicates a very strong
          pattern of autism‐related indicators. It may be helpful to share these results
          with a qualified clinician or specialist for further assessment.
        </p>

        <div className="insight-block" style={{ marginTop: "1.5rem" }}>
          <h3 className="section-heading" style={{ color: "#B92C28" }}>
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