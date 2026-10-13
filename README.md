# TP Spring Security — Version 1 / 6

**Étape actuelle : exercice 1 — repérer une faille de sécurité.**

Ce dépôt sert de fil conducteur à un TP de 60 minutes. Chaque branche constitue un point de reprise : elle inclut le code fonctionnel, les corrections des exercices précédents et les consignes de l'exercice à réaliser.

## Avant de commencer

- **Java 17 ou plus récent** (`java -version`).
- **Maven 3.6.3 ou plus récent** (`mvn -version`).
- Un client HTTP : Postman, Insomnia, curl ou le client HTTP d'IntelliJ.
- Aucun compte ni base de données nécessaires.

```bash
git clone https://github.com/romarich57/Tp_Spring_security.git
cd Tp_Spring_security
git switch Tp_version1
mvn spring-boot:run
```

L'application démarre sur **http://localhost:8080**. Exécutez les appels de `requests.http` ou utilisez :

```bash
curl -i http://localhost:8080/api/public/info
curl -i http://localhost:8080/api/tasks
curl -i http://localhost:8080/api/admin/stats
```

**Consignes :** [ENONCE.md](ENONCE.md) · **Plan des branches :** [docs/PLAN_DU_TP.md](docs/PLAN_DU_TP.md) · **Guide HTTP :** [docs/GUIDE_HTTP.md](docs/GUIDE_HTTP.md).

## Vérification

```bash
mvn test
```

À la fin de l'exercice, passez à `Tp_version2` : la correction de l'exercice 1 se trouvera dans `docs/corrections/EXERCICE_1.md`.

> Application fictive, volontairement vulnérable au départ : **ne pas déployer en production**.
