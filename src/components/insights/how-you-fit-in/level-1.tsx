import React from "react";
import { FiUser, FiClock } from "react-icons/fi";

export default function Level1() {
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
            How You Fit In – Level 1
          </h2>
        </div>

        {/* Summary */}
        <div className="insight-block">
          <p className="insight-summary" style={{ fontSize: "1.05rem", color: "#333", margin: 0 }}>
            Your total score suggests that you share many experiences with the broader neurotypical population. You likely find social interactions, sensory environments, and daily routines fairly comfortable and familiar.
          </p>
        </div>

        {/* Key Traits Worth Noting */}
        <div className="insight-block" style={{ marginTop: "1.5rem" }}>
          <h3 className="section-heading" style={{ color: "#31758a", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <FiClock /> Key Traits Worth Noting
          </h3>
          <ul style={{ paddingLeft: "1.2rem", lineHeight: 1.7, margin: 0 }}>
            <li>Social cues and conversations feel natural and fluid.</li>
            <li>Sensory experiences generally do not feel overwhelming.</li>
            <li>Routines and schedules can be flexible without stress.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
