import SiteLayout from "../components/SiteLayout";

export default function Page() {
  return (
    <SiteLayout title="Comment former le participe passé">
      <p>
        Le participe passé est la deuxième partie du passé composé. Il vient
        après l’auxiliaire <strong>avoir</strong> ou <strong>être</strong>.
      </p>

      <h2>1. Les verbes en -er</h2>
      <p>
        Pour la plupart des verbes en <strong>-er</strong>, on enlève{" "}
        <strong>-er</strong> et on ajoute <strong>-é</strong>.
      </p>
      <p>
        manger → mangé, parler → parlé, regarder → regardé, grimper → grimpé
      </p>

      <h2>2. Les verbes en -ir</h2>
      <p>
        Pour beaucoup de verbes en <strong>-ir</strong>, on enlève{" "}
        <strong>-ir</strong> et on ajoute <strong>-i</strong>.
      </p>
      <p>finir → fini, choisir → choisi, réussir → réussi, grandir → grandi</p>

      <h2>3. Les verbes en -re</h2>
      <p>
        Pour beaucoup de verbes en <strong>-re</strong>, on enlève{" "}
        <strong>-re</strong> et on ajoute <strong>-u</strong>.
      </p>
      <p>vendre → vendu, attendre → attendu, répondre → répondu</p>

      <h2>4. Les verbes en -oir</h2>
      <p>
        Les verbes en <strong>-oir</strong> sont souvent irréguliers. Il faut
        souvent apprendre leur participe passé par cœur.
      </p>
      <p>
        voir → vu, vouloir → voulu, pouvoir → pu, devoir → dû, recevoir → reçu
      </p>

      <h2>5. Les participes passés irréguliers</h2>
      <p>
        Certains verbes très fréquents ont un participe passé irrégulier.
      </p>
      <p>
        faire → fait, prendre → pris, mettre → mis, écrire → écrit, lire → lu,
        dire → dit, ouvrir → ouvert, être → été, avoir → eu
      </p>
    </SiteLayout>
  );
}
