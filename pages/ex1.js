import { useState } from "react";
import Link from "next/link";

const questions = [
  { before: "Je", after: "mangé une pomme.", answer: "ai" },
  { before: "Elle", after: "arrivée en retard.", answer: "est" },
  { before: "Nous", after: "regardé un film.", answer: "avons" },
  { before: "Ils", after: "partis à huit heures.", answer: "sont" },
  { before: "Tu", after: "fini tes devoirs.", answer: "as" },
  { before: "Vous", after: "allés au musée.", answer: "êtes" },
  { before: "Il", after: "vendu son vélo.", answer: "a" },
  { before: "Elles", after: "tombées dans la cour.", answer: "sont" },
  { before: "J’", after: "écouté la chanson.", answer: "ai" },
  { before: "Nous", after: "restés à la maison.", answer: "sommes" },
  { before: "Pierre", after: "pris le train.", answer: "a" },
  { before: "Marie", after: "venue chez nous.", answer: "est" },
  { before: "Mes parents", after: "acheté du pain.", answer: "ont" },
  { before: "Les filles", after: "sorties après le repas.", answer: "sont" },
  { before: "Vous", after: "écrit une carte postale.", answer: "avez" },
  { before: "Je", after: "suis allé au parc.", answer: "suis", note: "Ici, on écrit seulement l’auxiliaire être." },
  { before: "Tu", after: "as lu ce livre.", answer: "as", note: "Ici, on écrit seulement l’auxiliaire avoir." },
  { before: "Les enfants", after: "joué dehors.", answer: "ont" },
  { before: "Ma sœur", after: "née en avril.", answer: "est" },
  { before: "Nous", after: "fait un gâteau.", answer: "avons" },
];

function normalize(text) {
  return text.trim().toLowerCase().replace("’", "'");
}

