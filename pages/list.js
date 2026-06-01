import Link from "next/link";

const groups = [
  {
    title: "Verbes en -er",
    verbs: [
      ["aimer", "aimé"],
      ["arriver", "arrivé"],
      ["chanter", "chanté"],
      ["chercher", "cherché"],
      ["commencer", "commencé"],
      ["donner", "donné"],
      ["écouter", "écouté"],
      ["entrer", "entré"],
      ["jouer", "joué"],
      ["manger", "mangé"],
      ["parler", "parlé"],
      ["regarder", "regardé"],
      ["rester", "resté"],
      ["tomber", "tombé"],
      ["travailler", "travaillé"],
    ],
  },
  {
    title: "Verbes en -ir",
    verbs: [
      ["choisir", "choisi"],
      ["finir", "fini"],
      ["grandir", "grandi"],
      ["réussir", "réussi"],
      ["remplir", "rempli"],
      ["réfléchir", "réfléchi"],
      ["agir", "agi"],
      ["obéir", "obéi"],
      ["partir", "parti"],
      ["sortir", "sorti"],
      ["dormir", "dormi"],
      ["servir", "servi"],
      ["sentir", "senti"],
      ["ouvrir", "ouvert"],
      ["offrir", "offert"],
    ],
  },
  {
    title: "Verbes en -re",
    verbs: [
      ["attendre", "attendu"],
      ["descendre", "descendu"],
      ["entendre", "entendu"],
      ["perdre", "perdu"],
      ["répondre", "répondu"],
      ["rendre", "rendu"],
      ["vendre", "vendu"],
      ["mettre", "mis"],
      ["prendre", "pris"],
      ["apprendre", "appris"],
      ["comprendre", "compris"],
      ["écrire", "écrit"],
      ["lire", "lu"],
      ["dire", "dit"],
      ["faire", "fait"],
    ],
  },
  {
    title: "Verbes en -oir",
    verbs: [
      ["avoir", "eu"],
      ["voir", "vu"],
      ["savoir", "su"],
      ["pouvoir", "pu"],
      ["vouloir", "voulu"],
      ["devoir", "dû"],
      ["recevoir", "reçu"],
      ["apercevoir", "aperçu"],
      ["boire", "bu"],
      ["croire", "cru"],
      ["falloir", "fallu"],
      ["pleuvoir", "plu"],
      ["valoir", "valu"],
      ["s’asseoir", "assis"],
      ["prévoir", "prévu"],
    ],
  },
];

export default function ListPage() {
  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <Link href="/" style={styles.back}>
          ← Retour à l’accueil
        </Link>

        <div style={styles.badge}>Liste de révision</div>

        <h1 style={styles.title}>
          60 verbes importants au passé composé
        </h1>

        <p style={styles.intro}>
          Voici une liste simple des verbes les plus utiles avec leur participe
          passé. Attention: certains participes passés sont irréguliers.
        </p>

        <div style={styles.grid}>
          {groups.map((group) => (
            <section key={group.title} style={styles.group}>
              <h2 style={styles.groupTitle}>{group.title}</h2>

              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Infinitif</th>
                    <th style={styles.th}>Participe passé</th>
                  </tr>
                </thead>

                <tbody>
                  {group.verbs.map(([verb, participle]) => (
                    <tr key={verb}>
                      <td style={styles.td}>{verb}</td>
                      <td style={styles.tdStrong}>{participle}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          ))}
        </div>

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
    padding: "32px 18px",
    fontFamily: "system-ui, sans-serif",
    background: "linear-gradient(135deg, #e0f2fe, #fef9c3)",
    color: "#172033",
  },

  card: {
    maxWidth: "1100px",
    margin: "0 auto",
    background: "white",
    borderRadius: "32px",
    padding: "36px",
    boxShadow: "0 22px 50px rgba(15,23,42,.16)",
  },

  back: {
    display: "inline-block",
    marginBottom: "18px",
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
    fontSize: "clamp(2rem, 6vw, 3.8rem)",
    lineHeight: 1,
    margin: "0 0 16px",
  },

  intro: {
    fontSize: "1.15rem",
    lineHeight: 1.6,
    color: "#475569",
    marginBottom: "28px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
  },

  group: {
    borderRadius: "24px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    padding: "18px",
  },

  groupTitle: {
    margin: "0 0 14px",
    fontSize: "1.45rem",
    color: "#1d4ed8",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "1rem",
  },

  th: {
    textAlign: "left",
    padding: "10px 8px",
    borderBottom: "2px solid #cbd5e1",
    color: "#334155",
  },

  td: {
    padding: "9px 8px",
    borderBottom: "1px solid #e2e8f0",
  },

  tdStrong: {
    padding: "9px 8px",
    borderBottom: "1px solid #e2e8f0",
    fontWeight: 900,
    color: "#166534",
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
