import Head from "next/head";

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact Us | MyAspergersQuiz.com</title>
        <meta
          name="description"
          content="Contact MyAspergersQuiz.com for support, feedback, or questions. We're here to help you on your self-assessment journey."
        />
        <link rel="canonical" href="https://www.myaspergersquiz.com/contact" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="Contact Us | MyAspergersQuiz.com" />
        <meta property="og:description" content="Have a question or feedback? Get in touch with the MyAspergersQuiz.com team." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.myaspergersquiz.com/contact" />
        <meta property="og:site_name" content="MyAspergersQuiz.com" />
        {/* <meta property="og:image" content="https://www.myaspergersquiz.com/og-image.png" /> */}

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Contact Us | MyAspergersQuiz.com" />
        <meta name="twitter:description" content="Contact us for support, questions, or suggestions." />

        {/* JSON-LD ContactPage schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ContactPage",
              "name": "Contact Us",
              "url": "https://www.myaspergersquiz.com/contact",
              "description": "Contact page for MyAspergersQuiz.com, the leading self-assessment quiz for Asperger’s traits.",
              "publisher": {
                "@type": "Organization",
                "name": "MyAspergersQuiz.com",
                "url": "https://www.myaspergersquiz.com"
              },
              "inLanguage": "en"
            }),
          }}
        />
      </Head>
      <main
        id="main-content"
        style={{
          padding: "2rem",
          maxWidth: "800px",
          margin: "0 auto",
          fontFamily: "'Inter', sans-serif",
          color: "#fff"
        }}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Contact Us</h1>
        <p style={{ marginBottom: "2rem" }}>
          Have a question, suggestion, or just want to say hello? Fill out the form below and we’ll get back to you soon.
        </p>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem"
          }}
          aria-label="Contact form"
        >
          <label htmlFor="name" style={{ display: "none" }}>Your Name</label>
          <input
            id="name"
            type="text"
            placeholder="Your Name"
            style={{
              padding: "0.75rem",
              borderRadius: "6px",
              border: "1px solid #333",
              background: "#101025",
              color: "#fff"
            }}
            required
            autoComplete="name"
          />
          <label htmlFor="email" style={{ display: "none" }}>Your Email</label>
          <input
            id="email"
            type="email"
            placeholder="Your Email"
            style={{
              padding: "0.75rem",
              borderRadius: "6px",
              border: "1px solid #333",
              background: "#101025",
              color: "#fff"
            }}
            required
            autoComplete="email"
          />
          <label htmlFor="message" style={{ display: "none" }}>Your Message</label>
          <textarea
            id="message"
            placeholder="Your Message"
            rows={6}
            style={{
              padding: "0.75rem",
              borderRadius: "6px",
              border: "1px solid #333",
              background: "#101025",
              color: "#fff",
              resize: "vertical"
            }}
            required
          />
          <button
            type="submit"
            style={{
              background: "#4e7fff",
              color: "white",
              border: "none",
              borderRadius: "6px",
              padding: "0.75rem 1.5rem",
              fontSize: "1rem",
              cursor: "pointer"
            }}
          >
            Send Message
          </button>
        </form>
      </main>
    </>
  );
}