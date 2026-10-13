# Correction de l'exercice 1 — Audit de securite

**Avant toute installation de Spring Security**, les trois endpoints repondent tous **200 OK**, meme sans authentification.

| Route | Observe | Politique souhaitee | Faille |
| --- | --- | --- | --- |
| `GET /api/public/info` | 200 | Publique | Pas de faille |
| `GET /api/tasks` | 200 | Utilisateur connecte | Taches visibles sans identite |
| `GET /api/admin/stats` | 200 | ADMIN uniquement | Statistiques reservees exposees |

Une classe appelee `AdminController` et une URL contenant `/admin` **ne constituent pas** une protection de securite.

**Authentification** : qui es-tu ? **Autorisation** : as-tu le droit d'effectuer cette action ?

La separation des responsabilites existe deja : les **controllers** exposent HTTP, les **services** fournissent les donnees metier ; les **regles Spring Security** sont introduites plus tard dans `SecurityConfig`.

Le probleme sera resolu progressivement : exercice 2 (authentification par defaut), exercice 3 (comptes et BCrypt), exercice 4 (controle des permissions), exercice 5 (regles au niveau des methodes).

Ce projet est deliberement vulnerable a des fins de formation : ne le deployez pas en production.
