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
  "aller", "arriver", "descendre", "devenir", "entrer", "monter", "mourir",
  "naître", "partir", "passer", "rentrer", "rester", "retourner", "revenir",
  "sortir", "tomber", "venir", "rentrer",
]);

const regularErVerbs = [
  "accélérer", "acclamer", "accoler", "acculer", "accumuler", "acheminer",
  "acidifier", "acquitter", "activer", "actualiser", "additionner", "adhérer",
  "adopter", "adorner", "adoucir", "affoler", "agacer", "aggraver",
  "agiter", "agréger", "agripper", "aiguiller", "alerter", "aligner",
  "alimenter", "alléger", "allonger", "alterner", "analyser", "animer",
  "anticiper", "apprécier", "apprivoiser",
  "argumenter", "aspirer", "associer", "assommer", "assister", "assumer",
  "attacher", "attarder", "atténuer", "attirer", "autoriser", "avaler",
  "aveugler", "avouer", "bagarrer", "balancer", "baptiser", "barbouiller",
  "barrer", "bavurer", "bercer", "bifurquer", "boucher", "bourdonner",
  "bourrer", "brancher", "bronzer", "brosser", "brusquer", "camper",
  "capturer", "caresser", "causer", "célébrer", "cerner", "cesser",
  "chasser", "chatouiller", "chauffer", "chiffrer", "choquer", "circuler",
  "classer", "classifier", "cligner", "clouer", "coiffer", "colorer",
  "combiner", "communiquer", "compagner", "compresser", "concentrer",
  "conclure", "condamner", "conditionner", "confirmer", "congeler",
  "conjuguer", "connecter", "considérer", "consommer", "constater",
  "consulter", "contacter", "contaminer", "contempler", "contester",
  "contribuer", "convier", "coopérer", "coordonner",
  "creuser", "cultiver", "déballer", "débarquer", "débloquer",
  "déborder", "débrancher", "débuter", "déchirer", "déclencher",
  "décliner", "décolorer", "décommander", "décourager",
  "dédier", "déformer", "dégager", "dégeler", "déjeuner",
  "délivrer", "démontrer", "dénoncer", "dépasser",
  "dépendre", "déplacer", "déplorer", "déprimer", "déranger",
  "désirer", "désorganiser", "dessécher", "destiner", "détecter",
  "détourner", "développer", "diffuser", "digérer", "diminuer",
  "diplômer", "disperser", "disposer", "dissimuler", "distinguer",
  "diviser", "dominer", "échanger", "échapper", "éclairer",
  "éclater", "écorcher", "écouler", "éditer", "éduquer",
  "élever", "éliminer", "emballer", "embarquer",
  "embêter", "embrouiller", "émigrer", "emmêler",
  "empiler", "encadrer", "enchaîner", "endommager",
  "énerver", "enfermer", "enfoncer",
  "engager", "englober", "engraisser", "enlever", "ennuyer",
  "enregistrer", "enseigner", "entasser", "entourer",
  "entraîner", "entreposer", "énumérer", "envelopper", "épuiser",
  "équiper", "escalader", "escorter", "espionner", "estimer",
  "étonner", "étouffer", "examiner", "exercer", "exiger",
  "exister", "expédier", "exploiter", "exploser", "exporter",
  "exprimer", "fabriquer", "faciliter", "fatiguer", "favoriser",
  "féliciter", "feuilleter", "fixer", "flotter", "fonder",
  "forcer", "former", "fréquenter", "frissonner", "fusionner",
  "gaspiller", "gêner", "glisser", "gonfler", "griffer",
  "grignoter", "grogner", "guider", "harceler", "hésiter",
  "honorer", "hurler", "illustrer", "imiter", "importer",
  "improviser", "inciter", "indiquer", "infecter", "influencer",
  "informer", "installer", "insulter", "intéresser", "interroger",
  "interrompre", "inventer", "isoler", "jalouser", "jongler",
  "justifier", "klaxonner", "laisser", "lancer", "licencier",
  "lier", "limiter", "localiser", "loger", "lutter",
  "manifester", "manquer", "massacrer", "méditer", "mémoriser",
  "mesurer", "miner", "modifier", "motiver", "multiplier",
  "murmurer", "négliger", "nier", "nommer", "noter",
  "observer", "obstiner", "obtenir", "occuper", "offenser",
  "opposer", "ordonner", "organiser", "orienter", "oser",
  "outrer", "pardonner", "parfumer", "participer", "patienter",
  "peigner", "perfectionner", "persuader", "photographier",
  "pincer", "placer", "planifier", "plier", "plonger",
  "poivrer", "polluer", "posséder", "postuler", "pratiquer",
  "préciser", "préférer", "presser", "prêter", "prévenir",
  "progresser", "proposer", "protéger", "protester", "publier",
  "punaiser", "questionner", "ramasser", "ranger", "raser",
  "réaliser", "réchauffer", "réclamer", "reculer", "refuser",
  "régler", "rejeter", "relâcher", "relier", "remplacer",
  "remuer", "renforcer", "renouveler", "renverser", "réorganiser",
  "respirer", "respecter", "responsabiliser", "retarder", "retrouver",
  "réviser", "rouler", "saluer", "sculpter", "sécher",
  "sélectionner", "serrer", "simplifier", "siffler", "souffler", "souhaiter", "souligner",
  "soupçonner", "stationner", "stimuler", "stopper", "supporter",
  "supprimer", "surveiller", "téléphoner", "tester", "tolérer",
  "transporter", "transformer", "transpirer", "transférer",
  "translater", "trier", "tricoter", "utiliser", "varier",
  "verser", "vérifier", "vider", "viser",
  "voter", "voyager", "abaisser", "abandonner", "abîmer", "abonner", "aborder", "abriter", "accepter",
  "accompagner", "accorder", "accrocher", "accuser", "acheter", "achever", "adapter",
  "admirer", "adorer", "adresser", "afficher", "affirmer", "aider", "aimer",
  "ajouter", "allumer", "améliorer", "amener", "amuser", "annoncer", "appeler",
  "apporter", "approcher", "appuyer", "arracher", "arranger", "arrêter", "arriver",
  "arroser", "assurer", "attaquer", "attraper", "augmenter", "avancer", "baisser",
  "balayer", "bavarder", "blesser", "bouger", "briller", "brûler", "cacher",
  "calculer", "casser", "changer", "chanter", "charger", "chercher", "coller",
  "commander", "commencer", "comparer", "compléter", "compter", "conseiller",
  "conserver", "continuer", "contrôler", "copier", "corriger", "coucher", "couper",
  "créer", "crier", "cuisiner", "danser", "décider", "déclarer", "décorer",
  "découper", "démarrer", "demander", "déménager", "dépenser", "déposer", "dessiner",
  "détester", "deviner", "dîner", "diriger", "discuter", "donner", "douter", "durer",
  "écouter", "effacer", "embrasser", "emmener", "empêcher", "employer", "encourager",
  "entrer", "envoyer", "essayer", "espérer", "étudier", "éviter", "expliquer",
  "fermer", "fêter", "filmer", "foncer", "forcer", "frapper", "fumer", "gagner",
  "garder", "goûter", "gratter", "grimper", "habiller", "habiter", "ignorer",
  "imaginer", "imprimer", "inviter", "jeter", "jouer", "jurer", "laisser", "laver",
  "lever", "livrer", "louer", "manger", "maquiller", "marcher", "marquer", "mélanger",
  "menacer", "mener", "mériter", "monter", "montrer", "nager", "nettoyer", "observer",
  "occuper", "oublier", "parler", "partager", "passer", "payer", "penser", "pleurer",
  "porter", "poser", "pousser", "préférer", "préparer", "présenter", "prier", "prouver",
  "quitter", "raconter", "rappeler", "recopier", "regarder", "regretter", "remarquer",
  "remercier", "remonter", "rencontrer", "rentrer", "réparer", "répéter", "reposer",
  "ressembler", "rester", "retourner", "rêver", "sauter", "sauver", "signer", "sonner",
  "souhaiter", "terminer", "tirer", "tomber", "toucher", "tourner", "travailler",
  "traverser", "trébucher", "trembler", "trouver", "utiliser", "visiter", "voler",
  "voyager", "boulverser", "basculer", "ricaner", "rouspéter", "râler",
];

