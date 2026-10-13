# Exercice 5 — Protéger une ressource confidentielle (10 min)

Les règles HTTP protègent déjà les tâches et les statistiques. Planora expose maintenant une note de projet confidentielle par GET /api/tasks/confidential. Cette route est authentifiée par la règle générale, mais Alice peut encore la lire : il faut contrôler son rôle au niveau de la méthode Java.

## Ajouter la règle de méthode

1. Dans TaskController, activez @PreAuthorize("hasRole('ADMIN')") sur la méthode confidential().
2. Dans config/SecurityConfig.java, activez @EnableMethodSecurity sur la configuration.
3. Ne déplacez pas la règle de cette ressource dans les matchers HTTP : l’objectif est d’exercer la sécurité des méthodes.

## Vérifier l’application

1. Ouvrez Projet confidentiel sans compte : Spring renvoie 401.
2. Connectez-vous comme Alice : après la correction, Spring renvoie 403.
3. Connectez-vous comme Bob : la note JSON du projet Orion s’affiche.
4. Vérifiez que les tâches et les statistiques continuent de respecter leurs propres règles.

Retirez @Disabled du test exercice5MethodeConfidentielleReserveeAuxAdmins dans TaskApiSecurityTest.java et lancez mvn test.

Dans votre réponse, distinguez l’authentification (qui est l’utilisateur ?) de l’autorisation (a-t-il le rôle attendu ?). La version 6 contient la correction et la suite complète des tests d’intégration.
