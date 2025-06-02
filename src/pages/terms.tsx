import Head from "next/head";

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Use | MyAspergersQuiz.com</title>
        <meta name="description" content="Read the Terms of Use for MyAspergersQuiz.com. Understand your rights and responsibilities when using our Asperger's and autism self-assessment platform." />
        <link rel="canonical" href="https://www.myaspergersquiz.com/terms" />
        <meta name="robots" content="index, follow" />
        {/* Open Graph */}
        <meta property="og:title" content="Terms of Use | MyAspergersQuiz.com" />
        <meta property="og:description" content="Our Terms of Use explain your rights and obligations as a user of MyAspergersQuiz.com. Stay informed about your privacy, legal information, and site policies." />
        <meta property="og:url" content="https://www.myaspergersquiz.com/terms" />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="MyAspergersQuiz.com" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Terms of Use | MyAspergersQuiz.com" />
        <meta name="twitter:description" content="Read the Terms of Use for MyAspergersQuiz.com and understand your rights and responsibilities." />
        {/* JSON-LD Article/LegalPage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LegalPage",
              "name": "Terms of Use",
              "description": "Read the Terms of Use for MyAspergersQuiz.com. Understand your rights and responsibilities when using our platform.",
              "url": "https://www.myaspergersquiz.com/terms",
              "publisher": {
                "@type": "Organization",
                "name": "MyAspergersQuiz.com",
                "url": "https://www.myaspergersquiz.com"
              },
              "datePublished": "2024-01-01",
              "inLanguage": "en"
            }),
          }}
        />
      </Head>
      <main id="main-content" style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto", fontFamily: "'Inter', sans-serif", color: "#fff" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Terms of Use</h1>
        <p style={{ marginBottom: "1.5rem" }}>
          Welcome to MyAspergersQuiz.com. By accessing or using our website, you agree to be bound by these Terms of Use. Please read them carefully.
        </p>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>1. Use of the Site</h2>
        <p style={{ marginBottom: "1.5rem" }}>
          You agree to use the site for personal, non-commercial purposes only. You must not misuse this site or use it in any way that may cause harm to others or the website itself.
        </p>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>2. Intellectual Property</h2>
        <p style={{ marginBottom: "1.5rem" }}>
          All content on this website, including text, graphics, logos, and software, is the property of MyAspergersQuiz.com and is protected by intellectual property laws.
        </p>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>3. Accuracy of Information</h2>
        <p style={{ marginBottom: "1.5rem" }}>
          While we strive to ensure the accuracy of information presented, MyAspergersQuiz.com makes no warranties or guarantees regarding the completeness, accuracy, or reliability of any content.
        </p>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>4. Disclaimer</h2>
        <p style={{ marginBottom: "1.5rem" }}>
          The results and content provided by MyAspergersQuiz.com are for educational purposes only and do not constitute a medical diagnosis or treatment plan. Always consult a qualified professional for medical or psychological advice.
        </p>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>5. Limitation of Liability</h2>
        <p style={{ marginBottom: "1.5rem" }}>
          MyAspergersQuiz.com shall not be held liable for any damages arising from the use or inability to use the site, including but not limited to direct, indirect, incidental, or consequential damages.
        </p>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>6. Changes to Terms</h2>
        <p style={{ marginBottom: "1.5rem" }}>
          We reserve the right to modify these Terms of Use at any time. Any changes will be posted on this page and take effect immediately.
        </p>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>7. Contact</h2>
        <p>
          If you have any questions or concerns about these Terms, please contact us at <a href="mailto:support@myaspergersquiz.com" style={{ color: "#8be9fd", textDecoration: "underline" }}>support@myaspergersquiz.com</a>.
        </p>
      </main>
    </>
  );
}