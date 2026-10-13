# Exercice 4 — Définir les autorisations HTTP (10 min)

Alice (USER) et Bob (ADMIN) peuvent désormais s’authentifier et consulter Planora ; les mutations restent bloquées par CSRF. Pourtant, la configuration par défaut ne distingue pas leurs droits et ne rend pas les informations publiques accessibles anonymement.

## Configurer SecurityFilterChain

Dans src/main/java/fr/tpspringsecurity/config/SecurityConfig.java, ajoutez un bean SecurityFilterChain qui :

1. autorise GET /api/public/info avec permitAll() ;
2. réserve GET /api/admin/** au rôle ADMIN avec hasRole("ADMIN") ;
3. exige un compte authentifié pour toutes les autres requêtes, notamment toutes les opérations sur /api/tasks ;
4. active HTTP Basic et une session sans état adaptée à l’API ;
5. désactive CSRF pour cette API REST stateless, qui transmet l’authentification dans l’en-tête Authorization et n’utilise pas de cookie.

Placez les règles précises avant anyRequest().authenticated().

## Parcours de vérification

1. Sans compte, Planora refuse la liste des tâches. Vérifiez l’information publique avec curl : aucun écran React ne l’appelle.
2. Connectée comme Alice, l’étudiante peut créer, modifier et terminer des tâches ; Statistiques renvoie 403.
3. Connecté comme Bob, l’administrateur peut aussi ouvrir Statistiques.
4. Ouvrez Projet confidentiel : cette route sera créée à l’exercice 5. Elle renvoie donc 404 pour un compte authentifié à cette étape.

Vérifiez les réponses 200, 201, 204, 401 et 403. Si CSRF reste actif, Spring renvoie 403 aux requêtes de création, modification, clôture et suppression même avec Alice. Une URL ne protège rien par elle-même ; les décisions sont prises par Spring Security.

Une fois le bean terminé, retirez @Disabled du test exercice4LAccesPublicEtLesDroitsAdminSontRespectes dans TaskApiSecurityTest.java et lancez mvn test.

L’exercice suivant ajoute la ressource confidentielle et une règle au niveau d’une méthode Java.
