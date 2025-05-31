import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function ProfilePage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUserEmail(null);
        setLoading(false);
        return;
      }

      setUserEmail(user.email);

      const reportRef = doc(db, "reports", user.uid);
      const reportSnap = await getDoc(reportRef);
      if (reportSnap.exists()) {
        setReport(reportSnap.data());
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  if (loading) {
    return <div style={{ textAlign: "center", marginTop: "4rem" }}>Loading profile...</div>;
  }

  if (!userEmail) {
    return (
      <main style={{
        maxWidth: "600px",
        margin: "3rem auto",
        padding: "2rem",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 0 10px rgba(0,0,0,0.05)"
      }}>
        <h1 style={{ color: "#31758a", marginBottom: "1rem" }}>You're not logged in</h1>
        <p style={{ marginBottom: "1.5rem" }}>
          To view your profile and full report, please log in or sign up.
        </p>
        <div style={{ display: "flex", gap: "1rem" }}>
          <a href="/login" style={{
            padding: "0.75rem 1.25rem",
            backgroundColor: "#31758a",
            color: "#fff",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: 600
          }}>
            Log In
          </a>
          <a href="/signup" style={{
            padding: "0.75rem 1.25rem",
            backgroundColor: "#31758a",
            color: "#fff",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: 600
          }}>
            Sign Up
          </a>
        </div>
      </main>
    );
  }

  return (
    <main style={{
      maxWidth: "720px",
      margin: "3rem auto",
      padding: "2.5rem",
      background: "#f9fbfc",
      borderRadius: "16px",
      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)"
    }}>
      <h1 style={{
        marginBottom: "1rem",
        fontSize: "2rem",
        color: "#31758a"
      }}>Your Profile</h1>
      <p style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
        <strong>Email:</strong> {userEmail}
      </p>

      <hr style={{ margin: "1.5rem 0" }} />

      {report ? (
        <>
          <h2 style={{ color: "#31758a" }}>Most Recent Full Report</h2>
          <p><strong>Total Score:</strong> {report.total}</p>
          <ul>
            {Object.entries(report.traitScores).map(([trait, score]) => (
              <li key={trait}>
                {trait.charAt(0).toUpperCase() + trait.slice(1)}: {String(score)}
              </li>
            ))}
          </ul>
          <p><strong>Flagged Questions:</strong> {report.flags?.join(", ") || "None"}</p>
        </>
      ) : (
        <p style={{ color: "#777", fontStyle: "italic", textAlign: "center" }}>
          No full report found yet.
        </p>
      )}

      {/* PDF Download Button */}
      <button
        onClick={() => window.print()}
        style={{
          marginTop: "1rem",
          marginRight: "1rem",
          padding: "0.75rem 1.5rem",
          backgroundColor: "#31758a",
          color: "#fff",
          border: "none",
          borderRadius: "12px",
          cursor: "pointer",
          fontWeight: 600,
          fontSize: "1rem",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
        }}
      >
        Download Report (PDF)
      </button>

      {/* Dashboard Navigation Links */}
      <h3 style={{
        color: "#31758a",
        marginTop: "2rem",
        fontSize: "1.25rem"
      }}>
        Dashboard Links
      </h3>
      <ul style={{ listStyle: "none", paddingLeft: 0, lineHeight: "2" }}>
        <li>
          <a href="/quiz" style={{
            color: "#31758a",
            textDecoration: "none",
            fontWeight: 500
          }}>➤ Take the Quiz Again</a>
        </li>
        <li>
          <a href="/full-report" style={{
            color: "#31758a",
            textDecoration: "none",
            fontWeight: 500
          }}>➤ View Full Report</a>
        </li>
        <li>
          <a href="/results" style={{
            color: "#31758a",
            textDecoration: "none",
            fontWeight: 500
          }}>➤ Summary Results Page</a>
        </li>
      </ul>

      <button
        onClick={handleLogout}
        style={{
          marginTop: "2rem",
          padding: "0.75rem 1.5rem",
          backgroundColor: "#cf4444",
          color: "#fff",
          border: "none",
          borderRadius: "12px",
          cursor: "pointer",
          fontWeight: 600,
          fontSize: "1rem",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
        }}
      >
        Log Out
      </button>
    </main>
  );
}