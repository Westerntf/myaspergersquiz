import { useState } from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import Head from "next/head";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      <Head>
        <title>Login | MyAspergersQuiz</title>
        <meta name="description" content="Log in to access your personalized Asperger’s self-assessment reports, insights, and saved quiz results on MyAspergersQuiz." />
        <link rel="canonical" href="https://www.myaspergersquiz.com/login" />
        <meta property="og:title" content="Login | MyAspergersQuiz" />
        <meta property="og:description" content="Log in to access your personalized Asperger’s self-assessment reports, insights, and saved quiz results." />
        <meta property="og:url" content="https://www.myaspergersquiz.com/login" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="noindex,follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="MyAspergersQuiz" />
        <meta name="theme-color" content="#31758a" />
        <meta name="keywords" content="login, autism quiz, aspergers quiz, self-assessment, profile access, myaspergersquiz" />
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
          Log In
        </h2>
        <form onSubmit={handleLogin} aria-label="Login form">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email address"
            autoComplete="email"
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
            aria-label="Password"
            autoComplete="current-password"
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
            aria-label="Login"
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
            Login
          </button>
        </form>
      </main>
    </>
  );
}