package fr.tpspringsecurity.config;

import org.springframework.context.annotation.Configuration;

/** Exercice 3 : gestion des utilisateurs, distincte des regles de securite HTTP. */
@Configuration
public class UserConfig {
    // TODO 3.1 : Ajouter un Bean PasswordEncoder qui retourne BCryptPasswordEncoder.
    // TODO 3.2 : Ajouter un Bean UserDetailsService qui recoit le PasswordEncoder.
    // TODO 3.3 : Creer alice (USER) et bob (ADMIN) via User.withUsername.
    // TODO 3.4 : Encoder les mots de passe et retourner InMemoryUserDetailsManager.
}
