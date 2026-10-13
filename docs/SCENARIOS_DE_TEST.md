# Scénarios de l’application

La même interface React pilote les vraies opérations métier sur les six branches. Le backend change les réponses selon le travail de sécurité déjà effectué.

## Fonctionnalités métier

| Action dans Planora | Requête vers Spring | Réponse habituelle |
| --- | --- | --- |
| Ouvrir la liste | GET /api/tasks | 200 et tableau JSON |
| Créer | POST /api/tasks | 201 et tâche créée |
| Modifier | PUT /api/tasks/{id} | 200 et tâche modifiée |
| Terminer | PATCH /api/tasks/{id}/complete | 200 et tâche terminée |
| Supprimer | DELETE /api/tasks/{id} | 204 |
| Ouvrir les statistiques | GET /api/admin/stats | 200 et valeurs calculées |
| Ouvrir le projet confidentiel | GET /api/tasks/confidential | Disponible en version 5 |

Les tâches sont conservées en mémoire et réinitialisées au redémarrage de Spring Boot.

## Codes d’accès attendus après chaque exercice

| Route | Version 1 | Version 2 | Version 3 | Version 4 | Version 5/6 |
| --- | --- | --- | --- | --- | --- |
| GET /api/public/info | 200 anonyme | 401 avant correction, puis 200 | 401 avant correction, puis 200 | 200 anonyme | 200 anonyme |
| /api/tasks et opérations | Accès anonyme | 401 avant correction, puis authentifié | Authentifié, tous les comptes | Authentifié | Authentifié |
| GET /api/admin/stats | Accès anonyme | 401 avant correction, puis authentifié | Tout compte authentifié | ADMIN seulement | ADMIN seulement |
| GET /api/tasks/confidential | 404 | 404 | 404 | 404 | Alice 403, Bob 200 après correction |

En version 2, Spring Security protège toutes les routes par défaut : une fois la dépendance ajoutée, même l’information publique demande une authentification jusqu’à l’exercice 4.

En versions 2 et 3, les requêtes GET fonctionnent avec une identité valide, mais la protection CSRF par défaut peut refuser les mutations HTTP Basic avec 403. L’exercice 4 désactive CSRF pour cette API stateless, puis garde l’authentification et les rôles pour contrôler les accès.

## Matrice finale

| Route | Anonyme | Alice USER | Bob ADMIN |
| --- | ---: | ---: | ---: |
| GET /api/public/info | 200 | 200 | 200 |
| GET /api/tasks | 401 | 200 | 200 |
| POST /api/tasks | 401 | 201 | 201 |
| GET /api/admin/stats | 401 | 403 | 200 |
| GET /api/tasks/confidential | 401 | 403 | 200 |

401 indique que l’authentification est absente ou invalide. 403 indique que l’identité est reconnue mais que son rôle ne permet pas l’accès.

## Vérification depuis l’interface

Ouvrez Mes tâches pour créer, modifier, terminer ou supprimer une tâche. Connectez-vous ensuite comme Alice ou Bob et ouvrez Statistiques ou Projet confidentiel. Planora affiche les réponses et les messages reçus de Spring ; le serveur reste la seule autorité qui accorde ou refuse l’accès.
