import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function ProfilePage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        router.replace("/login");
        return;
      }

      setUserEmail(user.email);
      setLoading(false);

      try {
        const sessionsRef = collection(db, "reports", user.uid, "sessions");
        const q = query(sessionsRef, where("paid", "==", true));
        const sessionSnaps = await getDocs(q);

        type ReportDoc = {
          id: string;
          total?: number;
          traitScores?: Record<string, number>;
          flags?: string[];
        };

        const allReports: ReportDoc[] = sessionSnaps.docs.map(docSnap => ({
          id: docSnap.id,
          ...(docSnap.data() as Omit<ReportDoc, "id">),
        }));
        setReport(allReports);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
      // No need to setLoading(false) here—loading was cleared early.
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

      {report && report.length > 0 ? (
        <>
          <h2 style={{ color: "#31758a" }}>Your Past Full Reports</h2>
          {report.map((r: any) => (
            <div key={r.id} style={{ marginBottom: "1.5rem", padding: "1rem", background: "#fff", borderRadius: "8px", boxShadow: "0 0 6px rgba(0,0,0,0.05)" }}>
              <p><strong>Session ID:</strong> {r.id}</p>
              <p><strong>Total Score:</strong> {r.total}</p>
              <ul>
                {Object.entries(r.traitScores).map(([trait, score]) => (
                  <li key={trait}>
                    {trait.charAt(0).toUpperCase() + trait.slice(1)}: {String(score)}
                  </li>
                ))}
              </ul>
              <p><strong>Flagged Questions:</strong> {r.flags?.join(", ") || "None"}</p>
              <a
                href={`/full-report?sessionId=${r.id}`}
                style={{
                  marginTop: "0.5rem",
                  display: "inline-block",
                  padding: "0.5rem 1rem",
                  backgroundColor: "#31758a",
                  color: "#fff",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: 600
                }}
              >
                View Full Report
              </a>
            </div>
          ))}
        </>
      ) : (
        <p style={{ color: "#777", fontStyle: "italic", textAlign: "center" }}>
          No full reports found yet.
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