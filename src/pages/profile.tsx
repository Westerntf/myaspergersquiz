import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Tooltip, Legend, ResponsiveContainer
} from "recharts";

type ReportDoc = {
  id: string;
  totalScore?: number;
  traitScores?: Record<string, number>;
  flags?: string[];
  fullReportUrl?: string;
  generatedAt?: any; // Firestore timestamp
};

function ReportSummaryChart({ reports, className }: { reports: ReportDoc[]; className?: string }) {
  if (!reports.length) return null;

  // Extract traits keys
  const traits = reports[0]?.traitScores ? Object.keys(reports[0].traitScores) : [];

  // Build the data array for radar chart
  const data = traits.map((trait) => {
    const entry: Record<string, any> = { trait: trait.charAt(0).toUpperCase() + trait.slice(1) };
    reports.forEach((r, i) => {
      entry[`session${i + 1}`] = r.traitScores?.[trait] ?? 0;
    });
    return entry;
  });

  const colors = ["#31758a", "#4caf50", "#ff9800", "#9c27b0", "#f44336"];

  return (
    <div
      className={className}
      style={{
        backgroundColor: "#f0f6fa",
        borderRadius: "12px",
        padding: "1rem",
        boxShadow: "0 2px 8px rgba(49, 117, 138, 0.15)",
      }}
      aria-label="Trait scores radar chart"
    >
      <ResponsiveContainer width="100%" height={350}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#e6f1f5" />
          <PolarAngleAxis dataKey="trait" tick={{ fill: "#31758a", fontWeight: 600, fontSize: 14 }} />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 8]}
            tickCount={9}
            tick={{ fill: "#31758a", fontWeight: 600, fontSize: 12 }}
          />
          {reports.map((r, i) => (
            <Radar
              key={r.id}
              name={`Session ${r.id}`}
              dataKey={`session${i + 1}`}
              stroke={colors[i % colors.length]}
              fill={colors[i % colors.length]}
              fillOpacity={0.5}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          ))}
          <Tooltip
            contentStyle={{ backgroundColor: "#fff", borderRadius: 8, borderColor: "#31758a" }}
            labelStyle={{ fontWeight: "bold", color: "#31758a" }}
            formatter={(value: number) => [`${value}`, "Score"]}
          />
          <Legend
            verticalAlign="bottom"
            height={40}
            wrapperStyle={{ fontWeight: 600, color: "#31758a" }}
            iconSize={14}
            layout="horizontal"
            align="center"
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function ProfilePage() {
  const router = useRouter();

  // States
  const [user, setUser] = useState<User | null>(null);
  const [reports, setReports] = useState<ReportDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [sortOption, setSortOption] = useState("dateDesc");

  function getSortedReports(a: ReportDoc, b: ReportDoc) {
    switch (sortOption) {
      case "dateAsc":
        return (a.generatedAt?.toMillis?.() || 0) - (b.generatedAt?.toMillis?.() || 0);
      case "dateDesc":
        return (b.generatedAt?.toMillis?.() || 0) - (a.generatedAt?.toMillis?.() || 0);
      case "scoreAsc":
        return (a.totalScore || 0) - (b.totalScore || 0);
      case "scoreDesc":
        return (b.totalScore || 0) - (a.totalScore || 0);
      default:
        return 0;
    }
  }

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
        main {
          max-width: 720px;
          margin: 3rem auto;
          padding: 2.5rem;
          background: #f9fbfc;
          border-radius: 16px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
            Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
          color: #2c3e50;
        }

        h1 {
          margin-bottom: 1rem;
          font-size: 2rem;
          color: #31758a;
          font-weight: 700;
        }

        hr {
          margin: 1.5rem 0;
          border: none;
          border-bottom: 1px solid #ddd;
        }

        /* Custom dropdown container */
        .filters {
          margin-bottom: 2rem;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          gap: 1.1rem;
          font-weight: 600;
          color: #31758a;
          font-size: 1rem;
        }
        .filters label {
          font-weight: 600;
          margin-right: 0.5rem;
          font-size: 1rem;
          color: #31758a;
        }

        .custom-select {
          position: relative;
          display: inline-block;
          width: 200px;
          border: 1px solid #31758a;
          border-radius: 8px;
          padding: 0.1rem 0.4rem 0.1rem 0.75rem;
          background: white;
        }

        .custom-select select {
          width: 100%;
          height: 36px;
          padding: 0;
          border: none;
          background: transparent;
          color: #31758a;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          border-radius: 8px;
        }
        .custom-select select:focus {
          outline: none;
          box-shadow: 0 0 6px #265e6aaa;
        }

        .custom-select::after {
          content: "▼";
          position: absolute;
          right: 0.8rem;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: #31758a;
          font-size: 0.8rem;
        }

        /* Report cards */
        .report-card {
          margin-bottom: 1.5rem;
          padding: 1rem 1.5rem;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 1px 4px rgba(49, 117, 138, 0.1);
          font-size: 0.95rem;
          line-height: 1.4;
          color: #2c3e50;
          transition: none;
        }

        .button-primary {
          margin-top: 0.5rem;
          display: inline-block;
          padding: 0.5rem 1rem;
          background-color: #31758a;
          color: #fff;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          cursor: pointer;
          user-select: none;
          transition: background-color 0.2s ease;
        }
        .button-primary:hover {
          background-color: #265e6a;
        }

        .trait-badge {
          display: inline-block;
          padding: 0.2rem 0.6rem;
          margin-right: 0.4rem;
          background-color: #e1f0f6;
          color: #31758a;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .flagged-list {
          font-size: 0.9rem;
          color: #b33;
          font-weight: 600;
        }

        .summary-chart {
          max-width: 100%;
          margin-bottom: 2rem;
          background-color: #f0f6fa;
          border-radius: 12px;
          padding: 1rem;
          box-shadow: 0 2px 8px rgba(49, 117, 138, 0.15);
        }

        .dashboard-links {
          margin-top: 2rem;
        }

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
          .filters {
            flex-direction: column;
            gap: 0.5rem;
          }
          .custom-select {
            width: 100%;
          }
        }
      `}</style>

      <main aria-busy={loading}>
      <Head>
        <html lang="en" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <title>Your Profile | MyAspergersQuiz - Track Your Neurodivergent Journey</title>
        <meta
          name="description"
          content="Access your personalized Asperger’s and autism quiz reports, download full PDF assessments, and track your neurodivergent journey on MyAspergersQuiz.com."
        />
        <meta
          name="keywords"
          content="aspergers profile, autism profile, quiz reports, full report PDF, neurodivergent profile, assessment, autism test, personalized quiz results"
        />
        <meta name="robots" content="index, follow, max-snippet:50, max-image-preview:large, max-video-preview:-1" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="theme-color" content="#31758a" />
        <link rel="canonical" href="https://myaspergersquiz.com/profile" />
        <link rel="alternate" href="https://myaspergersquiz.com/profile" hrefLang="en" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Your Profile | MyAspergersQuiz - Track Your Neurodivergent Journey" />
        <meta property="og:description" content="View and download your Asperger’s and autism quiz reports on MyAspergersQuiz.com." />
        <meta property="og:url" content="https://myaspergersquiz.com/profile" />
        <meta property="og:image" content="https://myaspergersquiz.com/og-image-profile.png" />
        <meta property="og:image:alt" content="MyAspergersQuiz Profile Dashboard" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="MyAspergersQuiz" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Your Profile | MyAspergersQuiz - Track Your Neurodivergent Journey" />
        <meta name="twitter:description" content="View and download your Asperger’s and autism quiz reports on MyAspergersQuiz.com." />
        <meta name="twitter:image" content="https://myaspergersquiz.com/og-image-profile.png" />
        <meta name="twitter:image:alt" content="MyAspergersQuiz Profile Dashboard" />
        <meta name="twitter:site" content="@MyAspergersQuiz" />
        <meta name="twitter:creator" content="@MyAspergersQuiz" />
        <link rel="preconnect" href="https://myaspergersquiz.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          as="style"
          onLoad={(e) => { (e.currentTarget as HTMLLinkElement).rel = 'stylesheet'; }}
        />
        <noscript>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
            rel="stylesheet"
            type="text/css"
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfilePage",
              "name": "Your Profile | MyAspergersQuiz",
              "description": "Access and download your personalized Asperger’s and autism quiz reports, and track your neurodivergent journey.",
              "url": "https://myaspergersquiz.com/profile",
              "inLanguage": "en-US",
              "publisher": {
                "@type": "Organization",
                "name": "MyAspergersQuiz",
                "url": "https://myaspergersquiz.com",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://myaspergersquiz.com/logo.png",
                  "width": 120,
                  "height": 120,
                },
              },
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://myaspergersquiz.com",
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Profile",
                    "item": "https://myaspergersquiz.com/profile",
                  },
                ],
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://myaspergersquiz.com/quiz?search={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </Head>

        <h1>Your Profile</h1>

        <p>
          <strong>Email:</strong> <span aria-label="User email">{user?.email}</span>
        </p>

        <hr />

        {/* Filters for sorting and filtering reports */}
        <div className="filters">
          <label htmlFor="sort">Sort by:</label>
          <div className="custom-select">
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              aria-label="Sort reports"
            >
              <option value="dateDesc">Date (Newest first)</option>
              <option value="dateAsc">Date (Oldest first)</option>
              <option value="scoreDesc">Score (High to Low)</option>
              <option value="scoreAsc">Score (Low to High)</option>
            </select>
          </div>
        </div>

        {/* Summary chart */}
        {reports.length > 0 && <ReportSummaryChart reports={reports} className="summary-chart" />}

        {/* Past reports list */}
        {reports.length > 0 ? (
          <>
            <h2 style={{ color: "#31758a" }}>Your Past Full Reports</h2>
            {reports
              .slice()
              .sort(getSortedReports)
              .map((r) => (
                <article key={r.id} className="report-card" tabIndex={0} aria-label={`Report session ${r.id}`}>
                  <p style={{ wordBreak: "break-word", overflowWrap: "break-word" }}>
                    <strong>Session ID:</strong> {r.id}
                  </p>

                  <p>
                    <strong>Total Score:</strong> {r.totalScore ?? "N/A"}
                  </p>

                  {/* Trait badges with color-coded backgrounds */}
                  {r.traitScores ? (
                    <div aria-label="Trait scores" role="list" style={{ marginBottom: "0.5rem" }}>
                      {Object.entries(r.traitScores).map(([trait, score]) => (
                        <span key={trait} className="trait-badge" role="listitem">
                          {trait.charAt(0).toUpperCase() + trait.slice(1)}: {String(score)}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p style={{ color: "#a33" }}>
                      <em>No trait scores found for this session.</em>
                    </p>
                  )}

                  <p className="flagged-list">
                    <strong>Flagged Questions:</strong> {r.flags?.join(", ") || "None"}
                  </p>

                  {/* Quick actions */}
                  <a
                    href={`/full-report?sessionId=${r.id}`}
                    className="button-primary"
                    aria-label={`View full report for session ${r.id}`}
                  >
                    View Full Report
                  </a>

                  {r.fullReportUrl && (
                    <a
                      href={r.fullReportUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button-primary"
                      style={{ marginLeft: "0.5rem" }}
                      aria-label={`Download PDF report for session ${r.id}`}
                    >
                      Download PDF Report
                    </a>
                  )}
                </article>
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

        <section className="dashboard-links">
          <h3 style={{ color: "#31758a", marginTop: "2rem", fontSize: "1.25rem" }}>
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
        </section>
      </main>
    </>
  );
}