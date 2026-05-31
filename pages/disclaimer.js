import Link from "next/link";

export default function Disclaimer() {
  return (
    <Page title="Disclaimer">
      <p>
        This website is an educational grammar tool. It is not an official French
        language examination resource.
      </p>

      <p>
        The passé composé forms are generated with simplified grammar rules and a
        limited list of irregular verbs. Some rare verbs or special cases may not
        yet be handled correctly.
      </p>

      <p>
        Teachers should review exercises before using them in tests or official
        classroom assessments.
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
