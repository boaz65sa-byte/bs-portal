import React from 'react';
export const t4 = (o, l) => o[l] || o.en;
export const S = {
  storeKick: { he: 'בחנויות הרשמיות', en: 'On the official stores', ar: 'في المتاجر الرسمية', ru: 'В официальных магазинах' },
  webKick: { he: 'אפליקציות web · כניסה ישירה מהדפדפן', en: 'Web apps · open right in your browser', ar: 'تطبيقات ويب · افتحها مباشرة من المتصفح', ru: 'Веб-приложения · прямо в браузере' },
  count: { he: 'אפליקציות', en: 'apps', ar: 'تطبيقات', ru: 'приложений' },
  stores: { he: 'חנויות רשמיות', en: 'official stores', ar: 'متاجر رسمية', ru: 'официальных магазинов' },
  langs: { he: 'שפות', en: 'languages', ar: 'لغات', ru: 'языка' },
  contact: { he: 'יש לכם רעיון? בואו נבנה אותו', en: 'Got an idea? Let’s build it', ar: 'لديك فكرة؟ لنبنِها معًا', ru: 'Есть идея? Давайте воплотим её' },
  talk: { he: 'דברו איתי', en: 'Get in touch', ar: 'تواصل معي', ru: 'Связаться' },
};
export const MAIL = 'mailto:boaz65sa@gmail.com';
export const Icon = ({ src, alt, className }) => src ? <img src={src} alt={alt} className={className} loading="lazy" /> : <div className={className + ' grid place-items-center font-black text-slate-500 bg-slate-800'}>BS</div>;
