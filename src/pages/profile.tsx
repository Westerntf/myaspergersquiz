import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

type ReportDoc = {
  id: string;
  totalScore?: number;
  traitScores?: Record<string, number>;
  flags?: string[];
  fullReportUrl?: string;
  generatedAt?: any; // Firestore timestamp
};

export default function ProfilePage() {
  const router = useRouter();

  // States
  const [user, setUser] = useState<User | null>(null);
  const [reports, setReports] = useState<ReportDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        router.replace("/login");
        return;
      }
      setUser(user);

      try {
        const sessionsRef = collection(db, "reports", user.uid, "sessions");
        const q = query(sessionsRef, where("paid", "==", true), orderBy("generatedAt", "desc"));
        const sessionSnaps = await getDocs(q);

        if (sessionSnaps.empty) {
          setReports([]);
        } else {
          const allReports: ReportDoc[] = sessionSnaps.docs.map(docSnap => ({
            id: docSnap.id,
            ...(docSnap.data() as Omit<ReportDoc, "id">),
          }));
          setReports(allReports);
        }
      } catch (fetchError) {
        console.error("Error fetching reports:", fetchError);
        setError("Failed to load your reports. Please try again later.");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  if (loading) {
    return <div style={{ textAlign: "center", marginTop: "4rem" }} aria-busy="true">Loading profile...</div>;
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "4rem", color: "red" }}>
        <p>{error}</p>
        <button
          onClick={() => router.reload()}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#31758a",
            color: "#fff",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <style jsx>{`
        @media (max-width: 600px) {
          main {
            padding: 1rem !important;
            margin: 1rem !important;
          }
          h1 {
            font-size: 1.5rem !important;
          }
          ul {
            padding-left: 1rem !important;
          }
        }
      `}</style>
      <main
        style={{
          maxWidth: "720px",
          margin: "3rem auto",
          padding: "2.5rem",
          background: "#f9fbfc",
          borderRadius: "16px",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)",
        }}
        aria-busy={loading}
      >
