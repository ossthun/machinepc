import { useMemo, useState } from "react";
import Link from "next/link";

const pronouns = [
  { key: "je", label: "je", avoir: "ai", etre: "suis", reflexive: "me", gender: "m", plural: false },
  { key: "tu", label: "tu", avoir: "as", etre: "es", reflexive: "te", gender: "m", plural: false },
  { key: "il", label: "il", avoir: "a", etre: "est", reflexive: "se", gender: "m", plural: false },
  { key: "elle", label: "elle", avoir: "a", etre: "est", reflexive: "se", gender: "f", plural: false },
  { key: "nous_m", label: "nous masculin", avoir: "avons", etre: "sommes", reflexive: "nous", gender: "m", plural: true },
  { key: "nous_f", label: "nous féminin", avoir: "avons", etre: "sommes", reflexive: "nous", gender: "f", plural: true },
  { key: "vous_m", label: "vous masculin", avoir: "avez", etre: "êtes", reflexive: "vous", gender: "m", plural: true },
  { key: "vous_f", label: "vous féminin", avoir: "avez", etre: "êtes", reflexive: "vous", gender: "f", plural: true },
  { key: "ils", label: "ils", avoir: "ont", etre: "sont", reflexive: "se", gender: "m", plural: true },
  { key: "elles", label: "elles", avoir: "ont", etre: "sont", reflexive: "se", gender: "f", plural: true },
];

const etreVerbs = new Set([
  "aller", "arriver", "devenir", "entrer", "monter", "mourir", "naître",
  "partir", "passer", "rentrer", "rester", "retomber", "retourner",
  "revenir", "sortir", "tomber", "venir", "descendre",
]);

const irregularParticiples = {
  avoir: "eu",
  être: "été",
  faire: "fait",
  dire: "dit",
  écrire: "écrit",
  décrire: "décrit",
  inscrire: "inscrit",
  lire: "lu",
  voir: "vu",
  revoir: "revu",
  pouvoir: "pu",
  vouloir: "voulu",
  devoir: "dû",
  savoir: "su",
  prendre: "pris",
  apprendre: "appris",
  comprendre: "compris",
  surprendre: "surpris",
  mettre: "mis",
  permettre: "permis",
  promettre: "promis",
  transmettre: "transmis",
  ouvrir: "ouvert",
  offrir: "offert",
  découvrir: "découvert",
  couvrir: "couvert",
  souffrir: "souffert",
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
  connaître: "connu",
  reconnaître: "reconnu",
  paraître: "paru",
  apparaître: "apparu",
  disparaître: "disparu",
  conduire: "conduit",
  construire: "construit",
  produire: "produit",
  traduire: "traduit",
  cuire: "cuit",
  suivre: "suivi",
  poursuivre: "poursuivi",
  rire: "ri",
  sourire: "souri",
  plaire: "plu",
  pleuvoir: "plu",
  falloir: "fallu",
  valoir: "valu",
  battre: "battu",
  combattre: "combattu",
  débattre: "débattu",
  abattre: "abattu",
  vaincre: "vaincu",
  asseoir: "assis",
};

const erVerbs = new Set([
  "abandonner", "accepter", "accompagner", "acheter", "adorer", "adresser",
  "aider", "aimer", "ajouter", "allumer", "amener", "amuser",
  "annoncer", "apporter", "apprécier", "approcher", "appeler",
  "apprendre", "arranger", "arrêter", "arriver", "assurer",
  "attaquer", "attacher", "attraper", "augmenter", "avancer",
  "baisser", "balancer", "balayer", "baigner", "bavarder",
  "blesser", "bouger", "bricoler", "briller", "brosser",
  "cacher", "calculer", "calmer", "casser", "causer",
  "changer", "chanter", "charger", "chercher", "choquer",
  "commander", "commencer", "comparer", "compter", "continuer",
  "contrôler", "copier", "corriger", "couper", "coucher",
  "crier", "danser", "décider", "déclarer", "décorer",
  "demander", "dépenser", "détester", "dessiner", "donner",
  "douter", "écouter", "embrasser", "emmener", "emporter",
  "encourager", "enlever", "entrer", "envoyer", "espérer",
  "essayer", "estimer", "étudier", "éviter", "expliquer",
  "exprimer", "fermer", "fêter", "filmer", "forcer",
  "former", "frapper", "gagner", "garder", "garer",
  "glisser", "grimper", "habiter", "imaginer", "inviter",
  "jeter", "jouer", "laisser", "laver", "lever",
  "marcher", "manger", "manquer", "mélanger", "monter",
  "montrer", "nager", "nettoyer", "noter", "observer",
  "occuper", "oublier", "parler", "partager", "passer",
  "penser", "perdre", "photographier", "pleurer", "porter",
  "poser", "préférer", "préparer", "présenter", "prêter",
  "promener", "proposer", "protéger", "quitter", "raconter",
  "ramasser", "ranger", "regarder", "remercier", "rencontrer",
  "rentrer", "réparer", "reposer", "rester", "retirer",
  "retourner", "retrouver", "rêver", "saluer", "sauter",
  "sauver", "signer", "sonner", "terminer", "tomber",
  "tourner", "travailler", "traverser", "trouver", "utiliser",
  "visiter", "voyager",
]);

