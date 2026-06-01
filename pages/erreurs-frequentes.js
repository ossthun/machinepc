import SiteLayout from "../components/SiteLayout";

export default function Page() {
  return (
    <SiteLayout title="Erreurs fréquentes au passé composé">
      <p>
        Une erreur fréquente est de choisir le mauvais auxiliaire. Beaucoup
        d’élèves écrivent par exemple <strong>j’ai allé</strong>, alors que la
        forme correcte est <strong>je suis allé</strong>.
      </p>

      <p>
        Une deuxième erreur consiste à oublier l’accord avec être:{" "}
        <strong>elle est allé</strong> doit devenir{" "}
        <strong>elle est allée</strong>.
      </p>

      <p>
        Une troisième erreur concerne les participes passés irréguliers. On ne
        dit pas <strong>j’ai prendu</strong>, mais <strong>j’ai pris</strong>.
      </p>

      <p>
        Enfin, il faut faire attention à l’élision: avec <strong>je + ai</strong>,
        on écrit <strong>j’ai</strong>, pas <strong>je ai</strong>.
      </p>

      <h2>Erreurs avec les verbes pronominaux</h2>

      <p>
        Les verbes pronominaux sont souvent difficiles parce qu’il faut garder le
        pronom réfléchi: <strong>me</strong>, <strong>te</strong>,{" "}
        <strong>se</strong>, <strong>nous</strong> ou <strong>vous</strong>.
      </p>

      <p>
        Une erreur très fréquente est d’écrire: <strong>Il s’a levé.</strong>
        Cette phrase est fausse. Avec un verbe pronominal, on utilise{" "}
        <strong>être</strong>, pas <strong>avoir</strong>. La forme correcte est:
        <strong> Il s’est levé.</strong>
      </p>

      <p>
        Même chose avec <strong>elle</strong>: on n’écrit pas{" "}
        <strong>Elle s’a réveillée</strong>, mais{" "}
        <strong>Elle s’est réveillée</strong>.
      </p>

      <p>
        Avec <strong>je</strong>, il faut aussi faire attention à la forme du
        pronom: on écrit <strong>je me suis levé</strong> ou{" "}
        <strong>je me suis levée</strong>, pas <strong>je m’ai levé</strong>.
      </p>

      <p>
        Avec <strong>tu</strong>, la bonne forme est{" "}
        <strong>tu t’es levé</strong> ou <strong>tu t’es levée</strong>, pas{" "}
        <strong>tu t’as levé</strong>.
      </p>

      <p>
        Avec <strong>nous</strong>, on écrit{" "}
        <strong>nous nous sommes couchés</strong>, pas{" "}
        <strong>nous nous avons couchés</strong>.
      </p>

      <p>
        Avec <strong>vous</strong>, on écrit{" "}
        <strong>vous vous êtes préparés</strong>, pas{" "}
        <strong>vous vous avez préparés</strong>.
      </p>

      <h2>Tableau des erreurs fréquentes</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Forme fausse</th>
            <th style={styles.th}>Forme correcte</th>
            <th style={styles.th}>Explication</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td style={styles.bad}>Il s’a levé.</td>
            <td style={styles.good}>Il s’est levé.</td>
            <td style={styles.td}>Verbe pronominal: auxiliaire être.</td>
          </tr>

          <tr>
            <td style={styles.bad}>Elle s’a réveillée.</td>
            <td style={styles.good}>Elle s’est réveillée.</td>
            <td style={styles.td}>On utilise être avec se réveiller.</td>
          </tr>

          <tr>
            <td style={styles.bad}>Je m’ai lavé.</td>
            <td style={styles.good}>Je me suis lavé / lavée.</td>
            <td style={styles.td}>Avec je: me + suis.</td>
          </tr>

          <tr>
            <td style={styles.bad}>Tu t’as habillé.</td>
            <td style={styles.good}>Tu t’es habillé / habillée.</td>
            <td style={styles.td}>Avec tu: te devient t’ devant es.</td>
          </tr>

          <tr>
            <td style={styles.bad}>Nous nous avons levés.</td>
            <td style={styles.good}>Nous nous sommes levés.</td>
            <td style={styles.td}>Avec nous: nous sommes.</td>
          </tr>

          <tr>
            <td style={styles.bad}>Vous vous avez préparés.</td>
            <td style={styles.good}>Vous vous êtes préparés.</td>
            <td style={styles.td}>Avec vous: vous êtes.</td>
          </tr>
        </tbody>
      </table>

      <h2>Attention à l’accord</h2>

      <p>
        Avec les verbes pronominaux simples, le participe passé s’accorde souvent
        avec le sujet:
      </p>

      <p>
        <strong>Il s’est levé.</strong>
        <br />
        <strong>Elle s’est levée.</strong>
        <br />
        <strong>Ils se sont levés.</strong>
        <br />
        <strong>Elles se sont levées.</strong>
      </p>

      <p>
        Mais certains cas sont plus avancés. Par exemple, on écrit{" "}
        <strong>Elle s’est lavée</strong>, mais{" "}
        <strong>Elle s’est lavé les mains</strong>. Dans la deuxième phrase, on
        n’accorde pas <strong>lavé</strong> avec <strong>elle</strong>, parce que
        le complément direct <strong>les mains</strong> est placé après le verbe.
      </p>

      <p>
        Pour éviter les erreurs au début, retiens cette formule:{" "}
        <strong>pronom réfléchi + être + participe passé</strong>.
      </p>
    </SiteLayout>
  );
}

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    margin: "24px 0",
    fontSize: "1rem",
  },

  th: {
    textAlign: "left",
    padding: "12px",
    borderBottom: "2px solid #cbd5e1",
    color: "#172033",
    background: "#f8fafc",
  },

  td: {
    padding: "12px",
    borderBottom: "1px solid #e2e8f0",
    verticalAlign: "top",
  },

  bad: {
    padding: "12px",
    borderBottom: "1px solid #e2e8f0",
    verticalAlign: "top",
    color: "#991b1b",
    fontWeight: 900,
  },

  good: {
    padding: "12px",
    borderBottom: "1px solid #e2e8f0",
    verticalAlign: "top",
    color: "#166534",
    fontWeight: 900,
  },
};
