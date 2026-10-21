import React, { useEffect, useState } from 'react';
import { useLang, useSite } from './site/useSite';
import Admin from './site/Admin';
import ThemeA from './themes/A';
import ThemeB from './themes/B';
import ThemeC from './themes/C';
import { DEFAULT_THEME } from './theme';
import './site/badges.css';

const THEMES = { a: ThemeA, b: ThemeB, c: ThemeC };
const isAdmin = () => window.location.hash.startsWith('#/admin');

export default function App() {
  const [admin, setAdmin] = useState(isAdmin());
  useEffect(() => { const f = () => setAdmin(isAdmin()); window.addEventListener('hashchange', f); return () => window.removeEventListener('hashchange', f); }, []);
  if (admin) return <Admin />;
  return <Site />;
}

function Site() {
  const L = useLang();
  const site = useSite(L.lang);
  const q = new URLSearchParams(window.location.search).get('theme');
  const Theme = THEMES[q] || THEMES[DEFAULT_THEME];
  return <Theme {...L} site={site} />;
}
