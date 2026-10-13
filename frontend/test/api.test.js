import test from "node:test";
import assert from "node:assert/strict";
import { EXERCISES, IDENTITIES } from "../src/exercises.js";
import { basicAuthorization, describeStatus, endpointsFor, identityFor } from "../src/api.js";

test("parcours pedagogique de 60 minutes et six exercices", () => {
  assert.equal(EXERCISES.length, 6);
  assert.equal(EXERCISES.map(x => Number.parseInt(x.duration, 10)).reduce((a,b)=>a+b,0), 60);
  assert.equal(IDENTITIES.length, 4);
});

test("les visiteurs anonymes n'envoient pas d'authentification", () => {
  assert.equal(basicAuthorization("", ""), null);
  assert.equal(identityFor("anonymous"), null);
});

test("HTTP Basic utilise les comptes pedagogiques", () => {
  assert.equal(basicAuthorization("alice", "alice123"), "Basic YWxpY2U6YWxpY2UxMjM=");
  assert.equal(basicAuthorization("bob", "bob123"), "Basic Ym9iOmJvYjEyMw==");
});

test("un profil personnalise est transforme uniquement en identifiants de requete", () => {
  assert.deepEqual(identityFor("custom", { username: "user", password: "secret" }), { username: "user", password: "secret" });
});

test("les endpoints evoluent a l'exercice 5", () => {
  assert.equal(endpointsFor(1).length, 3);
  assert.equal(endpointsFor(4).length, 3);
  assert.equal(endpointsFor(5).length, 4);
  assert.equal(endpointsFor(6).length, 4);
});

test("les statuts de securite sont differencies", () => {
  for (const [status, tone] of [[200, "success"],[401, "warning"],[403, "danger"],[404, "neutral"],[0, "danger"]]) {
    assert.equal(describeStatus(status).tone, tone);
  }
});
