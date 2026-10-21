import React from 'react';
import { LANGS } from '../i18n';
export default function LangSwitch({ lang, setLang, className = '', active = 'bg-white text-black', idle = 'text-gray-400 hover:text-white' }) {
  return (
    <div className={`inline-flex items-center rounded-full p-0.5 ${className}`} role="group" aria-label="Language">
      {LANGS.map(l => (
        <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l}
          className={`px-2 py-1 rounded-full text-[11px] font-bold transition ${lang === l ? active : idle}`}>{l.toUpperCase()}</button>
      ))}
    </div>
  );
}
