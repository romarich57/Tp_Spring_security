# TP Spring Security — Version 2 / 6

**Exercice 2 : ajouter Spring Security au projet.** L'exercice 1 est corrige dans `docs/corrections/EXERCICE_1.md`.

```bash
git switch Tp_version2
mvn clean test
mvn spring-boot:run
```

## Ou coder ?

Ouvrez `pom.xml` : **TODO EXERCICE 2** vous indique ou ajouter la dependance Spring Security.

- [Enonce](ENONCE.md)
- [Architecture et responsabilites](docs/ARCHITECTURE.md)
- [Corrige de l'exercice 1](docs/corrections/EXERCICE_1.md)
- [Plan des versions](docs/PLAN_DU_TP.md)
- [Guide HTTP](docs/GUIDE_HTTP.md)

**Important :** `mvn test` doit fonctionner avant et apres l'ajout de la dependance. Les tests de l'authentification apparaitront a la version 3.

## Interface React — disponible dès cette étape

L'interface interactive montre les **vrais statuts HTTP**. Elle est adaptée à la branche `Tp_version2` (voir `frontend/src/version.js`).

**Terminal 1 — à la racine du dépôt :**

```bash
mvn spring-boot:run
```

**Terminal 2 — à la racine du dépôt :**

```bash
cd frontend
npm install
npm run dev
```

Ouvrir **http://localhost:5173**. Prérequis supplémentaires : **Node.js 22 recommandé**.

⚠️ **Après un changement de branche, arrêter puis relancer Spring Boot** : l'ancienne JVM ne charge pas automatiquement les nouveaux fichiers Java.

- [Guide de l'interface React](frontend/README.md)
- [Scénarios attendus pour chaque version](docs/SCENARIOS_DE_TEST.md)
- [Plan et tests d'acceptation du TP](docs/PLAN_DU_TP.md)
