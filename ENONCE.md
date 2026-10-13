# Exercice 1 — Identifier les failles (10 minutes)

## Contexte

Vous rejoignez une équipe qui a développé une petite API REST de gestion de tâches. Le développeur précédent n'a mis **aucune protection** sur les routes HTTP. Votre mission est de vérifier les accès avant d'ajouter Spring Security.

## Travail à faire

1. Lancez le projet avec `mvn spring-boot:run`.
2. Sans compte utilisateur et sans en-tête `Authorization`, appelez les trois routes :
   - `GET /api/public/info`
   - `GET /api/tasks`
   - `GET /api/admin/stats`
3. Notez le code HTTP obtenu et le contenu de chaque réponse.
4. Ouvrez `src/main/java/fr/tpspringsecurity/controller/TaskController.java`.
5. Répondez par écrit aux questions suivantes :
   - Un visiteur anonyme peut-il lire la liste des tâches ?
   - Peut-il lire les statistiques réservées à l'administrateur ?
   - Quelles routes devraient être publiques, authentifiées ou réservées aux administrateurs ?
   - Quelle différence faites-vous entre **authentification** et **autorisation** ?

## Attendu

Un tableau de trois lignes indiquant le statut observé, l'accès attendu et la faille détectée.

**Ne modifiez pas encore le code.** L'objectif est de constater le problème. La correction théorique apparaît à partir de `Tp_version2` dans `docs/corrections/EXERCICE_1.md`.

## Indice

Une route située sous `/admin` n'est **pas** protégée automatiquement par son nom.
