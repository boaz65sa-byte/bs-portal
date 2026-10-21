// Direction A — "Aurora": deep night, aurora glow, glass bento. Evolves today's dark site.
import React from 'react';
import { ArrowUpRight, Lightbulb, Settings } from 'lucide-react';
import Badges from '../site/Badges';
import LangSwitch from '../site/LangSwitch';
import { CREDIT } from '../site/useSite';
import { t4, S, Icon } from './common';
import './A.css';

export default function ThemeA({ lang, setLang, rtl, site }) {
  const { T, storeApps, webApps, loading } = site;
  const total = storeApps.length + webApps.length;
  return (
    <div className="ta min-h-screen" dir={rtl ? 'rtl' : 'ltr'}>
      <div className="ta-aurora" aria-hidden />
      <nav className="sticky top-0 z-40 backdrop-blur-xl bg-[#05060f]/60 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 font-black tracking-tight text-lg"><Lightbulb className="text-amber-400" size={20} /> BS-SIMPLE</a>
          <div className="hidden md:flex gap-6 text-sm text-white/60"><a href="#apps" className="hover:text-white">{T.ourApps}</a><a href="#projects" className="hover:text-white">{T.projects}</a><a href="/apps" className="hover:text-white">/apps</a></div>
          <div className="flex items-center gap-2"><LangSwitch lang={lang} setLang={setLang} className="bg-white/5 border border-white/10" /><a href="#/admin" title={T.admin} className="p-2 rounded-full hover:bg-white/10 text-white/60"><Settings size={16} /></a></div>
        </div>
      </nav>

      <header id="top" className="relative max-w-7xl mx-auto px-5 pt-20 md:pt-28 pb-16 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-white/70 bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> {total} {t4(S.count, lang)} · 5 {t4(S.stores, lang)} · 4 {t4(S.langs, lang)}
        </div>
        <h1 className="ta-h1 font-black tracking-tight leading-[1.02]">{T.heroA}<br /><span className="ta-grad">{T.heroB}</span></h1>
        <p className="mt-7 max-w-3xl mx-auto text-base md:text-xl text-white/65 leading-relaxed">{T.heroP}</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <a href="#apps" className="ta-btn-primary">{T.ourApps}</a>
          <a href="#projects" className="ta-btn-ghost">{T.viewProjects}</a>
        </div>
        <div className="mt-14 flex justify-center -space-x-3 rtl:space-x-reverse">
          {storeApps.map(a => <img key={a.id} src={`/apps/icons/${a.icon}`} alt={a.title} className="w-12 h-12 md:w-16 md:h-16 rounded-2xl ring-4 ring-[#05060f] shadow-xl ta-float" />)}
        </div>
      </header>

      <section id="apps" className="max-w-7xl mx-auto px-5 py-16">
        <Head kick={t4(S.storeKick, lang)} title={T.ourApps} sub={T.hubSub} />
        <div className="grid md:grid-cols-2 gap-4">
          {storeApps.map((a, i) => (
            <article key={a.id} className={`ta-glass rounded-3xl p-6 flex flex-col ${i === 0 ? 'md:row-span-1 ta-feature' : ''}`}>
              <div className="flex items-start gap-4">
                <img src={`/apps/icons/${a.icon}`} alt={a.title} className="w-16 h-16 rounded-2xl shadow-lg" />
                <div className="flex-1 min-w-0"><h3 className="text-xl font-extrabold">{a.title}</h3><p className="text-white/60 text-sm leading-relaxed mt-1">{a.desc}</p></div>
                {a.links?.web && <a href={a.links.web} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white/15" title={T.website}><ArrowUpRight size={16} /></a>}
              </div>
              <div className="mt-5 pt-4 border-t border-white/5"><Badges app={a} lang={lang} soon={T.soon} h={28} /></div>
            </article>
          ))}
        </div>
        <div className="text-center mt-6"><a href="/apps" className="text-sm font-bold text-indigo-300 hover:text-white">{T.allApps}</a></div>
      </section>

      <section id="projects" className="max-w-7xl mx-auto px-5 py-16">
        <Head kick={t4(S.webKick, lang)} title={T.projects} />
        {loading ? <p className="text-white/40">{T.loading}</p> :
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {webApps.map(p => (
              <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer" className="group ta-glass rounded-3xl overflow-hidden flex flex-col">
                <div className="relative aspect-[16/10] overflow-hidden"><Icon src={p.image_url} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" /><div className="absolute inset-x-0 bottom-0 h-1" style={{ background: p.accent_color || '#6366f1' }} /></div>
                <div className="p-5 flex-1 flex flex-col"><h3 className="font-extrabold text-lg">{p.title}</h3><p className="text-white/55 text-sm mt-1.5 leading-relaxed line-clamp-3 flex-1">{p.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-indigo-300 group-hover:text-white">{T.launch} <ArrowUpRight size={15} /></span></div>
              </a>
            ))}
          </div>}
      </section>


      <footer className="border-t border-white/5 py-10 text-center text-sm text-white/50">
        <p className="font-bold text-white/80">{T.footer}</p><p className="mt-2">{CREDIT}</p><p className="mt-1 text-xs text-white/30">© 2026</p>
        <Legal />
      </footer>
    </div>
  );
}
const Head = ({ kick, title, sub }) => <div className="mb-8"><div className="text-xs font-bold tracking-widest uppercase text-indigo-300/80 mb-2">{kick}</div><h2 className="text-3xl md:text-5xl font-black tracking-tight">{title}</h2>{sub && <p className="text-white/50 mt-2">{sub}</p>}</div>;
export const Legal = ({ className = 'text-white/25' }) => <p dir="ltr" className={`max-w-3xl mx-auto px-5 mt-6 text-[10px] leading-relaxed ${className}`}>Apple, the Apple logo, iPhone, iPad and Mac are trademarks of Apple Inc., registered in the U.S. and other countries and regions. App Store and Mac App Store are service marks of Apple Inc. Google Play and the Google Play logo are trademarks of Google LLC. Samsung, Galaxy and Galaxy Store are trademarks of Samsung Electronics Co., Ltd. Microsoft, Windows and the Microsoft Store badge are trademarks of the Microsoft group of companies.</p>;
