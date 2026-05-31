import { useMemo, useState } from "react";
import Link from "next/link";

const pronouns = [
  { key: "je", label: "je", avoir: "ai", etre: "suis", gender: "m", plural: false },
  { key: "tu", label: "tu", avoir: "as", etre: "es", gender: "m", plural: false },
  { key: "il", label: "il", avoir: "a", etre: "est", gender: "m", plural: false },
  { key: "elle", label: "elle", avoir: "a", etre: "est", gender: "f", plural: false },
  { key: "nous_m", label: "nous masculin", avoir: "avons", etre: "sommes", gender: "m", plural: true },
  { key: "nous_f", label: "nous féminin", avoir: "avons", etre: "sommes", gender: "f", plural: true },
  { key: "vous_m", label: "vous masculin", avoir: "avez", etre: "êtes", gender: "m", plural: true },
  { key: "vous_f", label: "vous féminin", avoir: "avez", etre: "êtes", gender: "f", plural: true },
  { key: "ils", label: "ils", avoir: "ont", etre: "sont", gender: "m", plural: true },
  { key: "elles", label: "elles", avoir: "ont", etre: "sont", gender: "f", plural: true },
];

const etreVerbs = new Set([
  "aller",
  "venir",
  "arriver",
  "partir",
  "entrer",
  "sortir",
  "monter",
  "descendre",
  "naître",
  "mourir",
  "rester",
  "tomber",
  "retourner",
  "passer",
  "devenir",
  "revenir",
  "rentrer",
]);

const irregularParticiples = {
  avoir: "eu",
  être: "été",
  faire: "fait",
  dire: "dit",
  écrire: "écrit",
  lire: "lu",
  voir: "vu",
  pouvoir: "pu",
  vouloir: "voulu",
  devoir: "dû",
  savoir: "su",
  prendre: "pris",
  apprendre: "appris",
  comprendre: "compris",
  mettre: "mis",
  ouvrir: "ouvert",
  offrir: "offert",
  mourir: "mort",
  naître: "né",
  venir: "venu",
  devenir: "devenu",
  revenir: "revenu",
  recevoir: "reçu",
  boire: "bu",
  croire: "cru",
  vivre: "vécu",
  courir: "couru",
};

function normalize(text) {
  return text.trim().toLowerCase().replace("’", "'");
}

function normalizeVerb(v) {
  return v.trim().toLowerCase();
}

function getPastParticiple(verb) {
  if (irregularParticiples[verb]) return irregularParticiples[verb];
  if (verb.endsWith("er")) return verb.slice(0, -2) + "é";
  if (verb.endsWith("ir")) return verb.slice(0, -2) + "i";
  if (verb.endsWith("re")) return verb.slice(0, -2) + "u";
  return "?";
}

function agree(participle, pronoun, auxiliary) {
  if (auxiliary !== "être" || participle === "?") return participle;

  let result = participle;
  if (pronoun.gender === "f") result += "e";
  if (pronoun.plural) result += "s";
  return result;
}

function elide(subject, auxiliary) {
  if (subject === "je" && /^[aeiouéèê]/i.test(auxiliary)) {
    return `j’${auxiliary}`;
  }
  return `${subject} ${auxiliary}`;
}

function cleanSubject(label) {
  return label.split(" ")[0];
}

