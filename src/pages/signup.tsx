import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/full-report");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      <Head>
        <title>Sign Up – MyAspergersQuiz</title>
        <meta name="description" content="Create your MyAspergersQuiz account for a personalized neurodivergence profile and instant full report access. Sign up in seconds!" />
        <meta name="robots" content="index, follow" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="MyAspergersQuiz" />
        <meta name="copyright" content="MyAspergersQuiz 2025" />
        <meta name="theme-color" content="#31758a" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="MyAspergersQuiz" />
        <meta property="og:title" content="Sign Up – MyAspergersQuiz" />
        <meta property="og:description" content="Create your MyAspergersQuiz account for a personalized neurodivergence profile and instant full report access. Sign up in seconds!" />
        <meta property="og:url" content="https://www.myaspergersquiz.com/signup" />
        <meta property="og:locale" content="en_AU" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sign Up – MyAspergersQuiz" />
        <meta name="twitter:description" content="Create your MyAspergersQuiz account for a personalized neurodivergence profile and instant full report access. Sign up in seconds!" />
        <link rel="canonical" href="https://www.myaspergersquiz.com/signup" />
      </Head>
      <main
        style={{
          maxWidth: "500px",
          margin: "5rem auto",
          padding: "2.5rem",
          background: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
        }}
      >
        <h2 style={{ textAlign: "center", color: "#31758a", marginBottom: "1.5rem" }}>
          Create Account
        </h2>
        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              display: "block",
              width: "100%",
              marginBottom: "1rem",
              padding: "0.75rem",
              fontSize: "1rem",
              borderRadius: "8px",
              border: "1px solid #ccc"
            }}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              display: "block",
              width: "100%",
              marginBottom: "1rem",
              padding: "0.75rem",
              fontSize: "1rem",
              borderRadius: "8px",
              border: "1px solid #ccc"
            }}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.75rem",
              backgroundColor: "#31758a",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "1rem",
              cursor: "pointer",
              marginTop: "0.5rem"
            }}
          >
            Sign Up
          </button>
        </form>
      </main>
    </>
  );
}