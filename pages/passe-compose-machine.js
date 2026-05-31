import { useMemo, useState } from "react";

const pronouns = [
  { key: "je", label: "je", avoir: "ai", etre: "suis", gender: "m", plural: false },
  { key: "tu", label: "tu", avoir: "as", etre: "es", gender: "m", plural: false },
  { key: "il", label: "il", avoir: "a", etre: "est", gender: "m", plural: false },
  { key: "elle", label: "elle", avoir: "a", etre: "est", gender: "f", plural: false },
  { key: "nous_m", label: "nous", avoir: "avons", etre: "sommes", gender: "m", plural: true },
  { key: "nous_f", label: "nous", avoir: "avons", etre: "sommes", gender: "f", plural: true },
  { key: "vous_m", label: "vous", avoir: "avez", etre: "êtes", gender: "m", plural: true },
  { key: "vous_f", label: "vous", avoir: "avez", etre: "êtes", gender: "f", plural: true },
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
  permettre: "permis",
  promettre: "promis",
  ouvrir: "ouvert",
  offrir: "offert",
  découvrir: "découvert",
  mourir: "mort",
  naître: "né",
  venir: "venu",
  devenir: "devenu",
  revenir: "revenu",
  tenir: "tenu",
  recevoir: "reçu",
  boire: "bu",
  croire: "cru",
  connaître: "connu",
  vivre: "vécu",
  courir: "couru",
  rire: "ri",
  suivre: "suivi",
};

function normalizeVerb(v) {
  return v.trim().toLowerCase().replace(/\s+/g, " ");
}

function getPastParticiple(verb) {
  if (irregularParticiples[verb]) return irregularParticiples[verb];

  if (verb.endsWith("er")) return verb.slice(0, -2) + "é";
  if (verb.endsWith("ir")) return verb.slice(0, -2) + "i";
  if (verb.endsWith("re")) return verb.slice(0, -2) + "u";

  return "?";
}

function agree(participle, pronoun, auxiliary) {
  if (auxiliary !== "être") return participle;

  let result = participle;
  if (pronoun.gender === "f") result += "e";
  if (pronoun.plural) result += "s";
  return result;
}

function elide(subject, auxiliary) {
  if (subject === "je" && /^[aeiouéèêh]/i.test(auxiliary)) {
    return `j’${auxiliary}`;
  }
  return `${subject} ${auxiliary}`;
}