export default function PasseComposeTraining() {
  const [verbInput, setVerbInput] = useState("manger");
  const [pronounKey, setPronounKey] = useState("je");
  const [auxInput, setAuxInput] = useState("");
  const [participleInput, setParticipleInput] = useState("");
  const [checked, setChecked] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const result = useMemo(() => {
    const verb = normalizeVerb(verbInput);
    const pronoun = pronouns.find((p) => p.key === pronounKey);

    const auxiliary = etreVerbs.has(verb) ? "être" : "avoir";
    const auxiliaryForm = auxiliary === "être" ? pronoun.etre : pronoun.avoir;
    const rawParticiple = getPastParticiple(verb);
    const finalParticiple = agree(rawParticiple, pronoun, auxiliary);

    const subject = cleanSubject(pronoun.label);
    const firstPart = elide(subject, auxiliaryForm);
    const sentence =
      rawParticiple === "?" ? "Verbe inconnu" : `${firstPart} ${finalParticiple}`;

    return {
      verb,
      pronoun,
      auxiliary,
      auxiliaryForm,
      rawParticiple,
      finalParticiple,
      sentence,
      subject,
    };
  }, [verbInput, pronounKey]);

  const auxCorrect = normalize(auxInput) === normalize(result.auxiliaryForm);
  const participleCorrect =
    normalize(participleInput) === normalize(result.finalParticiple);

  const finished = checked && auxCorrect && participleCorrect;

  function resetExercise(newVerb = verbInput) {
    setVerbInput(newVerb);
    setAuxInput("");
    setParticipleInput("");
    setChecked(false);
    setShowHint(false);
  }

  function verifyAll() {
    if (!auxInput.trim() || !participleInput.trim()) return;
    setChecked(true);
  }

  return (
    <main className="page">
      <section className="hero">
        <div className="badge">Mode entraînement</div>
        <h1>Construis le passé composé toi-même</h1>
        <p>
          Écris l’auxiliaire, puis le participe passé. Appuie sur{" "}
          <strong>Entrée</strong> dans le deuxième champ pour vérifier.
        </p>

        <Link href="/" className="backLink">
          ← Retour à l’accueil
        </Link>
      </section>

      <section className="setup">
        <label>
          <span>Pronom</span>
          <select
            value={pronounKey}
            onChange={(e) => {
              setPronounKey(e.target.value);
              resetExercise();
            }}
          >
            {pronouns.map((p) => (
              <option key={p.key} value={p.key}>
                {p.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Verbe à l’infinitif</span>
          <input
            value={verbInput}
            onChange={(e) => resetExercise(e.target.value)}
            placeholder="manger, aller, prendre..."
          />
        </label>
      </section>

      <section className="taskCard">
        <div className="sentenceBuild">
          <span className="subject">{result.subject}</span>
          <span className={`blank ${checked && auxCorrect ? "filled" : ""}`}>
            {checked && auxCorrect ? result.auxiliaryForm : "auxiliaire ?"}
          </span>
          <span className={`blank ${checked && participleCorrect ? "filled" : ""}`}>
            {checked && participleCorrect
              ? result.finalParticiple
              : "participe passé ?"}
          </span>
        </div>

        <div className="factoryLine">
          <div className={`station ${checked ? (auxCorrect ? "good" : "bad") : ""}`}>
            <div className="stationNumber">1</div>
            <h2>Machine auxiliaire</h2>
            <p>
              Écris la forme conjuguée de l’auxiliaire:
              <br />
              <strong>ai, as, a, avons, êtes, sont...</strong>
            </p>

            <input
              value={auxInput}
              onChange={(e) => {
                setAuxInput(e.target.value);
                setChecked(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  document.getElementById("participleInput")?.focus();
                }
              }}
              placeholder="auxiliaire"
            />

            {checked && auxCorrect && (
              <div className="feedback goodText">
                Correct! Le verbe <strong>{result.verb}</strong> utilise{" "}
                <strong>{result.auxiliary}</strong>.
              </div>
            )}

            {checked && !auxCorrect && (
              <div className="feedback badText">
                Pas encore. Avec <strong>{result.subject}</strong>, il faut écrire{" "}
                <strong>{result.auxiliaryForm}</strong>.
              </div>
            )}
          </div>

          <div
            className={`station ${
              checked ? (participleCorrect ? "good" : "bad") : ""
            }`}
          >
            <div className="stationNumber">2</div>
            <h2>Machine participe passé</h2>
            <p>
              Écris le participe passé complet, puis appuie sur{" "}
              <strong>Entrée</strong>.
              {result.auxiliary === "être" && (
                <>
                  <br />
                  Attention: avec <strong>être</strong>, il faut parfois accorder.
                </>
              )}
            </p>

            <input
              id="participleInput"
              value={participleInput}
              onChange={(e) => {
                setParticipleInput(e.target.value);
                setChecked(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  verifyAll();
                }
              }}
              placeholder="participe passé"
            />

            {checked && participleCorrect && (
              <div className="feedback goodText">
                Correct! Le participe passé final est{" "}
                <strong>{result.finalParticiple}</strong>.
              </div>
            )}

            {checked && !participleCorrect && (
              <div className="feedback badText">
                Pas encore. Le participe passé attendu est{" "}
                <strong>{result.finalParticiple}</strong>.
              </div>
            )}
          </div>
        </div>

        <div className="hintBox">
          <button className="hintButton" onClick={() => setShowHint(!showHint)}>
            💡 {showHint ? "Cacher l’aide" : "Afficher une aide"}
          </button>

          {showHint && (
            <div className="hint">
              <p>
                <strong>Étape 1:</strong> Demande-toi si le verbe utilise{" "}
                <strong>avoir</strong> ou <strong>être</strong>.
              </p>
              <p>
                <strong>Étape 2:</strong> Conjugue cet auxiliaire au présent avec{" "}
                <strong>{result.subject}</strong>.
              </p>
              <p>
                <strong>Étape 3:</strong> Forme le participe passé:{" "}
                <strong>-er → é</strong>, <strong>-ir → i</strong>,{" "}
                <strong>-re → u</strong>, sauf verbes irréguliers.
              </p>
              {result.auxiliary === "être" && (
                <p>
                  <strong>Étape 4:</strong> Avec <strong>être</strong>, accorde le
                  participe passé avec le sujet.
                </p>
              )}
            </div>
          )}
        </div>

        <section className={`final ${finished ? "show" : ""}`}>
          {finished ? (
            <>
              <div className="stamp">Bravo!</div>
              <h2>{result.sentence}</h2>
            </>
          ) : checked ? (
            <h2>Corrige les champs rouges, puis appuie de nouveau sur Entrée.</h2>
          ) : (
            <h2>Complète les deux champs. La correction se fait avec Entrée.</h2>
          )}
        </section>
      </section>

      <style jsx>{`
        .page {
          min-height: 100vh;
          padding: 36px 18px;
          font-family: system-ui, sans-serif;
          color: #172033;
          background:
            radial-gradient(circle at top left, #fde68a, transparent 28%),
            radial-gradient(circle at top right, #bfdbfe, transparent 30%),
            linear-gradient(135deg, #f8fafc, #e0f2fe);
        }

        .hero {
          max-width: 900px;
          margin: 0 auto 24px;
          text-align: center;
        }

        .badge {
          display: inline-block;
          padding: 8px 14px;
          border-radius: 999px;
          background: #172033;
          color: white;
          font-weight: 900;
          margin-bottom: 12px;
        }

        h1 {
          font-size: clamp(2rem, 5vw, 4rem);
          margin: 0;
          line-height: 1;
        }

        .hero p {
          font-size: 1.15rem;
          margin-top: 14px;
        }

        .backLink {
          display: inline-block;
          margin-top: 12px;
          color: #2563eb;
          font-weight: 900;
          text-decoration: none;
        }

        .setup {
          max-width: 720px;
          margin: 0 auto 28px;
          background: rgba(255, 255, 255, 0.82);
          border: 2px solid white;
          border-radius: 26px;
          padding: 18px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: flex-end;
          gap: 16px;
          box-shadow: 0 18px 40px rgba(15, 23, 42, 0.12);
          backdrop-filter: blur(10px);
        }

        label {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-weight: 900;
          flex: 1;
          min-width: 220px;
        }

        label span {
          height: 22px;
        }

        select,
        input,
        button {
          height: 56px;
          box-sizing: border-box;
          border-radius: 16px;
          font-size: 1rem;
        }

        select,
        input {
          width: 100%;
          padding: 0 16px;
          border: 2px solid #cbd5e1;
          background: white;
        }

        button {
          min-width: 190px;
          padding: 0 22px;
          border: 0;
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          color: white;
          font-weight: 950;
          cursor: pointer;
          box-shadow: 0 10px 22px rgba(37, 99, 235, 0.25);
        }

        .taskCard {
          max-width: 1050px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.78);
          border: 2px solid white;
          border-radius: 34px;
          padding: 24px;
          box-shadow: 0 22px 50px rgba(15, 23, 42, 0.14);
        }

        .sentenceBuild {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
          margin-bottom: 24px;
          font-size: clamp(1.5rem, 5vw, 2.6rem);
          font-weight: 950;
        }

        .subject,
        .blank {
          padding: 12px 20px;
          border-radius: 20px;
        }

        .subject {
          background: #172033;
          color: white;
        }

        .blank {
          background: #fef3c7;
          border: 3px dashed #f59e0b;
          color: #92400e;
        }

        .blank.filled {
          background: #dcfce7;
          border-color: #22c55e;
          color: #166534;
        }

        .factoryLine {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .station {
          position: relative;
          padding: 24px;
          border-radius: 30px;
          background: #f8fafc;
          border: 4px solid #cbd5e1;
          min-height: 280px;
        }

        .station.good {
          border-color: #22c55e;
          background: #f0fdf4;
        }

        .station.bad {
          border-color: #ef4444;
          background: #fef2f2;
        }

        .stationNumber {
          position: absolute;
          top: -18px;
          left: 22px;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: #172033;
          color: white;
          font-weight: 950;
          font-size: 1.3rem;
          box-shadow: 0 8px 16px rgba(15, 23, 42, 0.25);
        }

        .station h2 {
          margin: 10px 0 8px;
          font-size: 1.5rem;
        }

        .station p {
          line-height: 1.45;
          min-height: 84px;
          margin-bottom: 18px;
        }

        .feedback {
          margin-top: 14px;
          padding: 12px 14px;
          border-radius: 16px;
          font-weight: 800;
        }

        .goodText {
          background: #dcfce7;
          color: #166534;
        }

        .badText {
          background: #fee2e2;
          color: #991b1b;
        }

        .hintBox {
          margin-top: 22px;
          text-align: center;
        }

        .hintButton {
          background: linear-gradient(135deg, #f59e0b, #f97316);
        }

        .hint {
          margin: 16px auto 0;
          max-width: 760px;
          text-align: left;
          background: #fff7ed;
          border: 2px solid #fed7aa;
          border-radius: 22px;
          padding: 16px 22px;
          line-height: 1.55;
        }

        .final {
          margin: 26px auto 0;
          max-width: 780px;
          text-align: center;
          padding: 22px;
          border-radius: 28px;
          background: #f8fafc;
          border: 2px solid #e2e8f0;
        }

        .final.show {
          background: #ecfdf5;
          border-color: #22c55e;
          animation: pop 0.35s ease-out;
        }

        .stamp {
          display: inline-block;
          padding: 7px 15px;
          border-radius: 999px;
          background: #16a34a;
          color: white;
          font-weight: 950;
          margin-bottom: 10px;
        }

        .final h2 {
          margin: 0;
          font-size: clamp(1.5rem, 5vw, 3rem);
          color: #1d4ed8;
        }

        @keyframes pop {
          from {
            transform: scale(0.94);
            opacity: 0.6;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @media (max-width: 850px) {
          .factoryLine {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
