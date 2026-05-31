import SiteLayout from "../components/SiteLayout";

export default function About() {
  return (
    <SiteLayout title="À propos">
      <p>
        <strong>La machine à fabriquer le passé composé</strong> est un site
        éducatif simple pour aider les élèves à comprendre la formation du passé
        composé en français.
      </p>
      <p>
        Le site propose une machine automatique et un mode entraînement. L’objectif
        est de rendre visible le processus: choisir l’auxiliaire, le conjuguer,
        former le participe passé, puis vérifier l’accord si nécessaire.
      </p>
      <p>
        Le site est pensé pour les élèves, les parents et les enseignants qui
        souhaitent disposer d’un outil clair, rapide et ludique.
      </p>
    </SiteLayout>
  );
}
