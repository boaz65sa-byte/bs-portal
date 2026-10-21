import React from 'react';
export const PLAT = [
  ['appstore', 'appstore', 'App Store', 'iPhone · iPad', 'svg'],
  ['macappstore', 'macappstore', 'Mac App Store', 'Mac', 'svg'],
  ['play', 'play', 'Google Play', 'Android', 'png'],
  ['galaxy', 'galaxy', 'Galaxy Store', 'Samsung Galaxy', 'png'],
  ['microsoft', 'ms', 'Microsoft Store', 'Windows', 'svg'],
];
// Official badges, artwork unaltered; uniform height via --h; no-store-page slots dimmed with "soon".
export default function Badges({ app, lang, soon, h = 30, light }) {
  const L = app.links || {}; const bl = lang === 'he' ? 'he' : 'en';
  return (
    <div className="bdg-row" style={{ '--h': h + 'px' }}>
      {PLAT.map(([k, f, store, plat, ext]) => {
        const img = <img className={`bdg bdg-${k}`} src={`/apps/badges/${f}-${bl}.${ext}`} alt={store} loading="lazy" />;
        return L[k]
          ? <a key={k} className="bdg-slot" href={L[k]} target="_blank" rel="noopener noreferrer" title={plat}>{img}</a>
          : <span key={k} className={`bdg-slot soon${light ? ' light' : ''}`} title={`${plat} · ${soon}`}>{img}<small>{soon}</small></span>;
      })}
    </div>
  );
}
