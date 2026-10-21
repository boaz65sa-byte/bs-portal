import React, { useEffect, useState } from 'react';
import { supabase, ADMIN_PREVIEW } from './supabase';
import { useSite, CREDIT } from './useSite';
import { LANGS, UI, APPS, projectText } from '../i18n';
import { ArrowUp, ArrowDown, Eye, EyeOff, Save, LogOut, Plus, Trash2, Image as ImageIcon, Loader2, ExternalLink, Home } from 'lucide-react';

const LN = { he: 'עברית', en: 'English', ar: 'العربية', ru: 'Русский' };
const inp = 'w-full bg-slate-950/60 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500';
const dirOf = l => (l === 'he' || l === 'ar') ? 'rtl' : 'ltr';

function LangFields({ label, value = {}, onChange, area }) {
  return (
    <div className="space-y-1">
      <div className="text-xs text-gray-400">{label}</div>
      <div className="grid md:grid-cols-2 gap-2">
        {LANGS.map(l => {
          const P = { value: value[l] || '', dir: dirOf(l), placeholder: LN[l], className: inp + (area ? ' h-20 resize-y' : ''), onChange: e => onChange({ ...value, [l]: e.target.value }) };
          return <label key={l} className="block"><span className="text-[10px] uppercase text-gray-500">{l}</span>{area ? <textarea {...P} /> : <input {...P} />}</label>;
        })}
      </div>
    </div>
  );
}

export default function Admin() {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
  const [recovery, setRecovery] = useState(false); const [newPass, setNewPass] = useState('');
  useEffect(() => {
    document.documentElement.dir = 'rtl';
    supabase.auth.getSession().then(({ data: { session } }) => { setUser(session?.user ?? null); setReady(true); });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((ev, s) => { setUser(s?.user ?? null); if (ev === 'PASSWORD_RECOVERY') setRecovery(true); });
    return () => subscription.unsubscribe();
  }, []);
  async function login(e) { e.preventDefault(); const { error } = await supabase.auth.signInWithPassword({ email, password }); if (error) alert('שגיאה בהתחברות: ' + error.message); }
  async function reset() { if (!email) return alert('הזן מייל'); const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin + '/#/admin' }); alert(error ? 'שגיאה: ' + error.message : 'נשלח קישור לאיפוס סיסמה למייל'); }
  async function updatePass(e) { e.preventDefault(); const { error } = await supabase.auth.updateUser({ password: newPass }); alert(error ? 'שגיאה: ' + error.message : 'הסיסמה שונתה'); if (!error) setRecovery(false); }

  if (!ready) return <div className="min-h-screen bg-slate-950 text-blue-400 grid place-items-center">…</div>;
  if (recovery) return <Shell><form onSubmit={updatePass} className="max-w-sm mx-auto space-y-3 mt-20"><h2 className="text-xl font-bold">סיסמה חדשה</h2><input type="password" className={inp} value={newPass} onChange={e => setNewPass(e.target.value)} dir="ltr" /><button className="w-full bg-blue-600 rounded-lg py-2 font-bold">עדכון</button></form></Shell>;
  if (!user && !ADMIN_PREVIEW) return (
    <Shell><form onSubmit={login} className="max-w-sm mx-auto space-y-3 mt-20 bg-slate-900 p-6 rounded-2xl border border-white/10">
      <h2 className="text-xl font-bold text-center">כניסת מנהל</h2>
      <input className={inp} placeholder="Email" dir="ltr" value={email} onChange={e => setEmail(e.target.value)} />
      <input className={inp} type="password" placeholder="Password" dir="ltr" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="w-full bg-blue-600 rounded-lg py-2 font-bold">כניסה</button>
      <button type="button" onClick={reset} className="w-full text-xs text-gray-400 hover:text-white">שכחתי סיסמה</button>
    </form></Shell>
  );
  return <Dashboard user={user} />;
}

