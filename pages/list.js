import Link from "next/link";

const groups = [
  {
    title: "Verbes en -er",
    verbs: [
      ["aimer", "aimé"],
      ["apporter", "apporté"],
      ["arriver", "arrivé"],
      ["chanter", "chanté"],
      ["chercher", "cherché"],
      ["commencer", "commencé"],
      ["continuer", "continué"],
      ["demander", "demandé"],
      ["donner", "donné"],
      ["écouter", "écouté"],
      ["entrer", "entré"],
      ["étudier", "étudié"],
      ["fermer", "fermé"],
      ["habiter", "habité"],
      ["jouer", "joué"],
      ["manger", "mangé"],
      ["marcher", "marché"],
      ["montrer", "montré"],
      ["oublier", "oublié"],
      ["parler", "parlé"],
      ["penser", "pensé"],
      ["porter", "porté"],
      ["regarder", "regardé"],
      ["rester", "resté"],
      ["retourner", "retourné"],
      ["travailler", "travaillé"],
      ["trouver", "trouvé"],
      ["tomber", "tombé"],
      ["visiter", "visité"],
      ["voyager", "voyagé"],
    ],
  },
  {
    title: "Verbes en -ir",
    verbs: [
      ["agir", "agi"],
      ["applaudir", "applaudi"],
      ["choisir", "choisi"],
      ["dormir", "dormi"],
      ["finir", "fini"],
      ["grandir", "grandi"],
      ["grossir", "grossi"],
      ["guérir", "guéri"],
      ["maigrir", "maigri"],
      ["obéir", "obéi"],
      ["partir", "parti"],
      ["punir", "puni"],
      ["réfléchir", "réfléchi"],
      ["remplir", "rempli"],
      ["réussir", "réussi"],
      ["rougir", "rougi"],
      ["sentir", "senti"],
      ["servir", "servi"],
      ["sortir", "sorti"],
      ["vieillir", "vieilli"],
      ["ouvrir", "ouvert"],
      ["offrir", "offert"],
      ["couvrir", "couvert"],
      ["découvrir", "découvert"],
      ["souffrir", "souffert"],
      ["courir", "couru"],
      ["mourir", "mort"],
      ["venir", "venu"],
      ["devenir", "devenu"],
      ["revenir", "revenu"],
    ],
  },
  {
    title: "Verbes en -re",
    verbs: [
      ["attendre", "attendu"],
      ["comprendre", "compris"],
      ["conduire", "conduit"],
      ["connaître", "connu"],
      ["construire", "construit"],
      ["croire", "cru"],
      ["descendre", "descendu"],
      ["dire", "dit"],
      ["écrire", "écrit"],
      ["entendre", "entendu"],
      ["faire", "fait"],
      ["lire", "lu"],
      ["mettre", "mis"],
      ["naître", "né"],
      ["perdre", "perdu"],
      ["prendre", "pris"],
      ["apprendre", "appris"],
      ["permettre", "permis"],
      ["promettre", "promis"],
      ["répondre", "répondu"],
      ["rendre", "rendu"],
      ["rire", "ri"],
      ["suivre", "suivi"],
      ["vivre", "vécu"],
      ["vendre", "vendu"],
      ["traduire", "traduit"],
      ["produire", "produit"],
      ["réduire", "réduit"],
      ["plaire", "plu"],
      ["taire", "tu"],
    ],
  },
  {
    title: "Verbes en -oir",
    verbs: [
      ["apercevoir", "aperçu"],
      ["asseoir", "assis"],
      ["avoir", "eu"],
      ["boire", "bu"],
      ["décevoir", "déçu"],
      ["devoir", "dû"],
      ["falloir", "fallu"],
      ["pleuvoir", "plu"],
      ["pouvoir", "pu"],
      ["prévoir", "prévu"],
      ["recevoir", "reçu"],
      ["savoir", "su"],
      ["valoir", "valu"],
      ["voir", "vu"],
      ["vouloir", "voulu"],
      ["entrevoir", "entrevu"],
      ["revoir", "revu"],
      ["concevoir", "conçu"],
      ["percevoir", "perçu"],
      ["redevoir", "redû"],
      ["ravoir", "reu"],
      ["émouvoir", "ému"],
      ["mouvoir", "mu"],
      ["promouvoir", "promu"],
      ["pourvoir", "pourvu"],
      ["entrevoir", "entrevu"],
      ["prévaloir", "prévalu"],
      ["équivaloir", "équivalu"],
      ["surseoir", "sursis"],
      ["choir", "chu"],
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
          120 verbes importants au passé composé
        </h1>

        <p style={styles.intro}>
          Voici une liste simple de verbes utiles avec leur participe passé.
          Les verbes sont organisés selon leur terminaison à l’infinitif:
          <strong> -er</strong>, <strong>-ir</strong>, <strong>-re</strong> et{" "}
          <strong>-oir</strong>.
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
                  {group.verbs.map(([verb, participle], index) => (
                    <tr key={`${verb}-${index}`}>
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
    maxWidth: "1200px",
    margin: "0 auto",
    background: "white",
    borderRadius: "32px",
    padding: "36px",
    boxShadow: "0 22px 50px rgba(15,23,42,.16)",
  },

  back: {
    display: "block",
    marginBottom: "42px",
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
    marginBottom: "16px",
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
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "20px",
    alignItems: "stretch",
  },

  group: {
    borderRadius: "24px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    padding: "18px",
    display: "flex",
    flexDirection: "column",
    minHeight: "100%",
  },

  groupTitle: {
    margin: "0 0 14px",
    fontSize: "1.45rem",
    color: "#1d4ed8",
    minHeight: "36px",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "1rem",
    tableLayout: "fixed",
  },

  th: {
    textAlign: "left",
    padding: "10px 8px",
    borderBottom: "2px solid #cbd5e1",
    color: "#334155",
    width: "50%",
  },

  td: {
    padding: "9px 8px",
    borderBottom: "1px solid #e2e8f0",
    verticalAlign: "top",
    wordBreak: "break-word",
  },

  tdStrong: {
    padding: "9px 8px",
    borderBottom: "1px solid #e2e8f0",
    fontWeight: 900,
    color: "#166534",
    verticalAlign: "top",
    wordBreak: "break-word",
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

  "@media (maxWidth: 1000px)": {
    grid: {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    },
  },
};
