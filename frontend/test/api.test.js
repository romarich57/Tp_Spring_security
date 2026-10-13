import test from "node:test";
import assert from "node:assert/strict";
import { basicAuthorization, describeStatus, endpointsFor, identityFor } from "../src/api.js";

test("les visiteurs anonymes n'envoient pas d'authentification", () => {
  assert.equal(basicAuthorization("", ""), null);
  assert.equal(identityFor("anonymous"), null);
});

test("HTTP Basic utilise les identifiants fournis", () => {
  assert.equal(basicAuthorization("alice", "alice123"), "Basic YWxpY2U6YWxpY2UxMjM=");
  assert.equal(basicAuthorization("bob", "bob123"), "Basic Ym9iOmJvYjEyMw==");
});

test("un compte personnalise n'est pas enregistre dans le navigateur", () => {
  assert.deepEqual(identityFor("custom", { username: "user", password: "secret" }), {
    username: "user",
    password: "secret"
  });
});

test("les endpoints evoluent a l'exercice 5", () => {
  assert.equal(endpointsFor(1).length, 3);
  assert.equal(endpointsFor(4).length, 3);
  assert.equal(endpointsFor(5).length, 4);
  assert.equal(endpointsFor(6).length, 4);
});

test("les codes 200 401 403 et 404 sont differencies", () => {
  assert.equal(describeStatus(200).tone, "success");
  assert.equal(describeStatus(401).tone, "warning");
  assert.equal(describeStatus(403).tone, "danger");
  assert.equal(describeStatus(404).label, "Endpoint absent");
});
