// Product page in theme D style: /#/app/<id> and /#/app/<id>/privacy
import React, { useEffect } from 'react';
import { ArrowRight, ArrowLeft, Globe } from 'lucide-react';
import Badges from '../site/Badges';
import LangSwitch from '../site/LangSwitch';
import { CREDIT } from '../site/useSite';
import { t4 } from './common';
import { PRODUCTS, P } from '../site/products';
import { Legal as LegalA } from './A';
import './D.css';

export default function Product({ id, sub, lang, setLang, rtl }) {
  const p = PRODUCTS[id];
  useEffect(() => { window.scrollTo(0, 0); }, [id, sub]);
  const name = p ? (typeof p.name === 'string' ? p.name : t4(p.name, lang)) : '';
  useEffect(() => { if (p) document.title = `${name} · bs-simple`; return () => { document.title = 'BS-SIMPLE'; }; }, [name]);
  const Back = rtl ? ArrowRight : ArrowLeft;
  const soon = t4(P.soonBadge, lang);
  return (
    <div className="td min-h-screen" dir={rtl ? 'rtl' : 'ltr'}>
      <div className="td-aurora" aria-hidden />
      <nav className="sticky top-0 z-40 backdrop-blur-xl bg-[#f6f1e8]/75 border-b border-stone-900/10">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 font-black tracking-tight text-lg"><img src="/brand/monogram.svg" alt="bs-simple" className="w-11 h-11" /> BS-SIMPLE</a>
          <LangSwitch lang={lang} setLang={setLang} className="bg-stone-900/5 border border-stone-900/15" />
        </div>
      </nav>
      {!p ? <main className="relative max-w-3xl mx-auto px-5 py-32 text-center"><a href="/" className="td-btn-primary">{t4(P.back, lang)}</a></main> :
      sub === 'privacy' && p.privacy ? (
        <main className="relative max-w-3xl mx-auto px-5 py-20">
          <a href={`#/app/${id}`} className="inline-flex items-center gap-1 text-sm font-bold text-orange-700"><Back size={15} /> {name}</a>
          <h1 className="td-serif text-4xl md:text-5xl font-black mt-6">{t4(P.privacy, lang)} · {name}</h1>
          <div className="td-glass rounded-3xl p-7 mt-8 space-y-4 text-stone-700 leading-relaxed">{(P.privacyBody[lang] || P.privacyBody.en).map((l, i) => <p key={i}>{l}</p>)}<p>boaz65sa@gmail.com</p></div>
        </main>
      ) : (
        <main className="relative">
          <header className="max-w-6xl mx-auto px-5 pt-14 md:pt-20 pb-12">
            <a href="/#apps" className="inline-flex items-center gap-1 text-sm font-bold text-orange-700"><Back size={15} /> {t4(P.back, lang)}</a>
            <div className="mt-8 grid md:grid-cols-[auto,1fr] gap-8 items-center">
              <img src={p.icon} alt={name} className="w-28 h-28 md:w-40 md:h-40 rounded-[2rem] shadow-2xl ring-8 ring-white/70 td-float" />
              <div>
                <div className="flex items-center gap-3 flex-wrap"><h1 className="td-serif td-h1 font-black leading-none" style={{ fontSize: 'clamp(2.6rem,7vw,5rem)' }}>{name}</h1>
                  {p.soonAll && <span className="text-xs font-bold rounded-full px-3 py-1 bg-orange-100 text-orange-800 border border-orange-300">{soon}</span>}</div>
                <p className="mt-4 text-xl md:text-2xl font-bold td-grad">{t4(p.tagline, lang)}</p>
                <p className="mt-4 max-w-2xl text-stone-700 leading-relaxed md:text-lg">{t4(p.desc, lang)}</p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  {p.links.appstore && <a href={p.links.appstore} target="_blank" rel="noopener noreferrer" className="td-btn-primary">{t4(P.get, lang)}</a>}
                  {p.web && <a href={p.web} target="_blank" rel="noopener noreferrer" className="td-btn-ghost gap-2 items-center"><Globe size={16} /> {t4(P.web, lang)}</a>}
                </div>
              </div>
            </div>
            <div className="td-glass rounded-3xl p-5 mt-10"><Badges app={{ links: p.links }} lang={lang} soon={soon} h={36} /></div>
          </header>
          {p.banner && <div className="max-w-6xl mx-auto px-5"><img src={p.banner} alt={name} className="w-full rounded-3xl shadow-xl" /></div>}
          <section className="max-w-6xl mx-auto px-5 py-14">
            <h2 className="td-serif text-3xl md:text-4xl font-black mb-8">{t4(P.features, lang)}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {p.features.map((f, i) => <div key={i} className={`td-glass rounded-3xl p-6 ${i === 0 ? 'td-feature' : ''}`}><div className="text-3xl">{f.i}</div><p className="mt-3 font-bold text-stone-800 leading-snug">{t4(f, lang)}</p></div>)}
            </div>
          </section>
          {p.shots.length > 0 && <section className="max-w-6xl mx-auto px-5 pb-14">
            <h2 className="td-serif text-3xl md:text-4xl font-black mb-8">{t4(P.shots, lang)}</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x tb-strip">{p.shots.map(s => <img key={s} src={s} alt={name} loading="lazy" className="snap-start h-[420px] md:h-[520px] w-auto rounded-3xl shadow-lg ring-1 ring-stone-900/10 flex-none" />)}</div>
          </section>}
          {(p.support || p.privacyUrl || p.privacy) && <section className="max-w-6xl mx-auto px-5 pb-10 flex gap-4 text-sm font-bold">
            {p.support && <a className="text-orange-700 underline" href={p.support} target="_blank" rel="noopener noreferrer">{t4(P.support, lang)}</a>}
            {p.privacyUrl && <a className="text-orange-700 underline" href={p.privacyUrl} target="_blank" rel="noopener noreferrer">{t4(P.privacy, lang)}</a>}
            {p.privacy && <a className="text-orange-700 underline" href={`#/app/${id}/privacy`}>{t4(P.privacy, lang)}</a>}
          </section>}
        </main>
      )}
      <footer className="border-t border-stone-900/10 py-10 text-center text-sm text-stone-600">
        <p className="mt-3 flex items-center justify-center gap-2"><img src="/brand/monogram.svg" alt="bs-simple" className="w-10 h-10" /><a href="https://bs-simple.com" className="hover:text-orange-700">{CREDIT}</a></p><p className="mt-1 text-xs text-stone-500">© 2026</p>
        <LegalA className="text-stone-500" />
      </footer>
    </div>
  );
}
