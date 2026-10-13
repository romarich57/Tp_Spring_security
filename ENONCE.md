# Exercice 3 — Configurer les utilisateurs (15 min)

La dépendance Spring Security est maintenant en place. L'application utilise volontairement la configuration par défaut de Spring Security, qui sécurise **tous** les endpoints.

## Objectif

Remplacer le compte généré au démarrage par deux utilisateurs en mémoire :

| Login | Mot de passe (démonstration locale) | Rôle |
| --- | --- | --- |
| `alice` | `alice123` | `USER` |
| `bob` | `bob123` | `ADMIN` |

## Tâches

1. Dans `src/main/java/fr/tpspringsecurity/config/UserConfig.java`, déclarez un Bean `PasswordEncoder` utilisant `BCryptPasswordEncoder`.
2. Déclarez un Bean `UserDetailsService` de type `InMemoryUserDetailsManager`.
3. Créez Alice et Bob avec `User.withUsername(...).password(encoder.encode(...)).roles(...).build()`.
4. Testez `curl -i -u alice:alice123 http://localhost:8080/api/tasks` puis les mêmes routes avec Bob.
5. Expliquez pourquoi **les deux** utilisateurs peuvent accéder à `/api/admin/stats` à cette étape : l'authentification seule ne contrôle pas encore les rôles.

Indication : ajoutez les deux Beans **sans** déclarer encore de `SecurityFilterChain`. La configuration HTTP par défaut reste applicable.

**Verification automatisee :** une fois les deux comptes crees, retirez `@Disabled` de `exercice3AliceEtBobPeuventSeConnecter` dans `TaskApiSecurityTest.java` puis lancez `mvn test`.

**La correction de l'exercice 3 sera visible dans `Tp_version4`.**
