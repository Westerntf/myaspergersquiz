import { useState } from "react";
import { FiChevronDown, FiChevronUp, FiInfo, FiHeart, FiTool } from "react-icons/fi";

export default function Level5() {
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
        aria-controls="level5-content"
      >
        <h2 style={{ color: "#4A90A4", margin: 0 }}>
          Self-Awareness Reflection – Level 5
        </h2>
        {expanded ? (
          <FiChevronUp size={24} color="#4A90A4" aria-label="Collapse content" />
        ) : (
          <FiChevronDown size={24} color="#4A90A4" aria-label="Expand content" />
        )}
      </header>

      <p style={{ fontSize: "1.1rem", color: "#333", marginBottom: "1rem" }}>
        You may deeply relate to many autistic traits and their influence on your identity and daily life. This reflection encourages you to explore ways to understand yourself better and find supports that help you thrive.
      </p>

      {expanded && (
        <section id="level5-content">
          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ display: "flex", alignItems: "center", color: "#4A90A4" }}>
              <FiInfo style={{ marginRight: "0.5rem" }} /> What You Might Consider
            </h3>
            <ul style={{ color: "#555", paddingLeft: "1.2rem" }}>
              <li>You might be aware of your social, sensory, and routine differences in detail.</li>
              <li>Some experiences may feel challenging, but you can learn to navigate them.</li>
              <li>Exploring supports and strategies can help improve your quality of life.</li>
            </ul>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ display: "flex", alignItems: "center", color: "#4A90A4" }}>
              <FiTool style={{ marginRight: "0.5rem" }} /> Reflection Supports
            </h3>
            <p style={{ color: "#555" }}>
              Consider reaching out to professionals, joining supportive communities, or trying personalized coping methods to support your well-being.
            </p>
          </div>

          <div>
            <h3 style={{ display: "flex", alignItems: "center", color: "#4A90A4" }}>
              <FiHeart style={{ marginRight: "0.5rem" }} /> Celebrate Your Journey
            </h3>
            <p style={{ color: "#555" }}>
              Embrace your journey of self-discovery with kindness and patience. Every step you take is progress.
            </p>
          </div>

          <div style={{ marginTop: "2rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
            <label htmlFor="reflection" style={{ display: "block", marginBottom: "0.5rem", color: "#4A90A4" }}>
              Reflection Prompt: What supports or strategies have you found helpful or want to explore?
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