import React from "react";
import { FiStar, FiArrowUp } from "react-icons/fi";

export default function NaturalStrengthsLevel5() {
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
          Natural Strengths – Level 5
        </h2>

        <p className="insight-summary">
          You demonstrate significant personal strengths that help you face and overcome complex challenges. These qualities reflect deep resilience, self-awareness, and adaptability.
        </p>

        <div className="insight-block">
          <h3 className="section-heading" style={{ color: "#31758a", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <FiStar /> Key Strengths
          </h3>
          <ul>
            <li>Exceptional ability to develop personalized coping strategies.</li>
            <li>Strong insight into your unique sensory and social needs.</li>
            <li>Resilience that supports ongoing personal growth and self-advocacy.</li>
          </ul>
        </div>

        <div className="insight-block">
          <h3 className="section-heading" style={{ color: "#31758a", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <FiArrowUp /> How to Build on This
          </h3>
          <ul>
            <li>Reflect on your journey and refine your strategies as you grow.</li>
            <li>Mentor others by sharing what has worked for you.</li>
            <li>Incorporate self-care routines that honor and strengthen your resilience.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}