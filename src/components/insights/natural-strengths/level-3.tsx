import React from "react";
import { FiStar, FiArrowUp } from "react-icons/fi";

export default function NaturalStrengthsLevel3() {
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
          Natural Strengths – Level 3
        </h2>

        <p className="insight-summary">
          You possess important personal strengths like empathy and problem-solving that support your relationships. Developing self-awareness further can unlock even greater confidence and resilience.
        </p>

        <div className="insight-block">
          <h3 className="section-heading" style={{ color: "#31758a", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <FiStar /> Key Strengths
          </h3>
          <ul>
            <li>Empathy and problem-solving skills that support your relationships.</li>
            <li>Growing awareness of how to handle sensory or social challenges.</li>
            <li>Potential to build personalized routines that enhance focus and comfort.</li>
          </ul>
        </div>

        <div className="insight-block">
          <h3 className="section-heading" style={{ color: "#31758a", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <FiArrowUp /> How to Build on This
          </h3>
          <ul>
            <li>Reflect on your strengths to reinforce confidence.</li>
            <li>Share insights with others to learn new strategies.</li>
            <li>Practice small steps daily to build on these assets.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}