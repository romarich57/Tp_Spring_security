# Parcours pédagogique — 60 minutes

L’application Planora et son contrat de gestion des tâches sont déjà en place. Le TP fait évoluer le backend Spring par étapes ; les branches sont des points de départ successifs et autonomes.

| Branche | Exercice | Évolution du backend |
| --- | --- | --- |
| Tp_version1 | Observer les accès ouverts (10 min) | CRUD en mémoire et statistiques accessibles anonymement |
| Tp_version2 | Ajouter Spring Security (10 min) | Protection automatique de toutes les routes |
| Tp_version3 | Déclarer les comptes (15 min) | Alice USER, Bob ADMIN et mots de passe BCrypt |
| Tp_version4 | Configurer les droits HTTP (10 min) | Tâches authentifiées, statistiques ADMIN, info publique et CSRF adapté à l’API stateless |
| Tp_version5 | Protéger une méthode (10 min) | Note confidentielle réservée à ADMIN par @PreAuthorize |
| Tp_version6 | Valider (5 min) | Implémentation complète et tests d’intégration |

## Lancer une étape

    git switch Tp_version3
    mvn spring-boot:run

Dans un autre terminal :

    cd frontend
    npm install
    npm run dev

Ouvrez http://localhost:5173. Après un changement de branche, redémarrez le backend.

## API métier

| Méthode | Route | Opération |
| --- | --- | --- |
| GET | /api/tasks | Lister les tâches |
| POST | /api/tasks | Créer une tâche |
| PUT | /api/tasks/{id} | Modifier une tâche |
| PATCH | /api/tasks/{id}/complete | Terminer une tâche |
| DELETE | /api/tasks/{id} | Supprimer une tâche |
| GET | /api/admin/stats | Consulter les statistiques |
| GET | /api/tasks/confidential | Lire la note interne à partir de l’exercice 5 |
| GET | /api/public/info | Lire l’information publique |

Les tâches, leur état et leur priorité sont stockés en mémoire. Un redémarrage du backend restaure les données de démonstration.

## Comptes de démonstration

- À la version 2, Spring génère un compte temporaire et affiche son mot de passe dans la console.
- À partir de la version 3, Alice utilise alice / alice123 avec le rôle USER.
- À partir de la version 3, Bob utilise bob / bob123 avec le rôle ADMIN.

Ces identifiants sont fictifs et destinés uniquement à l’exécution locale du TP.

## Résultat attendu à la fin

| Ressource | Anonyme | Alice USER | Bob ADMIN |
| --- | ---: | ---: | ---: |
| Informations publiques | 200 | 200 | 200 |
| Tâches | 401 | 200 | 200 |
| Statistiques | 401 | 403 | 200 |
| Note confidentielle | 401 | 403 | 200 |

Les scénarios détaillés avant et après chaque exercice sont dans SCENARIOS_DE_TEST.md.

À l’exercice 4, désactivez CSRF dans SecurityFilterChain : le client est une API stateless qui transmet HTTP Basic dans l’en-tête Authorization et n’utilise pas de cookie de session. Cela permet aux opérations POST, PUT, PATCH et DELETE authentifiées de fonctionner.
