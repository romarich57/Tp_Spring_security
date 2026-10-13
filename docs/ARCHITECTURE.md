# Architecture : une responsabilite par composant

L'objectif du TP est **Spring Security**, pas l'implementation d'une base de donnees. Les controleurs et les services metier sont donc fournis aux etudiants.

```text
src/main/java/fr/tpspringsecurity/
  TpSpringSecurityApplication.java   # Démarrage Spring Boot
  controller/
    PublicController.java            # GET /api/public/info
    TaskController.java              # GET /api/tasks (+ confidential dans l'exercice 5)
    AdminController.java             # GET /api/admin/stats
  service/
    TaskService.java                 # Taches fictives et logique metier
    StatisticsService.java           # Statistiques fictives
  config/
    UserConfig.java                  # Comptes en memoire + BCrypt (a partir de la version 3)
    SecurityConfig.java              # Regles HTTP et methode (a partir de la version 3/4)
```

## Frontieres entre les responsabilites

| Composant | Ce qu'il doit faire | Ce qu'il ne doit PAS faire |
| --- | --- | --- |
| Controleurs | Exposer les URL, recevoir et retourner les donnees HTTP | Gerer les mots de passe ou stocker des donnees metier |
| Services | Fournir les fonctionnalites metier, independamment du protocole HTTP | Configurer l'authentification ou choisir les codes HTTP |
| UserConfig | Definir le `PasswordEncoder` et charger les comptes de demo | Proteger des chemins URL |
| SecurityConfig | Declarer les politiques d'acces (HTTP et annotations) | Stocker les taches ou creer les utilisateurs |
| Tests | Verifier les comportements annonces | Exposer des fonctionnalites applicatives |

**Ne confondez pas** `AdminController` (simple point d'entree HTTP) avec une autorisation. C'est `SecurityConfig` qui protege `/api/admin/**`, a partir de l'exercice 4.

## Emplacement des travaux a completer

| Version de depart | Fichier a modifier | Consigne |
| --- | --- | --- |
| 1 | `docs/reponses/EXERCICE_1_A_COMPLETER.md` | Observer, pas coder |
| 2 | `pom.xml` | Ajouter Spring Security |
| 3 | `config/UserConfig.java` | BCrypt et les deux comptes |
| 4 | `config/SecurityConfig.java` | Regles de `SecurityFilterChain` |
| 5 | `controller/TaskController.java` et `config/SecurityConfig.java` | `@PreAuthorize`, activation de la securite des methodes |
| 6 | Aucun | Corriges et tests finaux |

**La regle pedagogique :** une seule fonctionnalite a implementer a la fois ; les etapes anterieures sont fonctionnelles et chaque point de depart compile.