export default function Ex1() {
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [checked, setChecked] = useState(false);

  const score = questions.reduce((total, q, index) => {
    return total + (normalize(answers[index]) === normalize(q.answer) ? 1 : 0);
  }, 0);

  function updateAnswer(index, value) {
    const next = [...answers];
    next[index] = value;
    setAnswers(next);
    setChecked(false);
  }

  function verify() {
    setChecked(true);
  }

  function reset() {
    setAnswers(Array(questions.length).fill(""));
    setChecked(false);
  }

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <Link href="/" style={styles.back}>← Retour à l’accueil</Link>

        <div style={styles.badge}>Exercice 1</div>

        <h1 style={styles.title}>Choisir le bon auxiliaire</h1>

        <p style={styles.intro}>
          Complète chaque phrase avec la bonne forme de <strong>avoir</strong> ou
          de <strong>être</strong> au présent. Écris seulement l’auxiliaire:
          <strong> ai, as, a, avons, avez, ont, suis, es, est, sommes, êtes, sont</strong>.
        </p>

        <div style={styles.exerciseBox}>
          {questions.map((q, index) => {
            const isCorrect =
              checked && normalize(answers[index]) === normalize(q.answer);
            const isWrong =
              checked &&
              answers[index].trim() &&
              normalize(answers[index]) !== normalize(q.answer);
            const isEmpty = checked && !answers[index].trim();

            return (
              <div
                key={index}
                style={{
                  ...styles.questionRow,
                  ...(isCorrect ? styles.correctRow : {}),
                  ...(isWrong || isEmpty ? styles.wrongRow : {}),
                }}
              >
                <span style={styles.number}>{index + 1}.</span>

                <span style={styles.sentencePart}>{q.before}</span>

                <input
                  value={answers[index]}
                  onChange={(e) => updateAnswer(index, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") verify();
                  }}
                  style={styles.input}
                  placeholder="auxiliaire"
                />

                <span style={styles.sentencePart}>{q.after}</span>

                {checked && (
                  <span style={isCorrect ? styles.correctText : styles.wrongText}>
                    {isCorrect ? "✓" : `✗ ${q.answer}`}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div style={styles.buttonRow}>
          <button onClick={verify} style={styles.button}>
            Vérifier
          </button>

          <button onClick={reset} style={styles.secondaryButton}>
            Recommencer
          </button>
        </div>

        {checked && (
          <section style={score === questions.length ? styles.resultGood : styles.result}>
            <h2 style={styles.resultTitle}>
              Score: {score} / {questions.length}
            </h2>

            {score === questions.length ? (
              <p style={styles.resultText}>
                Bravo! Toutes les réponses sont correctes.
              </p>
            ) : (
              <p style={styles.resultText}>
                Corrige les lignes rouges, puis clique de nouveau sur
                <strong> Vérifier</strong>.
              </p>
            )}
          </section>
        )}

        <section style={styles.helpBox}>
          <h2 style={styles.helpTitle}>Petit rappel</h2>
          <p>
            La plupart des verbes utilisent <strong>avoir</strong>: j’ai mangé,
            tu as fini, nous avons regardé.
          </p>
          <p>
            Certains verbes utilisent <strong>être</strong>: aller, venir,
            arriver, partir, tomber, rester, entrer, sortir.
          </p>
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
    maxWidth: "980px",
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
    marginBottom: "26px",
  },

  exerciseBox: {
    display: "grid",
    gap: "12px",
    marginTop: "22px",
  },

  questionRow: {
    display: "grid",
    gridTemplateColumns: "42px minmax(60px, auto) 150px 1fr 90px",
    alignItems: "center",
    gap: "10px",
    padding: "14px",
    borderRadius: "18px",
    background: "#f8fafc",
    border: "2px solid #e2e8f0",
  },

  correctRow: {
    background: "#ecfdf5",
    borderColor: "#22c55e",
  },

  wrongRow: {
    background: "#fef2f2",
    borderColor: "#ef4444",
  },

  number: {
    fontWeight: 900,
    color: "#64748b",
  },

  sentencePart: {
    fontSize: "1.1rem",
    fontWeight: 700,
  },

  input: {
    height: "46px",
    borderRadius: "14px",
    border: "2px solid #cbd5e1",
    padding: "0 12px",
    fontSize: "1rem",
    fontWeight: 800,
    background: "white",
  },

  correctText: {
    fontWeight: 950,
    color: "#16a34a",
    textAlign: "right",
  },

  wrongText: {
    fontWeight: 950,
    color: "#dc2626",
    textAlign: "right",
  },

  buttonRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    marginTop: "24px",
  },

  button: {
    minHeight: "54px",
    padding: "0 26px",
    borderRadius: "18px",
    border: "0",
    background: "linear-gradient(135deg, #2563eb, #7c3aed)",
    color: "white",
    fontWeight: 950,
    fontSize: "1rem",
    cursor: "pointer",
    boxShadow: "0 10px 22px rgba(37,99,235,.25)",
  },

  secondaryButton: {
    minHeight: "54px",
    padding: "0 26px",
    borderRadius: "18px",
    border: "2px solid #cbd5e1",
    background: "white",
    color: "#334155",
    fontWeight: 950,
    fontSize: "1rem",
    cursor: "pointer",
  },

  result: {
    marginTop: "24px",
    padding: "20px",
    borderRadius: "22px",
    background: "#fff7ed",
    border: "1px solid #fed7aa",
  },

  resultGood: {
    marginTop: "24px",
    padding: "20px",
    borderRadius: "22px",
    background: "#ecfdf5",
    border: "1px solid #bbf7d0",
  },

  resultTitle: {
    margin: "0 0 8px",
    color: "#172033",
  },

  resultText: {
    margin: 0,
    fontSize: "1.05rem",
    lineHeight: 1.5,
    color: "#475569",
  },

  helpBox: {
    marginTop: "24px",
    padding: "22px",
    borderRadius: "24px",
    background: "#fefce8",
    border: "1px solid #fde68a",
    color: "#475569",
    lineHeight: 1.6,
  },

  helpTitle: {
    margin: "0 0 10px",
    color: "#172033",
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

  "@media (maxWidth: 760px)": {},
};
