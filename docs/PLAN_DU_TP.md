# Parcours pédagogique — 60 minutes

Chaque branche est un **point de départ autonome**, et non une livraison de toutes les réponses à l'avance.

| Branche | Exercice à réaliser | Corrigés déjà disponibles |
| --- | --- | --- |
| `Tp_version1` | 1. Diagnostiquer les failles (10 min) | Aucun |
| `Tp_version2` | 2. Ajouter Spring Security (10 min) | Exercice 1 (Markdown) |
| `Tp_version3` | 3. Déclarer deux utilisateurs + BCrypt (15 min) | Exercices 1 et 2 |
| `Tp_version4` | 4. Définir les autorisations HTTP (10 min) | Exercices 1 à 3 |
| `Tp_version5` | 5. Protéger une méthode avec `@PreAuthorize` (10 min) | Exercices 1 à 4 |
| `Tp_version6` | Tout est corrigé + tests de validation (5 min) | Exercices 1 à 5 |

## Reprendre à une étape

```bash
git fetch origin
git switch Tp_version3
mvn clean test
mvn spring-boot:run
```

La branche `Tp_version3` contient **les réponses aux exercices 1 et 2**, mais **pas la solution de l'exercice 3**. Même principe aux étapes suivantes.

## Endpoints étudiés

| Méthode | Chemin | Politique finale |
| --- | --- | --- |
| GET | `/api/public/info` | Public |
| GET | `/api/tasks` | Authentification requise |
| GET | `/api/admin/stats` | Rôle ADMIN requis |
| GET | `/api/tasks/confidential` | Rôle ADMIN avec `@PreAuthorize` (exercice 5) |

## Comptes du TP (à partir de la version 4)

- Alice — `alice` / `alice123` — rôle USER.
- Bob — `bob` / `bob123` — rôle ADMIN.

Ces identifiants sont **uniquement des données d'exercice**, jamais des identifiants de production.

## Bonnes pratiques

- Vérifiez les codes `200`, `401` et `403`.
- Les trois premières routes sont des GET : le TP n'impose pas de désactiver CSRF.
- Un rôle `ADMIN` déclaré avec `.roles("ADMIN")` devient l'autorité `ROLE_ADMIN`.
- L'API utilise HTTP Basic pour isoler la pédagogie Spring Security ; la connexion JWT est hors périmètre.
