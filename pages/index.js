import Link from "next/link";

export default function Home() {
  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <div style={styles.badge}>Français</div>

        <h1 style={styles.title}>
          La machine à fabriquer le passé composé
        </h1>

        <p style={styles.text}>
          Construis le passé composé étape par étape avec un tapis roulant,
          un auxiliaire et un participe passé.
        </p>

        <div style={styles.buttonContainer}>
          <Link href="/passe-compose-machine" style={styles.button}>
            Machine automatique ⚙️
          </Link>

          <Link href="/passe-compose-training" style={styles.button}>
            Mode entraînement ✍️
          </Link>
        </div>

        <footer style={styles.footer}>
          <Link href="/about" style={styles.footerLink}>
            About
          </Link>

          <Link href="/contact" style={styles.footerLink}>
            Contact
          </Link>

          <Link href="/privacy" style={styles.footerLink}>
            Privacy
          </Link>

          <Link href="/terms" style={styles.footerLink}>
            Terms
          </Link>

          <Link href="/disclaimer" style={styles.footerLink}>
            Disclaimer
          </Link>
        </footer>
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    fontFamily: "system-ui, sans-serif",
    background: "linear-gradient(135deg, #e0f2fe, #fef9c3)",
  },

  card: {
    maxWidth: "760px",
    width: "100%",
    padding: "42px",
    borderRadius: "32px",
    background: "white",
    textAlign: "center",
    boxShadow: "0 22px 50px rgba(15,23,42,.16)",
  },

  badge: {
    display: "inline-block",
    padding: "8px 14px",
    borderRadius: "999px",
    background: "#172033",
    color: "white",
    fontWeight: 900,
    marginBottom: "16px",
  },

  title: {
    fontSize: "clamp(2rem, 6vw, 4rem)",
    lineHeight: 1,
    margin: "0 0 18px",
    color: "#172033",
  },

  text: {
    fontSize: "1.2rem",
    lineHeight: 1.5,
    color: "#475569",
    marginBottom: "32px",
  },

  buttonContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "16px",
  },

  button: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "260px",
    padding: "15px 24px",
    borderRadius: "18px",
    background: "linear-gradient(135deg, #2563eb, #7c3aed)",
    color: "white",
    fontWeight: 900,
    textDecoration: "none",
    boxShadow: "0 12px 24px rgba(37,99,235,.3)",
  },

  footer: {
    marginTop: "34px",
    paddingTop: "22px",
    borderTop: "1px solid #e2e8f0",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "14px",
    fontSize: "0.95rem",
  },

  footerLink: {
    color: "#64748b",
    fontWeight: 800,
    textDecoration: "none",
  },
};
