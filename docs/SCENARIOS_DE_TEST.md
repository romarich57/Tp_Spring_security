# Scénarios de l’application

La même interface Planora consomme les vraies routes métier sur les six branches. Chaque branche est le **point de départ** de son exercice ; la branche 6 est la solution finale.

## Fonctionnalités métier

| Action | Requête | Succès pour une requête autorisée et valide |
| --- | --- | --- |
| Lister | GET /api/tasks | 200, tableau JSON |
| Créer | POST /api/tasks | 201, tâche JSON |
| Modifier | PUT /api/tasks/{id} | 200, tâche JSON |
| Terminer | PATCH /api/tasks/{id}/complete | 200, tâche JSON |
| Supprimer | DELETE /api/tasks/{id} | 204, sans corps |
| Statistiques | GET /api/admin/stats | 200, objet calculé |
| Projet confidentiel | GET /api/tasks/confidential | 200, objet fourni dès la branche 5 |
| Information publique (curl) | GET /api/public/info | 200, texte |

Les tâches sont partagées par l’équipe et réinitialisées au redémarrage de Spring. Une mutation invalide renvoie 400 ; un identifiant de tâche absent renvoie 404 si l’appel franchit la sécurité.

## État initial des branches

| Branche | Accès aux lectures existantes | Mutations sans jeton CSRF | Projet confidentiel |
| --- | --- | --- | --- |
| 1 | Anonyme autorisé | Anonyme autorisé | Absent |
| 2 | Anonyme autorisé, dépendance à ajouter | Anonyme autorisé | Absent |
| 3 | Compte user généré ; anonyme 401 | 403 avec ou sans compte | Absent |
| 4 | Alice et Bob lisent toutes les routes ; anonyme 401 | 403 avec ou sans compte | Absent |
| 5 | Information publique ouverte ; tâches authentifiées ; stats ADMIN | Autorisées avec Alice ou Bob | Alice et Bob 200, anonyme 401 |
| 6 | Règles finales | Autorisées avec Alice ou Bob | Alice 403, Bob 200, anonyme 401 |

Une route absente renvoie 404 **si les filtres autorisent l’appel**. Aux branches 3 et 4, un appel anonyme à la note reçoit donc 401 ; utilisez un compte valide pour constater le 404.

## Résultat après chaque exercice

- Exercice 1 : constater le CRUD et les statistiques ouverts.
- Exercice 2 : la dépendance protège toutes les lectures, y compris l’information publique ; user et son mot de passe généré permettent les lectures. Les mutations sans jeton CSRF répondent 403, y compris anonymement.
- Exercice 3 : Alice et Bob remplacent user ; les deux peuvent lire les statistiques. La protection CSRF par défaut demeure.
- Exercice 4 : information publique ouverte, tâches authentifiées, statistiques ADMIN ; les mutations JSON fonctionnent avec un compte valide grâce au choix CSRF du TP local.
- Exercice 5 : la route confidentielle déjà fournie est réservée à ADMIN par @PreAuthorize et @EnableMethodSecurity.
- Exercice 6 : vérifier le corrigé complet avec les tests et les parcours métier.

## Matrice finale

Pour des données valides et une tâche existante :

| Route | Anonyme | Alice USER | Bob ADMIN |
| --- | ---: | ---: | ---: |
| GET /api/public/info | 200 | 200 | 200 |
| GET /api/tasks | 401 | 200 | 200 |
| POST /api/tasks | 401 | 201 | 201 |
| PUT /api/tasks/{id} | 401 | 200 | 200 |
| PATCH /api/tasks/{id}/complete | 401 | 200 | 200 |
| DELETE /api/tasks/{id} | 401 | 204 | 204 |
| GET /api/admin/stats | 401 | 403 | 200 |
| GET /api/tasks/confidential | 401 | 403 | 200 |

401 indique une authentification absente ou invalide. 403 indique un refus de sécurité : rôle insuffisant dans le parcours final, ou jeton CSRF absent aux étapes antérieures.

## Parcours dans Planora

Créez, modifiez, terminez et supprimez une tâche. Vérifiez l’évolution des statistiques avec Bob, puis les refus avec Alice et sans compte. Ouvrez Projet confidentiel avec les mêmes identités. Le nom saisi dans le formulaire n’atteste pas la validité du compte : Spring vérifie chaque appel.

Pour les statuts de succès, utilisez l’onglet Réseau du navigateur ou curl. L’information publique n’a pas d’écran dans Planora et se vérifie avec curl. Les tests d’exercice sont marqués @Disabled jusqu’à leur réalisation ; tous sont actifs dans la branche 6.
