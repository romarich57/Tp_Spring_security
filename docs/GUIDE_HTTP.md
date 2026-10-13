# Guide de test HTTP

Vous pouvez utiliser **Postman**, **Insomnia**, **curl** ou directement `requests.http` dans IntelliJ IDEA Ultimate (ou VS Code avec une extension HTTP).

## Sans authentification

```bash
curl -i http://localhost:8080/api/public/info
curl -i http://localhost:8080/api/tasks
curl -i http://localhost:8080/api/admin/stats
```

`-i` affiche le code HTTP et les en-têtes de réponse.

## Avec HTTP Basic (à partir de la version 4)

Dans Postman : onglet **Authorization** → **Basic Auth** → renseignez l'utilisateur et le mot de passe.

Avec curl :

```bash
curl -i -u alice:alice123 http://localhost:8080/api/tasks
curl -i -u alice:alice123 http://localhost:8080/api/admin/stats
curl -i -u bob:bob123 http://localhost:8080/api/admin/stats
```

## Interpréter les statuts

- **200 OK** : la requête est acceptée.
- **401 Unauthorized** : aucune identité valide n'a été fournie.
- **403 Forbidden** : identité valide, mais autorisation insuffisante.

### Attention

HTTP Basic envoie un mot de passe encodé en Base64 et **non chiffré** ; l'utilisation réelle nécessite HTTPS. Ce TP ne doit être exécuté qu'en local et n'utilise que des comptes fictifs.
