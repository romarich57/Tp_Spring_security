# Exercice 5 — Sécurité des méthodes (10 minutes)

Les règles HTTP sont déjà actives. Il reste à protéger une fonctionnalité sensible **au niveau Java**.

## À faire

1. Dans `TaskController.java`, créez `GET /api/tasks/confidential`, qui retourne la chaîne `Projet confidentiel`.
2. Protégez **uniquement cette méthode** avec `@PreAuthorize("hasRole('ADMIN')")`.
3. Ajoutez `@EnableMethodSecurity` dans la configuration Spring Security.
4. Testez sans identifiants, avec Alice et avec Bob : attendez respectivement **401**, **403** et **200**.
5. Expliquez la différence entre `hasRole("ADMIN")` dans `SecurityFilterChain` et `@PreAuthorize` sur la méthode.

**Attention :** ne mettez pas `/api/tasks/confidential` dans les matchers ADMIN HTTP : le but est de prouver que la protection vient de l'annotation !

La branche `Tp_version6` contient l'implémentation complète et ses tests.
