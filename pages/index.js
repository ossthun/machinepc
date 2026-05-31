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

        <section style={styles.infoSection}>
          <h2 style={styles.sectionTitle}>Comment ça marche ?</h2>

          <p style={styles.infoText}>
            Choisis un pronom et un verbe. La machine montre comment former le
            passé composé: auxiliaire, participe passé et accord si nécessaire.
          </p>
        </section>

        <section style={styles.linkSection}>
          <h2 style={styles.sectionTitle}>
            Apprendre le passé composé
          </h2>

          <div style={styles.contentLinks}>
            <Link
              href="/quest-ce-que-le-passe-compose"
              style={styles.contentLink}
            >
              Qu’est-ce que le passé composé ?
            </Link>

            <Link
              href="/avoir-ou-etre"
              style={styles.contentLink}
            >
              Avoir ou être
            </Link>

            <Link
              href="/participe-passe"
              style={styles.contentLink}
            >
              Le participe passé
            </Link>

            <Link
              href="/verbes-avec-etre"
              style={styles.contentLink}
            >
              Les verbes avec être
            </Link>

            <Link
              href="/erreurs-frequentes"
              style={styles.contentLink}
            >
              Erreurs fréquentes
            </Link>

            <Link
              href="/pour-les-enseignants"
              style={styles.contentLink}
            >
              Pour les enseignants
            </Link>
          </div>
        </section>

        <footer style={styles.footer}>
          <Link href="/about" style={styles.footerLink}>
            À propos
          </Link>

          <Link href="/contact" style={styles.footerLink}>
            Contact
          </Link>

          <Link href="/privacy" style={styles.footerLink}>
            Confidentialité
          </Link>

          <Link href="/terms" style={styles.footerLink}>
            Conditions
          </Link>

          <Link href="/disclaimer" style={styles.footerLink}>
            Avertissement
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
    maxWidth: "900px",
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

  infoSection: {
    marginTop: "36px",
    padding: "24px",
    borderRadius: "24px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
  },

  linkSection: {
    marginTop: "24px",
    padding: "24px",
    borderRadius: "24px",
    background: "#fefce8",
    border: "1px solid #fde68a",
  },

  sectionTitle: {
    margin: "0 0 12px",
    fontSize: "1.6rem",
    color: "#172033",
  },

  infoText: {
    margin: 0,
    fontSize: "1.05rem",
    lineHeight: 1.6,
    color: "#475569",
  },

  contentLinks: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "12px",
    marginTop: "18px",
  },

  contentLink: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "54px",
    padding: "12px 14px",
    borderRadius: "16px",
    background: "white",
    color: "#2563eb",
    fontWeight: 900,
    textDecoration: "none",
    border: "1px solid #e2e8f0",
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
