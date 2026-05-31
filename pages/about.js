import Link from "next/link";

export default function About() {
  return (
    <Page title="About">
      <p>
        <strong>La machine à fabriquer le passé composé</strong> is a small
        educational website for students learning French grammar.
      </p>

      <p>
        The goal is simple: students should understand how the passé composé is
        built step by step — first the auxiliary, then the past participle.
      </p>

      <p>
        The website includes an automatic machine and a training mode where
        students enter the forms themselves.
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
