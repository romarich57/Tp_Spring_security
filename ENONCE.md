# Exercice 3 — Déclarer les comptes avec BCrypt (15 min)

**TP réalisé par :** Heitz Romaric, Khiri Amine, Benali Syrine, Van-Rossen-Martinez Alessandra et Denocq Elio.

**Branche :** `Tp_version3`

**Fichier à modifier :** `src/main/java/fr/tpspringsecurity/config/UserConfig.java` uniquement.

## Objectif

Remplacer l’utilisateur temporaire créé par Spring Security par deux comptes de démonstration. Déclarer leurs rôles et encoder leurs mots de passe avec BCrypt. À cette étape, vous mettez en place les identités ; vous ne définissez pas les routes autorisées pour chaque rôle. Même si Bob a le rôle ADMIN, Alice peut encore lire les statistiques jusqu’à l’exercice 4.

| Identifiant | Mot de passe de démonstration | Rôle |
| --- | --- | --- |
| `alice` | `alice123` | `USER` |
| `bob` | `bob123` | `ADMIN` |

## TODO 3.1 — Créer un PasswordEncoder

Dans `UserConfig.java`, créez un Bean dont le type de retour est `PasswordEncoder`. Il doit retourner un `BCryptPasswordEncoder`. Ce Bean encode les mots de passe avant leur stockage et vérifie les mots de passe envoyés par la suite.

## TODO 3.2 — Créer un UserDetailsService

Ajoutez un second Bean, de type `UserDetailsService`, qui reçoit le `PasswordEncoder` en paramètre. Spring injectera automatiquement le Bean précédent. Ce service donnera à Spring Security la liste des comptes connus.

## TODO 3.3 — Construire Alice et Bob

Dans le Bean `UserDetailsService`, construisez les comptes avec `User.withUsername(...)`. Pour chacun :

1. reprenez l’identifiant du tableau ;
2. affectez le mot de passe après `encoder.encode(...)` ;
3. déclarez le rôle avec `.roles(...)` ;
4. terminez avec `.build()`.

Alice reçoit `USER`, Bob reçoit `ADMIN`. Ne stockez pas les mots de passe en clair. `.roles("ADMIN")` crée l’autorité `ROLE_ADMIN`.

## TODO 3.4 — Les stocker en mémoire

Retournez un `InMemoryUserDetailsManager` contenant Alice et Bob. Les classes utiles se trouvent dans `org.springframework.security.core.userdetails` et `org.springframework.security.crypto.password` ; `User` se trouve dans `org.springframework.security.core.userdetails.User`.

Ne modifiez pas `SecurityConfig.java` : aucune règle HTTP personnalisée ne doit être ajoutée pendant cet exercice.

## Vérifier les comptes

Redémarrez Spring. Le compte `user` généré n’est plus celui de l’application. Connectez-vous dans Planora comme Alice puis comme Bob. Pour chaque compte, ouvrez Mes tâches et Statistiques. Essayez aussi un mauvais mot de passe.

```bash
curl -i -u alice:alice123 http://localhost:8080/api/tasks
curl -i -u bob:bob123 http://localhost:8080/api/admin/stats
curl -i -u alice:incorrect http://localhost:8080/api/tasks
```

Résultat attendu : les lectures réussissent pour Alice et Bob (`200`), un mot de passe invalide est refusé (`401`) et Alice peut encore lire les statistiques. Le rôle est déclaré, mais il n’est pas encore utilisé pour contrôler l’accès. Les mutations peuvent répondre `403` avec un compte valide, car la protection CSRF est encore active par défaut.

## TODO 3.5 — Activer le test

Dans `src/test/java/fr/tpspringsecurity/TaskApiSecurityTest.java`, retirez `@Disabled` juste au-dessus de `exercice3AliceEtBobPeuventSeConnecter`, puis lancez `mvn test`. Le test vérifie les lectures des deux comptes et le refus d’un mauvais mot de passe. Il ne teste pas l’accès aux statistiques ; vérifiez ce cas dans Planora ou avec curl.

## Questions

1. Pourquoi encoder le mot de passe avant de créer le compte ?
2. Pourquoi Alice peut-elle consulter les statistiques malgré son rôle `USER` ?
3. En quoi l’authentification diffère-t-elle de l’autorisation ?

**Étape suivante :** `Tp_version4` contient les comptes déjà configurés. Vous y écrirez les règles d’accès dans `SecurityFilterChain`.
