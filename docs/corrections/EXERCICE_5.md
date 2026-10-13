# Correction de l'exercice 5 — @PreAuthorize

Dans `SecurityConfig.java` :

```java
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    // ... Beans PasswordEncoder, UserDetailsService et SecurityFilterChain
}
```

Dans `TaskController.java` :

```java
@GetMapping("/tasks/confidential")
@PreAuthorize("hasRole('ADMIN')")
public String confidential() {
    return "Projet confidentiel";
}
```

L'annotation est évaluée **avant l'appel de la méthode** grâce à `@EnableMethodSecurity`. Même si la règle HTTP générale demande seulement une identité sur `/api/tasks/confidential`, Alice est refusée (403), Bob peut accéder (200) et un visiteur anonyme reçoit 401.

`hasRole('ADMIN')` vérifie en réalité l'autorité `ROLE_ADMIN`, déclarée à l'exercice 3 via `.roles("ADMIN")`.

## Vérifier

```bash
mvn clean verify
curl -i -u alice:alice123 http://localhost:8080/api/tasks/confidential
curl -i -u bob:bob123 http://localhost:8080/api/tasks/confidential
```

Pour une vraie application : externaliser les comptes, sécuriser le transport avec TLS/HTTPS, envisager OIDC/OAuth2 selon l'architecture et tester les requêtes de mutation avec une politique CSRF adaptée.
