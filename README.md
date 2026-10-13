# TP Spring Security — Version 4 / 6

**Exercice 4 : donner à chaque endpoint sa politique d'accès.**

Cette branche est un point de reprise autonome. Elle inclut toutes les solutions antérieures, **mais pas celle de l'exercice en cours** (sauf la version 6, intégralement corrigée).

## Démarrage

Java 17+, Maven 3.6.3+, terminal et Postman ou curl.

```bash
git clone https://github.com/romarich57/Tp_Spring_security.git
cd Tp_Spring_security
git switch Tp_version4
mvn clean test
mvn spring-boot:run
```

- [Consignes](ENONCE.md)
- [Plan de progression](docs/PLAN_DU_TP.md)
- [Guide des appels HTTP](docs/GUIDE_HTTP.md)
- [Corrections précédentes](docs/corrections/)
- [Requêtes HTTP prêtes à l'emploi](requests.http)

Comptes de démonstration : `alice / alice123` (USER), `bob / bob123` (ADMIN).
**Local uniquement : ne pas utiliser ces identifiants ou HTTP Basic sans HTTPS en production.**