const irVerbs = new Set([
  "agir", "applaudir", "bâtir", "choisir", "finir", "grandir", "grossir",
  "guérir", "maigrir", "mincir", "nourrir", "obéir", "punir", "réfléchir",
  "remplir", "réussir", "rougir", "salir", "vieillir",
]);

const reVerbs = new Set([
  "attendre", "confondre", "défendre", "descendre", "entendre", "fondre",
  "perdre", "prétendre", "répondre", "rendre", "vendre",
]);

const oirVerbs = new Set([
  "avoir",
  "devoir",
  "pleuvoir",
  "pouvoir",
  "recevoir",
  "revoir",
  "savoir",
  "voir",
  "vouloir",
  "falloir",
  "valoir",
  "asseoir",
]);

const pronominalBaseVerbs = new Set([
  "amuser", "appeler", "arrêter", "asseoir", "battre", "baigner", "brosser",
  "cacher", "calmer", "changer", "coiffer", "coucher", "débrouiller",
  "décider", "défendre", "déguiser", "dépêcher", "doucher", "ennuyer",
  "entraîner", "fâcher", "habiller", "imaginer", "inquiéter", "installer",
  "intéresser", "laver", "lever", "maquiller", "marier", "méfier", "moquer",
  "occuper", "peigner", "perdre", "préparer", "promener", "rappeler",
  "raser", "reposer", "réveiller", "souvenir", "taire", "tromper",
]);

const knownVerbs = new Set([
  ...etreVerbs,
  ...erVerbs,
  ...irVerbs,
  ...reVerbs,
  ...oirVerbs,
  ...pronominalBaseVerbs,
  ...Object.keys(irregularParticiples),
]);

function normalizeVerb(v) {
  return v.trim().toLowerCase().replace(/\s+/g, " ").replace(/’/g, "'");
}

function beginsWithVowelOrH(word) {
  return /^[aeiouéèêëàâîïôùûüh]/i.test(word);
}

function isPronominalVerb(verb) {
  return verb.startsWith("se ") || verb.startsWith("s'");
}

function removeReflexivePart(verb) {
  if (verb.startsWith("se ")) return verb.slice(3);
  if (verb.startsWith("s'")) return verb.slice(2);
  return verb;
}

function getReflexivePronoun(pronoun, nextWord) {
  const reflexive = pronoun.reflexive;

  if (["me", "te", "se"].includes(reflexive) && beginsWithVowelOrH(nextWord)) {
    return reflexive[0] + "’";
  }

  return reflexive;
}

function joinReflexiveAndAuxiliary(reflexivePronoun, auxiliaryForm) {
  if (reflexivePronoun.endsWith("’")) return `${reflexivePronoun}${auxiliaryForm}`;
  return `${reflexivePronoun} ${auxiliaryForm}`;
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
  if (subject === "je" && beginsWithVowelOrH(auxiliary)) return `j’${auxiliary}`;
  return `${subject} ${auxiliary}`;
}

