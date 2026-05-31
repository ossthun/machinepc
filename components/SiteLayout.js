import Link from "next/link";

export default function SiteLayout({ title, children }) {
  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <Link href="/" style={styles.back}>← Accueil</Link>
        <h1 style={styles.title}>{title}</h1>
        <div style={styles.text}>{children}</div>

        <footer style={styles.footer}>
          <Link href="/about" style={styles.footerLink}>À propos</Link>
          <Link href="/contact" style={styles.footerLink}>Contact</Link>
          <Link href="/privacy" style={styles.footerLink}>Confidentialité</Link>
          <Link href="/terms" style={styles.footerLink}>Conditions</Link>
          <Link href="/disclaimer" style={styles.footerLink}>Avertissement</Link>
        </footer>
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
    maxWidth: "900px",
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
    fontSize: "clamp(2rem, 6vw, 3.5rem)",
    color: "#172033",
    lineHeight: 1.1,
  },
  text: {
    fontSize: "1.1rem",
    lineHeight: 1.75,
    color: "#475569",
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
