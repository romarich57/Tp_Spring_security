# Tester l’API métier

Planora appelle ces mêmes routes. Pour observer les requêtes indépendamment de l’interface, utilisez requests.http, curl, Postman ou Insomnia.

## Lire et modifier les tâches

    curl -i http://localhost:8080/api/tasks
    curl -i -X POST http://localhost:8080/api/tasks \
      -H 'Content-Type: application/json' \
      -d '{"title":"Préparer la démo","description":"Réunir les captures","status":"TODO","priority":"HIGH","dueDate":"2026-10-28"}'

Les autres opérations sont PUT /api/tasks/{id}, PATCH /api/tasks/{id}/complete et DELETE /api/tasks/{id}.

## Statistiques et ressource confidentielle

    curl -i http://localhost:8080/api/admin/stats
    curl -i http://localhost:8080/api/tasks/confidential

La seconde route apparaît dans l’exercice 5.

## Avec HTTP Basic

Après l’ajout de la dépendance en exercice 2, utilisez user avec le mot de passe affiché dans la console Spring. Après l’exercice 3 (et dès le début des branches 4 à 6) :

    curl -i -u alice:alice123 http://localhost:8080/api/tasks
    curl -i -u alice:alice123 http://localhost:8080/api/admin/stats
    curl -i -u bob:bob123 http://localhost:8080/api/admin/stats

## Codes de réponse

- 200 : requête acceptée.
- 201 : tâche créée.
- 204 : tâche supprimée.
- 400 : données de tâche invalides.
- 401 : authentification manquante ou incorrecte.
- 403 : refus de sécurité, notamment rôle insuffisant ; avant l’exercice 4, une mutation sans jeton CSRF renvoie aussi 403 avec ou sans compte.
- 404 : tâche ou route absente, si la sécurité autorise la requête.

Les comptes sont fictifs et réservés au TP local. HTTP Basic ne chiffre pas les mots de passe ; ne l’utilisez pas sur un réseau non chiffré avec de vrais identifiants.
