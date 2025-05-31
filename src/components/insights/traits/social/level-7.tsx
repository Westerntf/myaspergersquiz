export default function SocialLevel7() {
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
          Social – Level 7
        </h2>
        <p className="insight-summary" style={{ marginBottom: "1.5rem", color: "#1a1a1a" }}>
          Social communication often feels difficult and inconsistent. You may frequently feel misunderstood, struggle to follow others’ intentions, or find it hard to join conversations, especially in groups or less structured settings.
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
            <li>Often misses implied meanings, tone shifts, or sarcasm</li>
            <li>Has difficulty finding the right words in the moment</li>
            <li>Feels anxious or withdrawn during group interactions</li>
            <li>Prefers written, visual, or rehearsed communication</li>
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
            You may benefit from tools like social scripts, visual storyboards, communication coaching, or accommodations in social or work settings. These supports help reduce stress and improve understanding.
          </p>
        </div>
      </section>
    </div>
  );
}