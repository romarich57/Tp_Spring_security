# Correction de l'exercice 3 — Comptes et BCrypt

Dans `Tp_version4`, `UserConfig.java` fournit deux Beans :

```java
@Bean
public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
}

@Bean
public UserDetailsService userDetailsService(PasswordEncoder encoder) {
    UserDetails alice = User.withUsername("alice")
        .password(encoder.encode("alice123")).roles("USER").build();
    UserDetails bob = User.withUsername("bob")
        .password(encoder.encode("bob123")).roles("ADMIN").build();
    return new InMemoryUserDetailsManager(alice, bob);
}
```

Le `PasswordEncoder` encode le mot de passe avant de l'enregistrer en mémoire et vérifie sa correspondance lors de la connexion. `.roles("ADMIN")` ajoute l'autorité `ROLE_ADMIN`.

**Attention :** les utilisateurs sont en mémoire, sans persistance. Les mots de passe sont fixes et volontairement faibles uniquement pour le TP ; en production : base de données, gestion des secrets, politique de mots de passe et HTTPS.

À ce stade, les deux utilisateurs sont authentifiables mais **leurs rôles ne sont pas encore utilisés pour les routes**.

Les lectures GET sont autorisées pour Alice et Bob, y compris les statistiques. Les mutations sans jeton CSRF restent refusées avec 403 jusqu’à l’exercice 4.