const regularIrVerbs = [
  "abolir", "aboutir", "accomplir", "adoucir", "affaiblir", "affermir",
  "affranchir", "agir", "agrandir", "aguerrir", "ahurir", "alanguir",
  "alourdir", "amaigrir", "amollir", "amoindrir", "anéantir", "anoblir",
  "aplanir", "applaudir", "appauvrir", "approfondir", "assagir", "assainir",
  "assombrir", "assortir", "assoupir", "attendrir", "atterrir", "avachir",
  "avertir", "bannir", "bâtir", "bénir", "blanchir", "bleuir",
  "bondir", "calmir", "chérir", "choisir", "compatir", "convertir",
  "crépir", "dégrossir", "définir", "déglutir", "dégourdir", "démolir",
  "démunir", "dénourrir", "désobéir", "désunir", "dévêtir", "dormir", "durcir",
  "éboulir", "éclaircir", "élargir", "embellir", "embrunir", "endurcir",
  "enfouir", "engourdir", "enlaidir", "ennoblir", "enrichir", "envahir",
  "épaissir", "épanouir", "épargnir", "épluchir", "équarrir", "établir",
  "éternuir", "étourdir", "évanouir", "faiblir", "farcir", "finir",
  "fléchir", "fleurir", "fournir", "franchir", "frémir", "garnir",
  "gauchir", "gémir", "glapir", "glatir", "glorifier", "grandir",
  "gravir", "grossir", "guérir", "haïr", "hennir", "impartir",
  "infléchir", "investir", "jaillir", "jaunir",
  "jouir", "lotir", "maigrir", "meurtrir", "mincir",
  "moisir", "mollir", "munir", "nantir", "narcotir",
  "nourrir", "obéir", "obscurcir", "ouïr", "pâlir",
  "pâtir", "périr", "pervertir", "pétrir", "planir",
  "polir", "prévenir", "punir", "raccourcir", "radoucir", "raffermir",
  "ralentir", "ramollir", "ravir", "rebondir", "rebâtir",
  "reblanchir", "reconvertir", "recrudescir", "redéfinir", "refleurir",
  "refroidir", "regarnir", "rejaillir", "rejouir", "remplir", "renchérir",
  "rendurcir", "renfléchir", "renourrir", "repolir", "réagir",
  "réfléchir", "réjouir", "remunir", "remplir", "rétablir",
  "rétrécir", "réunir", "réussir", "revenir", "revêtir", "rôtir",
  "rougir", "rugir", "saisir", "salir", "secourir", "sentir",
  "sertir", "sourire", "surgir", "surenchérir", "surir", "tapir",
  "ternir", "trahir", "tressaillir", "unir", "verdir", "vieillir",
  "vomir", "agir", "agrandir", "applaudir", "atterrir", "avertir", "bâtir", "blanchir",
  "divertir", "durcir", "établir", "finir", "fleurir",
  "fournir", "franchir", "grandir", "grossir", "guérir", "jaunir", "maigrir",
  "nourrir", "obéir", "pâlir", "punir", "ralentir", "réagir", "vieillir",
];

