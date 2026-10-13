# Interface React — Spring Security Lab

Une **interface React/Vite** accompagne chacun des six exercices de ce TP. Elle effectue de **vraies requêtes** vers les endpoints Spring Boot et affiche les codes HTTP reçus. Aucun résultat n'est simulé.

## Démarrage (2 terminaux)

**Terminal 1, dans la racine du dépôt :**
```bash
mvn spring-boot:run
```

**Terminal 2, dans la racine du dépôt :**
```bash
cd frontend
npm install
npm run dev
```

Ouvrez **http://localhost:5173**. Il faut **Node.js 22 recommandé** (ou Node 20.19+) et Java 17+.

Vite agit comme proxy : `http://localhost:5173/api/...` est retransmis à `http://127.0.0.1:8080/api/...`. Vous n'avez pas à modifier CORS ni la configuration de Spring Security. Cette séparation garantit que l'interface reste accessible même quand l'exercice 2 protège toutes les URLs Spring Boot par défaut.

## Fonctionnalités

- Une interface liée à la branche courante (`frontend/src/version.js`).
- Des consignes et une checklist spécifiques à chaque exercice.
- Les vraies requêtes **GET** contre les routes publiques, tâches, admin et (à partir de l'étape 5) confidentielles.
- Un sélecteur d'identité : anonyme, Alice USER, Bob ADMIN, ou utilisateur personnalisé (par exemple `user` et le mot de passe généré dans la console de Spring Security).
- La matrice des réponses HTTP pour **Anonyme**, **Alice** et **Bob**.
- Les étapes GitHub et un bouton pour copier la commande `git switch Tp_versionN`.

## Répartition du travail

- **React** (dans `frontend/`) : affichage et construction des requêtes de test.
- **Controllers Spring** : transport HTTP et routes.
- **Services Spring** : données de démonstration.
- **UserConfig** : utilisateurs en mémoire et BCrypt.
- **SecurityConfig** : autorisations HTTP et méthodes.

**Ne modifiez pas React pour corriger une faille de sécurité** : les contrôles d'accès doivent être appliqués côté backend. Les étudiants modifient les fichiers indiqués dans `ENONCE.md`.

## Sécurité

Les comptes `alice/alice123` et `bob/bob123` sont fictifs. Les mots de passe ne sont conservés **qu'en mémoire React** (pas de cookies ni localStorage). Le navigateur envoie explicitement un en-tête HTTP Basic lors des requêtes d'essai. Ce montage sert uniquement à l'apprentissage en local, jamais à un usage en production.

## Vérifier le frontend

```bash
cd frontend
npm install
npm test
npm run build
```

La CI GitHub Actions exécute ces vérifications et `mvn verify` sur chaque branche.

## Passer à l'exercice suivant

Un clic dans la navigation React ouvre le code GitHub, mais **ne change pas votre branche Git locale**.

1. Arrêtez le backend et le serveur Vite (`Ctrl+C`).
2. Depuis la racine, exécutez `git fetch origin` puis `git switch Tp_versionN` (remplacez N par la prochaine version).
3. Redémarrez `mvn spring-boot:run` puis `cd frontend && npm run dev`.
4. Rejouez les appels pour vérifier les nouveaux codes HTTP.

**Important :** changer de branche pendant que Java tourne ne recharge pas les classes déjà lancées. Vous risquez sinon d'observer l'interface de la nouvelle version contre le backend de l'ancienne version.

## Comprendre les profils et réponses

- Aux versions 1 à 3, Alice et Bob ne sont pas encore déclarés dans l'état initial du backend. Leurs boutons permettent de voir le comportement avant leur création.
- À l'exercice 2, choisissez « Personnalisé » pour essayer `user` et le mot de passe affiché dans la console **après** l'ajout de Spring Security.
- En version 5, la route `/api/tasks/confidential` est encore à créer : elle peut renvoyer **404** après authentification. Cela fait partie de l'exercice, ce n'est pas un bug React.
- Les étiquettes « Cible » décrivent les droits **à obtenir**, non l'état actuel de sécurité.
- Le témoin « Mode local » ne certifie pas que Spring Boot est démarré : les appels de test le déterminent réellement.

Tableaux de référence : [docs/SCENARIOS_DE_TEST.md](../docs/SCENARIOS_DE_TEST.md).