function Shell({ children, right }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white" dir="rtl">
      <header className="sticky top-0 z-20 bg-slate-950/90 backdrop-blur border-b border-white/10">
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="font-black">BS-SIMPLE <span className="text-blue-400 font-bold text-sm">· לוח ניהול</span></div>
          <div className="flex items-center gap-3 text-sm"><a href="/#" className="flex items-center gap-1 text-gray-300 hover:text-white"><Home size={15} /> לאתר</a>{right}</div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-5 py-8">{children}</main>
      <footer className="text-center text-xs text-gray-500 py-8">{CREDIT}</footer>
    </div>
  );
}

function Dashboard({ user }) {
  const site = useSite('he');
  const [tab, setTab] = useState('hero');
  const [draft, setDraft] = useState({});
  const [status, setStatus] = useState('');
  const c = (k) => draft[k] ?? site.content[k] ?? {};
  const setC = (k, v) => setDraft(d => ({ ...d, [k]: v }));
  const dirty = Object.keys(draft).length;

  async function saveAll() {
    if (ADMIN_PREVIEW && !user) { setStatus('מצב תצוגה: שמירה כבויה'); return; }
    const rows = Object.entries(draft).map(([key, value]) => ({ key, value, updated_at: new Date().toISOString() }));
    const { error } = await supabase.from('site_content').upsert(rows);
    if (error) setStatus('שגיאה: ' + error.message + (error.code === '42P01' || /site_content/.test(error.message) ? ' — צריך להפעיל את המיגרציה site_content' : ''));
    else { setStatus('נשמר ✓'); setDraft({}); site.reload(); }
  }
  const tabs = [['hero', 'טקסט ראשי'], ['apps', `אפליקציות חנות (${site.rawApps.length})`], ['web', `אפליקציות web (${site.projects.length})`]];
  return (
    <Shell right={<>{user && <button onClick={() => supabase.auth.signOut()} className="text-red-300 flex items-center gap-1"><LogOut size={15} /> יציאה</button>}</>}>
      {ADMIN_PREVIEW && !user && <div className="mb-4 text-xs rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200 px-3 py-2">תצוגה מקומית בלבד (בלי התחברות, שמירה כבויה)</div>}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {tabs.map(([k, t]) => <button key={k} onClick={() => setTab(k)} className={`px-4 py-2 rounded-full text-sm font-bold ${tab === k ? 'bg-blue-600' : 'bg-white/5 hover:bg-white/10'}`}>{t}</button>)}
        <div className="flex-1" />
        <span className="text-xs text-gray-400">{status}</span>
        <button onClick={saveAll} disabled={!dirty} className="flex items-center gap-2 bg-emerald-600 disabled:opacity-40 px-4 py-2 rounded-full text-sm font-bold"><Save size={15} /> שמירה {dirty ? `(${dirty})` : ''}</button>
      </div>
      {tab === 'hero' && <HeroTab c={c} setC={setC} />}
      {tab === 'apps' && <ListTab items={site.rawApps.map(a => ({ key: 'app:' + a.id, id: a.id, icon: `/apps/icons/${a.icon}`, name: a.name, base: { name: APPS[a.id]?.name || {}, desc: { he: APPS[a.id]?.he, en: APPS[a.id]?.en, ar: APPS[a.id]?.ar, ru: APPS[a.id]?.ru } }, url: a.links?.web || a.links?.appstore }))} c={c} setC={setC} />}
      {tab === 'web' && <WebTab site={site} c={c} setC={setC} user={user} />}
    </Shell>
  );
}

function HeroTab({ c, setC }) {
  const h = c('hero'); const def = k => Object.fromEntries(LANGS.map(l => [l, UI[l][k]]));
  const F = (k, src, label, area) => <LangFields label={label} area={area} value={{ ...def(src), ...(h[k] || {}) }} onChange={v => setC('hero', { ...h, [k]: v })} />;
  return <div className="space-y-5 bg-slate-900/60 p-5 rounded-2xl border border-white/10">{F('a', 'heroA', 'כותרת שורה 1')}{F('b', 'heroB', 'כותרת שורה 2')}{F('p', 'heroP', 'פסקת פתיחה', true)}</div>;
}

