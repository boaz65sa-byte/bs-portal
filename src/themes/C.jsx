// Direction C — "Playground": bright, bold color blocks, app-icon marquee, colorful tiles. Energetic, friendly.
import React from 'react';
import { ArrowUpRight, Settings, Sparkles } from 'lucide-react';
import Badges from '../site/Badges';
import LangSwitch from '../site/LangSwitch';
import { CREDIT } from '../site/useSite';
import { t4, S, Icon } from './common';
import { Legal } from './A';
import './C.css';

const TINTS = ['#ffe4e6', '#e0f2fe', '#fef3c7', '#dcfce7', '#ede9fe', '#ffedd5', '#cffafe', '#fae8ff'];

export default function ThemeC({ lang, setLang, rtl, site }) {
  const { T, storeApps, webApps, loading } = site;
  const loop = [...storeApps, ...webApps.map(p => ({ id: 'p' + p.id, title: p.title, img: p.image_url }))];
  return (
    <div className="tc min-h-screen" dir={rtl ? 'rtl' : 'ltr'}>
      <nav className="sticky top-3 z-40 mx-3 md:mx-auto max-w-6xl">
        <div className="bg-white/85 backdrop-blur-xl rounded-full shadow-[0_8px_30px_rgba(15,23,42,.08)] border border-slate-200 h-14 px-3 ps-5 flex items-center justify-between">
          <a href="#top" className="font-black tracking-tight text-lg flex items-center gap-1.5"><span className="tc-dot" /> bs-simple</a>
          <div className="flex items-center gap-2">
            <a href="#apps" className="hidden md:inline text-sm font-semibold px-3 hover:text-violet-600">{T.ourApps}</a>
            <a href="#projects" className="hidden md:inline text-sm font-semibold px-3 hover:text-violet-600">{T.projects}</a>
            <LangSwitch lang={lang} setLang={setLang} className="bg-slate-100" active="bg-slate-900 text-white" idle="text-slate-500 hover:text-slate-900" />
            <a href="#/admin" title={T.admin} className="p-2 rounded-full hover:bg-slate-100 text-slate-500"><Settings size={16} /></a>
          </div>
        </div>
      </nav>

      <header id="top" className="max-w-6xl mx-auto px-5 pt-16 md:pt-24 pb-10 text-center">
        <span className="inline-flex items-center gap-1.5 bg-violet-100 text-violet-700 text-xs font-bold rounded-full px-3 py-1"><Sparkles size={13} /> {storeApps.length + webApps.length} {t4(S.count, lang)}</span>
        <h1 className="tc-h1 font-black tracking-tight leading-[1] mt-6">{T.heroA}<br /><span className="tc-mark">{T.heroB}</span></h1>
        <p className="mt-6 max-w-2xl mx-auto text-slate-600 text-base md:text-lg leading-relaxed">{T.heroP}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3"><a href="#apps" className="tc-btn">{T.ourApps} <ArrowUpRight size={18} /></a><a href="#projects" className="tc-btn-2">{T.viewProjects}</a></div>
      </header>

      <div className="tc-marquee py-6" aria-hidden><div className="tc-track">
        {[...loop, ...loop].map((a, i) => <div key={i} className="tc-chip">{a.icon ? <img src={`/apps/icons/${a.icon}`} alt="" /> : <Icon src={a.img} alt="" className="" />}<span>{a.title}</span></div>)}
      </div></div>

      <section id="apps" className="max-w-6xl mx-auto px-5 py-14">
        <Head kick={t4(S.storeKick, lang)} title={T.ourApps} sub={T.hubSub} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {storeApps.map((a, i) => (
            <article key={a.id} className="tc-tile rounded-[28px] p-6 flex flex-col" style={{ background: TINTS[i % TINTS.length] }}>
              <div className="flex items-center justify-between"><img src={`/apps/icons/${a.icon}`} alt={a.title} className="w-[72px] h-[72px] rounded-[20px] shadow-lg bg-white" />
                {a.links?.web && <a href={a.links.web} target="_blank" rel="noopener noreferrer" className="w-10 h-10 grid place-items-center rounded-full bg-white/80 hover:bg-white" title={T.website}><ArrowUpRight size={18} /></a>}</div>
              <h3 className="text-2xl font-black mt-5">{a.title}</h3>
              <p className="text-slate-700/80 mt-1.5 leading-relaxed flex-1">{a.desc}</p>
              <div className="mt-5 bg-white/70 rounded-2xl p-3"><Badges app={a} lang={lang} soon={T.soon} h={26} light /></div>
            </article>
          ))}
        </div>
        <div className="text-center mt-8"><a href="/apps" className="tc-btn-2">{T.allApps}</a></div>
      </section>

      <section id="projects" className="bg-slate-950 text-white py-16 mt-6 rounded-t-[48px]">
        <div className="max-w-6xl mx-auto px-5">
          <Head dark kick={t4(S.webKick, lang)} title={T.projects} />
          {loading ? <p className="text-slate-400">{T.loading}</p> :
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {webApps.map(p => (
                <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer" className="group rounded-[28px] overflow-hidden bg-slate-900 border border-white/10 hover:border-white/30 transition flex flex-col">
                  <div className="aspect-[16/10] overflow-hidden relative"><Icon src={p.image_url} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" /><span className="absolute top-3 end-3 w-9 h-9 grid place-items-center rounded-full bg-white text-slate-900 group-hover:rotate-45 transition"><ArrowUpRight size={18} /></span></div>
                  <div className="p-5 flex-1 flex flex-col" style={{ boxShadow: `inset 0 3px 0 ${p.accent_color || '#a78bfa'}` }}><h3 className="text-lg font-black">{p.title}</h3><p className="text-slate-400 text-sm mt-1.5 leading-relaxed line-clamp-3 flex-1">{p.desc}</p><span className="text-sm font-bold mt-4 text-violet-300">{T.launch}</span></div>
                </a>
              ))}
            </div>}
        </div>
        <footer className="max-w-6xl mx-auto px-5 pt-16 text-center">
          <div className="text-4xl font-black tracking-tight flex justify-center items-center gap-2"><span className="tc-dot" /> bs-simple</div>
          <p className="mt-3 font-bold">{T.footer}</p><p className="mt-1 text-sm text-slate-400">{CREDIT}</p>
          <Legal className="text-slate-600" />
        </footer>
      </section>
    </div>
  );
}
const Head = ({ kick, title, sub, dark }) => <div className="mb-8 text-center"><div className={`text-sm font-bold ${dark ? 'text-violet-300' : 'text-violet-600'}`}>{kick}</div><h2 className="text-4xl md:text-6xl font-black tracking-tight mt-1">{title}</h2>{sub && <p className={`mt-2 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{sub}</p>}</div>;
