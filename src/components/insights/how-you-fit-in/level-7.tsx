import React from "react";
import { FiUser, FiClock } from "react-icons/fi";

export default function Level7() {
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
        <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
          <FiUser size={24} color="#31758a" style={{ marginRight: "0.5rem" }} />
          <h2 className="insight-title" style={{ color: "#31758a", margin: 0 }}>
            How You Fit In – Level 7
          </h2>
        </div>

        {/* Summary */}
        <div className="insight-block">
          <p className="insight-summary" style={{ fontSize: "1.05rem", color: "#333", margin: 0 }}>
            Your score indicates close-to-extreme differences from typical patterns. Social and sensory situations are often overwhelming, and you likely depend heavily on strict routines and supports to function.
          </p>
        </div>

        {/* Key Traits Worth Noting */}
        <div className="insight-block" style={{ marginTop: "1.5rem" }}>
          <h3 className="section-heading" style={{ color: "#31758a", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <FiClock /> Key Traits Worth Noting
          </h3>
          <ul style={{ paddingLeft: "1.2rem", lineHeight: 1.7, margin: 0 }}>
            <li>Frequently misinterpret or miss almost all social cues, leading to high anxiety.</li>
            <li>Sensory environments can cause intense distress without strong coping strategies or supports.</li>
            <li>Strict routines and predictability are essential; deviations often lead to significant distress.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
