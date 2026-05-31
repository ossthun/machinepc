import SiteLayout from "../components/SiteLayout";

export default function Page() {
  return (
    <SiteLayout title="Comment former le participe passé">
      <p>
        Le participe passé est la deuxième partie du passé composé. Pour les
        verbes réguliers, il existe des règles simples.
      </p>
      <p>
        Les verbes en <strong>-er</strong> font souvent leur participe passé en{" "}
        <strong>-é</strong>: manger → mangé, parler → parlé, regarder → regardé.
      </p>
      <p>
        Les verbes en <strong>-ir</strong> font souvent leur participe passé en{" "}
        <strong>-i</strong>: finir → fini, choisir → choisi, réussir → réussi.
      </p>
      <p>
        Les verbes en <strong>-re</strong> font souvent leur participe passé en{" "}
        <strong>-u</strong>: vendre → vendu, attendre → attendu, répondre → répondu.
      </p>
      <p>
        Mais il existe aussi beaucoup de participes passés irréguliers: faire →
        fait, prendre → pris, voir → vu, écrire → écrit, lire → lu.
      </p>
    </SiteLayout>
  );
}