<Head>
  {/* Primary SEO */}
  <title>Your Profile | MyAspergersQuiz.com</title>
  <meta name="description" content="Access your personalized Asperger’s and autism quiz reports, download full PDF assessments, and track your neurodivergent journey on MyAspergersQuiz.com." />
  <meta name="keywords" content="aspergers profile, autism profile, quiz reports, full report PDF, myaspergersquiz, neurodivergent profile, assessment, autism test, profile page" />
  <meta name="author" content="MyAspergersQuiz Team" />
  <meta name="copyright" content="MyAspergersQuiz.com" />
  <meta name="subject" content="User Profile & Assessment Results" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex,follow" />
  <meta name="referrer" content="origin-when-cross-origin" />
  <meta name="theme-color" content="#31758a" />
  <meta httpEquiv="content-language" content="en" />
  <link rel="canonical" href="https://myaspergersquiz.com/profile" />
  <link rel="alternate" href="https://myaspergersquiz.com/profile" hrefLang="en-au" />
  <link rel="alternate" href="https://myaspergersquiz.com/profile" hrefLang="en-us" />
  <link rel="alternate" href="https://myaspergersquiz.com/profile" hrefLang="x-default" />

  {/* Open Graph / Facebook / LinkedIn */}
  <meta property="og:type" content="profile" />
  <meta property="og:title" content="Your Profile – Personalized Autism & Asperger’s Reports" />
  <meta property="og:description" content="Access all your private quiz results and full PDF reports. Track your neurodivergent journey on MyAspergersQuiz.com." />
  <meta property="og:image" content="https://myaspergersquiz.com/social-preview.jpg" />
  <meta property="og:image:alt" content="Profile dashboard preview from MyAspergersQuiz.com" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:url" content="https://myaspergersquiz.com/profile" />
  <meta property="og:site_name" content="MyAspergersQuiz.com" />
  <meta property="og:locale" content="en_AU" />

  {/* Twitter/X */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Your Profile – Personalized Autism & Asperger’s Reports" />
  <meta name="twitter:description" content="View, download, and track your assessment history. Instantly access your full report PDFs and neurodivergent insights." />
  <meta name="twitter:image" content="https://myaspergersquiz.com/social-preview.jpg" />
  <meta name="twitter:image:alt" content="Profile results dashboard preview from MyAspergersQuiz.com" />
  <meta name="twitter:site" content="@MyAspergersQuiz" />
  <meta name="twitter:creator" content="@MyAspergersQuiz" />

  {/* Brand / PWA */}
  <meta name="apple-mobile-web-app-title" content="MyAspergersQuiz" />
  <meta name="application-name" content="MyAspergersQuiz" />
  <link rel="icon" href="/myaspergersquiz-logo.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />
  <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />

  {/* Performance */}
  <link rel="preload" href="/myaspergersquiz-logo.png" as="image" />
  <link rel="preload" href="/fonts/Inter-var-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

  {/* JSON-LD: ProfilePage, BreadcrumbList, Organization */}
  <script type="application/ld+json">{`
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://myaspergersquiz.com/profile"
      },
      "name": "Your Profile – MyAspergersQuiz.com",
      "description": "Access your full autism and Asperger’s reports, track assessment history, and download PDFs.",
      "image": "https://myaspergersquiz.com/social-preview.jpg",
      "url": "https://myaspergersquiz.com/profile",
      "publisher": {
        "@type": "Organization",
        "name": "MyAspergersQuiz.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://myaspergersquiz.com/myaspergersquiz-logo.png"
        }
      },
      "about": [
        "autism",
        "Asperger's",
        "assessment",
        "profile",
        "neurodivergence"
      ]
    }
  `}</script>
  <script type="application/ld+json">{`
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://myaspergersquiz.com/" },
        { "@type": "ListItem", "position": 2, "name": "Profile", "item": "https://myaspergersquiz.com/profile" }
      ]
    }
  `}</script>
  <script type="application/ld+json">{`
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "MyAspergersQuiz",
      "url": "https://myaspergersquiz.com/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://myaspergersquiz.com/myaspergersquiz-logo.png",
        "width": 32,
        "height": 32,
        "caption": "MyAspergersQuiz logo"
      },
      "sameAs": ["https://twitter.com/myaspergersquiz"]
    }
  `}</script>
</Head>
      <h1
        style={{
          marginBottom: "1rem",
          fontSize: "2rem",
          color: "#31758a",
        }}
      >
        Your Profile
      </h1>
      <p style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
        <strong>Email:</strong> <span aria-label="User email">{user?.email}</span>
      </p>

      <hr style={{ margin: "1.5rem 0" }} />

      {reports.length > 0 ? (
        <>
          <h2 style={{ color: "#31758a" }}>Your Past Full Reports</h2>
          {reports.map((r) => (
            <div
              key={r.id}
              style={{
                marginBottom: "1.5rem",
                padding: "1rem",
                background: "#fff",
                borderRadius: "8px",
                boxShadow: "0 0 6px rgba(0,0,0,0.05)",
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              <p style={{ wordBreak: "break-word", overflowWrap: "break-word" }}>
                <strong>Session ID:</strong> {r.id}
              </p>
              <p>
                <strong>Total Score:</strong> {r.totalScore ?? "N/A"}
              </p>
              {r.traitScores ? (
                <ul style={{ paddingLeft: "1rem", marginTop: "0.5rem", marginBottom: "0.5rem" }}>
                  {Object.entries(r.traitScores).map(([trait, score]) => (
                    <li key={trait} style={{ marginBottom: "0.25rem" }}>
                      {trait.charAt(0).toUpperCase() + trait.slice(1)}: {String(score)}
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ color: "#a33" }}>
                  <em>No trait scores found for this session.</em>
                </p>
              )}
              <p>
                <strong>Flagged Questions:</strong> {r.flags?.join(", ") || "None"}
              </p>
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
                  fontWeight: 600,
                }}
              >
                View Full Report
              </a>
              {r.fullReportUrl && (
                <a
                  href={r.fullReportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    marginTop: "0.5rem",
                    marginLeft: "0.5rem",
                    display: "inline-block",
                    padding: "0.5rem 1rem",
                    backgroundColor: "#31758a",
                    color: "#fff",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  Download PDF Report
                </a>
              )}
            </div>
          ))}
        </>
      ) : (
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <p style={{ color: "#777", fontStyle: "italic", marginBottom: "1rem" }}>
            No full reports found yet.
          </p>
          <button
            onClick={() => router.push("/quiz")}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#31758a",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "1rem",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            Take the Quiz Now
          </button>
        </div>
      )}

      <h3
        style={{
          color: "#31758a",
          marginTop: "2rem",
          fontSize: "1.25rem",
        }}
      >
        Dashboard Links
      </h3>
      <ul style={{ listStyle: "none", paddingLeft: 0, lineHeight: "2" }}>
        <li style={{ marginBottom: "0.25rem" }}>
          <a
            href="/quiz"
            style={{
              color: "#31758a",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            ➤ Take the Quiz Again
          </a>
        </li>
      </ul>

      <button
        onClick={async () => {
          await auth.signOut();
          router.push("/login");
        }}
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
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        Log Out
      </button>
    </main>
    </>
  );
}