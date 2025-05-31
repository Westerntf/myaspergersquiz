import { useState } from "react";
import { FiChevronDown, FiChevronUp, FiInfo, FiHeart, FiTool } from "react-icons/fi";

export default function Level1() {
  const [expanded, setExpanded] = useState(true);

  return (
    <div
      className="self-awareness-card"
      style={{
        background: "#f9fcfd",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        padding: "2rem",
        marginBottom: "2rem",
        border: "1px solid #e2edf2",
        maxWidth: "700px",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          marginBottom: "1rem",
        }}
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        aria-controls="level1-content"
      >
        <h2 style={{ color: "#4A90A4", margin: 0 }}>
          Self-Awareness Reflection – Level 1
        </h2>
        {expanded ? (
          <FiChevronUp size={24} color="#4A90A4" aria-label="Collapse content" />
        ) : (
          <FiChevronDown size={24} color="#4A90A4" aria-label="Expand content" />
        )}
      </header>

      <p style={{ fontSize: "1.1rem", color: "#333", marginBottom: "1rem" }}>
        Based on your responses, you may identify with fewer autistic traits. Reflecting on your unique experiences and perspectives can help you better understand your strengths and how you relate to the world.
      </p>

      {expanded && (
        <section id="level1-content">
          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ display: "flex", alignItems: "center", color: "#4A90A4" }}>
              <FiInfo style={{ marginRight: "0.5rem" }} /> What You Might Consider
            </h3>
            <ul style={{ color: "#555", paddingLeft: "1.2rem" }}>
              <li>How your experiences and ways of thinking shape your interactions.</li>
              <li>Areas where you feel confident and comfortable in social or sensory situations.</li>
              <li>Moments where your unique perspective offers value.</li>
            </ul>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ display: "flex", alignItems: "center", color: "#4A90A4" }}>
              <FiTool style={{ marginRight: "0.5rem" }} /> Reflection Supports
            </h3>
            <p style={{ color: "#555" }}>
              Taking time to explore your feelings and reactions can provide deeper insight into your personal style and needs.
            </p>
          </div>

          <div>
            <h3 style={{ display: "flex", alignItems: "center", color: "#4A90A4" }}>
              <FiHeart style={{ marginRight: "0.5rem" }} /> Celebrate Your Journey
            </h3>
            <p style={{ color: "#555" }}>
              Embrace the strengths in your unique approach and the openness to learn more about yourself.
            </p>
          </div>

          <div style={{ marginTop: "2rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
            <label htmlFor="reflection" style={{ display: "block", marginBottom: "0.5rem", color: "#4A90A4" }}>
              Reflection Prompt: What strengths do you notice in how you experience the world?
            </label>
            <textarea
              id="reflection"
              rows={3}
              style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid #ddd" }}
              placeholder="Write your thoughts here..."
            />
          </div>
        </section>
      )}
    </div>
  );
}