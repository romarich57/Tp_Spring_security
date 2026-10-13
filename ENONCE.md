# Tous les exercices corrigés — Validation finale (5 minutes)

En exécutant `mvn clean verify`, les tests automatisés doivent valider les attentes suivantes :

| GET | Sans identifiants | Alice USER | Bob ADMIN |
| --- | --- | --- | --- |
| `/api/public/info` | 200 | 200 | 200 |
| `/api/tasks` | 401 | 200 | 200 |
| `/api/admin/stats` | 401 | 403 | 200 |
| `/api/tasks/confidential` | 401 | 403 | 200 |

## Question d'oral

- Quelle différence entre 401 et 403 ?
- À quoi sert `SecurityFilterChain` ?
- Pourquoi encoder les mots de passe ?
- Pourquoi `@EnableMethodSecurity` est-il indispensable à `@PreAuthorize` ?
- Pourquoi le chemin `/api/admin/stats` ne suffit-il pas, à lui seul, à restreindre l'accès ?
- Pourquoi HTTP Basic ne doit-il jamais exposer de vrais identifiants sur une connexion HTTP non chiffrée ?

Voir `docs/corrections/EXERCICE_1.md` jusqu'à `EXERCICE_5.md`.