export default function PasseComposeMachine() {
  const [verbInput, setVerbInput] = useState("manger");
  const [pronounKey, setPronounKey] = useState("je");
  const [phase, setPhase] = useState("idle");
  const [runId, setRunId] = useState(0);

  const result = useMemo(() => {
    const verb = normalizeVerb(verbInput);
    const displayVerb = verb.replace(/'/g, "’");
    const pronoun = pronouns.find((p) => p.key === pronounKey);
    const subject = pronoun.label.split(" ")[0];

    const isPronominal = isPronominalVerb(verb);
    const baseVerb = removeReflexivePart(verb);
    const isKnownVerb = knownVerbs.has(baseVerb);

    if (!verb || !isKnownVerb) {
      return {
        verb: displayVerb,
        baseVerb,
        subject,
        isPronominal,
        isKnownVerb: false,
        auxiliary: "???",
        auxiliaryForm: "???",
        expectedAuxInput: "???",
        rawParticiple: "???",
        finalParticiple: "???",
        sentence: `Verbe non reconnu : « ${displayVerb || "..."} »`,
      };
    }

    const auxiliary = isPronominal || etreVerbs.has(baseVerb) ? "être" : "avoir";
    const auxiliaryForm = auxiliary === "être" ? pronoun.etre : pronoun.avoir;

    const reflexivePronoun = isPronominal
      ? getReflexivePronoun(pronoun, auxiliaryForm)
      : "";

    const expectedAuxInput = isPronominal
      ? joinReflexiveAndAuxiliary(reflexivePronoun, auxiliaryForm)
      : auxiliaryForm;

    const rawParticiple = getPastParticiple(baseVerb);
    const finalParticiple = agree(rawParticiple, pronoun, auxiliary);

    const firstPart = isPronominal
      ? `${subject} ${expectedAuxInput}`
      : elide(subject, auxiliaryForm);

    return {
      verb: displayVerb,
      baseVerb,
      subject,
      isPronominal,
      isKnownVerb: true,
      auxiliary,
      auxiliaryForm,
      expectedAuxInput,
      rawParticiple,
      finalParticiple,
      sentence: `${firstPart} ${finalParticiple}`,
    };
  }, [verbInput, pronounKey]);

  function resetMachine() {
    setPhase("idle");
  }

  function startMachine() {
    if (!result.isKnownVerb) {
      setPhase("done");
      return;
    }

    setPhase("idle");
    setRunId((previous) => previous + 1);

    setTimeout(() => setPhase("running"), 40);
    setTimeout(() => setPhase("auxiliary"), 1040);
    setTimeout(() => setPhase("participle"), 2340);
    setTimeout(() => setPhase("done"), 3840);
  }

  function handleVerbChange(e) {
    setVerbInput(e.target.value);
    resetMachine();
  }

  function handlePronounChange(e) {
    setPronounKey(e.target.value);
    resetMachine();
  }

  const showAux = ["auxiliary", "participle", "done"].includes(phase);
  const showParticiple = ["participle", "done"].includes(phase);
  const showFinal = phase === "done";
  const isMoving = result.isKnownVerb && ["running", "auxiliary", "participle"].includes(phase);

  return (
    <main className="page">
      <section className="hero">
        <div className="badge">Français · Passé composé</div>

        <h1>La machine à fabriquer le passé composé</h1>

        <p>
          Choisis un pronom, écris un verbe, puis appuie sur{" "}
          <strong>Entrée</strong>.
        </p>

        <Link href="/" className="backLink">
          ← Retour à l’accueil
        </Link>
      </section>

      <section className="panel">
        <label>
          <span>Pronom</span>
          <select value={pronounKey} onChange={handlePronounChange}>
            {pronouns.map((p) => (
              <option key={p.key} value={p.key}>
                {p.label}
              </option>
            ))}
          </select>
        </label>

        <label className="verbLabel">
          <span>Verbe à l’infinitif</span>
          <div className="verbRow">
            <input
              value={verbInput}
              onChange={handleVerbChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  startMachine();
                }
              }}
              placeholder="manger, aller, se promener..."
            />

            <button
              type="button"
              className="startButton"
              onClick={startMachine}
            >
              Démarrer
            </button>
          </div>
        </label>
      </section>

      <section className="factory">
        <div className="machine blue">
          <div className="light" />
          <div className="emoji">🤖</div>
          <h3>Machine 1</h3>
          <p>Choisit l’auxiliaire</p>
          <div className={`slot ${showAux ? "reveal" : ""}`}>
            {showAux ? result.auxiliary : "???"}
          </div>
        </div>

        <div className="beltArea">
          <div className={`belt ${isMoving ? "beltMoving" : ""}`}>
            <div className="beltSurface" />
            <div className="beltShine" />
            <div key={runId} className={`box ${isMoving ? "move" : ""}`}>
              {result.verb || "verbe"}
            </div>
          </div>

          <div className="rollerRow">
            <div className={`roller ${isMoving ? "spin" : ""}`} />
            <div className={`roller small ${isMoving ? "spin" : ""}`} />
            <div className={`roller small ${isMoving ? "spin" : ""}`} />
            <div className={`roller small ${isMoving ? "spin" : ""}`} />
            <div className={`roller ${isMoving ? "spin" : ""}`} />
          </div>
        </div>

        <div className="machine orange">
          <div className="light" />
          <div className="emoji">🛠️</div>
          <h3>Machine 2</h3>
          <p>Ajoute le participe passé</p>
          <div className={`slot ${showParticiple ? "reveal" : ""}`}>
            {showParticiple ? result.finalParticiple : "???"}
          </div>
        </div>
      </section>

      <section className={`result ${showFinal ? "show" : ""}`}>
        {!showFinal ? (
          <h2>La machine attend ton verbe...</h2>
        ) : !result.isKnownVerb ? (
          <>
            <div className="stamp error">Erreur</div>
            <h2 className="errorText">{result.sentence}</h2>
            <div className="steps">
              <p>
                Vérifie l’orthographe du verbe.
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="stamp">Résultat</div>
            <h2>{result.sentence}</h2>

            <div className="steps">
              <p>1. Verbe de base: <strong>{result.baseVerb}</strong></p>
              <p>2. Auxiliaire: <strong>{result.auxiliary}</strong></p>
              <p>
                3. Forme conjuguée:{" "}
                <strong>
                  {result.isPronominal ? result.expectedAuxInput : result.auxiliaryForm}
                </strong>
              </p>
              <p>4. Participe passé: <strong>{result.rawParticiple}</strong></p>
              {result.isPronominal && (
                <p>
                  5. Verbe pronominal: on garde le pronom réfléchi et on utilise{" "}
                  <strong>être</strong>.
                </p>
              )}
              {result.auxiliary === "être" && (
                <p>Accord avec le sujet: <strong>{result.finalParticiple}</strong></p>
              )}
            </div>
          </>
        )}
      </section>

      <footer className="footer">
        <Link href="/about" className="footerLink">À propos</Link>
        <Link href="/contact" className="footerLink">Contact</Link>
        <Link href="/privacy" className="footerLink">Confidentialité</Link>
        <Link href="/terms" className="footerLink">Conditions</Link>
        <Link href="/disclaimer" className="footerLink">Avertissement</Link>
      </footer>

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

        .backLink:hover {
          text-decoration: underline;
        }

        .panel {
          max-width: 720px;
          margin: 0 auto 32px;
          background: rgba(255, 255, 255, 0.82);
          border: 2px solid white;
          border-radius: 26px;
          padding: 18px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: stretch;
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

        .verbLabel {
          flex: 1.45;
          min-width: 320px;
        }

        .verbRow {
          display: flex;
          gap: 10px;
          width: 100%;
        }

        select,
        input {
          height: 56px;
          box-sizing: border-box;
          border-radius: 16px;
          font-size: 1rem;
          width: 100%;
          padding: 0 16px;
          border: 2px solid #cbd5e1;
          background: white;
        }

        .startButton {
          height: 56px;
          box-sizing: border-box;
          border: none;
          border-radius: 16px;
          padding: 0 22px;
          background: #2563eb;
          color: white;
          font-size: 1rem;
          font-weight: 950;
          cursor: pointer;
          white-space: nowrap;
          box-shadow: 0 10px 20px rgba(37, 99, 235, 0.25);
        }

        .startButton:hover {
          background: #1d4ed8;
        }

        .factory {
          max-width: 1120px;
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
          border: 3px dashed rgba(255, 255, 255, 0.35);
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
          opacity: 0.9;
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
          border: 3px solid rgba(255, 255, 255, 0.35);
        }

        .slot.reveal {
          background: #fef3c7;
          color: #111827;
          animation: pop 0.35s ease-out;
        }

        .beltArea {
          position: relative;
        }

        .belt {
          position: relative;
          height: 140px;
          border-radius: 76px;
          overflow: hidden;
          background: #1e293b;
          box-shadow:
            inset 0 10px 20px rgba(0, 0, 0, 0.45),
            0 18px 32px rgba(15, 23, 42, 0.18);
          border: 8px solid #334155;
        }

        .beltSurface {
          position: absolute;
          inset: 16px;
          border-radius: 70px;
          background:
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.08),
              rgba(255, 255, 255, 0.02),
              rgba(0, 0, 0, 0.12)
            ),
            repeating-linear-gradient(
              90deg,
              #475569 0px,
              #475569 34px,
              #334155 34px,
              #334155 68px
            );
          background-size: auto, 136px 100%;
          animation: beltPaused 1s linear infinite;
        }

        .beltMoving .beltSurface {
          animation: beltMove 0.55s linear infinite;
        }

        .beltShine {
          position: absolute;
          left: 24px;
          right: 24px;
          top: 26px;
          height: 22px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.12);
          filter: blur(1px);
        }

        .box {
          position: absolute;
          left: 24px;
          top: 36px;
          z-index: 3;
          padding: 18px 24px;
          background: #fff;
          border: 4px solid #2563eb;
          border-radius: 22px;
          font-size: 1.3rem;
          font-weight: 950;
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.18);
        }

        .box.move {
          animation: travel 3.6s ease-in-out forwards;
        }

        .rollerRow {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 14px;
          padding: 0 18px;
        }

        .roller {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background:
            radial-gradient(circle at center, #94a3b8 0 18%, transparent 19%),
            conic-gradient(#334155 0 25%, #64748b 25% 50%, #334155 50% 75%, #64748b 75%);
          border: 6px solid #1e293b;
          box-shadow: 0 5px 10px rgba(15, 23, 42, 0.25);
        }

        .roller.small {
          width: 30px;
          height: 30px;
          opacity: 0.8;
        }

        .roller.spin {
          animation: spin 0.55s linear infinite;
        }

        .result {
          max-width: 760px;
          margin: 34px auto 0;
          padding: 26px;
          border-radius: 30px;
          text-align: center;
          background: rgba(255, 255, 255, 0.75);
          border: 2px solid white;
          box-shadow: 0 18px 38px rgba(15, 23, 42, 0.12);
          opacity: 0.72;
        }

        .result.show {
          opacity: 1;
          animation: resultPop 0.5s ease-out;
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

        .stamp.error {
          background: #dc2626;
        }

        .result h2 {
          margin: 0 0 18px;
          font-size: clamp(2rem, 6vw, 3.5rem);
          color: #1d4ed8;
        }

        .errorText {
          color: #dc2626 !important;
        }

        .steps {
          text-align: left;
          background: #f8fafc;
          border-radius: 20px;
          padding: 16px 22px;
          line-height: 1.6;
        }

        .footer {
          max-width: 900px;
          margin: 34px auto 0;
          padding-top: 22px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 14px;
          font-size: 0.95rem;
        }

        .footerLink {
          color: #64748b;
          font-weight: 800;
          text-decoration: none;
        }

        .footerLink:hover {
          text-decoration: underline;
        }

        @keyframes travel {
          0% { left: 24px; transform: rotate(-2deg); }
          36% { left: 34%; transform: rotate(2deg); }
          68% { left: 58%; transform: rotate(-2deg); }
          100% { left: calc(100% - 160px); transform: rotate(0deg); }
        }

        @keyframes beltMove {
          from { background-position: 0 0, 0 0; }
          to { background-position: 0 0, -136px 0; }
        }

        @keyframes beltPaused {
          from { background-position: 0 0, 0 0; }
          to { background-position: 0 0, 0 0; }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pop {
          from { transform: scale(0.6); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        @keyframes resultPop {
          from { transform: translateY(20px) scale(0.95); }
          to { transform: translateY(0) scale(1); }
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }

        @media (max-width: 850px) {
          .factory {
            grid-template-columns: 1fr;
          }

          .machine {
            height: 210px;
          }

          .belt {
            height: 120px;
          }

          .panel {
            align-items: stretch;
          }

          .verbRow {
            flex-direction: column;
          }

          .startButton {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}
