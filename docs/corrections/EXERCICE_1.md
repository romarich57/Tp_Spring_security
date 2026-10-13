# Correction de l'exercice 1 — Audit de sécurité

Avant Spring Security, les trois endpoints de la branche `Tp_version1` répondent **200 OK**, même sans authentification.

| Route | Observé | Politique souhaitée | Faiblesse |
| --- | --- | --- | --- |
| `GET /api/public/info` | 200 | Public | Aucune |
| `GET /api/tasks` | 200 | Authentifié | Divulgation des tâches |
| `GET /api/admin/stats` | 200 | Rôle ADMIN | Divulgation de données réservées |

Le nom `/admin` ne déclenche aucune protection automatique.

**Authentification** = vérifier *qui* appelle l'API. **Autorisation** = vérifier *ce qu'il peut faire*. Sans règles, l'API ne fait ni l'une ni l'autre.

Pour corriger les failles : ajouter l'authentification (exercice 2), puis distinguer les utilisateurs, rôles et permissions (exercices 3-5). Dans les étapes précédentes, la vulnérabilité est **volontaire et pédagogique**, à ne jamais reproduire en production.
