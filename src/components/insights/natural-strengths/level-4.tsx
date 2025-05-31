import React from "react";
import { FiStar, FiArrowUp } from "react-icons/fi";

export default function NaturalStrengthsLevel4() {
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
          Natural Strengths – Level 4
        </h2>

        <p className="insight-summary">
          You show meaningful personal strengths that support you in navigating more complex social and sensory situations. These abilities are valuable tools for managing daily life and finding balance.
        </p>

        <div className="insight-block">
          <h3 className="section-heading" style={{ color: "#31758a", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <FiStar /> Key Strengths
          </h3>
          <ul>
            <li>Strong problem-solving and adaptability in challenging environments.</li>
            <li>Insight into your own needs, helping to shape supportive routines.</li>
            <li>Ability to use coping mechanisms that reduce stress and increase comfort.</li>
          </ul>
        </div>

        <div className="insight-block">
          <h3 className="section-heading" style={{ color: "#31758a", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <FiArrowUp /> How to Build on This
          </h3>
          <ul>
            <li>Reflect on how your coping strategies have helped and refine them.</li>
            <li>Seek feedback from trusted friends or professionals to improve routines.</li>
            <li>Experiment with small adjustments to enhance comfort and predictability.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}