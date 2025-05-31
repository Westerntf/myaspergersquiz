export default function Level1() {
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <h2 className="insight-title" style={{ color: "#28A745", margin: 0 }}>
            Flagged Traits – Level 1
          </h2>
        </div>

        <p
          className="insight-summary"
          style={{ fontSize: "1.05rem", color: "#333", margin: 0 }}
        >
          No flagged traits detected. Your responses did not match any of the key indicators.
        </p>
      </section>
    </div>
  );
}