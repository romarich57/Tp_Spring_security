# TP Spring Security — Version 3 / 6

**Exercice 3 : ajouter Alice et Bob avec un PasswordEncoder.**

Cette branche contient les corrections des exercices 1 à 2, et le code **avant** la résolution de l'exercice 3.

## Démarrage

Pré-requis : **Java 17+**, **Maven 3.6.3+**, curl ou Postman.

```bash
git clone https://github.com/romarich57/Tp_Spring_security.git
cd Tp_Spring_security
git switch Tp_version3
mvn clean test
mvn spring-boot:run
```

- [Consignes de l'étape](ENONCE.md)
- [Plan complet](docs/PLAN_DU_TP.md)
- [Guide de test HTTP](docs/GUIDE_HTTP.md)
- Corrections précédentes : `docs/corrections/`.
- Requêtes : `requests.http`.

**Ne pas déployer en production.** Comptes et données entièrement fictifs.

## Interface React — disponible dès cette étape

L'interface interactive montre les **vrais statuts HTTP**. Elle est adaptée à la branche `Tp_version3` (voir `frontend/src/version.js`).

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
