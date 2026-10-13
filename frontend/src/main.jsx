import { useCallback, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Activity, ArrowDownUp, ArrowRight, BarChart3, CalendarDays, Check, CheckCircle2, ChevronDown, CircleHelp, ClipboardList, Clock3, LockKeyhole, LogIn, LogOut, Menu, MoreHorizontal, Plus, Search, ShieldCheck, SlidersHorizontal, Sparkles, Trash2, X, XCircle } from "lucide-react";
import { apiRequest, getErrorMessage } from "./api.js";
import "./style.css";

const initials = (name = "Invité") => name.trim().slice(0, 1).toUpperCase() || "I";
const dateLabel = (value) => {
  if (!value) return "Sans échéance";
  const date = new Date(value + "T12:00:00");
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short" }).format(date);
};
const priorityLabels = { HIGH: "Haute", MEDIUM: "Moyenne", LOW: "Basse" };
const statusLabels = { TODO: "À faire", IN_PROGRESS: "En cours", DONE: "Terminée" };

function App() {
  const [page, setPage] = useState("tasks");
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [confidential, setConfidential] = useState(null);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [identity, setIdentity] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [filter, setFilter] = useState("ALL");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const request = useCallback((path, options = {}) => apiRequest(path, { ...options, credentials: identity ? credentials : null }), [credentials, identity]);
  const loadTasks = useCallback(async () => {
    const result = await request("/api/tasks");
    if (!result.ok) throw new Error(getErrorMessage(result));
    setTasks(Array.isArray(result.data) ? result.data : []);
  }, [request]);
  const loadStats = useCallback(async () => {
    const result = await request("/api/admin/stats");
    if (!result.ok) throw new Error(getErrorMessage(result));
    setStats(result.data);
  }, [request]);
  const loadConfidential = useCallback(async () => {
    const result = await request("/api/tasks/confidential");
    if (!result.ok) throw new Error(getErrorMessage(result));
    setConfidential(result.data);
  }, [request]);
  const refresh = useCallback(async (target = page) => {
    setLoading(true);
    setMessage(null);
    try {
      if (target === "tasks") await loadTasks();
      if (target === "stats") await loadStats();
      if (target === "confidential") await loadConfidential();
      setMessage({ tone: "success", text: "Données actualisées depuis Spring." });
    } catch (error) {
      setMessage({ tone: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  }, [loadConfidential, loadStats, loadTasks, page]);
  useEffect(() => { refresh("tasks"); }, [loadTasks]);
  const visibleTasks = useMemo(() => tasks.filter((task) => {
    const matchesFilter = filter === "ALL" || task.status === filter;
    const text = (task.title + " " + (task.description || "")).toLocaleLowerCase("fr");
    return matchesFilter && text.includes(query.toLocaleLowerCase("fr"));
  }), [filter, query, tasks]);
  const doneCount = tasks.filter((task) => task.status === "DONE").length;
  const activeCount = tasks.length - doneCount;
  const completion = tasks.length ? Math.round((doneCount / tasks.length) * 100) : 0;
  function navigate(nextPage) {
    setPage(nextPage);
    setMenuOpen(false);
    refresh(nextPage);
  }
  async function submitLogin(event) {
    event.preventDefault();
    setIdentity(credentials.username.trim());
    setLoginOpen(false);
    setMessage({ tone: "info", text: "Identifiants enregistrés en mémoire. Le serveur vérifiera les droits à la prochaine requête." });
    setLoading(true);
    try {
      const result = await apiRequest("/api/tasks", { credentials });
      if (!result.ok) throw new Error(getErrorMessage(result));
      setTasks(Array.isArray(result.data) ? result.data : []);
      setMessage({ tone: "success", text: "Requête acceptée par Spring pour « " + credentials.username.trim() + " »." });
    } catch (error) {
      setMessage({ tone: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  }
  function logout() {
    setIdentity(null);
    setCredentials({ username: "", password: "" });
    setMessage({ tone: "info", text: "Les identifiants ont été effacés de la mémoire du navigateur." });
  }
  async function saveTask(task) {
    setLoading(true);
    setMessage(null);
    const path = editing ? "/api/tasks/" + editing.id : "/api/tasks";
    const result = await request(path, { method: editing ? "PUT" : "POST", body: task });
    setLoading(false);
    if (!result.ok) {
      setMessage({ tone: "error", text: getErrorMessage(result) });
      return;
    }
    setFormOpen(false);
    setMessage({ tone: "success", text: editing ? "Tâche modifiée." : "Tâche créée." });
    setEditing(null);
    await loadTasks();
  }
  async function completeTask(task) {
    setLoading(true);
    const result = await request("/api/tasks/" + task.id + "/complete", { method: "PATCH" });
    setLoading(false);
    if (!result.ok) return setMessage({ tone: "error", text: getErrorMessage(result) });
    setMessage({ tone: "success", text: "« " + task.title + " » est terminée." });
    await loadTasks();
  }
  async function deleteTask(task) {
    setLoading(true);
    const result = await request("/api/tasks/" + task.id, { method: "DELETE" });
    setLoading(false);
    if (!result.ok) return setMessage({ tone: "error", text: getErrorMessage(result) });
    setMessage({ tone: "success", text: "« " + task.title + " » a été supprimée." });
    await loadTasks();
  }
  const headings = {
    tasks: ["Espace de travail", "Mes tâches", "Organisez le travail de l’équipe et suivez ce qui avance."],
    stats: ["Administration", "Statistiques", "Une vue d’ensemble calculée par l’API Spring."],
    confidential: ["Espace restreint", "Projet confidentiel", "Cette ressource est protégée par les règles du serveur."]
  };
  const [eyebrow, title, subtitle] = headings[page];
  return <div className="app-shell">
    <aside className={"sidebar " + (menuOpen ? "sidebar-open" : "")}>
      <a className="brand" href="#tasks" onClick={(event) => { event.preventDefault(); navigate("tasks"); }}><span className="brand-mark"><Check size={21} strokeWidth={3} /></span><span className="brand-name">planora<small>ESPACE DE TRAVAIL</small></span></a>
      <div className="workspace-select"><span className="workspace-avatar">N</span><span><b>Novalabs</b><small>Équipe produit</small></span><ChevronDown size={15} /></div>
      <div className="nav-caption">ESPACE</div>
      <nav className="main-nav" aria-label="Navigation principale">
        <button className={page === "tasks" ? "active" : ""} onClick={() => navigate("tasks")}><ClipboardList size={17} />Mes tâches<span className="nav-count">{activeCount}</span></button>
        <button className={page === "stats" ? "active" : ""} onClick={() => navigate("stats")}><BarChart3 size={17} />Statistiques</button>
        <button className={page === "confidential" ? "active" : ""} onClick={() => navigate("confidential")}><LockKeyhole size={17} />Projet confidentiel</button>
      </nav>
      <div className="sidebar-bottom"><div className="tip-card"><Sparkles size={17} /><b>Un pas à la fois</b><p>Terminez une tâche pour faire avancer le projet.</p></div><div className="profile-row"><span className="profile-avatar">{initials(identity || "Invité")}</span><span className="profile-text"><b>{identity || "Visiteur"}</b><small>{identity ? "Identifiants actifs" : "Non connecté"}</small></span><button className="icon-button profile-menu" aria-label={identity ? "Se déconnecter" : "Se connecter"} onClick={() => identity ? logout() : setLoginOpen(true)}>{identity ? <LogOut size={16} /> : <LogIn size={16} />}</button></div></div>
    </aside>
    <main className="main-content">
      <header className="topbar"><button className="mobile-menu icon-button" aria-label="Ouvrir le menu" onClick={() => setMenuOpen(!menuOpen)}><Menu size={19} /></button><div className="breadcrumbs">Novalabs <span>/</span> <b>{eyebrow}</b></div><div className="topbar-actions"><span className="api-status"><i /> API Spring</span>{identity ? <button className="user-chip" onClick={logout}><span>{initials(identity)}</span>{identity}<LogOut size={14} /></button> : <button className="button button-secondary login-button" onClick={() => setLoginOpen(true)}><LogIn size={16} />Connexion</button>}</div></header>
      <div className="page-wrap">
        <section className="welcome"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{subtitle}</p></div>{page === "tasks" && <button className="button button-primary" onClick={() => { setEditing(null); setFormOpen(true); }}><Plus size={17} />Nouvelle tâche</button>}</section>
        {message && <div className={"toast toast-" + message.tone} role="status"><span>{message.tone === "error" ? <XCircle size={17} /> : message.tone === "success" ? <CheckCircle2 size={17} /> : <CircleHelp size={17} />}</span><p>{message.text}</p><button className="icon-button" aria-label="Fermer" onClick={() => setMessage(null)}><X size={16} /></button></div>}
        {page === "tasks" && <>
          <section className="summary-grid">
            <article className="summary-card"><div className="summary-top"><span>Toutes les tâches</span><span className="summary-icon purple"><ClipboardList size={18} /></span></div><strong>{tasks.length}</strong><small>Dans votre espace</small></article>
            <article className="summary-card"><div className="summary-top"><span>En cours</span><span className="summary-icon blue"><Activity size={18} /></span></div><strong>{activeCount}</strong><small>À faire ou en progression</small></article>
            <article className="summary-card"><div className="summary-top"><span>Terminées</span><span className="summary-icon green"><CheckCircle2 size={18} /></span></div><strong>{doneCount}</strong><small>{completion}% du travail accompli</small></article>
            <article className="progress-card"><div className="progress-copy"><span>Avancement du projet</span><strong>{completion}%</strong></div><div className="progress-bar"><span style={{ width: completion + "%" }} /></div><small>{doneCount} sur {tasks.length} tâches terminées</small></article>
          </section>
          <section className="task-section">
            <div className="section-title-row"><div><h2>Liste des tâches</h2><p>Consultez et mettez à jour le travail de l’équipe.</p></div><button className="icon-button refresh-button" aria-label="Actualiser" onClick={() => refresh("tasks")} disabled={loading}><ArrowDownUp size={17} /></button></div>
            <div className="task-toolbar"><div className="filter-tabs" role="tablist" aria-label="Filtrer les tâches">{[["ALL", "Toutes"], ["TODO", "À faire"], ["IN_PROGRESS", "En cours"], ["DONE", "Terminées"]].map(([key, label]) => <button key={key} className={filter === key ? "selected" : ""} onClick={() => setFilter(key)}>{label}{key === "ALL" && <span>{tasks.length}</span>}</button>)}</div><label className="search-box"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher une tâche" /></label><button className="filter-button"><SlidersHorizontal size={15} />Filtres</button></div>
            <div className="task-list">{loading && tasks.length === 0 ? <div className="empty-state"><div className="loader" /><b>Chargement des tâches…</b></div> : visibleTasks.length ? visibleTasks.map((task) => <TaskRow key={task.id} task={task} onComplete={() => completeTask(task)} onEdit={() => { setEditing(task); setFormOpen(true); }} onDelete={() => deleteTask(task)} />) : <div className="empty-state"><span className="empty-icon"><Search size={22} /></span><b>{tasks.length ? "Aucune tâche dans cette vue" : "Aucune tâche pour le moment"}</b><p>{tasks.length ? "Essayez un autre filtre ou une autre recherche." : "Créez votre première tâche pour commencer."}</p>{!tasks.length && <button className="button button-primary" onClick={() => setFormOpen(true)}><Plus size={16} />Créer une tâche</button>}</div>}</div>
            <div className="list-footer"><span>Affichage de <b>{visibleTasks.length}</b> sur <b>{tasks.length}</b> tâches</span><span>Les données sont servies par Spring Boot</span></div>
          </section>
        </>}
        {page === "stats" && <section className="data-panel"><div className="section-title-row"><div><h2>Statistiques de l’espace</h2><p>Chiffres calculés à partir des tâches courantes.</p></div><button className="button button-secondary" onClick={() => refresh("stats")} disabled={loading}><ArrowDownUp size={16} />Actualiser</button></div>{stats ? <StatsView stats={stats} /> : <AccessState loading={loading} message={message?.text} onRetry={() => refresh("stats")} />}</section>}
        {page === "confidential" && <section className="confidential-panel"><div className="confidential-art"><div className="lock-orbit"><LockKeyhole size={32} /></div><span className="orbit orbit-one" /><span className="orbit orbit-two" /></div><div className="confidential-copy"><span className="secure-label"><ShieldCheck size={15} />RESSOURCE PROTÉGÉE</span><h2>Projet confidentiel</h2><p>Cette note de l’équipe est exposée par l’API et son accès est contrôlé côté Spring Security.</p>{confidential ? <div className="secret-note">{typeof confidential === "string" ? confidential : confidential.message || JSON.stringify(confidential)}</div> : <AccessState loading={loading} message={message?.text} onRetry={() => refresh("confidential")} />}</div></section>}
        <footer className="page-footer"><span><ShieldCheck size={15} />Application pédagogique · données conservées en mémoire</span><span>SPRING SECURITY · TP</span></footer>
      </div>
    </main>
    {formOpen && <TaskDialog task={editing} onClose={() => { setFormOpen(false); setEditing(null); }} onSave={saveTask} busy={loading} />}
    {loginOpen && <LoginDialog credentials={credentials} onChange={setCredentials} onClose={() => setLoginOpen(false)} onSubmit={submitLogin} busy={loading} />}
  </div>;
}

function TaskRow({ task, onComplete, onEdit, onDelete }) {
  const status = task.status || "TODO";
  const priority = task.priority || "MEDIUM";
  return <article className={"task-row " + (status === "DONE" ? "task-done" : "")}>
    <button className={"task-check " + (status === "DONE" ? "checked" : "")} aria-label={status === "DONE" ? "Tâche terminée" : "Terminer la tâche"} onClick={onComplete} disabled={status === "DONE"}><Check size={15} /></button>
    <div className="task-main"><h3>{task.title}</h3><p>{task.description || "Aucune description"}</p><div className="task-meta"><span className={"status-tag status-" + status.toLowerCase()}><i />{statusLabels[status] || statusLabels.TODO}</span><span className={"priority priority-" + priority.toLowerCase()}><i />{priorityLabels[priority] || priorityLabels.MEDIUM}</span><span className="due-date"><CalendarDays size={13} />{dateLabel(task.dueDate)}</span></div></div>
    <div className="task-assignee"><span className="assignee-avatar">{task.assignee ? initials(task.assignee) : "É"}</span><span>{task.assignee || "Équipe"}</span></div>
    <div className="task-actions"><button className="icon-button" aria-label="Modifier la tâche" onClick={onEdit}><MoreHorizontal size={19} /></button><button className="icon-button delete-action" aria-label="Supprimer la tâche" onClick={onDelete}><Trash2 size={16} /></button></div>
  </article>;
}
function StatsView({ stats }) {
  const total = stats.totalTasks ?? stats.total ?? 0;
  const completed = stats.completedTasks ?? stats.completed ?? 0;
  const pending = stats.pendingTasks ?? stats.pending ?? Math.max(0, total - completed);
  const high = stats.highPriorityTasks ?? stats.highPriority ?? 0;
  return <div className="stats-view"><div className="stats-grid"><StatCard label="Total des tâches" value={total} icon={<ClipboardList size={19} />} /><StatCard label="Terminées" value={completed} icon={<CheckCircle2 size={19} />} /><StatCard label="À traiter" value={pending} icon={<Clock3 size={19} />} /><StatCard label="Priorité haute" value={high} icon={<Activity size={19} />} /></div><div className="stats-note"><BarChart3 size={19} /><span><b>Activité de l’espace</b><small>Ces valeurs proviennent de l’API Spring.</small></span><ArrowRight size={17} /></div></div>;
}
function StatCard({ label, value, icon }) { return <article className="stat-card"><span>{icon}</span><small>{label}</small><strong>{value}</strong></article>; }
function AccessState({ loading, message, onRetry }) {
  return <div className="access-state"><span className="access-icon"><LockKeyhole size={20} /></span><b>{loading ? "Chargement…" : "Réponse du serveur"}</b><p>{message || "L’API n’a pas encore fourni cette ressource. Connectez-vous ou vérifiez les autorisations Spring."}</p><button className="button button-secondary" onClick={onRetry} disabled={loading}>Réessayer <ArrowRight size={15} /></button></div>;
}
function TaskDialog({ task, onClose, onSave, busy }) {
  const [form, setForm] = useState({ title: task?.title || "", description: task?.description || "", priority: task?.priority || "MEDIUM", status: task?.status || "TODO", dueDate: task?.dueDate || "" });
  const change = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  return <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><form className="dialog" onSubmit={(event) => { event.preventDefault(); onSave(form); }}><div className="dialog-heading"><div><span className="dialog-icon"><ClipboardList size={19} /></span><h2>{task ? "Modifier la tâche" : "Nouvelle tâche"}</h2><p>{task ? "Mettez à jour les informations de la tâche." : "Ajoutez un élément au travail de l’équipe."}</p></div><button type="button" className="icon-button" aria-label="Fermer" onClick={onClose}><X size={19} /></button></div><label className="field-label">Titre<input name="title" required maxLength="160" value={form.title} onChange={change} placeholder="Ex. Préparer la revue de sprint" autoFocus /></label><label className="field-label">Description<textarea name="description" rows="3" maxLength="1000" value={form.description} onChange={change} placeholder="Ajoutez quelques détails…" /></label><div className="field-row"><label className="field-label">Priorité<select name="priority" value={form.priority} onChange={change}><option value="LOW">Basse</option><option value="MEDIUM">Moyenne</option><option value="HIGH">Haute</option></select></label><label className="field-label">État<select name="status" value={form.status} onChange={change}><option value="TODO">À faire</option><option value="IN_PROGRESS">En cours</option><option value="DONE">Terminée</option></select></label></div><label className="field-label">Échéance<input type="date" name="dueDate" value={form.dueDate} onChange={change} /></label><div className="dialog-actions"><button className="button button-secondary" type="button" onClick={onClose}>Annuler</button><button className="button button-primary" type="submit" disabled={busy}>{busy ? "Enregistrement…" : task ? "Enregistrer" : "Créer la tâche"}</button></div></form></div>;
}
function LoginDialog({ credentials, onChange, onClose, onSubmit, busy }) {
  return <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><form className="dialog login-dialog" onSubmit={onSubmit}><div className="dialog-heading"><div><span className="dialog-icon"><LockKeyhole size={19} /></span><h2>Connexion à l’API</h2><p>Les identifiants seront utilisés en HTTP Basic et gardés en mémoire.</p></div><button type="button" className="icon-button" aria-label="Fermer" onClick={onClose}><X size={19} /></button></div><label className="field-label">Identifiant<input autoComplete="username" required value={credentials.username} onChange={(event) => onChange({ ...credentials, username: event.target.value })} placeholder="alice" /></label><label className="field-label">Mot de passe<input autoComplete="current-password" type="password" required value={credentials.password} onChange={(event) => onChange({ ...credentials, password: event.target.value })} placeholder="••••••••" /></label><div className="login-hint"><CircleHelp size={15} /><span>V3+ : Alice <code>alice / alice123</code> · Bob <code>bob / bob123</code><br />V2 : utilisez <code>user</code> et le mot de passe de la console Spring.</span></div><div className="dialog-actions"><button className="button button-secondary" type="button" onClick={onClose}>Annuler</button><button className="button button-primary" type="submit" disabled={busy}>{busy ? "Vérification…" : "Continuer"}<ArrowRight size={16} /></button></div></form></div>;
}
createRoot(document.getElementById("root")).render(<App />);