function ListTab({ items, c, setC, extra }) {
  const [open, setOpen] = useState(null);
  const withOrder = items.map((it, i) => ({ ...it, o: c(it.key), i })).sort((a, b) => (a.o.order ?? 1000 + a.i) - (b.o.order ?? 1000 + b.i));
  const move = (idx, d) => { const arr = [...withOrder]; const j = idx + d; if (j < 0 || j >= arr.length) return; [arr[idx], arr[j]] = [arr[j], arr[idx]]; arr.forEach((it, n) => setC(it.key, { ...c(it.key), order: n })); };
  return (
    <div className="space-y-2">
      {withOrder.map((it, idx) => (
        <div key={it.key} className={`rounded-2xl border border-white/10 bg-slate-900/60 ${it.o.hidden ? 'opacity-50' : ''}`}>
          <div className="flex items-center gap-3 p-3">
            <span className="w-6 text-center text-xs text-gray-500">{idx + 1}</span>
            {it.icon ? <img src={it.icon} className="w-10 h-10 rounded-xl object-cover" alt="" /> : <div className="w-10 h-10 rounded-xl bg-slate-800" />}
            <div className="flex-1 min-w-0"><div className="font-bold truncate">{it.o.name?.he || it.name}</div>{it.url && <a href={it.url} target="_blank" rel="noreferrer" dir="ltr" className="text-xs text-blue-400 truncate inline-flex items-center gap-1">{it.url} <ExternalLink size={11} /></a>}</div>
            <button title="למעלה" onClick={() => move(idx, -1)} className="p-2 hover:bg-white/10 rounded-lg"><ArrowUp size={16} /></button>
            <button title="למטה" onClick={() => move(idx, 1)} className="p-2 hover:bg-white/10 rounded-lg"><ArrowDown size={16} /></button>
            <button title={it.o.hidden ? 'הצג באתר' : 'הסתר מהאתר'} onClick={() => setC(it.key, { ...it.o, hidden: !it.o.hidden })} className="p-2 hover:bg-white/10 rounded-lg">{it.o.hidden ? <EyeOff size={16} /> : <Eye size={16} />}</button>
            <button onClick={() => setOpen(open === it.key ? null : it.key)} className="px-3 py-1.5 text-xs font-bold rounded-lg bg-white/5 hover:bg-white/10">{open === it.key ? 'סגור' : 'עריכה'}</button>
          </div>
          {open === it.key && <div className="p-4 pt-0 space-y-4">
            <LangFields label="שם (ריק = ברירת מחדל)" value={{ ...it.base.name, ...(it.o.name || {}) }} onChange={v => setC(it.key, { ...it.o, name: v })} />
            <LangFields label="תיאור קצר (1–2 משפטים)" area value={{ ...it.base.desc, ...(it.o.desc || {}) }} onChange={v => setC(it.key, { ...it.o, desc: v })} />
            {extra && extra(it)}
          </div>}
        </div>
      ))}
    </div>
  );
}

