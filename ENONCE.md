# Exercice 1 — Auditer une API métier ouverte (10 min)

Planora est un gestionnaire de tâches relié à une API Spring Boot. La fonctionnalité métier est déjà prête : dans cette étape, observez qui peut l’utiliser avant l’ajout de Spring Security.

## 1. Lancer et parcourir l’application

1. Démarrez Spring avec mvn spring-boot:run.
2. Dans un autre terminal, démarrez React : cd frontend, npm install, npm run dev.
3. Ouvrez http://localhost:5173 et manipulez une tâche : créez-la, modifiez-la, terminez-la et supprimez-la.
4. Ouvrez Statistiques et notez les valeurs renvoyées par l’API.

## 2. Constater les accès sans compte

Sans renseigner d’identifiants, utilisez l’application et les requêtes de requests.http. Vérifiez que vous pouvez :

- lire GET /api/tasks ;
- créer, modifier, terminer et supprimer une tâche ;
- lire GET /api/admin/stats ;
- lire GET /api/public/info.

Reportez les réponses dans docs/reponses/EXERCICE_1_A_COMPLETER.md.

## 3. Analyser les responsabilités

Lisez TaskController, TaskService, AdminController et StatisticsService. Expliquez :

1. quelles opérations métier sont disponibles ;
2. pourquoi le nom /api/admin/stats n’empêche pas un visiteur de lire les chiffres ;
3. quelles routes devraient rester publiques, exiger une connexion ou demander le rôle ADMIN ;
4. la différence entre authentification et autorisation.

Cette première étape est une analyse : ne modifiez pas le backend. L’exercice suivant ajoute Spring Security. React est le client métier du TP et reste identique dans toutes les branches.
