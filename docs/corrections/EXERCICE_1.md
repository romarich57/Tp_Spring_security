# Correction de l’exercice 1 — Audit de l’API

Avant l’ajout de Spring Security, toutes les routes métier sont ouvertes. Un visiteur peut lire l’information publique et les tâches, mais aussi créer, modifier, terminer ou supprimer une tâche et consulter les statistiques d’administration.

| Méthode et route | Réponse anonyme | Politique souhaitée | Problème constaté |
| --- | ---: | --- | --- |
| GET /api/public/info | 200 | Publique | Aucun |
| GET /api/tasks | 200 | Compte authentifié | Les tâches sont visibles sans identité |
| POST /api/tasks | 201 | Compte authentifié | Un visiteur peut créer des tâches |
| PUT /api/tasks/{id} | 200 | Compte authentifié | Un visiteur peut modifier une tâche |
| PATCH /api/tasks/{id}/complete | 200 | Compte authentifié | Un visiteur peut terminer une tâche |
| DELETE /api/tasks/{id} | 204 | Compte authentifié | Un visiteur peut supprimer une tâche |
| GET /api/admin/stats | 200 | Rôle ADMIN | Les statistiques privées sont exposées |

Le nom AdminController ou une URL contenant /admin ne constitue pas une règle d’autorisation. Seule une configuration de sécurité appliquée par Spring protège l’API.

**Authentification** : qui es-tu ? **Autorisation** : as-tu le droit d’effectuer cette action ?

La séparation des responsabilités existe déjà : les contrôleurs exposent HTTP, les services fournissent les fonctionnalités métier et Spring Security appliquera les décisions d’accès.

La suite ajoute progressivement l’authentification, les comptes BCrypt, les autorisations par rôle puis une règle de sécurité sur une méthode.

Cette application est volontairement vulnérable au début du TP et ne doit pas être déployée en production.
