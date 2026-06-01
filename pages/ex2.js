import { useState } from "react";
import Link from "next/link";

const questions = [
  {
    before: "Je",
    after: "au football.",
    verb: "jouer",
    answer: "ai joué",
  },
  {
    before: "Elle",
    after: "à Paris.",
    verb: "aller",
    answer: "est allée",
  },
  {
    before: "Nous",
    after: "une lettre.",
    verb: "écrire",
    answer: "avons écrit",
  },
  {
    before: "Ils",
    after: "très tôt.",
    verb: "partir",
    answer: "sont partis",
  },
  {
    before: "Tu",
    after: "un livre.",
    verb: "lire",
    answer: "as lu",
  },
  {
    before: "Vous",
    after: "le bus.",
    verb: "prendre",
    answer: "avez pris",
  },
  {
    before: "Elles",
    after: "à la maison.",
    verb: "rester",
    answer: "sont restées",
  },
  {
    before: "Il",
    after: "son travail.",
    verb: "finir",
    answer: "a fini",
  },
  {
    before: "Nous",
    after: "un cadeau.",
    verb: "recevoir",
    answer: "avons reçu",
  },
  {
    before: "Je",
    after: "dans le jardin.",
    verb: "tomber",
    answer: "suis tombé",
    accepted: ["suis tombé", "suis tombée"],
  },
  {
    before: "Marie",
    after: "une chanson.",
    verb: "chanter",
    answer: "a chanté",
  },
  {
    before: "Les garçons",
    after: "au cinéma.",
    verb: "aller",
    answer: "sont allés",
  },
  {
    before: "Ma sœur",
    after: "une histoire.",
    verb: "raconter",
    answer: "a raconté",
  },
  {
    before: "Vous",
    after: "en retard.",
    verb: "arriver",
    answer: "êtes arrivés",
    accepted: ["êtes arrivés", "êtes arrivées", "êtes arrivé", "êtes arrivée"],
  },
  {
    before: "Les filles",
    after: "la porte.",
    verb: "ouvrir",
    answer: "ont ouvert",
  },
  {
    before: "Nous",
    after: "du café.",
    verb: "boire",
    answer: "avons bu",
  },
  {
    before: "Il",
    after: "la vérité.",
    verb: "dire",
    answer: "a dit",
  },
  {
    before: "Elles",
    after: "dans la cour.",
    verb: "tomber",
    answer: "sont tombées",
  },
  {
    before: "Tu",
    after: "ton sac.",
    verb: "perdre",
    answer: "as perdu",
  },
  {
    before: "Mes parents",
    after: "à la maison.",
    verb: "venir",
    answer: "sont venus",
  },
];

function normalize(text) {
  return text
    .trim()
    .toLowerCase()
    .replace("’", "'")
    .replace(/\s+/g, " ");
}

function isCorrectAnswer(input, question) {
  const accepted = question.accepted || [question.answer];
  return accepted.map(normalize).includes(normalize(input));
}

export default function Ex2() {
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [checked, setChecked] = useState(false);

  const score = questions.reduce((total, q, index) => {
    return total + (isCorrectAnswer(answers[index], q) ? 1 : 0);
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
        <Link href="/" style={styles.back}>
          ← Retour à l’accueil
        </Link>

        <div style={styles.badge}>Exercice 2</div>

        <h1 style={styles.title}>Former le passé composé</h1>

        <p style={styles.intro}>
          Mets les verbes entre parenthèses au passé composé. Écris{" "}
          <strong>l’auxiliaire + le participe passé</strong>. Fais attention aux
          verbes avec <strong>être</strong> et aux accords.
        </p>

        <div style={styles.exerciseBox}>
          {questions.map((q, index) => {
            const correct = isCorrectAnswer(answers[index], q);
            const isCorrect = checked && correct;
            const isWrong = checked && answers[index].trim() && !correct;
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
                  placeholder="passé composé"
                />

                <span style={styles.sentencePart}>
                  {q.after} <span style={styles.verbHint}>({q.verb})</span>
                </span>

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
                Bravo! Toutes les formes sont correctes.
              </p>
            ) : (
              <p style={styles.resultText}>
                Corrige les lignes rouges, puis clique de nouveau sur{" "}
                <strong>Vérifier</strong>.
              </p>
            )}
          </section>
        )}

        <section style={styles.helpBox}>
          <h2 style={styles.helpTitle}>Petit rappel</h2>
          <p>
            Pour former le passé composé, il faut écrire{" "}
            <strong>auxiliaire + participe passé</strong>: j’ai mangé, tu as
            fini, nous avons écrit.
          </p>
          <p>
            Avec <strong>être</strong>, le participe passé s’accorde souvent avec
            le sujet: elle est allée, ils sont partis, elles sont tombées.
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
    gridTemplateColumns: "42px minmax(70px, auto) 190px 1fr 130px",
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

  verbHint: {
    color: "#64748b",
    fontWeight: 800,
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
};
