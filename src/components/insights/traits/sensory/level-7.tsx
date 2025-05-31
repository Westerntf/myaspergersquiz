export default function SensoryLevel7() {
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
          Sensory – Level 7
        </h2>
        <p className="insight-summary" style={{ marginBottom: "1.5rem", color: "#1a1a1a" }}>
          You may experience strong sensory sensitivities that make many environments challenging. Frequent sensory overload can impact your daily routines, but with personalized supports, you can find strategies to help manage these challenges.
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
            <li>Regularly overwhelmed by noise, light, or touch</li>
            <li>May avoid or withdraw from sensory-rich environments</li>
            <li>Benefits from accommodations and sensory tools tailored to your needs</li>
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
            Understanding your sensory needs deeply helps you advocate for effective supports. Your efforts to manage sensory input are important steps toward comfort and well-being.
          </p>
        </div>
      </section>
    </div>
  );
}