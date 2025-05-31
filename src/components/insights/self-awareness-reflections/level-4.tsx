import { useState } from "react";
import { FiChevronDown, FiChevronUp, FiInfo, FiHeart, FiTool } from "react-icons/fi";

export default function Level4() {
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
        aria-controls="level4-content"
      >
        <h2 style={{ color: "#4A90A4", margin: 0 }}>
          Self-Awareness Reflection – Level 4
        </h2>
        {expanded ? (
          <FiChevronUp size={24} color="#4A90A4" aria-label="Collapse content" />
        ) : (
          <FiChevronDown size={24} color="#4A90A4" aria-label="Expand content" />
        )}
      </header>

      <p style={{ fontSize: "1.1rem", color: "#333", marginBottom: "1rem" }}>
        You may be recognizing many autistic traits in yourself and might be facing challenges more frequently than others. This level invites you to explore your experiences with curiosity and compassion, helping you better understand your unique needs.
      </p>

      {expanded && (
        <section id="level4-content">
          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ display: "flex", alignItems: "center", color: "#4A90A4" }}>
              <FiInfo style={{ marginRight: "0.5rem" }} /> What You Might Consider
            </h3>
            <ul style={{ color: "#555", paddingLeft: "1.2rem" }}>
              <li>You might notice clear patterns in social situations, sensory experiences, or routines that feel different.</li>
              <li>Some challenges may feel overwhelming or confusing at times.</li>
              <li>Exploring these patterns can help you gain insight and identify what supports you may need.</li>
            </ul>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ display: "flex", alignItems: "center", color: "#4A90A4" }}>
              <FiTool style={{ marginRight: "0.5rem" }} /> Reflection Supports
            </h3>
            <p style={{ color: "#555" }}>
              Discovering coping strategies such as sensory accommodations, social support, or structured routines can provide relief and improve daily life. You are encouraged to seek out resources and professional guidance as needed.
            </p>
          </div>

          <div>
            <h3 style={{ display: "flex", alignItems: "center", color: "#4A90A4" }}>
              <FiHeart style={{ marginRight: "0.5rem" }} /> Celebrate Your Journey
            </h3>
            <p style={{ color: "#555" }}>
              Taking steps to understand yourself is brave and important. Celebrate your efforts to learn and grow, and know support is available.
            </p>
          </div>

          <div style={{ marginTop: "2rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
            <label htmlFor="reflection" style={{ display: "block", marginBottom: "0.5rem", color: "#4A90A4" }}>
              Reflection Prompt: What have you noticed about your needs and how might you begin to support them?
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