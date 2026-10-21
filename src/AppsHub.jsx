import React, { useEffect, useState } from 'react';
import { Smartphone, ArrowRight } from 'lucide-react';
import './AppsHub.css';
import { UI, appText } from './i18n';

const PLAT = [
  ['appstore', 'appstore', 'App Store', 'iPhone · iPad', 'svg'],
  ['macappstore', 'macappstore', 'Mac App Store', 'Mac', 'svg'],
  ['play', 'play', 'Google Play', 'Android', 'png'],
  ['galaxy', 'galaxy', 'Galaxy Store', 'Samsung Galaxy', 'png'],
  ['microsoft', 'ms', 'Microsoft Store', 'Windows', 'svg'],
];

export default function AppsHub({ lang: uiLang = 'he' }) {
  const isHe = uiLang === 'he';
  const T = UI[uiLang] || UI.he;
  const [apps, setApps] = useState([]);
  useEffect(() => {
    fetch('/apps.json').then(r => r.json()).then(d => setApps(d.apps || [])).catch(() => {});
  }, []);
  const lang = isHe ? 'he' : 'en'; // badge artwork exists in he/en
  return (
    <section id="apps" className="apps-hub py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black mb-3 flex items-center gap-3 text-white">
          <Smartphone className="text-blue-500" /> {T.ourApps}
        </h2>
        <p className="text-gray-400 mb-10">
          {T.hubSub}
        </p>
        <div className="hub-grid">
          {apps.map(a => {
            const L = a.links || {}; const tx = appText(a, uiLang);
            return (
              <article key={a.id} className="hub-card">
                <img className="hub-icon" src={`/apps/icons/${a.icon}`} alt={a.name} width="88" height="88" loading="lazy" />
                <h3>{tx.name}</h3>
                <p>{tx.desc}</p>
                <div className="hub-badges">
                  {PLAT.map(([k, f, store, plat, ext]) => {
                    const img = <img className={`hb hb-${k}`} src={`/apps/badges/${f}-${lang}.${ext}`} alt={store} />;
                    return L[k] ? (
                      <a key={k} className="hub-slot" href={L[k]} target="_blank" rel="noopener noreferrer">{img}<span className="plat">{plat}</span></a>
                    ) : (
                      <div key={k} className="hub-slot soon" title={isHe ? `${plat} · בקרוב` : `${plat} · Coming soon`}>{img}<span className="plat">{T.soon}</span></div>
                    );
                  })}
                </div>
                {L.web && <a className="hub-web" href={L.web} target="_blank" rel="noopener noreferrer">{T.website} <ArrowRight size={14} /></a>}
              </article>
            );
          })}
        </div>
        <div className="text-center mt-8"><a href="/apps" className="text-blue-400 hover:text-blue-300 font-bold">{T.allApps}</a></div>
        <p className="hub-legal" style={{color:"#6b7280",fontSize:12}}>bs-simple.com · פתרונות יצירתיים · בועז סעדה</p>
        <p className="hub-legal" dir="ltr">Apple, the Apple logo, iPhone, iPad and Mac are trademarks of Apple Inc., registered in the U.S. and other countries and regions. App Store and Mac App Store are service marks of Apple Inc. Google Play and the Google Play logo are trademarks of Google LLC. Samsung, Galaxy and Galaxy Store are trademarks of Samsung Electronics Co., Ltd. Microsoft, Windows and the Microsoft Store badge are trademarks of the Microsoft group of companies.</p>
      </div>
    </section>
  );
}
