# Correction de l'exercice 4 — Contrôle des accès HTTP

**TP réalisé par :** Heitz Romaric, Khiri Amine, Benali Syrine, Van-Rossen-Martinez Alessandra et Denocq Elio.

`Tp_version5` implémente la règle finale au moyen du Bean `SecurityFilterChain`.

```java
@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    return http
        .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .csrf(csrf -> csrf.disable())
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

`SessionCreationPolicy.STATELESS` empêche d'utiliser une session HTTP pour garder l'état de connexion ; chaque requête fournit ses identifiants. La configuration désactive CSRF pour le client local fourni, qui envoie explicitement Authorization avec credentials: "omit". Les mutations fonctionnent alors avec un compte valide : POST 201, PUT/PATCH 200, DELETE 204. HTTP Basic ou STATELESS ne garantissent pas à eux seuls l’absence de risque CSRF ; ce choix doit être réévalué si le client ou l’authentification change. L'application est une démonstration locale ; HTTP Basic en production exige HTTPS.
