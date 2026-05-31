import SiteLayout from "../components/SiteLayout";

export default function Page() {
  return (
    <SiteLayout title="Erreurs fréquentes au passé composé">
      <p>
        Une erreur fréquente est de choisir le mauvais auxiliaire. Beaucoup
        d’élèves écrivent par exemple “j’ai allé”, alors que la forme correcte
        est <strong>je suis allé</strong>.
      </p>
      <p>
        Une deuxième erreur consiste à oublier l’accord avec être: “elle est
        allé” doit devenir <strong>elle est allée</strong>.
      </p>
      <p>
        Une troisième erreur concerne les participes passés irréguliers. On ne
        dit pas “j’ai prendu”, mais <strong>j’ai pris</strong>.
      </p>
      <p>
        Enfin, il faut faire attention à l’élision: avec je + ai, on écrit{" "}
        <strong>j’ai</strong>, pas “je ai”.
      </p>
    </SiteLayout>
  );
}
