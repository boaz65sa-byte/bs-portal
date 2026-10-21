import React, { useEffect, useState } from 'react';
import { useLang, useSite } from './site/useSite';
import Admin from './site/Admin';
import ThemeA from './themes/A';
import ThemeB from './themes/B';
import ThemeC from './themes/C';
import ThemeD from './themes/D';
import { DEFAULT_THEME } from './theme';
import Product from './themes/Product';
import './site/badges.css';

const THEMES = { a: ThemeA, b: ThemeB, c: ThemeC, d: ThemeD };
const isAdmin = () => window.location.hash.startsWith('#/admin');

export default function App() {
  const [admin, setAdmin] = useState(isAdmin());
  useEffect(() => { const f = () => setAdmin(isAdmin()); window.addEventListener('hashchange', f); return () => window.removeEventListener('hashchange', f); }, []);
  if (admin) return <Admin />;
  return <Site />;
}
const prodRoute = () => { const m = window.location.hash.match(/^#\/app\/([\w-]+)(?:\/(\w+))?/); return m ? { id: m[1], sub: m[2] } : null; };
function useHash() { const [h, setH] = useState(window.location.hash); useEffect(() => { const f = () => setH(window.location.hash); window.addEventListener('hashchange', f); return () => window.removeEventListener('hashchange', f); }, []); return h;
}

function Site() {
  const L = useLang();
  const site = useSite(L.lang);
  const q = new URLSearchParams(window.location.search).get('theme');
  useHash(); const pr = prodRoute();
  if (pr) return <Product {...L} {...pr} />;
  const Theme = THEMES[q] || THEMES[DEFAULT_THEME];
  return <Theme {...L} site={site} />;
}
