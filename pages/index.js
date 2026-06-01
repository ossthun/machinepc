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

        <div style={styles.featureGrid}>
          <Link href="/passe-compose-machine" style={styles.featureCard}>
            <img
              src="/machine-card.png"
              alt="Machine du passé composé"
              style={styles.cardImage}
            />

            <div style={styles.featureContent}>
              <div style={styles.featureTop}>
                <div style={styles.featureIcon}>⚙️</div>

                <h2 style={styles.featureTitle}>
                  Machine automatique
                </h2>
              </div>

              <p style={styles.featureText}>
                Regarde la machine construire le passé composé pas à pas.
              </p>

              <div style={styles.featureArrow}>→</div>
            </div>
          </Link>

          <Link href="/passe-compose-training" style={styles.featureCardAlt}>
            <img
              src="/training-card.png"
              alt="Élève qui étudie le passé composé"
              style={styles.cardImage}
            />

            <div style={styles.featureContent}>
              <div style={styles.featureTop}>
                <div style={styles.featureIcon}>✍️</div>

                <h2 style={styles.featureTitle}>
                  Mode entraînement
                </h2>
              </div>

              <p style={styles.featureText}>
                Écris toi-même l’auxiliaire et le participe passé.
              </p>

              <div style={styles.featureArrow}>→</div>
            </div>
          </Link>
        </div>

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
              href="/list"
              style={styles.contentLink}
            >
              Liste des participes passés
            </Link>

            <Link
              href="/verbes-avec-etre"
              style={styles.contentLink}
            >
              Les verbes avec être
            </Link>

            <Link
              href="/ex1"
              style={styles.contentLink}>
              Exercice 1: auxiliaire
            </Link>

            <Link
              href="/ex2"
              style={styles.contentLink}>
              Exercice 2: formes complètes
            </Link>

            <Link
              href="/erreurs-frequentes"
              style={styles.contentLink}
            >
              Erreurs fréquentes
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
    background:
      "radial-gradient(circle at top left, #fde68a, transparent 28%), radial-gradient(circle at top right, #bfdbfe, transparent 30%), linear-gradient(135deg, #f8fafc, #e0f2fe)",
  },

  card: {
    maxWidth: "980px",
    width: "100%",
    padding: "46px",
    borderRadius: "36px",
    background: "rgba(255,255,255,.92)",
    textAlign: "center",
    boxShadow: "0 28px 70px rgba(15,23,42,.18)",
    border: "2px solid rgba(255,255,255,.9)",
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
    fontSize: "clamp(2.2rem, 6vw, 4.4rem)",
    lineHeight: 1,
    margin: "0 0 18px",
    color: "#172033",
  },

  text: {
    maxWidth: "680px",
    margin: "0 auto 36px",
    fontSize: "1.2rem",
    lineHeight: 1.5,
    color: "#475569",
  },

  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "24px",
    marginBottom: "38px",
  },

  featureCard: {
    minHeight: "460px",
    padding: "18px",
    borderRadius: "32px",
    overflow: "hidden",
    textDecoration: "none",
    background: "linear-gradient(145deg, #0f766e, #0891b2)",
    boxShadow: "0 22px 40px rgba(8,145,178,.28)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    border: "2px solid rgba(255,255,255,.35)",
  },

  featureCardAlt: {
    minHeight: "460px",
    padding: "18px",
    borderRadius: "32px",
    overflow: "hidden",
    textDecoration: "none",
    background: "linear-gradient(145deg, #7c3aed, #2563eb)",
    boxShadow: "0 22px 40px rgba(37,99,235,.28)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    border: "2px solid rgba(255,255,255,.35)",
  },

  cardImage: {
    width: "100%",
    height: "250px",
    objectFit: "cover",
    borderRadius: "24px",
    marginBottom: "18px",
    boxShadow: "0 12px 28px rgba(0,0,0,.22)",
    display: "block",
  },

  featureContent: {
    position: "relative",
    textAlign: "left",
    padding: "4px 4px 8px",
    flex: 1,
  },

  featureTop: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "14px",
  },

  featureIcon: {
    width: "54px",
    height: "54px",
    borderRadius: "18px",
    background: "rgba(255,255,255,.2)",
    display: "grid",
    placeItems: "center",
    fontSize: "1.8rem",
    flexShrink: 0,
  },

  featureTitle: {
    margin: 0,
    fontSize: "1.7rem",
    lineHeight: 1.1,
  },

  featureText: {
    margin: 0,
    color: "rgba(255,255,255,.92)",
    fontSize: "1.05rem",
    lineHeight: 1.45,
    paddingRight: "56px",
  },

  featureArrow: {
    position: "absolute",
    right: "4px",
    bottom: "4px",
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    display: "grid",
    placeItems: "center",
    background: "rgba(255,255,255,.22)",
    fontSize: "1.6rem",
    fontWeight: 900,
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
