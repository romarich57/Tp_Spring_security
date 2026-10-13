package fr.tpspringsecurity.config;

import org.springframework.context.annotation.Configuration;

@Configuration
public class SecurityConfig {
    // TODO 4.1 : Declarer @Bean SecurityFilterChain(HttpSecurity http).
    // TODO 4.2 : Autoriser GET /api/public/info avec permitAll().
    // TODO 4.3 : Restreindre GET /api/admin/** avec hasRole("ADMIN").
    // TODO 4.4 : Exiger authenticated() pour les autres routes.
    // TODO 4.5 : Activer HTTP Basic et SessionCreationPolicy.STATELESS.
    // TODO 4.6 : Desactiver CSRF pour les requetes REST sans session ni cookie.
}
