import { useEffect, useState, useCallback } from 'react';
import { supabase } from './supabase';
import { LANGS, RTL, UI, projectText, appText } from '../i18n';

export const CREDIT = 'bs-simple.com · פתרונות יצירתיים · בועז סעדה';
const pick = (o, l) => (o && (o[l] || '')) || '';

export function useLang() {
  const [lang, setL] = useState(() => { try { const v = localStorage.getItem('bs-lang'); return LANGS.includes(v) ? v : 'he'; } catch { return 'he'; } });
  const setLang = (v) => { setL(v); try { localStorage.setItem('bs-lang', v); } catch {} };
  const rtl = !!RTL[lang];
  useEffect(() => { document.documentElement.lang = lang; document.documentElement.dir = rtl ? 'rtl' : 'ltr'; }, [lang, rtl]);
  return { lang, setLang, rtl };
}

export function useSite(lang) {
  const [projects, setProjects] = useState([]);
  const [apps, setApps] = useState([]);
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const load = useCallback(async () => {
    const [p, a, c] = await Promise.all([
      supabase.from('projects').select('*').order('id', { ascending: false }),
      fetch('/apps.json').then(r => r.json()).catch(() => ({ apps: [] })),
      // optional additive table; missing table is fine (falls back to code texts)
      supabase.from('site_content').select('key,value').then(r => r, () => ({ data: null })),
    ]);
    setProjects(p.data || []);
    setApps(a.apps || []);
    const m = {}; (c.data || []).forEach(r => { m[r.key] = r.value; });
    setContent(m); setLoading(false);
  }, []);
  useEffect(() => { load(); }, [load]);

  const T = { ...(UI[lang] || UI.he) };
  const hero = content.hero || {};
  if (pick(hero.a, lang)) T.heroA = pick(hero.a, lang);
  if (pick(hero.b, lang)) T.heroB = pick(hero.b, lang);
  if (pick(hero.p, lang)) T.heroP = pick(hero.p, lang);

  const ord = (o, i) => (o && Number.isFinite(o.order) ? o.order : 1000 + i);
  const storeApps = apps.map((a, i) => {
    const o = content['app:' + a.id] || {}; const t = appText(a, lang);
    return { ...a, title: pick(o.name, lang) || t.name, desc: pick(o.desc, lang) || t.desc, _o: ord(o, i), hidden: !!o.hidden };
  }).filter(a => !a.hidden).sort((x, y) => x._o - y._o);
  const webApps = projects.map((p, i) => {
    const o = content['project:' + p.id] || {}; const t = projectText(p, lang);
    return { ...p, title: pick(o.name, lang) || t.name, desc: pick(o.desc, lang) || t.desc, _o: ord(o, i), hidden: !!o.hidden };
  }).filter(p => !p.hidden).sort((x, y) => x._o - y._o);
  return { T, storeApps, webApps, rawApps: apps, projects, content, loading, reload: load };
}
