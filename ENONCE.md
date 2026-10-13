# Exercice 3 — Déclarer Alice et Bob (15 min)

Spring Security est installé. En HTTP Basic, la configuration par défaut protège déjà le CRUD de Planora, les statistiques et les informations publiques. Remplacez maintenant le compte généré par deux identités pédagogiques.

| Utilisateur | Mot de passe local | Rôle |
| --- | --- | --- |
| Alice | alice123 | USER |
| Bob | bob123 | ADMIN |

## Travail demandé

Dans src/main/java/fr/tpspringsecurity/config/UserConfig.java :

1. Déclarez un PasswordEncoder qui utilise BCryptPasswordEncoder.
2. Déclarez un UserDetailsService de type InMemoryUserDetailsManager.
3. Construisez Alice et Bob avec User.withUsername(...), encodez leurs mots de passe et attribuez leurs rôles.
4. Ne déclarez pas de SecurityFilterChain à cette étape : la politique par défaut reste appliquée.

## Vérifier dans Planora

1. Connectez-vous comme Alice puis comme Bob.
2. Pour chacun, consultez et modifiez une tâche.
3. Ouvrez Statistiques : les deux comptes peuvent encore y accéder.
4. Essayez un mauvais mot de passe et observez le 401.

L’identité est maintenant vérifiée, mais les rôles n’imposent pas encore de différence d’accès. Une route dont le chemin contient admin n’est pas protégée par son nom. Retirez @Disabled du test exercice3AliceEtBobPeuventSeConnecter dans TaskApiSecurityTest.java après avoir terminé UserConfig.

L’exercice suivant définira les règles d’autorisation dans SecurityFilterChain.