function Row({ p, onSave, del, upload, busy }) {
  const blank = { name_he: '', name_en: '', description_he: '', description_en: '', url: '', image_url: '', accent_color: '#3b82f6' };
    const [f, setF] = useState({ ...blank, ...(p || {}) });
    return <div className="grid md:grid-cols-2 gap-2 bg-slate-950/40 p-3 rounded-xl border border-white/5">
      <div className="md:col-span-2 text-xs text-gray-400">שדות טבלת projects (כמו בממשק הקיים)</div>
      <input className={inp} placeholder="שם בעברית" value={f.name_he || ''} onChange={e => setF({ ...f, name_he: e.target.value })} />
      <input className={inp} dir="ltr" placeholder="Name (English)" value={f.name_en || ''} onChange={e => setF({ ...f, name_en: e.target.value })} />
      <input className={inp + ' md:col-span-2'} dir="ltr" placeholder="https://…" value={f.url || ''} onChange={e => setF({ ...f, url: e.target.value })} />
      <div className="flex gap-2 items-center"><input className={inp} dir="ltr" readOnly value={f.image_url || ''} placeholder="תמונה" /><label className="p-2 rounded-lg bg-blue-600/20 text-blue-300 cursor-pointer">{busy ? <Loader2 className="animate-spin" size={16} /> : <ImageIcon size={16} />}<input type="file" accept="image/*" className="hidden" onChange={e => upload(e, u => setF({ ...f, image_url: u }))} /></label></div>
      <div className="flex gap-2 items-center"><span className="text-xs text-gray-400">צבע</span><input type="color" value={f.accent_color || '#3b82f6'} onChange={e => setF({ ...f, accent_color: e.target.value })} /><div className="flex-1" />
        {p && <button onClick={() => del(p)} className="p-2 text-red-300 hover:bg-red-500/10 rounded-lg" title="מחיקה"><Trash2 size={16} /></button>}
        <button onClick={() => onSave(f)} className="px-3 py-1.5 rounded-lg bg-blue-600 text-xs font-bold">{p ? 'עדכון פרויקט' : 'הוספה'}</button></div>
    </div>;
  }

function WebTab({ site, c, setC, user }) {
  const [busy, setBusy] = useState(false);
  const blank = { name_he: '', name_en: '', description_he: '', description_en: '', url: '', image_url: '', accent_color: '#3b82f6' };
  const [neu, setNeu] = useState(null);
  async function saveProject(p, patch) {
    if (!user) return alert('מצב תצוגה: שמירה כבויה');
    const { error } = p ? await supabase.from('projects').update(patch).eq('id', p.id) : await supabase.from('projects').insert([patch]);
    if (error) alert('שגיאה: ' + error.message); else { setNeu(null); site.reload(); }
  }
  async function del(p) { if (!user) return; if (!window.confirm('למחוק את הפרויקט הזה לתמיד? (אפשר במקום זה להסתיר אותו בעין)')) return; const { error } = await supabase.from('projects').delete().eq('id', p.id); if (error) alert(error.message); else site.reload(); }
  async function upload(e, cb) {
    const file = e.target.files[0]; if (!file || !user) return; setBusy(true);
    const name = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
    const { error } = await supabase.storage.from('images').upload(name, file);
    if (error) alert(error.message); else cb(supabase.storage.from('images').getPublicUrl(name).data.publicUrl);
    setBusy(false);
  }
  const items = site.projects.map(p => { const he = projectText(p, 'he'), en = projectText(p, 'en'), ar = projectText(p, 'ar'), ru = projectText(p, 'ru');
    return { key: 'project:' + p.id, p, icon: p.image_url, name: p.name_he, url: p.url, base: { name: { he: he.name, en: en.name, ar: ar.name, ru: ru.name }, desc: { he: he.desc, en: en.desc, ar: ar.desc, ru: ru.desc } } }; });
  return <div className="space-y-3">
    <div className="flex justify-end"><button onClick={() => setNeu(neu ? null : blank)} className="flex items-center gap-1 px-4 py-2 rounded-full bg-blue-600 text-sm font-bold"><Plus size={15} /> פרויקט חדש</button></div>
    {neu && <Row onSave={f => saveProject(null, f)} del={del} upload={upload} busy={busy} />}
    <ListTab items={items} c={c} setC={setC} extra={it => <Row p={it.p} del={del} upload={upload} busy={busy} onSave={f => { const { id, created_at, ...rest } = f; saveProject(it.p, rest); }} />} />
  </div>;
}
