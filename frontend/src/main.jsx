import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { ShieldCheck, ShieldAlert, LockKeyhole, BookOpen, Terminal, Play, RefreshCw, ExternalLink, Copy, Check, ChevronRight, Code2, Users, Zap, AlertCircle, CheckCircle2, Activity, ArrowRight, ListChecks } from "lucide-react";
import { CURRENT_VERSION } from "./version.js";
import { endpointsFor, requestEndpoint, identityFor, describeStatus } from "./api.js";
import "./style.css";

const REPO = "https://github.com/romarich57/Tp_Spring_security";
const EXERCISES = [
  { title:"Audit de sécurité", subtitle:"Repérer les failles d'une API ouverte", goal:"Observer les accès avant toute protection.", tasks:["Lancer le backend Spring Boot","Tester les trois routes sans connexion","Identifier les données qui devraient être privées","Remplir la feuille de réponses Markdown"], file:"docs/reponses/EXERCICE_1_A_COMPLETER.md", duration:"10 min" },
  { title:"Activer Spring Security", subtitle:"Observer l'authentification par défaut", goal:"Comprendre ce qui change lorsqu'on ajoute Spring Security.", tasks:["Ajouter la dépendance dans pom.xml","Relever le mot de passe généré dans la console","Rejouer les appels en mode anonyme","Tester le compte user avec son mot de passe"], file:"pom.xml", duration:"10 min" },
  { title:"Utilisateurs et BCrypt", subtitle:"Créer Alice et Bob", goal:"Définir deux utilisateurs avec leurs rôles et leurs mots de passe encodés.", tasks:["Déclarer PasswordEncoder avec BCrypt","Créer UserDetailsService","Ajouter Alice (USER) et Bob (ADMIN)","Tester les comptes avec HTTP Basic"], file:"src/main/java/fr/tpspringsecurity/config/UserConfig.java", duration:"15 min" },
  { title:"Contrôler les accès", subtitle:"Autoriser ou refuser chaque endpoint", goal:"Définir les règles d'autorisation dans SecurityFilterChain.", tasks:["Rendre les informations publiques accessibles","Réserver les statistiques à ADMIN","Exiger une connexion pour les autres routes","Vérifier les statuts 200, 401 et 403"], file:"src/main/java/fr/tpspringsecurity/config/SecurityConfig.java", duration:"10 min" },
  { title:"Sécurité des méthodes", subtitle:"Protéger une fonctionnalité confidentielle", goal:"Utiliser @PreAuthorize et @EnableMethodSecurity.", tasks:["Créer GET /api/tasks/confidential","Placer @PreAuthorize sur la méthode","Activer @EnableMethodSecurity","Tester l'accès avec Alice et Bob"], file:"src/main/java/fr/tpspringsecurity/controller/TaskController.java", duration:"10 min" },
  { title:"Validation finale", subtitle:"L'ensemble du TP est corrigé", goal:"Vérifier que toutes les politiques d'accès fonctionnent.", tasks:["Exécuter mvn clean verify","Tester la matrice d'accès complète","Expliquer les codes 200, 401 et 403","Relire les corrections des exercices"], file:"docs/corrections/", duration:"5 min" }
];
const IDENTITIES=[{key:"anonymous",name:"Visiteur",role:"Non connecté",icon:"◎"},{key:"alice",name:"Alice",role:"Utilisateur · USER",icon:"A"},{key:"bob",name:"Bob",role:"Administrateur · ADMIN",icon:"B"},{key:"custom",name:"Personnalisé",role:"Identifiants de test",icon:"+"}];
const step=EXERCISES[CURRENT_VERSION-1];
const badge=(n)=>n===200?"success":n===401?"warning":n===403?"danger":"neutral";
function App(){
  const [identity,setIdentity]=useState("anonymous"),[custom,setCustom]=useState({username:"",password:""}),[results,setResults]=useState({}),[logs,setLogs]=useState([]),[running,setRunning]=useState(false),[checked,setChecked]=useState([]),[matrix,setMatrix]=useState(null),[copied,setCopied]=useState(false);
  const endpoints=endpointsFor(CURRENT_VERSION);
  const active=IDENTITIES.find(x=>x.key===identity);
  async function call(e,key=identity,record=true){
    const res=await requestEndpoint(e,identityFor(key,custom));
    if(record){setResults(old=>({...old,[e.id]:{...res,identity:key}}));setLogs(old=>[{...res,identity:key,path:e.path},...old].slice(0,15))}
    return res;
  }
  async function all(){
    setRunning(true);
    try{for(const e of endpoints){await call(e)}}finally{setRunning(false)}
  }
  async function compare(){
    setRunning(true);
    try{const rows=[];for(const e of endpoints){const statuses=[];for(const who of ["anonymous","alice","bob"]){const r=await call(e,who,false);statuses.push(r.status)}rows.push({endpoint:e,statuses})}setMatrix(rows)}finally{setRunning(false)}
  }
  function toggle(i){setChecked(xs=>xs.includes(i)?xs.filter(x=>x!==i):[...xs,i])}
  async function copy(){try{await navigator.clipboard.writeText("git switch Tp_version"+CURRENT_VERSION);setCopied(true);setTimeout(()=>setCopied(false),1500)}catch{}}
  return <div className="app-shell">
    <aside className="sidebar">
      <a className="brand" href={REPO} target="_blank" rel="noreferrer"><span className="brand-icon"><ShieldCheck size={22}/></span><span><strong>SPRING SECURITY</strong><small>LEARNING LAB <span className="brand-dot">●</span></small></span></a>
      <div className="side-label">PARCOURS DU TP</div>
      <nav aria-label="Étapes du TP">{EXERCISES.map((e,i)=><a key={i} className={"nav-step "+(CURRENT_VERSION===i+1?"selected":"")} href={REPO+"/tree/Tp_version"+(i+1)} target="_blank" rel="noreferrer"><span className={"nav-num "+(i+1<CURRENT_VERSION?"past":"")}>{i+1<CURRENT_VERSION?<Check size={14}/>:String(i+1).padStart(2,"0")}</span><span><b>{e.title}</b><small>{e.duration} · Exercice {i+1}</small></span>{CURRENT_VERSION===i+1?<span className="active-mark"/>:null}</a>)}</nav>
      <div className="sidebar-bottom"><div className="mentor-card"><BookOpen size={18}/><strong>Besoin d'un indice ?</strong><p>Chaque branche Git contient les solutions des exercices précédents.</p><a href={REPO+"/blob/Tp_version"+CURRENT_VERSION+"/ENONCE.md"} target="_blank" rel="noreferrer">Voir l'énoncé <ArrowRight size={14}/></a></div><p className="sidebar-foot">PROJET PÉDAGOGIQUE <span>·</span> JAVA 17 + REACT</p></div>
    </aside>
    <main className="content">
      <header className="topbar"><span><span className="crumb">Atelier pratique</span> <ChevronRight size={14}/> <b>Exercice {CURRENT_VERSION}</b></span><div className="top-actions"><span className="online"><span className="live-dot"/> Mode local</span><a href={REPO+"/tree/Tp_version"+CURRENT_VERSION} target="_blank" rel="noreferrer" className="github-link">Voir sur GitHub <ExternalLink size={14}/></a></div></header>
      <div className="main-container">
        <section className="hero"><div className="eyebrow"><span className="eyebrow-line"/> MODULE {String(CURRENT_VERSION).padStart(2,"0")} / 06 <span className="eyebrow-tag">SPRING BOOT + SECURITY</span></div><h1>{step.title}<span className="period">.</span></h1><p>{step.subtitle}. {step.goal}</p><div className="hero-bottom"><div className="hero-meta"><span><BookOpen size={15}/> Exercice {CURRENT_VERSION}/6</span><span><Activity size={15}/> {step.duration}</span><span><Code2 size={15}/> API REST</span></div><div className="progress-track"><span style={{width:(CURRENT_VERSION/6*100)+"%"}}/></div></div></section>
        <div className="section-heading"><div><span className="heading-index">01</span><h2>Laboratoire d'accès</h2></div><span className="section-help">Testez les permissions en temps réel</span></div>
        <section className="lab-panel"><div className="lab-toolbar"><div><b><Users size={17}/> Tester en tant que</b><p>Choisissez une identité pour envoyer vos requêtes HTTP.</p></div><button className="run-all" disabled={running} onClick={all}>{running?<RefreshCw size={16} className="spin"/>:<Play size={15} fill="currentColor"/>} Exécuter tous les tests</button></div>
          <div className="identity-grid">{IDENTITIES.map(i=><button key={i.key} aria-pressed={identity===i.key} className={"identity "+(identity===i.key?"identity-active":"")} onClick={()=>{setIdentity(i.key);setResults({})}}><span className="avatar">{i.icon}</span><span><strong>{i.name}</strong><small>{i.role}</small></span>{identity===i.key?<CheckCircle2 size={16} className="identity-check"/>:null}</button>)}</div>
          {identity==="custom"?<div className="custom-credentials"><label>Identifiant<input autoComplete="off" value={custom.username} onChange={e=>setCustom(x=>({...x,username:e.target.value}))} placeholder="user"/></label><label>Mot de passe<input type="password" autoComplete="off" value={custom.password} onChange={e=>setCustom(x=>({...x,password:e.target.value}))} placeholder="Mot de passe console"/></label><p>Utile pour l'exercice 2 : utilisez le compte <code>user</code> et le mot de passe généré par Spring Boot.</p></div>:null}
          <div className="endpoint-list">{endpoints.map(e=>{const r=results[e.id],d=r?describeStatus(r.status):null;return <article className="endpoint" key={e.id}><div className="endpoint-info"><span className="method">{e.method}</span><div><h3>{e.label}</h3><code>{e.path}</code><p>{e.about}</p></div></div><div className="endpoint-actions"><span className="access-tag"><LockKeyhole size={13}/>{e.access}</span>{r?<span className={"response-pill "+badge(r.status)}>{r.status||"ERR"} · {d.label}</span>:null}<button disabled={running} className="test-button" onClick={()=>call(e)}><Play size={13} fill="currentColor"/> Tester</button></div>{r?<div className="response-details"><div><span>RÉPONSE HTTP</span><span>{r.duration} ms · {r.at}</span></div><pre>{typeof r.body==="string"?r.body:JSON.stringify(r.body,null,2)}</pre></div>:null}</article>})}</div>
          <div className="lab-footer"><div><span className="live-dot"/> <b>Vraies réponses HTTP</b> <span>— aucun résultat simulé</span></div><span>Backend : <code>localhost:8080</code></span></div>
        </section>
        <div className="two-columns">
          <section className="panel work-panel"><div className="panel-title"><span className="heading-index">02</span><h2>Votre mission</h2><span className="mini-count">{checked.length}/{step.tasks.length}</span></div><p className="panel-desc">Complétez les tâches ci-dessous dans votre projet Java.</p><div className="checklist">{step.tasks.map((t,i)=><label className={"check-line "+(checked.includes(i)?"complete":"")} key={i}><input type="checkbox" checked={checked.includes(i)} onChange={()=>toggle(i)}/><span className="box-check">{checked.includes(i)?<Check size={13}/>:null}</span><span>{t}</span></label>)}</div><div className="file-path"><Code2 size={16}/><div><small>FICHIER DE L'EXERCICE</small><code>{step.file}</code></div></div><a className="text-link" href={REPO+"/blob/Tp_version"+CURRENT_VERSION+"/ENONCE.md"} target="_blank" rel="noreferrer">Lire les consignes complètes <ExternalLink size={13}/></a></section>
          <section className="panel matrix-panel"><div className="panel-title"><span className="heading-index">03</span><h2>Matrice d'autorisations</h2></div><p className="panel-desc">Comparez les statuts réels pour les trois profils.</p><div className="matrix-scroll"><table><thead><tr><th>ROUTE</th><th>ANONYME</th><th>ALICE</th><th>BOB</th></tr></thead><tbody>{endpoints.map(e=>{const row=matrix?.find(r=>r.endpoint.id===e.id);return <tr key={e.id}><td>{e.label}</td>{[0,1,2].map(n=><td key={n}>{row?<span className={"matrix-status "+badge(row.statuses[n])}>{row.statuses[n]||"ERR"}</span>:<span className="matrix-empty">—</span>}</td>)}</tr>})}</tbody></table></div><button className="compare-button" disabled={running} onClick={compare}><RefreshCw size={15} className={running?"spin":""}/> Comparer les 3 profils</button><div className="legend"><span><i className="legend-green"/> 200 Autorisé</span><span><i className="legend-orange"/> 401 Non authentifié</span><span><i className="legend-red"/> 403 Interdit</span></div></section>
        </div>
        <div className="two-columns bottom-row">
          <section className="panel"><div className="panel-title"><span className="heading-index">04</span><h2>Terminal & démarrage</h2></div><p className="panel-desc">Démarrez le backend et l'interface dans deux terminaux.</p><div className="code-window"><div className="code-top"><span className="dots"><i/><i/><i/></span><span>TERMINAL 1 · JAVA</span></div><pre><span className="prompt">$ </span>mvn spring-boot:run</pre><div className="code-top second"><span>TERMINAL 2 · REACT</span></div><pre><span className="prompt">$ </span>cd frontend{"\n"}<span className="prompt">$ </span>npm install{"\n"}<span className="prompt">$ </span>npm run dev</pre></div><p className="hint"><AlertCircle size={15}/> Ouvrez <b>http://localhost:5173</b>. La configuration Vite redirige les appels /api vers Spring Boot.</p></section>
          <section className="panel"><div className="panel-title"><span className="heading-index">05</span><h2>Historique des requêtes</h2></div><p className="panel-desc">Les 15 derniers appels depuis cette page.</p><div className="log-list">{logs.length?logs.slice(0,5).map((l,i)=><div key={i} className="log-row"><span className={"log-dot "+badge(l.status)}/><code>{l.path}</code><b>{l.status||"ERR"}</b><time>{l.at}</time></div>):<div className="empty-log"><Activity size={28}/><b>Pas encore de requête</b><span>Exécutez un test pour voir son résultat ici.</span></div>}</div><div className="version-row"><span><Zap size={16}/> Version actuelle</span><b>Tp_version{CURRENT_VERSION}</b><button onClick={copy} title="Copier la commande git switch">{copied?<Check size={15}/>:<Copy size={15}/>}</button></div></section>
        </div>
        <footer><span><ShieldAlert size={14}/> Laboratoire pédagogique local uniquement — ne saisissez jamais de vrais mots de passe.</span><span>TP SPRING SECURITY <span className="dot-sep">·</span> V{CURRENT_VERSION}.0</span></footer>
      </div>
    </main>
  </div>;
}
createRoot(document.getElementById("root")).render(<App/>);
