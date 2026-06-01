import Link from "next/link";

export default function Ex1() {
  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <Link href="/" style={styles.back}>← Retour à l’accueil</Link>

        <div style={styles.badge}>Exercice 1</div>

        <h1 style={styles.title}>Choisir le bon auxiliaire</h1>

        <p style={styles.intro}>
          Complète chaque phrase avec la bonne forme de <strong>avoir</strong> ou
          de <strong>être</strong> au présent.
        </p>

        <ol style={styles.list}>
          <li>Je ______ mangé une pomme.</li>
          <li>Elle ______ arrivée en retard.</li>
          <li>Nous ______ regardé un film.</li>
          <li>Ils ______ partis à huit heures.</li>
          <li>Tu ______ fini tes devoirs.</li>
          <li>Vous ______ allés au musée.</li>
          <li>Il ______ vendu son vélo.</li>
          <li>Elles ______ tombées dans la cour.</li>
          <li>J’______ écouté la chanson.</li>
          <li>Nous ______ restés à la maison.</li>
        </ol>

        <section style={styles.answers}>
          <h2>Solutions</h2>
          <p>1. ai · 2. est · 3. avons · 4. sont · 5. as</p>
          <p>6. êtes · 7. a · 8. sont · 9. ai · 10. sommes</p>
        </section>

        <Footer />
      </section>
    </main>
  );
}

function Footer() {
  return (
    <footer style={styles.footer}>
      <Link href="/about" style={styles.footerLink}>À propos</Link>
      <Link href="/contact" style={styles.footerLink}>Contact</Link>
      <Link href="/privacy" style={styles.footerLink}>Confidentialité</Link>
      <Link href="/terms" style={styles.footerLink}>Conditions</Link>
      <Link href="/disclaimer" style={styles.footerLink}>Avertissement</Link>
    </footer>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "32px 18px",
    fontFamily: "system-ui, sans-serif",
    background: "linear-gradient(135deg, #e0f2fe, #fef9c3)",
    color: "#172033",
  },
  card: {
    maxWidth: "850px",
    margin: "0 auto",
    background: "white",
    borderRadius: "32px",
    padding: "36px",
    boxShadow: "0 22px 50px rgba(15,23,42,.16)",
  },
  back: {
    display: "block",
    marginBottom: "32px",
    color: "#2563eb",
    fontWeight: 900,
    textDecoration: "none",
  },
  badge: {
    display: "inline-block",
    padding: "8px 14px",
    borderRadius: "999px",
    background: "#172033",
    color: "white",
    fontWeight: 900,
    marginBottom: "14px",
  },
  title: {
    fontSize: "clamp(2rem, 6vw, 3.5rem)",
    lineHeight: 1,
    margin: "0 0 16px",
  },
  intro: {
    fontSize: "1.15rem",
    lineHeight: 1.6,
    color: "#475569",
  },
  list: {
    fontSize: "1.2rem",
    lineHeight: 2,
    background: "#f8fafc",
    borderRadius: "24px",
    padding: "24px 24px 24px 48px",
    border: "1px solid #e2e8f0",
  },
  answers: {
    marginTop: "24px",
    padding: "20px",
    borderRadius: "22px",
    background: "#ecfdf5",
    border: "1px solid #bbf7d0",
    color: "#166534",
    fontWeight: 800,
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
