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

Les tests de cette branche démontrent volontairement le problème (Alice accède encore aux stats). Les résultats de sécurité souhaités figurent dans [le plan](docs/PLAN_DU_TP.md).

Correction dans la branche `Tp_version5`.