const regularReVerbs = [
  "abattre", "attendre", "battre",
  "boire", "confondre", "correspondre", "croire",
  "débattre", "défendre", "dépendre", "descendre", "détendre",
  "entendre", "étendre", "fendre", "fondre", "interrompre",
  "mordre", "perdre", "pondre", "prétendre", "répandre",
  "répondre", "rompre", "suspendre", "tendre", "tondre", "tordre",
  "vendre", "combattre", "connaître", "convaincre", "corrompre",
  "exclure", "lire", "reconnaître", "retenir", "revendre",
  "suspendre", "perdre", "pondre", "prétendre",
  "rendre", "descendre", "détendre", "entendre", "éteindre", "fondre", "mordre",
  "perdre", "pondre", "prétendre", "rendre", "répandre", "répondre", "rompre",
  "tendre", "tondre", "tordre", "vendre",
];

const otherKnownVerbs = [
  "aller", "apercevoir", "apprendre", "asseoir", "avoir", "boire", "comprendre", "conduire",
  "construire", "courir", "couvrir", "craindre", "croire", "cueillir", "décrire", "devenir", "devoir", "découvrir",
  "dire", "écrire", "être", "éteindre", "faire", "falloir", "joindre", "lire", "maintenir", "mentir", "mettre",
  "mourir", "naître", "obtenir", "offrir", "ouvrir", "partir", "peindre", "permettre", "plaindre", "plaire",
  "pleuvoir", "pouvoir", "prendre", "promettre", "recevoir", "reprendre", "retenir",
  "revenir", "rire", "savoir", "sentir", "servir", "sortir", "souffrir", "suivre",
  "surprendre", "tenir", "taire", "tenir", "vêtir", "vaincre", "venir", "vivre", "voir", "vouloir",
];

