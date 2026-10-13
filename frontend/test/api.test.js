import test from "node:test";
import assert from "node:assert/strict";
import { apiRequest, basicAuthorization, getErrorMessage } from "../src/api.js";

test("HTTP Basic encode les identifiants du formulaire", () => {
  assert.equal(basicAuthorization("", ""), null);
  assert.equal(basicAuthorization("alice", "alice123"), "Basic YWxpY2U6YWxpY2UxMjM=");
  assert.equal(basicAuthorization("bob", "bob123"), "Basic Ym9iOmJvYjEyMw==");
});

test("apiRequest envoie Basic et JSON sans persister de cookie", async () => {
  const originalFetch = globalThis.fetch;
  let received;
  globalThis.fetch = async (_url, options) => {
    received = options;
    return new Response(JSON.stringify({ id: 4 }), { status: 201, headers: { "content-type": "application/json" } });
  };
  try {
    const result = await apiRequest("/api/tasks", {
      method: "POST",
      credentials: { username: "alice", password: "alice123" },
      body: { title: "Préparer la démo" }
    });
    assert.equal(result.ok, true);
    assert.equal(result.status, 201);
    assert.deepEqual(result.data, { id: 4 });
    assert.equal(received.headers.Authorization, "Basic YWxpY2U6YWxpY2UxMjM=");
    assert.equal(received.headers["Content-Type"], "application/json");
    assert.equal(received.credentials, "omit");
    assert.equal(received.body, JSON.stringify({ title: "Préparer la démo" }));
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("les erreurs d'authentification sont présentées clairement", () => {
  assert.match(getErrorMessage({ status: 401 }), /authentification requise/);
  assert.match(getErrorMessage({ status: 403 }), /rôle nécessaire/);
  assert.match(getErrorMessage({ status: 404 }), /n’existe pas/);
});
