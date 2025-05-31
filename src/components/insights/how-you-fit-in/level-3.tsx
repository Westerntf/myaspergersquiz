import React from "react";
import { FiUser, FiClock } from "react-icons/fi";

export default function Level3() {
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
            How You Fit In – Level 3
          </h2>
        </div>

        {/* Summary */}
        <div className="insight-block">
          <p className="insight-summary" style={{ fontSize: "1.05rem", color: "#333", margin: 0 }}>
            Your score suggests you navigate social and sensory situations comfortably, with only slight preferences or quirks.
          </p>
        </div>

        {/* Key Traits Worth Noting */}
        <div className="insight-block" style={{ marginTop: "1.5rem" }}>
          <h3 className="section-heading" style={{ color: "#31758a", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <FiClock /> Key Traits Worth Noting
          </h3>
          <ul style={{ paddingLeft: "1.2rem", lineHeight: 1.7, margin: 0 }}>
            <li>You may have slight preferences in social situations that differ from the majority.</li>
            <li>Sensory experiences are generally comfortable, with minor sensitivities or preferences.</li>
            <li>Routines and structure are helpful but not essential for daily comfort.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
