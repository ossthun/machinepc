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

export default function PasseComposeMachine() {
  const [verbInput, setVerbInput] = useState("manger");
  const [pronounKey, setPronounKey] = useState("je");
  const [phase, setPhase] = useState("idle");

  const result = useMemo(() => {
    const verb = normalizeVerb(verbInput);
    const pronoun = pronouns.find((p) => p.key === pronounKey);
    const auxiliary = etreVerbs.has(verb) ? "être" : "avoir";
    const auxiliaryForm = auxiliary === "être" ? pronoun.etre : pronoun.avoir;
    const rawParticiple = getPastParticiple(verb);
    const finalParticiple = agree(rawParticiple, pronoun, auxiliary);
    const firstPart = elide(pronoun.label, auxiliaryForm);
    const sentence = rawParticiple === "?" ? "Verbe inconnu" : `${firstPart} ${finalParticiple}`;

    return { verb, pronoun, auxiliary, auxiliaryForm, rawParticiple, finalParticiple, sentence };
  }, [verbInput, pronounKey]);

  function startMachine() {
    setPhase("running");
    setTimeout(() => setPhase("auxiliary"), 1000);
    setTimeout(() => setPhase("participle"), 2200);
    setTimeout(() => setPhase("done"), 3600);
  }

  const showAux = ["auxiliary", "participle", "done"].includes(phase);
  const showParticiple = ["participle", "done"].includes(phase);
  const showFinal = phase === "done";

  return (
    <main className="page">
      <div className="hero">
        <div className="badge">Français · Passé composé</div>
        <h1>La machine à fabriquer le passé composé</h1>
        <p>Le verbe avance sur le tapis. Les deux machines construisent la forme correcte.</p>
      </div>

      <section className="panel">
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
          <input value={verbInput} onChange={(e) => setVerbInput(e.target.value)} />
        </label>

        <button onClick={startMachine}>⚙️ Démarrer</button>
      </section>

      <section className="factory">
        <div className="machine blue">
          <div className="light"></div>
          <div className="emoji">🤖</div>
          <h3>Machine 1</h3>
          <p>Choisit l’auxiliaire</p>
          <div className={`slot ${showAux ? "reveal" : ""}`}>{showAux ? result.auxiliary : "???"}</div>
        </div>

        <div className="beltWrap">
          <div className="belt">
            <div className={`box ${phase !== "idle" ? "move" : ""}`}>{result.verb || "verbe"}</div>
          </div>
          <div className="rollers">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
        </div>

        <div className="machine orange">
          <div className="light"></div>
          <div className="emoji">🛠️</div>
          <h3>Machine 2</h3>
          <p>Ajoute le participe passé</p>
          <div className={`slot ${showParticiple ? "reveal" : ""}`}>{showParticiple ? result.finalParticiple : "???"}</div>
        </div>
      </section>

      <section className={`result ${showFinal ? "show" : ""}`}>
        {!showFinal ? (
          <h2>La machine travaille...</h2>
        ) : (
          <>
            <div className="stamp">Résultat</div>
            <h2>{result.sentence}</h2>
            <div className="steps">
              <p>1. Auxiliaire: <strong>{result.auxiliary}</strong></p>
              <p>2. Forme conjuguée: <strong>{result.auxiliaryForm}</strong></p>
              <p>3. Participe passé: <strong>{result.rawParticiple}</strong></p>
              {result.auxiliary === "être" && (
                <p>4. Accord avec le sujet: <strong>{result.finalParticiple}</strong></p>
              )}
            </div>
          </>
        )}
      </section>

      <style jsx>{`
        .page {
          min-height: 100vh;
          padding: 36px 18px;
          font-family: system-ui, sans-serif;
          color: #172033;
          background:
            radial-gradient(circle at top left, #fff7ad, transparent 30%),
            radial-gradient(circle at top right, #b6e3ff, transparent 30%),
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
          font-weight: 800;
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

        .panel {
          max-width: 900px;
          margin: 0 auto 32px;
          background: rgba(255, 255, 255, 0.8);
          border: 2px solid white;
          border-radius: 26px;
          padding: 18px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 16px;
          box-shadow: 0 18px 40px rgba(15, 23, 42, 0.12);
          backdrop-filter: blur(10px);
        }

        label {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-weight: 900;
        }

        select, input {
          min-width: 210px;
          padding: 13px;
          border-radius: 16px;
          border: 2px solid #cbd5e1;
          font-size: 1rem;
          background: white;
        }

        button {
          align-self: end;
          padding: 14px 24px;
          border: 0;
          border-radius: 18px;
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          color: white;
          font-size: 1rem;
          font-weight: 950;
          cursor: pointer;
          box-shadow: 0 10px 22px rgba(37, 99, 235, 0.35);
        }

        .factory {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 210px 1fr 210px;
          gap: 22px;
          align-items: center;
        }

        .machine {
          position: relative;
          height: 245px;
          border-radius: 34px;
          padding: 22px;
          text-align: center;
          color: white;
          box-shadow: 0 22px 40px rgba(15, 23, 42, 0.22);
          overflow: hidden;
        }

        .machine::before {
          content: "";
          position: absolute;
          inset: 12px;
          border: 3px dashed rgba(255,255,255,.35);
          border-radius: 26px;
        }

        .blue {
          background: linear-gradient(145deg, #0f766e, #0891b2);
        }

        .orange {
          background: linear-gradient(145deg, #ea580c, #f59e0b);
        }

        .light {
          position: absolute;
          top: 18px;
          right: 18px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 18px #22c55e;
          animation: blink 1s infinite;
        }

        .emoji {
          font-size: 3rem;
          margin-top: 16px;
        }

        .machine h3 {
          font-size: 1.45rem;
          margin: 8px 0 4px;
        }

        .machine p {
          margin: 0 0 14px;
          opacity: .9;
        }

        .slot {
          position: relative;
          z-index: 2;
          margin: 0 auto;
          width: fit-content;
          min-width: 100px;
          padding: 12px 18px;
          background: #111827;
          border-radius: 16px;
          font-size: 1.25rem;
          font-weight: 950;
          border: 3px solid rgba(255,255,255,.35);
        }

        .slot.reveal {
          background: #fef3c7;
          color: #111827;
          animation: pop .35s ease-out;
        }

        .beltWrap {
          position: relative;
        }

        .belt {
          position: relative;
          height: 130px;
          border-radius: 70px;
          overflow: hidden;
          background:
            repeating-linear-gradient(90deg, #334155 0 42px, #475569 42px 84px);
          box-shadow:
            inset 0 8px 18px rgba(0,0,0,.35),
            0 18px 32px rgba(15,23,42,.18);
        }

        .belt::after {
          content: "";
          position: absolute;
          inset: 18px;
          border-radius: 60px;
          border: 3px solid rgba(255,255,255,.15);
        }

        .box {
          position: absolute;
          left: 24px;
          top: 34px;
          z-index: 3;
          padding: 18px 24px;
          background: #fff;
          border: 4px solid #2563eb;
          border-radius: 22px;
          font-size: 1.3rem;
          font-weight: 950;
          box-shadow: 0 12px 24px rgba(0,0,0,.18);
        }

        .box.move {
          animation: travel 3.4s ease-in-out forwards;
        }

        .rollers {
          display: flex;
          justify-content: space-around;
          margin-top: 14px;
        }

        .rollers span {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #64748b;
          border: 6px solid #334155;
          animation: spin 1s linear infinite;
        }

        .result {
          max-width: 760px;
          margin: 34px auto 0;
          padding: 26px;
          border-radius: 30px;
          text-align: center;
          background: rgba(255,255,255,.75);
          border: 2px solid white;
          box-shadow: 0 18px 38px rgba(15,23,42,.12);
          opacity: .7;
        }

        .result.show {
          opacity: 1;
          animation: resultPop .5s ease-out;
        }

        .stamp {
          display: inline-block;
          padding: 6px 14px;
          border-radius: 999px;
          background: #16a34a;
          color: white;
          font-weight: 950;
          margin-bottom: 8px;
        }

        .result h2 {
          margin: 0 0 18px;
          font-size: clamp(2rem, 6vw, 3.5rem);
          color: #1d4ed8;
        }

        .steps {
          text-align: left;
          background: #f8fafc;
          border-radius: 20px;
          padding: 16px 22px;
          line-height: 1.6;
        }

        @keyframes travel {
          0% { left: 24px; transform: rotate(-2deg); }
          35% { left: 35%; transform: rotate(2deg); }
          68% { left: 58%; transform: rotate(-2deg); }
          100% { left: calc(100% - 155px); transform: rotate(0); }
        }

        @keyframes pop {
          from { transform: scale(.6); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        @keyframes resultPop {
          from { transform: translateY(20px) scale(.95); }
          to { transform: translateY(0) scale(1); }
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: .35; }
        }

        @keyframes spin {
          from { transform: rotate(0); }
          to { transform: rotate(360deg); }
        }

        @media (max-width: 850px) {
          .factory {
            grid-template-columns: 1fr;
          }

          .machine {
            height: 210px;
          }

          .belt {
            height: 115px;
          }
        }
      `}</style>
    </main>
  );
}
