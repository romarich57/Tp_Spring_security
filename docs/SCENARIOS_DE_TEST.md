# Scénarios de test — parcours complet

Ce document distingue **l'état initial de chaque branche** de **l'état visé après réalisation de l'exercice**. L'interface React envoie de vraies requêtes et ne simule aucun résultat.

| Branche | Situation initiale | Travail de l'étudiant | Résultat observable après correction |
| --- | --- | --- | --- |
| `Tp_version1` | Les trois GET renvoient 200 à un visiteur anonyme | Auditer les failles dans le Markdown | Aucune modification du backend |
| `Tp_version2` | Tout est encore accessible (comme v1) | Ajouter la dépendance Spring Security | GET sans identité → 401 (toutes les routes) ; `user` + mot de passe généré → 200 |
| `Tp_version3` | Spring Security protège toutes les routes ; seul le compte généré fonctionne | Configurer Alice, Bob et BCrypt | Alice et Bob se connectent et ont accès aux stats (pas encore de contrôle ADMIN) |
| `Tp_version4` | Alice et Bob existent ; Alice accède encore aux stats ; route publique encore protégée | Implémenter `SecurityFilterChain` | Public anonyme → 200 ; stats avec Alice → 403 ; stats avec Bob → 200 |
| `Tp_version5` | Règles HTTP corrigées ; route confidentielle pas encore implémentée | Ajouter endpoint, `@PreAuthorize` et `@EnableMethodSecurity` | Confidentiel : anonyme → 401, Alice → 403, Bob → 200 |
| `Tp_version6` | Tous les exercices corrigés | Vérifier les comportements | Voir matrice finale ci-dessous |

**Particularité version 5 avant correction :** la requête vers `/api/tasks/confidential` est filtrée en premier par Spring Security : anonyme → 401. Un compte valide passe le filtre puis tombe sur une route absente → 404. Après le TODO, la méthode doit être protégée par l'annotation Java.

## Matrice finale (version 6)

| GET | Anonyme | Alice USER | Bob ADMIN |
| --- | --- | --- | --- |
| `/api/public/info` | 200 | 200 | 200 |
| `/api/tasks` | 401 | 200 | 200 |
| `/api/admin/stats` | 401 | 403 | 200 |
| `/api/tasks/confidential` | 401 | 403 | 200 |

## Tests de validation

Le projet initial doit **compiler et passer** `mvn test` dans chaque branche. Pour ne pas casser l'état initial, les nouveaux tests de l'exercice à faire sont d'abord marqués `@Disabled`.

1. Corriger les TODO dans le code Java.
2. Retirer `@Disabled` du test correspondant à l'exercice (versions 2, 3, 4 et 5).
3. Relancer `mvn test`.
4. Vérifier avec la matrice de l'interface React.

Version 1 : audit d'observation, aucun test à activer. Version 6 : tests complets déjà activés.

## Passer à une autre branche

```bash
# arrêter d'abord Spring Boot et Vite avec Ctrl+C
git fetch origin
git switch Tp_version2
mvn clean test
mvn spring-boot:run
# autre terminal :
cd frontend && npm run dev
```

Le **lien GitHub** d'une étape n'est pas un changement de branche local. **Redémarrez Java après chaque git switch** pour éviter de comparer un React v3 avec un backend v2.

## Limites volontaires du TP

Les comptes sont fictifs, codés en dur et stockés en mémoire. HTTP Basic est utilisé exclusivement en local pour illustrer l'authentification et les rôles. Pas de JWT, de base de données ni de formulaire de connexion sécurisé de production. Toutes les routes métier testées sont des GET.
