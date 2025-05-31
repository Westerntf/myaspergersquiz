import { useState } from "react";
import { FiChevronDown, FiChevronUp, FiInfo, FiHeart, FiTool } from "react-icons/fi";

export default function Level2() {
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
        aria-controls="level2-content"
      >
        <h2 style={{ color: "#4A90A4", margin: 0 }}>
          Self-Awareness Reflection – Level 2
        </h2>
        {expanded ? (
          <FiChevronUp size={24} color="#4A90A4" aria-label="Collapse content" />
        ) : (
          <FiChevronDown size={24} color="#4A90A4" aria-label="Expand content" />
        )}
      </header>

      <p style={{ fontSize: "1.1rem", color: "#333", marginBottom: "1rem" }}>
        You may recognize some autistic traits within yourself. Reflecting on how these traits influence your everyday experiences can help you develop a deeper understanding and appreciation of your personal journey.
      </p>

      {expanded && (
        <section id="level2-content">
          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ display: "flex", alignItems: "center", color: "#4A90A4" }}>
              <FiInfo style={{ marginRight: "0.5rem" }} /> What You Might Consider
            </h3>
            <ul style={{ color: "#555", paddingLeft: "1.2rem" }}>
              <li>How certain traits shape your interactions and environment.</li>
              <li>Ways you manage social or sensory experiences.</li>
              <li>Opportunities for further self-reflection and growth.</li>
            </ul>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ display: "flex", alignItems: "center", color: "#4A90A4" }}>
              <FiTool style={{ marginRight: "0.5rem" }} /> Reflection Supports
            </h3>
            <p style={{ color: "#555" }}>
              Engaging with supportive strategies like mindfulness, journaling, or structured routines can enhance your self-awareness and well-being.
            </p>
          </div>

          <div>
            <h3 style={{ display: "flex", alignItems: "center", color: "#4A90A4" }}>
              <FiHeart style={{ marginRight: "0.5rem" }} /> Celebrate Your Journey
            </h3>
            <p style={{ color: "#555" }}>
              Acknowledging your growing self-awareness is a courageous step toward embracing your unique strengths.
            </p>
          </div>

          <div style={{ marginTop: "2rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
            <label htmlFor="reflection" style={{ display: "block", marginBottom: "0.5rem", color: "#4A90A4" }}>
              Reflection Prompt: What new insights about yourself have you noticed recently?
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