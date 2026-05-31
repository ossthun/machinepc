import SiteLayout from "../components/SiteLayout";

export default function Disclaimer() {
  return (
    <SiteLayout title="Avertissement">
      <p>
        Ce site est un outil pédagogique. Il ne remplace pas un cours de français,
        un manuel scolaire ou la correction d’un enseignant.
      </p>
      <p>
        Les formes du passé composé sont générées à partir de règles simplifiées
        et d’une liste de verbes irréguliers. Certains verbes rares ou cas
        particuliers peuvent ne pas encore être traités correctement.
      </p>
      <p>
        Le site vise à aider les élèves à comprendre le mécanisme général du
        passé composé, mais les contenus importants doivent toujours être vérifiés.
      </p>
    </SiteLayout>
  );
}
