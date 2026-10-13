package fr.tpspringsecurity.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService(PasswordEncoder encoder) {
        UserDetails alice = User.withUsername("alice")
                .password(encoder.encode("alice123"))
                .roles("USER")
                .build();

        UserDetails bob = User.withUsername("bob")
                .password(encoder.encode("bob123"))
                .roles("ADMIN")
                .build();

        return new InMemoryUserDetailsManager(alice, bob);
    }
    // TODO EXERCICE 4.1 : Declarer un Bean SecurityFilterChain(HttpSecurity http).
    // TODO EXERCICE 4.2 : permitAll() sur GET /api/public/info.
    // TODO EXERCICE 4.3 : hasRole("ADMIN") sur GET /api/admin/**.
    // TODO EXERCICE 4.4 : authenticated() pour toutes les autres routes.
    // TODO EXERCICE 4.5 : HTTP Basic et sessions STATELESS.
}
