// Direction D — "Aurora Atelier": A layout (glow, glass bento, floating icons) in B warm paper palette + serif headings.
import React from 'react';
import { ArrowUpRight, Lightbulb, Settings } from 'lucide-react';
import Badges from '../site/Badges';
import LangSwitch from '../site/LangSwitch';
import { CREDIT } from '../site/useSite';
import { t4, S, Icon } from './common';
import { Legal as LegalA } from './A';
const Legal = () => <LegalA className="text-stone-500" />;
import './D.css';

export default function ThemeD({ lang, setLang, rtl, site }) {
  const { T, storeApps, webApps, loading } = site;
  const total = storeApps.length + webApps.length;
  return (
    <div className="td min-h-screen" dir={rtl ? 'rtl' : 'ltr'}>
      <div className="td-aurora" aria-hidden />
      <nav className="sticky top-0 z-40 backdrop-blur-xl bg-[#f6f1e8]/75 border-b border-stone-900/10">
        <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 font-black tracking-tight text-lg"><Lightbulb className="text-orange-600" size={20} /> BS-SIMPLE</a>
          <div className="hidden md:flex gap-6 text-sm text-stone-600"><a href="#apps" className="hover:text-orange-700">{T.ourApps}</a><a href="#projects" className="hover:text-orange-700">{T.projects}</a><a href="/apps" className="hover:text-orange-700">/apps</a></div>
          <div className="flex items-center gap-2"><LangSwitch lang={lang} setLang={setLang} className="bg-stone-900/5 border border-stone-900/15" /><a href="#/admin" title={T.admin} className="p-2 rounded-full hover:bg-stone-900/10 text-stone-600"><Settings size={16} /></a></div>
        </div>
      </nav>

      <header id="top" className="relative max-w-7xl mx-auto px-5 pt-20 md:pt-28 pb-16 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-stone-700 bg-stone-900/5 border border-stone-900/15 rounded-full px-3 py-1 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" /> {total} {t4(S.count, lang)} · 5 {t4(S.stores, lang)} · 4 {t4(S.langs, lang)}
        </div>
        <h1 className="td-h1 td-serif font-black tracking-tight leading-[1.02]">{T.heroA}<br /><span className="td-grad">{T.heroB}</span></h1>
        <p className="mt-7 max-w-3xl mx-auto text-base md:text-xl text-stone-700 leading-relaxed">{T.heroP}</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <a href="#apps" className="td-btn-primary">{T.ourApps}</a>
          <a href="#projects" className="td-btn-ghost">{T.viewProjects}</a>
        </div>
        <div className="mt-14 flex justify-center -space-x-3 rtl:space-x-reverse">
          {storeApps.map(a => <img key={a.id} src={`/apps/icons/${a.icon}`} alt={a.title} className="w-12 h-12 md:w-16 md:h-16 rounded-2xl ring-4 ring-[#f6f1e8] shadow-xl td-float" />)}
        </div>
      </header>

      <section id="apps" className="max-w-7xl mx-auto px-5 py-16">
        <Head kick={t4(S.storeKick, lang)} title={T.ourApps} sub={T.hubSub} />
        <div className="grid md:grid-cols-2 gap-4">
          {storeApps.map((a, i) => (
            <article key={a.id} className={`td-glass rounded-3xl p-6 flex flex-col ${i === 0 ? 'md:row-span-1 td-feature' : ''}`}>
              <div className="flex items-start gap-4">
                <img src={`/apps/icons/${a.icon}`} alt={a.title} className="w-16 h-16 rounded-2xl shadow-lg" />
                <div className="flex-1 min-w-0"><h3 className="td-serif text-xl font-extrabold">{a.title}</h3><p className="text-stone-600 text-sm leading-relaxed mt-1">{a.desc}</p></div>
                {a.links?.web && <a href={a.links.web} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-stone-900/5 hover:bg-stone-900/10" title={T.website}><ArrowUpRight size={16} /></a>}
              </div>
              <div className="mt-5 pt-4 border-t border-stone-900/10"><Badges app={a} lang={lang} soon={T.soon} h={28} /></div>
            </article>
          ))}
        </div>
        <div className="text-center mt-6"><a href="/apps" className="text-sm font-bold text-orange-700 hover:text-orange-700">{T.allApps}</a></div>
      </section>

      <section id="projects" className="max-w-7xl mx-auto px-5 py-16">
        <Head kick={t4(S.webKick, lang)} title={T.projects} />
        {loading ? <p className="text-stone-500">{T.loading}</p> :
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {webApps.map(p => (
              <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer" className="group td-glass rounded-3xl overflow-hidden flex flex-col">
                <div className="relative aspect-[16/10] overflow-hidden"><Icon src={p.image_url} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" /><div className="absolute inset-x-0 bottom-0 h-1" style={{ background: p.accent_color || '#c2410c' }} /></div>
                <div className="p-5 flex-1 flex flex-col"><h3 className="font-extrabold text-lg">{p.title}</h3><p className="text-stone-600 text-sm mt-1.5 leading-relaxed line-clamp-3 flex-1">{p.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-orange-700 group-hover:text-orange-700">{T.launch} <ArrowUpRight size={15} /></span></div>
              </a>
            ))}
          </div>}
      </section>


      <footer className="border-t border-stone-900/10 py-10 text-center text-sm text-stone-600">
        <p className="font-bold text-stone-900">{T.footer}</p><p className="mt-2">{CREDIT}</p><p className="mt-1 text-xs text-stone-500">© 2026</p>
        <Legal />
      </footer>
    </div>
  );
}
const Head = ({ kick, title, sub }) => <div className="mb-8"><div className="text-xs font-bold tracking-widest uppercase text-orange-700 mb-2">{kick}</div><h2 className="td-serif text-3xl md:text-5xl font-black tracking-tight">{title}</h2>{sub && <p className="text-stone-600 mt-2">{sub}</p>}</div>;

