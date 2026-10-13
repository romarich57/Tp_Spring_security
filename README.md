# TP Spring Security — Version 1 / 6

**Exercice 1 : reperer une faille de securite dans une API REST volontairement ouverte.**

## Demarrer

Prerequis : Java 17+ et Maven 3.6.3+.

```bash
git clone https://github.com/romarich57/Tp_Spring_security.git
cd Tp_Spring_security
git switch Tp_version1
mvn clean test
mvn spring-boot:run
```

Tester les GET :
```bash
curl -i http://localhost:8080/api/public/info
curl -i http://localhost:8080/api/tasks
curl -i http://localhost:8080/api/admin/stats
```

## Parcours

- **[Enonce](ENONCE.md)** et **[feuille de reponses](docs/reponses/EXERCICE_1_A_COMPLETER.md)** : a remplir sans modifier le code.
- [Architecture et emplacement de chaque TODO](docs/ARCHITECTURE.md)
- [Plan des six branches](docs/PLAN_DU_TP.md)
- [Aide aux appels HTTP](docs/GUIDE_HTTP.md)

Lorsque l'exercice est termine, la branche `Tp_version2` apporte sa correction Markdown et lance l'exercice 2.

**API fictive vulnerable volontairement. A ne pas deployer en production.**
