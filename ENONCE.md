# Exercice 1 — Enquête sur le contrôle d’accès (10 min)

Cette branche est le point de départ de l’exercice : l’API métier fonctionne, mais aucune configuration Spring Security ne s’applique encore. N’apportez pas de correction pour le moment. Il vous faut recueillir des preuves, identifier les accès inattendus et expliquer le risque.

## Piste de recherche : OWASP Top 10, A01:2025

Lisez la catégorie [A01 — Broken Access Control](https://top10.owasp.org/2025/A01_2025-Broken_Access_Control/) de l’OWASP Top 10:2025. Elle concerne les applications qui autorisent une personne à agir hors des permissions prévues. L’OWASP cite notamment les API dont les opérations POST, PUT ou DELETE manquent de contrôle d’accès, ainsi que l’accès direct à une URL privilégiée. Cherchez dans Planora si vous trouvez des situations de ce type et démontrez-les.

## Investigation

1. Démarrez l’API (`mvn spring-boot:run`) et l’interface React (`cd frontend && npm install && npm run dev`).
2. Restez déconnecté. Dans Planora, lisez les tâches, créez-en une, modifiez-la, terminez-la, supprimez-la et ouvrez les statistiques.
3. Ouvrez les outils développeur du navigateur, onglet **Réseau**, pour examiner les requêtes et leurs statuts. Les contrôles visuels de React ne prouvent pas que l’API protège ses routes.
4. Testez aussi les routes de l’API directement, sans identifiants :

```bash
curl -i http://localhost:8080/api/tasks
curl -i http://localhost:8080/api/admin/stats
curl -i http://localhost:8080/api/public/info
```

La fiche d’enquête à remplir se trouve dans le PDF `Tp.pdf`, à la section **4. Exercice 1**. Complétez le tableau à partir de vos observations, puis répondez aux questions en argumentant avec des requêtes précises. Pour tester PUT, PATCH et DELETE, utilisez un identifiant existant et supprimez uniquement la tâche créée pendant l’exercice.

## Lire le backend

Examinez `TaskController`, `AdminController`, `TaskService` et `StatisticsService`. Repérez les routes et cherchez où le serveur vérifie l’identité et les permissions.

Répondez aux trois questions de la fiche : proposez les droits selon le profil, comparez-les aux résultats avec deux exemples et leurs risques, puis distinguez authentification et autorisation en expliquant pourquoi le contrôle doit être vérifié dans le backend.

Conservez la fiche : elle vous servira à constater les changements après l’ajout de Spring Security. L’interface React reste le client métier fourni pendant tout le TP.
