import React from "react";
import { FiStar, FiArrowUp } from "react-icons/fi";

export default function NaturalStrengthsLevel1() {
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
        <h2 className="insight-title" style={{ color: "#31758a" }}>
          Natural Strengths – Level 1
        </h2>
        <p className="insight-summary">
          You exhibit strong natural resilience and focus. These strengths empower you to face daily challenges with confidence.
        </p>

        <div className="insight-block">
          <h3 className="section-heading" style={{ color: "#31758a", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <FiStar /> Key Strengths
          </h3>
          <ul>
            <li>Solid resilience in everyday situations.</li>
            <li>Confidence navigating social and sensory experiences.</li>
            <li>Strong ability to focus without distractions.</li>
          </ul>
        </div>

        <div className="insight-block">
          <h3 className="section-heading" style={{ color: "#31758a", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <FiArrowUp /> How to Build on This
          </h3>
          <ul>
            <li>Reflect on recent successes to boost confidence.</li>
            <li>Share your strategies with peers to refine them.</li>
            <li>Gradually introduce new challenges to grow resilience.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}