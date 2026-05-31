import SiteLayout from "../components/SiteLayout";

export default function Page() {
  return (
    <SiteLayout title="Les verbes avec être">
      <p>
        Certains verbes forment le passé composé avec l’auxiliaire être. Ces
        verbes sont importants parce qu’ils demandent souvent un accord du
        participe passé.
      </p>
      <p>
        Exemples fréquents: aller, venir, arriver, partir, entrer, sortir,
        monter, descendre, naître, mourir, rester, tomber, retourner, devenir,
        revenir et rentrer.
      </p>
      <p>
        Exemples: je suis allé, elle est venue, nous sommes partis, elles sont
        arrivées.
      </p>
      <p>
        Avec être, le participe passé s’accorde avec le sujet: féminin singulier
        ajoute souvent <strong>-e</strong>, masculin pluriel ajoute{" "}
        <strong>-s</strong>, féminin pluriel ajoute <strong>-es</strong>.
      </p>
    </SiteLayout>
  );
}
