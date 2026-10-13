# Planora — interface du TP Spring Security

**TP réalisé par :** Heitz Romaric, Khiri Amine, Benali Syrine, Van-Rossen-Martinez Alessandra et Denocq Elio.

Planora est une application de gestion de tâches déjà fonctionnelle côté React. Le TP porte sur le backend Spring : les étudiants font évoluer l’authentification et les autorisations pendant que l’interface consomme la même API métier.

## Démarrer

Dans deux terminaux, depuis la racine du dépôt :

    mvn spring-boot:run

    cd frontend
    npm install
    npm run dev

Ouvrez http://localhost:5173. Prérequis : Java 17+ et Node.js 20.19+ ou 22.12+.

Vite relaie les appels /api vers Spring Boot sur localhost:8080. L’interface et le backend se servent donc de la même origine dans le navigateur.

## Ce que l’application utilise

- GET /api/tasks pour afficher les tâches.
- POST /api/tasks pour créer une tâche.
- PUT /api/tasks/{id} pour modifier son titre, sa description, son état, sa priorité ou son échéance.
- PATCH /api/tasks/{id}/complete pour la terminer.
- DELETE /api/tasks/{id} pour la supprimer.
- GET /api/admin/stats pour afficher les indicateurs calculés à partir des tâches.
- GET /api/tasks/confidential, disponible à partir de l’exercice 5, pour lire la note du projet.

Les tâches sont conservées en mémoire par Spring. Elles sont réinitialisées au redémarrage du backend.

## Connexion pédagogique

Le formulaire transmet le nom et le mot de passe en HTTP Basic à chaque requête et les conserve uniquement dans l’état React. Ils ne sont écrits ni dans un cookie, ni dans localStorage ou sessionStorage. Le bouton de déconnexion efface l’état mémoire.

- Après l’ajout de Spring Security en exercice 2 : utilisez user et le mot de passe temporaire affiché par Spring Boot.
- Après avoir complété UserConfig en exercice 3, et dès le début des branches 4 à 6 : Alice (alice / alice123) a le rôle USER ; Bob (bob / bob123) a le rôle ADMIN.

Les contrôles d’accès restent exclusivement dans Spring Security. L’interface affiche les réponses du serveur, dont 401 pour une authentification absente ou invalide et 403 pour un refus de sécurité, notamment un rôle insuffisant ou, avant l’exercice 4, un jeton CSRF absent. En version 1, les identifiants ne sont pas encore vérifiés puisque l’API est ouverte.

Après l’exercice 4, la chaîne est sans état et désactive CSRF pour le client fourni, qui envoie explicitement Authorization avec credentials: "omit". C’est un choix du TP local : HTTP Basic ou STATELESS ne suppriment pas à eux seuls le risque CSRF. Avant cette correction, les mutations sans jeton répondent 403 même avec un compte valide.

## Parcours des branches

La même interface est présente dans les six branches. Les règles de l’API évoluent :

| Version | Comportement attendu après l’exercice |
| --- | --- |
| 1 | Tâches et statistiques accessibles sans connexion |
| 2 | Spring Security par défaut demande une authentification |
| 3 | Alice et Bob existent, mais tout compte authentifié peut accéder aux routes |
| 4 | Tâches réservées aux comptes connectés, statistiques réservées à ADMIN |
| 5 | La note confidentielle reçoit aussi une protection par méthode |
| 6 | Parcours complet et tests d’intégration actifs |

Après git switch, arrêtez puis relancez Spring Boot afin que la JVM charge le code de la branche sélectionnée.

## Contrat de tâche

Une tâche contient id, title, description, status (TODO, IN_PROGRESS, DONE), priority (LOW, MEDIUM, HIGH), dueDate et assignee. Le formulaire envoie title, description, status, priority et dueDate. L’assignation est affichée mais non éditable dans React ; le serveur conserve assignee si ce champ est absent lors d’une modification. L’API permet aussi de le fournir directement. L’information publique se consulte avec curl : aucun écran Planora ne l’appelle.
