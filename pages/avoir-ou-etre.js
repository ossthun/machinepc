import SiteLayout from "../components/SiteLayout";

export default function Page() {
  return (
    <SiteLayout title="Avoir ou être au passé composé">
      <p>
        Pour former le passé composé, il faut d’abord choisir le bon auxiliaire.
        Dans la majorité des cas, on utilise <strong>avoir</strong>: j’ai mangé,
        tu as fini, nous avons vendu.
      </p>
      <p>
        Certains verbes utilisent <strong>être</strong>. Ce sont souvent des
        verbes liés au déplacement ou à un changement d’état: aller, venir,
        arriver, partir, entrer, sortir, monter, descendre, naître, mourir,
        rester, tomber, retourner.
      </p>
      <p>
        Avec être, il faut aussi faire attention à l’accord du participe passé:
        il est allé, elle est allée, ils sont allés, elles sont allées.
      </p>
      <p>
        Une bonne méthode consiste à poser deux questions: le verbe est-il dans
        la liste des verbes avec être ? Le sujet est-il masculin, féminin,
        singulier ou pluriel ?
      </p>
    </SiteLayout>
  );
}
