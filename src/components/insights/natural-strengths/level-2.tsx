import React from "react";
import { FiStar, FiArrowUp } from "react-icons/fi";

export default function NaturalStrengthsLevel2() {
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
          Natural Strengths – Level 2
        </h2>

        <p className="insight-summary">
          You have developed growing resilience and self-awareness that support your daily life. These strengths help you face social and sensory challenges with increasing confidence. Recognizing these assets allows you to build effective strategies and deepen your self-understanding.
        </p>

        <div className="insight-block">
          <h3 className="section-heading" style={{ color: "#31758a", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <FiStar /> Key Strengths
          </h3>
          <ul>
            <li>Capable of managing social settings with thoughtful coping strategies.</li>
            <li>Finding ways to adapt routines with growing flexibility.</li>
            <li>Maintaining focus by using personalized techniques.</li>
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