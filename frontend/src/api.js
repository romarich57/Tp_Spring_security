export function basicAuthorization(username, password) {
  if (!username || !password) return null;
  const bytes = new TextEncoder().encode(username + ":" + password);
  let binary = "";
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return "Basic " + btoa(binary);
}

export async function apiRequest(path, { method = "GET", body, credentials } = {}) {
  const headers = { Accept: "application/json" };
  const authorization = credentials && basicAuthorization(credentials.username, credentials.password);
  if (authorization) headers.Authorization = authorization;
  if (body !== undefined) headers["Content-Type"] = "application/json";
  try {
    const response = await fetch(path, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      cache: "no-store",
      credentials: "omit"
    });
    const text = await response.text();
    let data = text;
    if (text && (response.headers.get("content-type") || "").includes("json")) {
      try { data = JSON.parse(text); } catch { /* Réponse texte reçue. */ }
    }
    return { ok: response.ok, status: response.status, data };
  } catch {
    return { ok: false, status: 0, data: "Impossible de joindre l’API. Vérifiez que Spring Boot fonctionne sur le port 8080." };
  }
}

export function getErrorMessage(result) {
  if (result.status === 0) return result.data;
  if (result.status === 401) return "HTTP 401 — authentification requise ou identifiants incorrects.";
  if (result.status === 403) return "HTTP 403 — accès refusé par la politique de sécurité du serveur.";
  if (result.status === 404) return "HTTP 404 — cette tâche ou cette route n’existe pas.";
  if (result.status === 400) return "HTTP 400 — vérifiez les informations saisies.";
  const detail = typeof result.data === "string" ? result.data : result.data?.message;
  return "HTTP " + result.status + (detail ? " — " + detail : " — la requête a échoué.");
}
