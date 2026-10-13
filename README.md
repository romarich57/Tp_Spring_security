# TP progressif — Spring Security et API de gestion de tâches

Le dépôt contient une API Spring Boot et son client React, Planora. Le client métier est déjà en place : les étudiants font évoluer l’authentification et les autorisations du backend, en six étapes, tout en utilisant une vraie application.

## Démarrer

Prérequis : Java 17+, Maven 3.6.3+ et Node.js 20.19+ ou 22.12+.

Dans deux terminaux, depuis la racine :

    mvn spring-boot:run

    cd frontend
    npm install
    npm run dev

Ouvrez http://localhost:5173. Vite relaie les requêtes /api vers Spring Boot sur le port 8080. Après un changement de branche, redémarrez le backend.

## Application

Planora utilise les routes métier pour lister, créer, modifier, terminer et supprimer des tâches. Elle affiche aussi des statistiques calculées par l’API et une note confidentielle qui apparaît dans les dernières étapes. Les données sont conservées en mémoire et réinitialisées au redémarrage.

Le formulaire de connexion envoie HTTP Basic aux requêtes. Les identifiants restent dans la mémoire React. Les contrôles d’accès sont configurés côté Spring.

## Les six étapes

| Branche | Sujet |
| --- | --- |
| Tp_version1 | Observer une API métier ouverte |
| Tp_version2 | Ajouter Spring Security |
| Tp_version3 | Créer Alice USER et Bob ADMIN avec BCrypt |
| Tp_version4 | Configurer les autorisations HTTP |
| Tp_version5 | Protéger par méthode la ressource confidentielle déjà fournie |
| Tp_version6 | Valider l’ensemble avec les tests d’intégration |

Consultez [le support complet](Tp.md), ENONCE.md dans la branche courante, les guides de docs/ et le [guide Planora](frontend/README.md).

## Comptes de démonstration

Après l’exercice 3 (et dès le début des branches 4 à 6), Alice est alice / alice123 (USER) et Bob est bob / bob123 (ADMIN). Après l’ajout de la dépendance en exercice 2, Spring affiche un mot de passe temporaire pour l’utilisateur user. Ces comptes sont fictifs et réservés à l’apprentissage local.

## Support du TP

[Tp.md](Tp.md) est la source du support complet ; [Tp.pdf](Tp.pdf) est sa version imprimable et Tp.tex sa version LaTeX. Après une modification de Tp.md, régénérez les deux fichiers avec `bash scripts/compile-tp.sh` (Pandoc et XeLaTeX requis).
