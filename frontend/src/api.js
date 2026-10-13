// Le navigateur parle à Vite (5173). Le proxy Vite transmet /api à Spring Boot (8080).
// Pas de cookie, pas de localStorage, pas de persistance de mot de passe.
export const ENDPOINTS = Object.freeze([
  { id: "public", method: "GET", path: "/api/public/info", label: "Informations publiques", access: "Public", about: "Présenter les informations de l'application." },
  { id: "tasks", method: "GET", path: "/api/tasks", label: "Liste des tâches", access: "Authentifié", about: "Consulter les tâches de l'équipe." },
  { id: "admin", method: "GET", path: "/api/admin/stats", label: "Statistiques", access: "Administrateur", about: "Accéder aux chiffres réservés à l'administration." },
  { id: "confidential", method: "GET", path: "/api/tasks/confidential", label: "Projet confidentiel", access: "Administrateur", about: "Tester la sécurité sur une méthode Java." }
]);

export function endpointsFor(version) {
  return ENDPOINTS.filter((item) => item.id !== "confidential" || version >= 5);
}

export function basicAuthorization(username, password) {
  if (!username || !password) return null;
  const bytes = new TextEncoder().encode(username + ":" + password);
  let value = "";
  for (const byte of bytes) value += String.fromCharCode(byte);
  return "Basic " + btoa(value);
}

export function describeStatus(status) {
  if (status === 200) return { label: "Autorisé", tone: "success" };
  if (status === 401) return { label: "Non authentifié", tone: "warning" };
  if (status === 403) return { label: "Accès refusé", tone: "danger" };
  if (status === 404) return { label: "Endpoint absent", tone: "neutral" };
  if (status === 0) return { label: "API inaccessible", tone: "danger" };
  if (status >= 500) return { label: "Erreur serveur", tone: "danger" };
  return { label: "HTTP " + status, tone: "neutral" };
}

export async function requestEndpoint(endpoint, identity) {
  const started = performance.now();
  const auth = basicAuthorization(identity?.username, identity?.password);
  const headers = { Accept: "application/json" };
  if (auth) headers.Authorization = auth;

  try {
    const response = await fetch(endpoint.path, {
      method: endpoint.method,
      headers,
      cache: "no-store",
      credentials: "omit"
    });
    const raw = await response.text();
    let body = raw;
    if (raw && (response.headers.get("content-type") || "").includes("json")) {
      try { body = JSON.parse(raw); } catch { /* garder le texte brut */ }
    }
    return {
      status: response.status,
      body,
      duration: Math.round(performance.now() - started),
      at: new Date().toLocaleTimeString("fr-FR")
    };
  } catch (error) {
    return {
      status: 0,
      body: "Impossible de joindre l'API. Vérifiez que Spring Boot fonctionne sur le port 8080, puis réessayez.",
      error: String(error),
      duration: Math.round(performance.now() - started),
      at: new Date().toLocaleTimeString("fr-FR")
    };
  }
}

export function identityFor(key, custom) {
  if (key === "alice") return { username: "alice", password: "alice123" };
  if (key === "bob") return { username: "bob", password: "bob123" };
  if (key === "custom") return { username: custom?.username || "", password: custom?.password || "" };
  return null;
}
