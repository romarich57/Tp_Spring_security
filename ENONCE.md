# Exercice 5 — Protéger une méthode avec @PreAuthorize (10 min)

**TP réalisé par :** Heitz Romaric, Khiri Amine, Benali Syrine, Van-Rossen-Martinez Alessandra et Denocq Elio.

**Branche :** `Tp_version5`
**Fichiers à modifier :** `src/main/java/fr/tpspringsecurity/controller/TaskController.java` et `src/main/java/fr/tpspringsecurity/config/SecurityConfig.java`.

## Objectif

La règle générale `authenticated()` protège déjà les routes de tâches. Dans cet exercice, ajoutez un contrôle plus précis sur la méthode qui fournit le projet confidentiel : Alice peut s’authentifier, mais seul Bob, qui possède le rôle ADMIN, doit lire la note. Le but est de combiner la sécurité HTTP et la sécurité au niveau des méthodes Java.

## État initial

La route `GET /api/tasks/confidential`, la méthode du contrôleur et l’objet `ConfidentialProject` sont déjà fournis. La méthode appelle `taskService.confidential()`. Ne créez aucune nouvelle route ni donnée.

Avant de modifier le code, ouvrez Projet confidentiel comme Alice. Elle reçoit `200` à cette étape, car la règle HTTP générale demande seulement un compte authentifié. Bob reçoit aussi `200` ; un visiteur reçoit `401`.

## TODO 5.1 — Ajouter la règle sur la méthode

Dans `TaskController.java`, repérez `confidential()` annotée par `@GetMapping("/confidential")`. Importez `PreAuthorize` si besoin et activez sur cette méthode :

```java
@PreAuthorize("hasRole('ADMIN')")
```

Laissez le contenu de la méthode et l’appel au service inchangés. N’ajoutez pas de règle spécifique pour cette route dans `SecurityFilterChain`.

## TODO 5.2 — Activer la sécurité des méthodes

Dans `SecurityConfig.java`, ajoutez `@EnableMethodSecurity` à la classe. Cette annotation permet à Spring d’évaluer `@PreAuthorize` lors de l’appel de la méthode.

## TODO 5.3 — Vérifier les trois profils

Redémarrez Spring et ouvrez la ressource dans Planora avec chaque profil :

| Profil | Réponse après la correction |
| --- | --- |
| Sans compte | `401` |
| Alice (`USER`) | `403` |
| Bob (`ADMIN`) | `200` |

## TODO 5.4 — Activer le test

Dans `src/test/java/fr/tpspringsecurity/TaskApiSecurityTest.java`, retirez `@Disabled` juste au-dessus de `exercice5MethodeConfidentielleReserveeAuxAdmins`, puis exécutez `mvn test`. Le test vérifie les accès anonyme, Alice et Bob.

Vérifiez également que les règles précédentes restent en place : Alice peut manipuler les tâches, mais ne lit pas les statistiques ; Bob accède aux tâches et aux statistiques.

Questions : pourquoi Alice pouvait-elle lire la note avant la correction ? Que fait `@EnableMethodSecurity` ? En quoi une règle de méthode complète-t-elle `SecurityFilterChain` ? Pourquoi la méthode délègue-t-elle au service ?

**Étape suivante :** la branche `Tp_version6` contient le corrigé complet.
