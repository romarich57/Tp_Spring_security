# TP Spring Security — Version 6 / 6 (corrigé intégral)

Cette branche contient **tous les exercices corrigés**, leurs explications Markdown et les tests HTTP automatisés. Reprenez un exercice précédent depuis `Tp_version1` à `Tp_version5`.

## Prérequis

- Java 17+ ;
- Maven 3.6.3+ ;
- Postman ou curl (optionnels : les tests Maven couvrent les scénarios).

## Installation et lancement

```bash
git clone https://github.com/romarich57/Tp_Spring_security.git
cd Tp_Spring_security
git switch Tp_version6
mvn clean verify
mvn spring-boot:run
```

Application : `http://localhost:8080`.

## Identifiants de démonstration (uniquement en local)

- Alice : `alice` / `alice123` — USER ;
- Bob : `bob` / `bob123` — ADMIN.

## Vérification manuelle

```bash
curl -i http://localhost:8080/api/public/info
curl -i http://localhost:8080/api/tasks
curl -i -u alice:alice123 http://localhost:8080/api/tasks
curl -i -u alice:alice123 http://localhost:8080/api/admin/stats
curl -i -u bob:bob123 http://localhost:8080/api/admin/stats
curl -i -u alice:alice123 http://localhost:8080/api/tasks/confidential
curl -i -u bob:bob123 http://localhost:8080/api/tasks/confidential
```

Consultez [le tableau de validation](ENONCE.md), [le plan](docs/PLAN_DU_TP.md) et les [corrections](docs/corrections/).

**Projet pédagogique non destiné à un déploiement :** comptes en mémoire, mots de passe fixes, HTTP Basic non chiffré sur HTTP local.
