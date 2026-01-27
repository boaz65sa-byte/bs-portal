import React, { useState } from 'react';

const PROJECTS = {
  he: [
    { 
      id: 1, 
      name: "ניהול מבני יוקרה", 
      desc: "אחזקה וניהול פרימיום למגדלי יוקרה, לובי עסקי ובקרה תפעולית חכמה.", 
      url: "https://buildings.bs-simple.com", 
      image: "/lobby.jpg", 
      accent: "#0ea5e9" 
    },
    { 
      id: 2, 
      name: "בוזוקי ומאסטרו מוזיקה", 
      desc: "לימוד בוזוקי יווני, גיטרה וקלידים באווירת טברנה אותנטית. מודוסים ומקאמים.", 
      url: "https://music.bs-simple.com", 
      image: "/music.jpg", 
      accent: "#8b5cf6" 
    },
    { 
      id: 3, 
      name: "ניהול מטבח מקצועי", 
      desc: "הנדסת תפריט, ניהול צוות טבחים והקמת מטבחים מהיסוד ברמה הגבוהה ביותר.", 
      url: "https://kitchen.bs-simple.com", 
      image: "/chef.jpg", 
      accent: "#f97316" 
    },
  ],
  en: [
    { id: 1, name: "Luxury Property MGMT", desc: "Premium maintenance for high-end towers and business lobbies.", url: "https://buildings.bs-simple.com", image: "/lobby.jpg", accent: "#0ea5e9" },
    { id: 2, name: "Bouzouki Music Master", desc: "Greek Bouzouki, Guitar & Keys in an authentic taverna style.", url: "https://music.bs-simple.com", image: "/music.jpg", accent: "#8b5cf6" },
    { id: 3, name: "Executive Chef Pro", desc: "Menu engineering and professional kitchen leadership.", url: "https://kitchen.bs-simple.com", image: "/chef.jpg", accent: "#f97316" },
  ]
};

export default function App() {
  const [lang, setLang] = useState('he');
  const isHe = lang === 'he';

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans p-6 md:p-12 overflow-x-hidden" dir={isHe ? "rtl" : "ltr"}>
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-24 border-b border-white/5 pb-12 relative z-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-7xl md:text-8xl font-black italic tracking-tighter leading-none">BS-SIMPLE</h1>
            <p className="text-blue-500 font-bold text-xl mt-6 flex items-center gap-4">
              <span className="h-[2px] w-12 bg-blue-500"></span>
              {isHe ? "פתרונות יצירתיים, טכנולוגיה וניהול" : "CREATIVE SOLUTIONS, TECH & MANAGEMENT"}
            </p>
          </div>
          
          <button 
            onClick={() => setLang(isHe ? 'en' : 'he')}
            className="glass-card px-8 py-4 rounded-2xl border border-blue-500/30 text-blue-400 font-black text-sm hover:bg-blue-600 hover:text-white transition-all duration-500"
          >
            {isHe ? "ENGLISH VIEW" : "תצוגת עברית"}
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
        {PROJECTS[lang].map((p) => (
          <a key={p.id} href={p.url} className="group relative bg-[#0f172a] rounded-[4rem] overflow-hidden border border-white/5 hover:border-blue-500/50 transition-all duration-700 shadow-2xl flex flex-col no-underline">
            
            {/* Image Section - Ken Burns Effect */}
            <div className="h-[450px] relative overflow-hidden">
              <img 
                src={p.image} 
                alt={p.name} 
                className="w-full h-full object-cover scale-110 opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-[5000ms] ease-out"
                onError={(e) => { e.target.src = "https://via.placeholder.com/800x1200/0f172a/ffffff?text=Image+Loading..."; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/20 to-transparent"></div>
              <div className="absolute top-0 right-0 left-0 h-[4px]" style={{ backgroundColor: p.accent, boxShadow: `0 0 30px ${p.accent}` }}></div>
            </div>

            {/* Content Section */}
            <div className="p-14 flex-grow flex flex-col">
              <h2 className="text-5xl md:text-6xl font-black mb-8 text-white group-hover:text-blue-400 transition-colors duration-500 leading-[1]">
                {p.name}
              </h2>
              <p className="text-gray-400 text-2xl font-light leading-relaxed mb-12 opacity-80 h-32 overflow-hidden">
                {p.desc}
              </p>
              
              <div className="mt-auto pt-10 border-t border-white/10 flex justify-between items-center group-hover:border-blue-500/30">
                <span className="text-xs font-mono tracking-[0.4em] text-blue-500 uppercase font-black tracking-widest">System Access</span>
                <div className="w-16 h-16 rounded-full border border-blue-500/40 flex items-center justify-center group-hover:bg-blue-600 transition-all duration-500 shadow-lg">
                  <span className={`text-4xl text-white ${isHe ? 'rotate-0' : 'rotate-180'}`}>←</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto mt-48 flex flex-col items-center">
        <div className="text-[12px] text-gray-700 font-mono uppercase tracking-[0.6em] text-center border-t border-white/5 pt-12 w-full">
          BS-SIMPLE פתרונות יצירתיים | נבנה על ידי BS-SIMPLE פתרונות יצירתיים
        </div>
      </footer>
    </div>
  );
}