# Exercice 2 — Ajouter Spring Security (10 min)

Planora utilise déjà une API CRUD complète : vous allez d’abord constater l’accès actuel, puis ajouter la première couche de protection dans le backend.

## 1. Avant la correction

1. Lancez Spring Boot et Planora selon le guide frontend/README.md.
2. Sans connexion, consultez les tâches, créez-en une et ouvrez les statistiques.
3. Observez les réponses 200/201 : toutes les routes de l’API sont encore accessibles.

## 2. Ajouter la dépendance

Dans pom.xml, remplacez le commentaire de l’exercice 2 par la dépendance org.springframework.boot:spring-boot-starter-security. Sa version est gérée par le parent Spring Boot.

Relancez mvn spring-boot:run et relevez dans la console le mot de passe temporaire généré pour user.

## 3. Observer la protection par défaut

1. Rejouez les requêtes vers /api/public/info, /api/tasks, /api/admin/stats et les opérations POST, PUT, PATCH, DELETE.
2. Sans authentification, les lectures GET JSON doivent renvoyer 401, y compris l’information publique. Les mutations sans jeton CSRF renvoient 403, avec ou sans compte.
3. Dans le formulaire Planora, essayez user et le mot de passe temporaire. Les lectures fonctionnent pour ce compte.
4. Expliquez pourquoi l’ajout de la dépendance n’a pas encore créé une règle ADMIN.

Spring Security active aussi CSRF par défaut : avec HTTP Basic, les lectures GET passent, mais les mutations sans jeton renvoient 403. L’exercice 4 adaptera cette protection au client REST stateless afin que POST, PUT, PATCH et DELETE fonctionnent.

Après avoir ajouté la dépendance, retirez @Disabled du test exercice2LesRoutesDemandentUneConnexion dans TaskApiSecurityTest.java, puis lancez mvn test.

La prochaine étape remplace le compte généré par Alice et Bob. L’interface Planora reste inchangée.
