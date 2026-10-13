# TP corrigé — Validation du parcours complet

La branche Tp_version6 contient le gestionnaire de tâches Planora et la configuration Spring Security finale. Les tests d’intégration exercent les vraies routes de l’application, y compris ses mutations CRUD.

## Politique finale

| Opération | Anonyme | Alice USER | Bob ADMIN |
| --- | ---: | ---: | ---: |
| GET /api/public/info | 200 | 200 | 200 |
| GET /api/tasks | 401 | 200 | 200 |
| POST /api/tasks | 401 | 201 | 201 |
| PUT /api/tasks/{id} | 401 | 200 | 200 |
| PATCH /api/tasks/{id}/complete | 401 | 200 | 200 |
| DELETE /api/tasks/{id} | 401 | 204 | 204 |
| GET /api/admin/stats | 401 | 403 | 200 |
| GET /api/tasks/confidential | 401 | 403 | 200 |

Alice et Bob peuvent gérer les tâches. Le rôle ADMIN est requis pour les statistiques et la note confidentielle.

## Vérifier

Exécutez mvn clean verify à la racine. Les tests couvrent les routes publiques, l’authentification, les rôles, les mutations CRUD, les statistiques calculées et la protection de méthode.

Dans Planora, parcourez la liste, créez ou modifiez une tâche, terminez-la, puis ouvrez Statistiques et Projet confidentiel avec Alice et Bob.

## Questions de synthèse

- Quelle différence entre 401 et 403 ?
- Pourquoi un chemin contenant admin ne suffit-il pas à autoriser un rôle ?
- Quel rôle joue SecurityFilterChain ?
- Pourquoi BCrypt est-il utilisé pour les mots de passe ?
- Pourquoi @PreAuthorize nécessite-t-il @EnableMethodSecurity ?
- Pourquoi CSRF est-il désactivé pour cette API HTTP Basic sans état ?
- Pourquoi HTTP Basic ne convient-il pas à de vrais secrets sur HTTP non chiffré ?
