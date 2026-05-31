import Link from "next/link";

export default function Terms() {
  return (
    <Page title="Terms of Use">
      <p>
        This website is provided as a free educational resource.
      </p>

      <p>
        The materials are intended to support learning French grammar, especially
        the passé composé.
      </p>

      <p>
        No guarantee is made that every answer, explanation, or generated form is
        perfect. Teachers and learners should check important content before
        using it in formal assessments.
      </p>

      <p>
        Users may use the website for personal learning and classroom practice.
      </p>

      <p>
        Misuse of the website, automated scraping, or attempts to disrupt the
        service are not permitted.
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