const pronominalVerbs = [
  "s'amuser", "s'appeler", "s'arrêter", "s'asseoir", "s'énerver", "s'entraîner",
  "s'excuser", "s'habiller", "s'intéresser", "s'occuper",
  "se cacher", "se calmer", "se coucher", "se dépêcher", "se disputer", "se doucher",
  "se fâcher", "se laver", "se lever", "se maquiller", "se peigner", "se préparer",
  "se promener", "se rappeler", "se reposer", "se réveiller", "se souvenir", "se tromper",
];

const knownVerbs = new Set([
  ...regularErVerbs,
  ...regularIrVerbs,
  ...regularReVerbs,
  ...otherKnownVerbs,
]);

const knownPronominalVerbs = new Set(pronominalVerbs);

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
  reprendre: "repris",
  surprendre: "surpris",
  mettre: "mis",
  permettre: "permis",
  promettre: "promis",
  ouvrir: "ouvert",
  offrir: "offert",
  souffrir: "souffert",
  couvrir: "couvert",
  découvrir: "découvert",
  venir: "venu",
  devenir: "devenu",
  revenir: "revenu",
  tenir: "tenu",
  retenir: "retenu",
  obtenir: "obtenu",
  mourir: "mort",
  naître: "né",
  recevoir: "reçu",
  apercevoir: "aperçu",
  boire: "bu",
  croire: "cru",
  vivre: "vécu",
  suivre: "suivi",
  souffrir: "souffert",
  courir: "couru",
  rire: "ri",
  plaire: "plu",
  taire: "tu",
  falloir: "fallu",
  pleuvoir: "plu",
  asseoir: "assis",
  cueillir: "cueilli",
  craindre: "craint",
  conduire: "conduit",
  décrire: "décrit",
  éteindre: "éteint",
  peindre: "peint",
  vaincre: "vaincu",
  plaindre: "plaint",
  vêtir: "vêtu",
  joindre: "joint",
  maintenir: "maintenu",
  tenir: "tenu",
};

function normalize(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/’/g, "'")
    .replace(/\s+/g, " ");
}

function normalizeVerb(v) {
  return v
    .trim()
    .toLowerCase()
    .replace(/’/g, "'")
    .replace(/\s+/g, " ");
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
  if (reflexivePronoun.endsWith("’")) {
    return `${reflexivePronoun}${auxiliaryForm}`;
  }

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
  if (subject === "je" && beginsWithVowelOrH(auxiliary)) {
    return `j’${auxiliary}`;
  }
  return `${subject} ${auxiliary}`;
}

