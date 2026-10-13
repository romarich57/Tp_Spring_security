# Correction de l'exercice 4 — Contrôle des accès HTTP

`Tp_version5` implémente la règle finale au moyen du Bean `SecurityFilterChain`.

```java
@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    return http
        .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(auth -> auth
            .requestMatchers(HttpMethod.GET, "/api/public/info").permitAll()
            .requestMatchers(HttpMethod.GET, "/api/admin/**").hasRole("ADMIN")
            .anyRequest().authenticated()
        )
        .httpBasic(withDefaults())
        .build();
}
```

Importer `HttpMethod`, `SessionCreationPolicy`, `SecurityFilterChain` et `withDefaults` comme dans le fichier complet.

| URL | Anonyme | Alice USER | Bob ADMIN |
| --- | --- | --- | --- |
| `/api/public/info` | 200 | 200 | 200 |
| `/api/tasks` | 401 | 200 | 200 |
| `/api/admin/stats` | 401 | 403 | 200 |

HTTP Basic : une identité absente ou invalide produit **401**, tandis qu'Alice authentifiée n'a pas la permission ADMIN (**403**).

`SessionCreationPolicy.STATELESS` empêche d'utiliser une session HTTP pour garder l'état de connexion ; chaque requête fournit ses identifiants. Les routes étudiées sont des GET : la protection CSRF reste activée par défaut pour les autres méthodes. L'application est une démonstration locale ; HTTP Basic en production exige HTTPS.
