// Direction B — "Atelier": warm paper, editorial serif, numbered index. Calm, premium, light.
import React from 'react';
import { ArrowUpRight, Settings } from 'lucide-react';
import Badges from '../site/Badges';
import LangSwitch from '../site/LangSwitch';
import { CREDIT } from '../site/useSite';
import { t4, S, Icon } from './common';
import { Legal } from './A';
import './B.css';

export default function ThemeB({ lang, setLang, rtl, site }) {
  const { T, storeApps, webApps, loading } = site;
  const n = i => String(i + 1).padStart(2, '0');
  return (
    <div className="tb min-h-screen" dir={rtl ? 'rtl' : 'ltr'}>
      <nav className="max-w-6xl mx-auto px-5 h-20 flex items-center justify-between">
        <a href="#top" className="tb-serif text-2xl font-black tracking-tight">BS<span className="text-[#c2410c]">·</span>SIMPLE</a>
        <div className="flex items-center gap-3">
          <a href="#apps" className="hidden md:inline text-sm hover:text-[#c2410c]">{T.ourApps}</a>
          <a href="#projects" className="hidden md:inline text-sm hover:text-[#c2410c]">{T.projects}</a>
          <LangSwitch lang={lang} setLang={setLang} className="border border-[#1c1917]/15" active="bg-[#1c1917] text-[#f6f1e8]" idle="text-[#78716c] hover:text-[#1c1917]" />
          <a href="#/admin" title={T.admin} className="p-2 rounded-full hover:bg-black/5 text-[#78716c]"><Settings size={16} /></a>
        </div>
      </nav>

      <header id="top" className="max-w-6xl mx-auto px-5 pt-10 md:pt-16 pb-14 grid md:grid-cols-[1.4fr_1fr] gap-10 items-end border-b border-[#1c1917]/15">
        <div>
          <div className="text-xs tracking-[.25em] uppercase text-[#c2410c] font-semibold mb-6">bs-simple.com · {new Date().getFullYear()}</div>
          <h1 className="tb-serif tb-h1 font-black leading-[.98]">{T.heroA}<br /><em className="not-italic text-[#c2410c]">{T.heroB}</em></h1>
        </div>
        <div>
          <p className="text-[17px] leading-relaxed text-[#44403c]">{T.heroP}</p>
          <div className="mt-6 flex gap-3"><a href="#apps" className="tb-btn">{T.ourApps}</a><a href="#projects" className="tb-btn-line">{T.viewProjects}</a></div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-5 py-8 overflow-hidden">
        <div className="flex gap-4 overflow-x-auto pb-2 tb-strip">
          {storeApps.map(a => <a key={a.id} href={`#app-${a.id}`} className="shrink-0 flex items-center gap-2 bg-white rounded-full pe-4 p-1 shadow-sm border border-black/5"><img src={`/apps/icons/${a.icon}`} className="w-8 h-8 rounded-full" alt="" /><span className="text-sm font-semibold">{a.title}</span></a>)}
        </div>
      </section>

      <section id="apps" className="max-w-6xl mx-auto px-5 py-12">
        <SecHead no="I" kick={t4(S.storeKick, lang)} title={T.ourApps} sub={T.hubSub} />
        <div className="divide-y divide-[#1c1917]/10 border-y border-[#1c1917]/10">
          {storeApps.map((a, i) => (
            <article id={`app-${a.id}`} key={a.id} className="py-7 grid md:grid-cols-[60px_88px_1fr_auto] gap-5 items-center">
              <span className="tb-serif text-3xl text-[#a8a29e] hidden md:block">{n(i)}</span>
              <img src={`/apps/icons/${a.icon}`} alt={a.title} className="w-20 h-20 rounded-[22px] shadow-[0_10px_30px_rgba(28,25,23,.18)]" />
              <div><h3 className="tb-serif text-2xl font-bold">{a.title}</h3><p className="text-[#57534e] mt-1 leading-relaxed">{a.desc}</p>
                {a.links?.web && <a href={a.links.web} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-[#c2410c] mt-2">{T.website} <ArrowUpRight size={14} /></a>}</div>
              <div className="md:max-w-[330px]"><Badges app={a} lang={lang} soon={T.soon} h={28} light /></div>
            </article>
          ))}
        </div>
        <div className="mt-6"><a href="/apps" className="text-sm font-semibold underline underline-offset-4 decoration-[#c2410c]">{T.allApps}</a></div>
      </section>

      <section id="projects" className="max-w-6xl mx-auto px-5 py-12">
        <SecHead no="II" kick={t4(S.webKick, lang)} title={T.projects} />
        {loading ? <p>{T.loading}</p> :
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {webApps.map((p, i) => (
              <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer" className="group block">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#e7e0d4] relative"><Icon src={p.image_url} alt={p.title} className="w-full h-full object-cover group-hover:scale-[1.04] transition duration-700" />
                  <span className="absolute top-3 start-3 bg-[#f6f1e8]/90 rounded-full px-2.5 py-0.5 text-xs font-bold tb-serif">{n(i)}</span></div>
                <h3 className="tb-serif text-xl font-bold mt-4 flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full" style={{ background: p.accent_color || '#c2410c' }} />{p.title}</h3>
                <p className="text-[#57534e] text-[15px] mt-1 leading-relaxed line-clamp-3">{p.desc}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold mt-3 text-[#1c1917] group-hover:text-[#c2410c]">{T.launch} <ArrowUpRight size={14} /></span>
              </a>
            ))}
          </div>}
      </section>

      <footer className="bg-[#1c1917] text-[#e7e5e4] mt-10">
        <div className="max-w-6xl mx-auto px-5 py-12 text-center">
          <div className="tb-serif text-3xl font-black">BS<span className="text-[#fb923c]">·</span>SIMPLE</div>
          <p className="mt-3 font-semibold">{T.footer}</p><p className="mt-1 text-sm text-[#a8a29e]">{CREDIT}</p>
          <Legal className="text-[#78716c]" />
        </div>
      </footer>
    </div>
  );
}
const SecHead = ({ no, kick, title, sub }) => <div className="mb-8 flex items-end justify-between gap-6 flex-wrap"><div><div className="text-xs tracking-[.25em] uppercase text-[#c2410c] font-semibold">{no} — {kick}</div><h2 className="tb-serif text-4xl md:text-6xl font-black mt-2">{title}</h2></div>{sub && <p className="text-[#78716c] max-w-sm">{sub}</p>}</div>;
