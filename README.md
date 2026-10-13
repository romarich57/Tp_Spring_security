# TP Spring Security — Version 4 / 6

**Exercice 4 : donner à chaque endpoint sa politique d'accès.**

Cette branche est un point de reprise autonome. Elle inclut toutes les solutions antérieures, **mais pas celle de l'exercice en cours** (sauf la version 6, intégralement corrigée).

## Démarrage

Java 17+, Maven 3.6.3+, terminal et Postman ou curl.

```bash
git clone https://github.com/romarich57/Tp_Spring_security.git
cd Tp_Spring_security
git switch Tp_version4
mvn clean test
mvn spring-boot:run
```

- [Consignes](ENONCE.md)
- [Plan de progression](docs/PLAN_DU_TP.md)
- [Guide des appels HTTP](docs/GUIDE_HTTP.md)
- [Corrections précédentes](docs/corrections/)
- [Requêtes HTTP prêtes à l'emploi](requests.http)

Comptes de démonstration : `alice / alice123` (USER), `bob / bob123` (ADMIN).
**Local uniquement : ne pas utiliser ces identifiants ou HTTP Basic sans HTTPS en production.**

## Interface React — disponible dès cette étape

L'interface interactive montre les **vrais statuts HTTP**. Elle est adaptée à la branche `Tp_version4` (voir `frontend/src/version.js`).

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
