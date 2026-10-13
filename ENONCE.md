# Exercice 1 — Observer une faille de securite (10 min)

Cette etape est **une analyse, sans modification de code**.

## TODO 1.1 — Constater les trois comportements

1. Lancez `mvn spring-boot:run`.
2. Sans `Authorization`, testez `GET /api/public/info`, `GET /api/tasks` et `GET /api/admin/stats`.
3. Reportez codes HTTP et reponses dans [la feuille a completer](docs/reponses/EXERCICE_1_A_COMPLETER.md).

## TODO 1.2 — Identifier les responsabilites

1. Lisez `controller/PublicController.java`, `controller/TaskController.java` et `controller/AdminController.java`.
2. Regardez `service/TaskService.java` et `service/StatisticsService.java`.
3. Expliquez pourquoi une URL contenant `admin` n'empeche pas un visiteur anonyme de lire les statistiques.

## TODO 1.3 — Proposer les acces attendus

Pour chaque route, indiquez si elle doit etre publique, ouverte aux utilisateurs connectes ou reservee aux ADMIN. Expliquez la difference entre authentification et autorisation.

**Ne modifiez pas les fichiers Java.** La correction d'analyse sera dans `Tp_version2/docs/corrections/EXERCICE_1.md`.
