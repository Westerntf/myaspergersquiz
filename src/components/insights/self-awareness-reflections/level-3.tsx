import { useState } from "react";
import { FiChevronDown, FiChevronUp, FiInfo, FiHeart, FiTool } from "react-icons/fi";

export default function Level3() {
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
        aria-controls="level3-content"
      >
        <h2 style={{ color: "#4A90A4", margin: 0 }}>
          Self-Awareness Reflection – Level 3
        </h2>
        {expanded ? (
          <FiChevronUp size={24} color="#4A90A4" aria-label="Collapse content" />
        ) : (
          <FiChevronDown size={24} color="#4A90A4" aria-label="Expand content" />
        )}
      </header>

      <p style={{ fontSize: "1.1rem", color: "#333", marginBottom: "1rem" }}>
        You may relate to a moderate number of autistic traits and have begun exploring how these influence your daily life. Reflecting on these experiences can help deepen your understanding and foster self-compassion.
      </p>

      {expanded && (
        <section id="level3-content">
          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ display: "flex", alignItems: "center", color: "#4A90A4" }}>
              <FiInfo style={{ marginRight: "0.5rem" }} /> What You Might Consider
            </h3>
            <ul style={{ color: "#555", paddingLeft: "1.2rem" }}>
              <li>Patterns in social interaction, sensory processing, or routines that you recognize.</li>
              <li>How these traits may affect your energy and comfort levels.</li>
              <li>Ways you can anticipate and manage your needs effectively.</li>
            </ul>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ display: "flex", alignItems: "center", color: "#4A90A4" }}>
              <FiTool style={{ marginRight: "0.5rem" }} /> Reflection Supports
            </h3>
            <p style={{ color: "#555" }}>
              Developing personalized supports such as routines, sensory strategies, and social tools can improve your well-being and daily functioning.
            </p>
          </div>

          <div>
            <h3 style={{ display: "flex", alignItems: "center", color: "#4A90A4" }}>
              <FiHeart style={{ marginRight: "0.5rem" }} /> Celebrate Your Journey
            </h3>
            <p style={{ color: "#555" }}>
              Embracing your evolving self-awareness is an important part of building confidence and resilience.
            </p>
          </div>

          <div style={{ marginTop: "2rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
            <label htmlFor="reflection" style={{ display: "block", marginBottom: "0.5rem", color: "#4A90A4" }}>
              Reflection Prompt: How have your insights about yourself influenced your day-to-day life?
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