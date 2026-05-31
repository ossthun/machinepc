import SiteLayout from "../components/SiteLayout";

export default function Privacy() {
  return (
    <SiteLayout title="Politique de confidentialité">
      <p>
        Ce site est conçu comme un outil éducatif simple. Il ne demande pas aux
        utilisateurs de créer un compte, de se connecter ou de fournir des
        informations personnelles.
      </p>
      <p>
        Le site ne collecte pas volontairement de données personnelles d’enfants.
        Il peut toutefois être hébergé par des services tiers, comme Vercel, qui
        peuvent traiter des données techniques nécessaires au fonctionnement du
        site, par exemple l’adresse IP, le type de navigateur ou des journaux
        d’accès.
      </p>
      <p>
        Les messages envoyés par email sont utilisés uniquement pour répondre aux
        demandes reçues.
      </p>
    </SiteLayout>
  );
}
