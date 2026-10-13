# Architecture de l’application

Le produit pédagogique est un gestionnaire de tâches React relié à une API Spring Boot. L’interface est fournie et reste la même dans toutes les branches. Les étudiants font évoluer le backend et appliquent les règles d’accès dans Spring Security.

## Composants

    frontend/src/main.jsx              Application métier React
    frontend/src/api.js                 Appels JSON et HTTP Basic en mémoire
    src/main/java/fr/tpspringsecurity/
      controller/
        PublicController.java           Informations publiques
        TaskController.java             CRUD des tâches
        AdminController.java            Statistiques
      model/
        Task.java, TaskRequest.java     Contrat JSON des tâches
        TaskStats.java                 Indicateurs de l’espace
      service/
        TaskService.java                Données métier en mémoire
        StatisticsService.java          Statistiques calculées
      config/
        UserConfig.java                 Comptes de démonstration (exercice 3)
        SecurityConfig.java             Autorisations HTTP et méthodes

Le stockage en mémoire évite d’introduire une base de données dans ce TP. Les données repartent de leur exemple initial au redémarrage du serveur.

## Contrat métier constant

| Méthode | Route | Fonction |
| --- | --- | --- |
| GET | /api/tasks | Lister les tâches |
| POST | /api/tasks | Créer une tâche |
| PUT | /api/tasks/{id} | Modifier une tâche |
| PATCH | /api/tasks/{id}/complete | La terminer |
| DELETE | /api/tasks/{id} | La supprimer |
| GET | /api/admin/stats | Lire les indicateurs calculés |
| GET | /api/tasks/confidential | Lire une note interne, ajoutée à l’exercice 5 |
| GET | /api/public/info | Lire les informations publiques |

Une tâche porte un titre, une description, un état, une priorité, une échéance et une personne assignée. React permet de modifier les cinq premiers champs ; l’assignation est affichée et conservée par le serveur si elle est absente de la requête. Les tâches sont partagées par l’équipe, sans contrôle de propriété individuel.

## Responsabilités

| Composant | Responsabilité |
| --- | --- |
| React | Afficher et manipuler les tâches, transmettre les identifiants saisis et présenter les réponses HTTP |
| Controllers | Définir les routes et traduire HTTP vers les opérations métier |
| Services | Appliquer la logique métier et gérer les données d’exemple |
| UserConfig | Encoder les mots de passe et déclarer les rôles |
| SecurityConfig | Définir les accès aux routes et activer la sécurité des méthodes |

Les règles d’autorisation sont toujours imposées par le backend. Masquer un bouton React ne sécuriserait pas une API.

## Progression pédagogique

| Branche | Exercice | Travail demandé |
| --- | --- | --- |
| Tp_version1 | Audit | Observer qu’un visiteur peut gérer les tâches et consulter les statistiques |
| Tp_version2 | Spring Security | Ajouter la dépendance et observer les réponses 401 |
| Tp_version3 | Identités | Créer Alice USER, Bob ADMIN et l’encodeur BCrypt |
| Tp_version4 | Autorisations HTTP | Rendre l’info publique, réserver les tâches aux comptes et les stats à ADMIN, configurer CSRF pour l’API stateless |
| Tp_version5 | Sécurité de méthode | Protéger la note confidentielle avec @PreAuthorize |
| Tp_version6 | Validation | Vérifier le parcours complet avec des tests d’intégration |

Chaque branche est un point de départ avec les corrections antérieures. Le CRUD est fourni dès la branche 1 ; la note est fournie dès la branche 5. Les mutations sont temporairement refusées avec 403 par CSRF après les exercices 2 et 3, jusqu’à la configuration de l’exercice 4. L’information publique est vérifiée avec curl et n’a pas d’écran React.
