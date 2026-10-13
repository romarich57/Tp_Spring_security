# Correction de l'exercice 2 — Activer Spring Security

La dépendance à ajouter à `pom.xml` est :

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

Dans `Tp_version3`, cette dépendance est déjà installée. **Aucune configuration HTTP personnalisée** : Spring Boot installe les mécanismes de sécurité par défaut.

- Un utilisateur `user` et un mot de passe aléatoire sont générés au démarrage (tant que vous ne fournissez pas votre propre `UserDetailsService`).
- Par défaut, toutes les routes nécessitent une authentification.
- Pour les lectures GET avec `curl -i` (client ne négociant pas le formulaire HTML), accès anonyme → **401**.
- Avec `curl -i -u user:... http://localhost:8080/api/tasks`, accès accepté → **200**.

Sans jeton CSRF, les mutations POST, PUT, PATCH et DELETE renvoient **403**, avec ou sans compte. Ce refus n’indique pas un rôle insuffisant : l’exercice 4 adaptera la configuration au client fourni.

Si votre client navigateur affiche un formulaire de connexion au lieu d'un 401, c'est normal : la sécurité par défaut peut négocier un formulaire selon le type de requête. Utilisez curl ou Postman avec Basic Auth pour reproduire le résultat du TP.
