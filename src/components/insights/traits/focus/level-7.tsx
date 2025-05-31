export default function FocusLevel7() {
  return (
    <div
      className="insight-box"
      style={{
        background: "#ffffff",
        padding: "2rem",
        borderRadius: "12px",
        marginBottom: "2rem",
        border: "1px solid #e4ebf0",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      }}
    >
      <section className="insight-container">
        <h2
          className="insight-title"
          style={{ fontSize: "1.5rem", color: "#31758a", marginBottom: "1rem" }}
        >
          Focus – Level 7
        </h2>
        <p className="insight-summary" style={{ marginBottom: "1.5rem", color: "#1a1a1a" }}>
          You likely face significant challenges maintaining focus, often feeling overwhelmed by distractions or unable to complete tasks without assistance. These difficulties may require consistent strategies and support.
        </p>

        <div className="insight-block" style={{ marginBottom: "1.5rem" }}>
          <h3
            className="section-heading"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#31758a" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#31758a" viewBox="0 0 24 24">
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
            What This Might Look Like
          </h3>
          <ul style={{ marginTop: "0.75rem", paddingLeft: "1.25rem", color: "#1a1a1a" }}>
            <li>Struggles to maintain attention for extended periods</li>
            <li>Frequently distracted or overwhelmed by stimuli</li>
            <li>May rely heavily on external supports or reminders</li>
          </ul>
        </div>

        <div className="insight-block">
          <h3
            className="section-heading"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#31758a" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#31758a" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
            Thoughtful Supports
          </h3>
          <p style={{ marginTop: "0.75rem", color: "#1a1a1a" }}>
            Utilizing structured routines, reminder systems, and environmental modifications can help improve focus. Professional support and coaching may also be beneficial.
          </p>
        </div>
      </section>
    </div>
  );
}