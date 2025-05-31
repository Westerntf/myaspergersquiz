import React from "react";
import { FiUser, FiClock } from "react-icons/fi";

export default function Level8() {
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
            How You Fit In – Level 8
          </h2>
        </div>

        {/* Summary */}
        <div className="insight-block">
          <p className="insight-summary" style={{ fontSize: "1.05rem", color: "#333", margin: 0 }}>
            Your score indicates extreme differences from typical patterns. Social and sensory situations can be overwhelming to the point of distress, and you rely on intensive supports and unchanging routines to navigate daily life.
          </p>
        </div>

        {/* Key Traits Worth Noting */}
        <div className="insight-block" style={{ marginTop: "1.5rem" }}>
          <h3 className="section-heading" style={{ color: "#31758a", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <FiClock /> Key Traits Worth Noting
          </h3>
          <ul style={{ paddingLeft: "1.2rem", lineHeight: 1.7, margin: 0 }}>
            <li>Almost entirely miss social cues, leading to severe anxiety or shutdown in interactions.</li>
            <li>Sensory environments can be unbearable without strong accommodations or complete avoidance.</li>
            <li>Strict, unchanging routines and constant support are essential for daily functioning and wellbeing.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
