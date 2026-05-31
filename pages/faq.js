import SiteLayout from "../components/SiteLayout";

export default function Page() {
  return (
    <SiteLayout title="Questions fréquentes">
      <h2>Pourquoi dit-on “j’ai mangé” ?</h2>
      <p>
        Parce que le verbe manger utilise l’auxiliaire avoir au passé composé.
      </p>

      <h2>Pourquoi dit-on “je suis allé” ?</h2>
      <p>
        Parce que le verbe aller fait partie des verbes qui utilisent l’auxiliaire
        être.
      </p>

      <h2>Pourquoi écrit-on “elle est allée” ?</h2>
      <p>
        Avec être, le participe passé s’accorde avec le sujet. “Elle” est féminin
        singulier, donc on ajoute souvent un -e.
      </p>

      <h2>Le site connaît-il tous les verbes ?</h2>
      <p>
        Pas encore. Le site utilise des règles simples et une liste de verbes
        irréguliers fréquents. Des améliorations peuvent être ajoutées plus tard.
      </p>
    </SiteLayout>
  );
}