function cleanSubject(label) {
  return label.split(" ")[0];
}

function displaySubject(subject, auxiliaryForm) {
  if (subject === "je" && beginsWithVowelOrH(auxiliaryForm)) {
    return "j’";
  }
  return subject;
}

function isVerbKnown(verb) {
  if (!verb) return false;
  if (isPronominalVerb(verb)) {
    return knownPronominalVerbs.has(verb);
  }
  return knownVerbs.has(verb);
}
export default function PasseComposeTraining() {
  const initialVerb = "manger";

  const [verbInput, setVerbInput] = useState(initialVerb);
  const [submittedVerb, setSubmittedVerb] = useState(initialVerb);
  const [pronounKey, setPronounKey] = useState("je");
  const [auxInput, setAuxInput] = useState("");
  const [participleInput, setParticipleInput] = useState("");
  const [checked, setChecked] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [verbStatus, setVerbStatus] = useState("valid");
  // "editing" = user is typing
  // "valid" = user pressed Enter and verb is known
  // "invalid" = user pressed Enter and verb is unknown

  const result = useMemo(() => {
    const verb = normalizeVerb(verbInput);
    const pronoun = pronouns.find((p) => p.key === pronounKey) || pronouns[0];

    const subject = cleanSubject(pronoun.label);
    const isPronominal = isPronominalVerb(verb);
    const baseVerb = removeReflexivePart(verb);
    const isKnown = isVerbKnown(verb);

    if (!isKnown) {
      return {
        verb,
        baseVerb,
        pronoun,
        isKnown: false,
        auxiliary: "",
        auxiliaryForm: "",
        reflexivePronoun: "",
        expectedAuxInput: "",
        rawParticiple: "",
        finalParticiple: "",
        sentence: "Verbe inconnu",
        subject,
        visibleSubject: subject,
        isPronominal,
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

    const visibleSubject = isPronominal
      ? subject
      : displaySubject(subject, auxiliaryForm);

    const firstPart = isPronominal
      ? `${subject} ${expectedAuxInput}`
      : elide(subject, auxiliaryForm);

    const sentence =
      rawParticiple === "?" ? "Verbe inconnu" : `${firstPart} ${finalParticiple}`;

    return {
      verb,
      baseVerb,
      pronoun,
      isKnown,
      auxiliary,
      auxiliaryForm,
      reflexivePronoun,
      expectedAuxInput,
      rawParticiple,
      finalParticiple,
      sentence,
      subject,
      visibleSubject,
      isPronominal,
    };
  }, [verbInput, pronounKey]);

  const currentVerbWasSubmitted = submittedVerb === result.verb;

  const machineUnlocked = verbStatus === "valid" && result.isKnown;

  const showVerbError =
    verbStatus === "invalid" && result.verb.trim().length > 0;

  const auxCorrect =
    result.isKnown &&
    normalize(auxInput) === normalize(result.expectedAuxInput);
  const participleCorrect =
    result.isKnown &&
    normalize(participleInput) === normalize(result.finalParticiple);
  function resetExercise(newVerb = verbInput) {
    setVerbInput(newVerb);
    setAuxInput("");
    setParticipleInput("");
    setChecked(false);
    setShowHint(false);
  }
  function loadRandomVerb() {
    const verbs = [
    ...Array.from(knownVerbs),
    ...Array.from(knownPronominalVerbs),
    ];
    const randomVerb = verbs[Math.floor(Math.random() * verbs.length)];

    setVerbInput(randomVerb);
    setSubmittedVerb(randomVerb);
    setAuxInput("");
    setParticipleInput("");
    setChecked(false);
    setShowHint(false);
    setVerbStatus("valid");
  }
  function validateVerbOnly() {
    const submitted = normalizeVerb(verbInput);
    const known = isVerbKnown(submitted);

    setVerbInput(submitted);
    setSubmittedVerb(submitted);
    setVerbStatus(known ? "valid" : "invalid");
    setChecked(false);
    setShowHint(false);

    return known;
  }  
  function submitVerb() {
    return validateVerbOnly();
  }
  
  function verifyAll() {
    const submitted = normalizeVerb(verbInput);
    const known = isVerbKnown(submitted);

    setVerbInput(submitted);
    setSubmittedVerb(submitted);
    setVerbStatus(known ? "valid" : "invalid");

    if (!known) {
      setChecked(false);
      return;
    }

    if (!auxInput.trim() || !participleInput.trim()) return;

    setChecked(true);
  }
  return (
    <main className="page">
      <section className="hero">
        <div className="badge">Mode entraînement</div>

        <h1>Construis le passé composé toi-même</h1>

        <p>
          Écris d’abord un infinitif, puis appuie sur <strong>Entrée</strong>.
          Ensuite, écris l’auxiliaire et le participe passé.
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
              setVerbStatus("editing");
              setAuxInput("");
              setParticipleInput("");
              setChecked(false);
              setShowHint(false);
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

          <div className="verbInputRow">
            <input
              value={verbInput}
              onChange={(e) => {
                setVerbInput(e.target.value);
                setAuxInput("");
                setParticipleInput("");
                setChecked(false);
                setShowHint(false);
                setVerbStatus("editing");
              }}
              onBlur={() => {
                validateVerbOnly();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  validateVerbOnly();
                  setTimeout(() => {
                    document.getElementById("auxInput")?.focus();
                  }, 0);
                }

                if (e.key === "Tab") {
                  validateVerbOnly();
                }
              }}
              placeholder="manger, aller, se promener..."
            />

            <button
              type="button"
              className="randomButton"
              onClick={loadRandomVerb}
            >
              🎲 Au hasard
            </button>
          </div>
        </label>
      </section>

      {showVerbError && (
        <section className="errorCard">
          <strong>Verbe inconnu ou mal orthographié.</strong>
          <br />
          Le verbe <strong>{result.verb}</strong> n’est pas dans la liste.
          Vérifie l’orthographe.
          <br />
          Exemple: <strong>rappeler</strong> et non <strong>rappeller</strong>.
        </section>
      )}

      <section className={`taskCard ${showVerbError ? "disabledCard" : ""}`}>
        <div className="sentenceBuild">
          <span className="subject">{result.visibleSubject}</span>

          <span className={`blank ${checked && auxCorrect ? "filled" : ""}`}>
            {checked && auxCorrect ? result.expectedAuxInput : "auxiliaire ?"}
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
              {result.isPronominal ? (
                <>
                  Verbe pronominal: écris le pronom réfléchi + l’auxiliaire.
                  <br />
                  <strong>me suis, t’es, s’est, nous sommes...</strong>
                </>
              ) : (
                <>
                  Écris la forme conjuguée de l’auxiliaire:
                  <br />
                  <strong>ai, as, a, avons, êtes, sont...</strong>
                </>
              )}
            </p>

            <input
              id="auxInput"
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
              placeholder={result.isPronominal ? "ex: s’est" : "auxiliaire"}
            />

            {checked && machineUnlocked && auxCorrect && (
              <div className="feedback goodText">
                Correct!{" "}
                {result.isPronominal ? (
                  <>
                    <strong>{result.verb}</strong> utilise{" "}
                    <strong>{result.expectedAuxInput}</strong>.
                  </>
                ) : (
                  <>
                    Le verbe <strong>{result.verb}</strong> utilise{" "}
                    <strong>{result.auxiliary}</strong>.
                  </>
                )}
              </div>
            )}

            {checked && machineUnlocked && !auxCorrect && (
              <div className="feedback badText">
                Pas encore. Avec <strong>{result.visibleSubject}</strong>, il faut écrire{" "}
                <strong>{result.expectedAuxInput}</strong>.
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

            {checked && machineUnlocked && participleCorrect && (
              <div className="feedback goodText">
                Correct! Le participe passé final est{" "}
                <strong>{result.finalParticiple}</strong>.
              </div>
            )}

            {checked && machineUnlocked && !participleCorrect && (
              <div className="feedback badText">
                Pas encore. Le participe passé attendu est{" "}
                <strong>{result.finalParticiple}</strong>.
              </div>
            )}
          </div>
        </div>

        <div className="hintBox">
           <button
            className="verifyButton"
            onClick={() => verifyAll()}
          >
            ✅ Vérifier
          </button>

          <button
            className="hintButton"
            onClick={() => setShowHint(!showHint)}
          >
            💡 {showHint ? "Cacher l’aide" : "Afficher une aide"}
          </button>

          {showHint && result.isKnown && (
            <div className="hint">
              {result.isPronominal ? (
                <>
                  <p>
                    <strong>Étape 1:</strong> C’est un verbe pronominal. On garde le
                    pronom réfléchi:{" "}
                    <strong>{result.reflexivePronoun}</strong>.
                  </p>

                  <p>
                    <strong>Étape 2:</strong> Les verbes pronominaux utilisent{" "}
                    <strong>être</strong> au passé composé.
                  </p>

                  <p>
                    <strong>Étape 3:</strong> Avec{" "}
                    <strong>{result.visibleSubject}</strong>, il faut écrire{" "}
                    <strong>{result.expectedAuxInput}</strong>.
                  </p>

                  <p>
                    <strong>Étape 4:</strong> Le verbe de base est{" "}
                    <strong>{result.baseVerb}</strong>, donc le participe passé est{" "}
                    <strong>{result.finalParticiple}</strong>.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>Étape 1:</strong> Demande-toi si le verbe utilise{" "}
                    <strong>avoir</strong> ou <strong>être</strong>.
                  </p>

                  <p>
                    <strong>Étape 2:</strong> Conjugue cet auxiliaire au présent avec{" "}
                    <strong>{result.visibleSubject}</strong>.
                  </p>

                  <p>
                    <strong>Étape 3:</strong> Forme le participe passé:{" "}
                    <strong>-er → é</strong>,{" "}
                    <strong>-ir → i</strong>,{" "}
                    <strong>-re → u</strong>, sauf verbes irréguliers.
                  </p>

                  {result.auxiliary === "être" && (
                    <p>
                      <strong>Étape 4:</strong> Avec{" "}
                      <strong>être</strong>, accorde le participe passé avec le sujet.
                    </p>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </section>

      <footer className="footer">
        <Link href="/about" className="footerLink">
          À propos
        </Link>

        <Link href="/contact" className="footerLink">
          Contact
        </Link>

        <Link href="/privacy" className="footerLink">
          Confidentialité
        </Link>

        <Link href="/terms" className="footerLink">
          Conditions
        </Link>

        <Link href="/disclaimer" className="footerLink">
          Avertissement
        </Link>
      </footer>

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

        .errorCard {
          max-width: 760px;
          margin: 0 auto 24px;
          padding: 20px;
          border-radius: 24px;
          background: #fee2e2;
          border: 4px solid #ef4444;
          color: #991b1b;
          text-align: center;
          font-weight: 900;
          line-height: 1.5;
          box-shadow: 0 18px 40px rgba(15, 23, 42, 0.12);
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
        input:disabled,
        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
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

        .disabledCard {
          opacity: 0.72;
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
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        
        .verifyButton {
          background: linear-gradient(135deg, #16a34a, #22c55e);
        }

        .hintButton {
          background: linear-gradient(135deg, #f59e0b, #f97316);
        }

        .verbInputRow {
          display: flex;
          gap: 10px;
          align-items: stretch;
        }

        .verbInputRow input {
          flex: 1;
        }

        .randomButton {
          min-width: 160px;
          background: linear-gradient(135deg, #0891b2, #2563eb);
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

        @media (max-width: 600px) {
          .verbInputRow {
            flex-direction: column;
          }

        .randomButton {
          width: 100%;
        }
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

        @media (max-width: 850px) {
          .factoryLine {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
