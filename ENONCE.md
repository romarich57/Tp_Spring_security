# Exercice 2 — Activer Spring Security (10 min)

**TP réalisé par :** Heitz Romaric, Khiri Amine, Benali Syrine, Van-Rossen-Martinez Alessandra et Denocq Elio.

**Branche :** `Tp_version2`

**Fichier à modifier :** `pom.xml` uniquement.

## Objectif

Ajouter Spring Security et observer sa configuration automatique par défaut. À cette étape, vous ne configurez ni les utilisateurs vous-mêmes ni les règles d’accès par rôle. Spring Boot demande une authentification pour toutes les routes et génère le compte temporaire `user`. Vous allez vérifier ce comportement avec Planora et l’API.

## TODO 2.1 — Ajouter le starter

Dans `pom.xml`, repérez `TODO EXERCICE 2`. Remplacez le commentaire par :

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

N’ajoutez pas de version : le parent Spring Boot la gère. Ne modifiez pas les classes Java.

## TODO 2.2 — Vérifier les accès anonymes

Redémarrez Spring (`mvn spring-boot:run`). Sans vous connecter, essayez d’ouvrir Mes tâches et Statistiques dans Planora. Relevez les statuts dans l’onglet Réseau. Testez aussi les trois lectures avec curl :

```bash
curl -i http://localhost:8080/api/public/info
curl -i http://localhost:8080/api/tasks
curl -i http://localhost:8080/api/admin/stats
```

Notez les statuts. Pourquoi l’information nommée « publique » est-elle également concernée ?

## TODO 2.3 — Utiliser le compte généré

Repérez dans la console le mot de passe généré par Spring pour `user`. Dans Planora, connectez-vous avec l’identifiant `user` et ce mot de passe, puis consultez les tâches. Vérifiez le résultat directement :

```bash
curl -i -u user:MOT_DE_PASSE_GENERE http://localhost:8080/api/tasks
```

Remplacez `MOT_DE_PASSE_GENERE` par celui affiché au démarrage. Il peut changer au redémarrage.

## TODO 2.4 — Observer les mutations

Connecté comme `user`, essayez de créer une tâche dans Planora et relevez le statut. Les lectures GET avec les bons identifiants doivent fonctionner. Les mutations peuvent être refusées avec `403` : Spring active la protection CSRF par défaut et le client ne transmet pas de jeton CSRF. Ne désactivez pas cette protection dans cet exercice ; l’adaptation à l’API sera faite en exercice 4.

## TODO 2.5 — Activer le test

Dans `src/test/java/fr/tpspringsecurity/TaskApiSecurityTest.java`, retirez `@Disabled` du test `exercice2LesRoutesDemandentUneConnexion`, puis lancez :

```bash
mvn test
```

Ce test vérifie les réponses anonymes des trois requêtes GET ; il ne teste pas les mutations.

## Questions

1. Quel composant fournit le compte temporaire `user` ?
2. Une règle distingue-t-elle déjà USER et ADMIN ? Comment le savez-vous ?
3. Pourquoi `/api/public/info` demande-t-elle une authentification ?
4. Pourquoi la création peut-elle répondre `403` alors que la lecture fonctionne ?

**Étape suivante :** dans `Tp_version3`, vous remplacerez le compte généré par Alice et Bob, tout en gardant cette configuration de sécurité par défaut.
