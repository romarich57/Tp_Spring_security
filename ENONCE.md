# Exercice 2 — Installer Spring Security (10 min)

La vulnérabilité de l'exercice 1 est expliquée dans [le corrigé](docs/corrections/EXERCICE_1.md).

1. Ouvrez `pom.xml` et ajoutez la dépendance `org.springframework.boot:spring-boot-starter-security` **sans numéro de version** (gérée par le parent Spring Boot).
2. Exécutez `mvn spring-boot:run`. Relevez le mot de passe généré dans la console (ligne `Using generated security password`).
3. Sans identifiants, testez les trois routes avec `curl -i` : quels statuts obtenez-vous ?
4. Testez `curl -i -u user:LE_MOT_DE_PASSE http://localhost:8080/api/tasks`.
5. Pourquoi même `/api/public/info` est-il désormais protégé ? Quelle différence entre la protection par défaut et un contrôle fin des rôles ?

Aucun `SecurityConfig` à écrire encore. **Résultat attendu : tous les GET refusent l'accès anonyme avec 401 dans ce scénario REST/HTTP Basic.**

Pour voir la correction en code, ouvrez ensuite `Tp_version3`.
