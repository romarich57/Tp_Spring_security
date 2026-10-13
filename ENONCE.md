# Exercice 4 — Configurer les autorisations (10 minutes)

Les deux utilisateurs Alice (USER) et Bob (ADMIN) fonctionnent déjà. Mais Alice peut encore lire les statistiques ADMIN !

## Travail

1. Ajoutez un Bean `SecurityFilterChain` dans `SecurityConfig`.
2. Autorisez tout le monde sur `GET /api/public/info` avec `permitAll()`.
3. Réservez `GET /api/admin/**` au rôle `ADMIN` avec `hasRole("ADMIN")`.
4. Imposez une connexion sur toutes les autres requêtes avec `anyRequest().authenticated()`.
5. Activez `httpBasic(withDefaults())`. Utilisez `SessionCreationPolicy.STATELESS` pour ce TP d'API HTTP Basic.
6. Vérifiez 200, 401, 403 avec `curl` ou Postman.

**Conseil :** l'ordre des `requestMatchers` compte ; placez les règles spécifiques avant `anyRequest()`.

Les tests existants restent valides avant et après vos modifications. Lorsque vous avez terminé les TODO, retirez `@Disabled` du test `exercice4LAccesPublicEtLesDroitsAdminSontRespectes` dans `TaskApiSecurityTest.java`, puis exécutez `mvn test`. Vous pouvez également tester visuellement dans React.

Correction dans la branche `Tp_version5`.
