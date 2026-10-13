# TP Spring Security — Java, Spring Boot et React

Un atelier de **60 minutes de travaux pratiques** conçu pour accompagner **30 minutes d'explications** sur Spring Security : authentification, autorisations HTTP, rôles, BCrypt et `@PreAuthorize`.

**Support du TP : [PDF](Tp.pdf) · [source LaTeX](Tp.tex) · [source Markdown](Tp.md).** Les fichiers du sujet sont centralisés dans cette branche `main`.

**Commencer ici : [Tp_version1 — premier exercice](https://github.com/romarich57/Tp_Spring_security/tree/Tp_version1).**

Chaque branche est un **point de reprise autonome**. Elle contient les corrections précédentes, les consignes de l'exercice en cours (`ENONCE.md`) et une interface **React interactive** pour tester les vraies réponses de l'API.

| Branche | Objectif | Ce qui est déjà corrigé |
| --- | --- | --- |
| [Tp_version1](https://github.com/romarich57/Tp_Spring_security/tree/Tp_version1) | Diagnostiquer les failles d'accès (10 min) | Rien : API volontairement ouverte |
| [Tp_version2](https://github.com/romarich57/Tp_Spring_security/tree/Tp_version2) | Ajouter Spring Security (10 min) | Exercice 1, corrigé Markdown |
| [Tp_version3](https://github.com/romarich57/Tp_Spring_security/tree/Tp_version3) | Configurer Alice, Bob et BCrypt (15 min) | Exercices 1–2 |
| [Tp_version4](https://github.com/romarich57/Tp_Spring_security/tree/Tp_version4) | Définir les règles de `SecurityFilterChain` (10 min) | Exercices 1–3 |
| [Tp_version5](https://github.com/romarich57/Tp_Spring_security/tree/Tp_version5) | Protéger une méthode avec `@PreAuthorize` (10 min) | Exercices 1–4 |
| [Tp_version6](https://github.com/romarich57/Tp_Spring_security/tree/Tp_version6) | Tester le corrigé complet (5 min) | Exercices 1–5 |

## Démarrer le TP avec l'interface React

Prérequis : **Java 17+**, **Maven**, **Node.js 22 recommandé**.

```bash
git clone https://github.com/romarich57/Tp_Spring_security.git
cd Tp_Spring_security
git switch Tp_version1
```

**Terminal 1 — backend Java :**

```bash
mvn spring-boot:run
```

**Terminal 2 — frontend React, à partir de la racine :**

```bash
cd frontend
npm install
npm run dev
```

Ouvrir **http://localhost:5173**. React transmet les appels `/api` à Spring Boot sur **http://localhost:8080** grâce au proxy Vite. Il affiche les statuts retournés par le backend, sans simulation.

À chaque exercice, les étudiants complètent les `TODO` dans les fichiers mentionnés par l'énoncé. Les tests d'acceptation des exercices 2 à 5 sont d'abord désactivés avec `@Disabled` et s'activent une fois le code terminé.

## Passer à la version suivante

1. **Enregistrer ses modifications** avec un commit local (`git add -A && git commit -m "solution exercice"`) ou un stash (`git stash push -u -m "TP"`).
2. Arrêter Spring Boot et Vite (`Ctrl+C`).
3. Passer à `Tp_version2` (puis 3, 4, etc.) avec `git switch Tp_version2`.
4. Relancer les deux serveurs pour voir la nouvelle version.

**Attention :** ouvrir une branche sur GitHub ne change pas la branche de votre ordinateur. Et changer de branche ne recharge pas le Java déjà lancé.

## Pour l'enseignant

- [Plan pédagogique (60 minutes)](https://github.com/romarich57/Tp_Spring_security/blob/Tp_version1/docs/PLAN_DU_TP.md)
- [Matrice des scénarios avant/après chaque exercice](https://github.com/romarich57/Tp_Spring_security/blob/Tp_version1/docs/SCENARIOS_DE_TEST.md)
- [Architecture et séparation des responsabilités](https://github.com/romarich57/Tp_Spring_security/blob/Tp_version1/docs/ARCHITECTURE.md)
- [Guide de l'interface React](https://github.com/romarich57/Tp_Spring_security/blob/Tp_version1/frontend/README.md)
- [Tests automatisés GitHub Actions](https://github.com/romarich57/Tp_Spring_security/actions)

> Projet pédagogique à utiliser **uniquement en local** avec des comptes fictifs. HTTP Basic sans HTTPS, secrets de démonstration en dur et stockage des utilisateurs en mémoire ne sont pas adaptés à la production.
