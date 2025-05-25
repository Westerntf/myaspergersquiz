export default function Privacy() {
  return (
    <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto", fontFamily: "'Inter', sans-serif", color: "#fff", backgroundColor: "#101025" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Privacy Policy</h1>
      <p style={{ marginBottom: "1rem" }}>
        At MyAspergersQuiz.com, your privacy is extremely important to us. This Privacy Policy explains what information we collect, how we use it, and what choices you have.
      </p>

      <h2 style={{ fontSize: "1.4rem", marginTop: "2rem" }}>1. Information We Collect</h2>
      <ul style={{ marginBottom: "1rem", paddingLeft: "1.25rem", lineHeight: 1.7 }}>
        <li>Quiz Answers: Your answers are stored locally in your browser and not shared with our servers.</li>
        <li>Stripe Payment Data: Payment information is securely handled by Stripe and not stored on our servers.</li>
        <li>Email (if entered via newsletter): Only stored for communication and not shared with third parties.</li>
      </ul>

      <h2 style={{ fontSize: "1.4rem", marginTop: "2rem" }}>2. How We Use Your Information</h2>
      <p style={{ marginBottom: "1rem" }}>
        We use the information to deliver quiz results, improve the experience, and optionally communicate with users who sign up for our newsletter.
      </p>

      <h2 style={{ fontSize: "1.4rem", marginTop: "2rem" }}>3. Cookies & Local Storage</h2>
      <p style={{ marginBottom: "1rem" }}>
        We use local storage to save your quiz progress and results. These are only stored on your device and are not transmitted to our servers.
      </p>

      <h2 style={{ fontSize: "1.4rem", marginTop: "2rem" }}>4. Third-Party Services</h2>
      <p style={{ marginBottom: "1rem" }}>
        We use Stripe for secure checkout and Google Analytics to understand usage trends. These third parties may collect anonymized usage data.
      </p>

      <h2 style={{ fontSize: "1.4rem", marginTop: "2rem" }}>5. Your Rights</h2>
      <p style={{ marginBottom: "1rem" }}>
        You can clear your local data at any time. If you subscribed to our newsletter, you can unsubscribe via any email or contact us to request deletion.
      </p>

      <h2 style={{ fontSize: "1.4rem", marginTop: "2rem" }}>6. Contact</h2>
      <p style={{ marginBottom: "2rem" }}>
        If you have any questions, contact us at support@myaspergersquiz.com.
      </p>
    </main>
  );
}