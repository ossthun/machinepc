import Link from "next/link";

export default function Privacy() {
  return (
    <Page title="Privacy Policy">
      <p>
        This website is designed as a simple educational tool.
      </p>

      <p>
        It does not require students to create an account, log in, or submit
        personal information.
      </p>

      <p>
        The website may be hosted by third-party providers such as Vercel. These
        providers may process technical data such as IP addresses, browser type,
        device information, and access logs for security and operation.
      </p>

      <p>
        If analytics, advertising, or payment tools are added later, this privacy
        policy should be updated accordingly.
      </p>

      <p>
        Contact information provided on the contact page is used only to answer
        messages.
      </p>
    </Page>
  );
}

function Page({ title, children }) {
  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <Link href="/" style={styles.back}>← Home</Link>
        <h1 style={styles.title}>{title}</h1>
        <div style={styles.text}>{children}</div>
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "32px",
    fontFamily: "system-ui, sans-serif",
    background: "linear-gradient(135deg, #e0f2fe, #fef9c3)",
  },
  card: {
    maxWidth: "850px",
    margin: "0 auto",
    background: "white",
    borderRadius: "28px",
    padding: "36px",
    boxShadow: "0 22px 50px rgba(15,23,42,.16)",
  },
  back: {
    color: "#2563eb",
    fontWeight: 900,
    textDecoration: "none",
  },
  title: {
    fontSize: "2.5rem",
    color: "#172033",
  },
  text: {
    fontSize: "1.1rem",
    lineHeight: 1.7,
    color: "#475569",
  },
};
