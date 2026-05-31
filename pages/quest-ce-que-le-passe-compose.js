import SiteLayout from "../components/SiteLayout";

export default function Page() {
  return (
    <SiteLayout title="Qu’est-ce que le passé composé ?">
      <p>
        Le passé composé est un temps très fréquent en français. Il sert à parler
        d’une action terminée dans le passé. Par exemple: <strong>j’ai mangé</strong>,
        <strong> tu as parlé</strong>, <strong>elle est arrivée</strong>.
      </p>
      <p>
        Il s’appelle “passé composé” parce qu’il est composé de deux éléments:
        un auxiliaire et un participe passé.
      </p>
      <p>
        Les deux auxiliaires possibles sont <strong>avoir</strong> et{" "}
        <strong>être</strong>. La plupart des verbes utilisent avoir. Certains
        verbes de déplacement ou de changement d’état utilisent être, par exemple
        aller, venir, arriver, partir ou tomber.
      </p>
      <p>
        La structure de base est donc: sujet + auxiliaire au présent + participe
        passé. Comprendre cette structure est la clé pour réussir ce temps.
      </p>
    </SiteLayout>
  );
}