export default function PasseComposeMachine() {
  const [verbInput, setVerbInput] = useState("manger");
  const [pronounKey, setPronounKey] = useState("je");
  const [running, setRunning] = useState(false);

  const result = useMemo(() => {
    const verb = normalizeVerb(verbInput);
    const pronoun = pronouns.find((p) => p.key === pronounKey);

    const auxiliary = etreVerbs.has(verb) ? "être" : "avoir";
    const auxiliaryForm = auxiliary === "être" ? pronoun.etre : pronoun.avoir;
    const rawParticiple = getPastParticiple(verb);
    const finalParticiple = agree(rawParticiple, pronoun, auxiliary);

    const firstPart = elide(pronoun.label, auxiliaryForm);
    const sentence = rawParticiple === "?" ? "Verbe inconnu" : `${firstPart} ${finalParticiple}`;

    return {
      verb,
      pronoun,
      auxiliary,
      auxiliaryForm,
      rawParticiple,
      finalParticiple,
      sentence,
    };
  }, [verbInput, pronounKey]);

  function startMachine() {
    setRunning(false);
    setTimeout(() => setRunning(true), 50);
  }

  return (
    <main className="page">
      <h1>La machine à fabriquer le passé composé</h1>
      <p className="subtitle">
        Choisis un pronom et un verbe. La machine construit la forme correcte.
      </p>

      <section className="controls">
        <label>
          Pronom
          <select value={pronounKey} onChange={(e) => setPronounKey(e.target.value)}>
            {pronouns.map((p) => (
              <option key={p.key} value={p.key}>
                {p.key.includes("_f") ? `${p.label} féminin` : p.key.includes("_m") ? `${p.label} masculin` : p.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Verbe à l’infinitif
          <input
            value={verbInput}
            onChange={(e) => setVerbInput(e.target.value)}
            placeholder="manger, aller, prendre..."
          />
        </label>

        <button onClick={startMachine}>Démarrer la machine</button>
      </section>

      <section className="factory">
        <div className="machine">
          <div className="machineTitle">Machine 1</div>
          <div className="machineText">Auxiliaire</div>
          {running && <div className="bubble delay1">{result.auxiliary}</div>}
        </div>

        <div className="belt">
          <div className={`verbBox ${running ? "move" : ""}`}>{result.verb || "verbe"}</div>
        </div>

        <div className="machine">
          <div className="machineTitle">Machine 2</div>
          <div className="machineText">Participe passé</div>
          {running && <div className="bubble delay2">{result.finalParticiple}</div>}
        </div>
      </section>

      <section className={`output ${running ? "show" : ""}`}>
        <h2>{result.sentence}</h2>

        <div className="steps">
          <p>
            <strong>1.</strong> Le verbe est <em>{result.verb}</em>.
          </p>
          <p>
            <strong>2.</strong> La machine choisit l’auxiliaire{" "}
            <strong>{result.auxiliary}</strong>.
          </p>
          <p>
            <strong>3.</strong> L’auxiliaire devient{" "}
            <strong>{result.auxiliaryForm}</strong>.
          </p>
          <p>
            <strong>4.</strong> Le participe passé est{" "}
            <strong>{result.rawParticiple}</strong>.
          </p>
          {result.auxiliary === "être" && (
            <p>
              <strong>5.</strong> Avec <strong>être</strong>, le participe passé
              s’accorde: <strong>{result.finalParticiple}</strong>.
            </p>
          )}
        </div>
      </section>

      <style jsx>{`
        .page {
          min-height: 100vh;
          padding: 40px 20px;
          background: linear-gradient(#eaf6ff, #ffffff);
          font-family: system-ui, sans-serif;
          color: #1f2937;
          text-align: center;
        }

        h1 {
          font-size: 2.3rem;
          margin-bottom: 8px;
        }

        .subtitle {
          font-size: 1.1rem;
          margin-bottom: 30px;
        }

        .controls {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 16px;
          margin-bottom: 40px;
        }

        label {
          display: flex;
          flex-direction: column;
          text-align: left;
          font-weight: 700;
          gap: 6px;
        }

        input,
        select {
          padding: 12px;
          border: 2px solid #cbd5e1;
          border-radius: 12px;
          font-size: 1rem;
          min-width: 190px;
        }

        button {
          align-self: end;
          padding: 13px 22px;
          border: none;
          border-radius: 14px;
          background: #2563eb;
          color: white;
          font-size: 1rem;
          font-weight: 800;
          cursor: pointer;
        }

        .factory {
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 180px 1fr 180px;
          gap: 20px;
          align-items: center;
        }

        .machine {
          position: relative;
          height: 190px;
          background: #334155;
          border-radius: 24px;
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
        }

        .machineTitle {
          font-size: 1.3rem;
          font-weight: 900;
        }

        .machineText {
          margin-top: 8px;
          opacity: 0.9;
        }

        .bubble {
          position: absolute;
          left: 50%;
          bottom: -25px;
          transform: translateX(-50%);
          background: #facc15;
          color: #1f2937;
          border-radius: 999px;
          padding: 10px 18px;
          font-weight: 900;
          opacity: 0;
          animation: pop 0.6s forwards;
        }

        .delay1 {
          animation-delay: 0.9s;
        }

        .delay2 {
          animation-delay: 2.1s;
        }

        .belt {
          position: relative;
          height: 110px;
          border-radius: 999px;
          overflow: hidden;
          background: repeating-linear-gradient(
            90deg,
            #64748b 0px,
            #64748b 35px,
            #475569 35px,
            #475569 70px
          );
          box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.25);
        }

        .belt::before,
        .belt::after {
          content: "";
          position: absolute;
          top: 25px;
          width: 60px;
          height: 60px;
          background: #1e293b;
          border-radius: 50%;
          z-index: 1;
        }

        .belt::before {
          left: 20px;
        }

        .belt::after {
          right: 20px;
        }

        .verbBox {
          position: absolute;
          top: 31px;
          left: 20px;
          z-index: 2;
          background: white;
          border: 3px solid #2563eb;
          border-radius: 16px;
          padding: 14px 20px;
          font-weight: 900;
          font-size: 1.1rem;
        }

        .move {
          animation: travel 3s ease-in-out forwards;
        }

        .output {
          margin: 45px auto 0;
          max-width: 700px;
          background: white;
          border-radius: 24px;
          padding: 24px;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
          opacity: 0.3;
          transform: translateY(10px);
          transition: all 0.5s ease;
        }

        .output.show {
          opacity: 1;
          transform: translateY(0);
        }

        .output h2 {
          font-size: 2rem;
          color: #2563eb;
          margin-bottom: 20px;
        }

        .steps {
          text-align: left;
          font-size: 1.05rem;
          line-height: 1.6;
        }

        @keyframes travel {
          0% {
            left: 20px;
          }
          45% {
            left: 42%;
          }
          100% {
            left: calc(100% - 150px);
          }
        }

        @keyframes pop {
          from {
            opacity: 0;
            transform: translateX(-50%) scale(0.5);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) scale(1);
          }
        }

        @media (max-width: 800px) {
          .factory {
            grid-template-columns: 1fr;
          }

          .belt {
            order: 2;
          }

          .machine {
            height: 150px;
          }
        }
      `}</style>
    </main>
  );
}
