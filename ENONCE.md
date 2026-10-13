# Exercice 4 — Configurer les autorisations HTTP (10 min)

**TP réalisé par :** Heitz Romaric, Khiri Amine, Benali Syrine, Van-Rossen-Martinez Alessandra et Denocq Elio.

**Branche :** `Tp_version4`
**Fichier à modifier :** `src/main/java/fr/tpspringsecurity/config/SecurityConfig.java`.

## Objectif

Les utilisateurs Alice (`USER`) et Bob (`ADMIN`) sont déjà configurés. Spring les authentifie, mais ses règles par défaut ne rendent aucune route publique et ne distinguent pas encore les permissions d’Alice et Bob. Votre travail consiste à écrire la politique d’accès HTTP dans `SecurityFilterChain`, puis à régler CSRF pour que les mutations du client fourni puissent aboutir.

## Avant de commencer

Ouvrez `SecurityConfig.java` et repérez les TODO 4.1 à 4.6. Travaillez dans cette classe uniquement. Ne déplacez pas les comptes depuis `UserConfig.java`.

## TODO 4.1 — Créer la chaîne de filtres

Créez un Bean `SecurityFilterChain` qui reçoit `HttpSecurity` et retourne la chaîne configurée. Cette configuration sera appliquée aux requêtes HTTP avant qu’elles arrivent aux contrôleurs.

## TODO 4.2 à 4.4 — Écrire les règles dans le bon ordre

Dans `authorizeHttpRequests`, ajoutez successivement :

1. `GET /api/public/info` avec `permitAll()` ;
2. `GET /api/admin/**` avec `hasRole("ADMIN")` ;
3. `anyRequest().authenticated()` pour toutes les autres requêtes.

Utilisez le matcher qui tient compte de la méthode HTTP pour les deux premières règles. Les règles précises doivent être placées avant la règle générale, qui termine la configuration des autorisations. Le rôle ADMIN existe déjà dans les comptes ; ne créez pas un autre mécanisme de rôles.

## TODO 4.5 — Configurer l’authentification

Activez HTTP Basic et réglez `SessionCreationPolicy.STATELESS`. Importez les types nécessaires, notamment `HttpMethod`, `SessionCreationPolicy`, `SecurityFilterChain` et `withDefaults`.

## TODO 4.6 — Autoriser les mutations du client local

Ajoutez `.csrf(csrf -> csrf.disable())` dans la chaîne avant `.build()`.

Le client React du TP envoie explicitement le header `Authorization` et n’utilise pas de cookie. Ce choix local permet à ses requêtes JSON POST, PUT, PATCH et DELETE de fonctionner. HTTP Basic et `STATELESS` ne protègent pas automatiquement tous les clients contre CSRF : les navigateurs peuvent envoyer automatiquement des identifiants Basic dans d’autres configurations. Réévaluez cette décision si le client ou l’authentification change. Consultez la [documentation Spring Security sur CSRF](https://docs.spring.io/spring-security/reference/features/exploits/csrf.html).

## TODO 4.7 — Vérifier le comportement

Redémarrez Spring et vérifiez dans Planora :

- sans compte, les tâches sont refusées (`401`) ;
- Alice gère les tâches (création `201`, modification et clôture `200`, suppression `204`), mais ne peut pas ouvrir Statistiques (`403`) ;
- Bob gère les tâches et accède à Statistiques (`200`).

La route Projet confidentiel n’est pas encore définie dans cette branche. Une requête anonyme reçoit `401` ; avec un compte valide, le contrôleur absent produit `404`. Vérifiez l’information publique avec `curl`, car elle n’a pas d’écran Planora :

```bash
curl -i http://localhost:8080/api/public/info
curl -i -u alice:alice123 http://localhost:8080/api/admin/stats
curl -i -u bob:bob123 http://localhost:8080/api/admin/stats
```

## TODO 4.8 — Activer le test

Dans `src/test/java/fr/tpspringsecurity/TaskApiSecurityTest.java`, retirez `@Disabled` juste au-dessus de `exercice4LAccesPublicEtLesDroitsAdminSontRespectes`, puis lancez `mvn test`. Le test contrôle la route publique, les droits sur les statistiques et une création par Alice. Si la création n’aboutit pas, vérifiez le TODO CSRF.

Questions : pourquoi l’ordre des règles compte-t-il ? Pourquoi Alice obtient-elle 403 sur les statistiques ? Pourquoi la configuration CSRF de ce TP dépend-elle du client utilisé ?

**Étape suivante :** `Tp_version5` contient la chaîne HTTP complète. Vous y appliquerez `@PreAuthorize` à une méthode.
