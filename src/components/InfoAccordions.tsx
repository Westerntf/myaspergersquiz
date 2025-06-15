import { useState } from "react";

function InfoAccordions() {
  const [open, setOpen] = useState<null | number>(null);

  // SVG icons
  const puzzleIcon = (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#31758a" style={{ display: "block" }}>
      <path d="M13.5 2a1.5 1.5 0 0 0-1.5 1.5V5h-2V3.5A1.5 1.5 0 0 0 8.5 2 1.5 1.5 0 0 0 7 3.5V5H5.5A1.5 1.5 0 0 0 4 6.5V8h1.5A1.5 1.5 0 0 1 7 9.5c0 .83-.67 1.5-1.5 1.5H4v2h1.5A1.5 1.5 0 0 1 7 14.5c0 .83-.67 1.5-1.5 1.5H4v1.5A1.5 1.5 0 0 0 5.5 19H7v-1.5A1.5 1.5 0 0 1 8.5 16c.83 0 1.5.67 1.5 1.5V19h2v-1.5c0-.83.67-1.5 1.5-1.5.83 0 1.5.67 1.5 1.5V19h1.5A1.5 1.5 0 0 0 20 17.5V16h-1.5A1.5 1.5 0 0 1 17 14.5c0-.83.67-1.5 1.5-1.5H20v-2h-1.5A1.5 1.5 0 0 1 17 9.5c0-.83.67-1.5 1.5-1.5H20V6.5A1.5 1.5 0 0 0 18.5 5H17v-1.5A1.5 1.5 0 0 0 15.5 2 1.5 1.5 0 0 0 14 3.5V5h-1V3.5A1.5 1.5 0 0 0 13.5 2z"/>
    </svg>
  );
  const userIcon = (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#31758a" style={{ display: "block" }}>
      <path d="M12 12c2.67 0 8 1.34 8 4v2H4v-2c0-2.66 5.33-4 8-4zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
    </svg>
  );

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1.2rem",
        justifyContent: "center",
        margin: "2rem 0",
        width: "100%",
      }}
    >
      {/* Accordion 1 */}
      <div
        style={{
          flex: "1 1 180px",
          maxWidth: 300,
          minWidth: 180,
          background: "rgba(255,255,255,0.7)",
          border: "1.5px solid #d2e6ee",
          borderRadius: "18px",
          boxShadow: "0 8px 32px rgba(49,117,138,0.10)",
          backdropFilter: "blur(6px)",
          padding: 0,
          margin: "0 0.5rem",
          transition: "box-shadow 0.2s, border-color 0.2s",
        }}
      >
        <button
          onClick={() => setOpen(open === 1 ? null : 1)}
          aria-expanded={open === 1}
          style={{
            width: "100%",
            background: "none",
            border: "none",
            padding: "0.7rem 1rem 0.7rem 1rem",
            textAlign: "left",
            fontSize: "0.97rem",
            color: "#31758a",
            fontWeight: 700,
            cursor: "pointer",
            borderRadius: "18px 18px 0 0",
            outline: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "background 0.2s",
            gap: "0.5rem"
          }}
          onMouseOver={e => (e.currentTarget.style.background = "#eaf4fa")}
          onMouseOut={e => (e.currentTarget.style.background = "none")}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {puzzleIcon}
            <span>How the Autism Traits Quiz Works</span>
          </span>
          <span style={{
            fontSize: "1.1rem",
            marginLeft: "0.5rem",
            transform: open === 1 ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.2s"
          }}>▶</span>
        </button>
        {open === 1 && (
          <div style={{
            padding: "0 1rem 1rem 1rem",
            fontSize: "0.92rem",
            color: "#3a4a54",
            lineHeight: 1.5,
            borderTop: "1px solid #e4ebf0",
            background: "rgba(255,255,255,0.85)",
            borderRadius: "0 0 18px 18px"
          }}>
            Each question explores a different aspect of social interaction, sensory experience, routine, communication, or focus. Your responses help build a personalized profile of your neurodivergent strengths and challenges.
          </div>
        )}
      </div>

      {/* Accordion 2 */}
      <div
        style={{
          flex: "1 1 180px",
          maxWidth: 300,
          minWidth: 180,
          background: "rgba(255,255,255,0.7)",
          border: "1.5px solid #d2e6ee",
          borderRadius: "18px",
          boxShadow: "0 8px 32px rgba(49,117,138,0.10)",
          backdropFilter: "blur(6px)",
          padding: 0,
          margin: "0 0.5rem",
          transition: "box-shadow 0.2s, border-color 0.2s",
        }}
      >
        <button
          onClick={() => setOpen(open === 2 ? null : 2)}
          aria-expanded={open === 2}
          style={{
            width: "100%",
            background: "none",
            border: "none",
            padding: "0.7rem 1rem 0.7rem 1rem",
            textAlign: "left",
            fontSize: "0.97rem",
            color: "#31758a",
            fontWeight: 700,
            cursor: "pointer",
            borderRadius: "18px 18px 0 0",
            outline: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "background 0.2s",
            gap: "0.5rem"
          }}
          onMouseOver={e => (e.currentTarget.style.background = "#eaf4fa")}
          onMouseOut={e => (e.currentTarget.style.background = "none")}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {userIcon}
            <span>Who Should Take This Quiz?</span>
          </span>
          <span style={{
            fontSize: "1.1rem",
            marginLeft: "0.5rem",
            transform: open === 2 ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.2s"
          }}>▶</span>
        </button>
        {open === 2 && (
          <div style={{
            padding: "0 1rem 1rem 1rem",
            fontSize: "0.92rem",
            color: "#3a4a54",
            lineHeight: 1.5,
            borderTop: "1px solid #e4ebf0",
            background: "rgba(255,255,255,0.85)",
            borderRadius: "0 0 18px 18px"
          }}>
            This quiz is suitable for adults and older teens who want to better understand their autism spectrum traits. It’s not a clinical diagnosis, but a tool for self-reflection and growth.
          </div>
        )}
      </div>
    </div>
  );
}

export default InfoAccordions;