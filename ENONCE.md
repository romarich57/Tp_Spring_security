# Exercice 2 — Activer Spring Security (10 min)

La correction de l'audit est disponible dans [EXERCICE_1.md](docs/corrections/EXERCICE_1.md).

## TODO 2.1 — Ajouter la dependance

Dans le fichier `pom.xml`, remplacez le commentaire `TODO EXERCICE 2` par la dependance `org.springframework.boot:spring-boot-starter-security`. La version de cette dependance est geree par le parent Spring Boot.

## TODO 2.2 — Observer la protection automatique

1. Relancez `mvn spring-boot:run` et relevez le **mot de passe genere** dans la console.
2. Testez les trois routes sans authentification, a l'aide de `curl -i` ou de Postman en mode Basic Auth.
3. Notez le nouveau code HTTP de chaque route (attendu : **401** en HTTP Basic sans identifiants).
4. Testez `curl -i -u user:MOT_DE_PASSE http://localhost:8080/api/tasks`.

## TODO 2.3 — Expliquer

Pourquoi `/api/public/info` devient-il aussi protege ? A-t-on deja implemente une restriction reservee aux administrateurs ?

**Verification automatisee :** apres avoir ajoute la dependance, retirez `@Disabled` de la methode `exercice2LesRoutesDemandentUneConnexion` dans `TaskApiSecurityTest.java` puis lancez `mvn test`.

**Aucune classe de configuration a coder pour cet exercice.** La solution en code et les tests d'authentification apparaissent dans `Tp_version3`.
