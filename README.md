# TP Spring Security — Version 1 / 6

**Exercice 1 : reperer une faille de securite dans une API REST volontairement ouverte.**

## Demarrer

Prerequis : Java 17+ et Maven 3.6.3+.

```bash
git clone https://github.com/romarich57/Tp_Spring_security.git
cd Tp_Spring_security
git switch Tp_version1
mvn clean test
mvn spring-boot:run
```

Tester les GET :
```bash
curl -i http://localhost:8080/api/public/info
curl -i http://localhost:8080/api/tasks
curl -i http://localhost:8080/api/admin/stats
```

## Parcours

- **[Enonce](ENONCE.md)** et **[feuille de reponses](docs/reponses/EXERCICE_1_A_COMPLETER.md)** : a remplir sans modifier le code.
- [Architecture et emplacement de chaque TODO](docs/ARCHITECTURE.md)
- [Plan des six branches](docs/PLAN_DU_TP.md)
- [Aide aux appels HTTP](docs/GUIDE_HTTP.md)

Lorsque l'exercice est termine, la branche `Tp_version2` apporte sa correction Markdown et lance l'exercice 2.

**API fictive vulnerable volontairement. A ne pas deployer en production.**

## Interface React — disponible dès cette étape

L'interface interactive montre les **vrais statuts HTTP**. Elle est adaptée à la branche `Tp_version1` (voir `frontend/src/version.js`).

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
