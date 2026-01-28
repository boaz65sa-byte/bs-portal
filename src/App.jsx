import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function App() {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);
  const [lang, setLang] = useState('he');
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(false);

  const isHe = lang === 'he';

  useEffect(() => {
    // בדיקה אם המשתמש כבר מחובר
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // האזנה לשינויים במצב החיבור
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    fetchProjects();

    return () => subscription.unsubscribe();
  }, []);

  async function fetchProjects() {
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (!error) setProjects(data);
    setLoading(false);
  }

  async function handleLogin(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else setShowLogin(false);
  }

  if (loading) return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
      <div className="text-blue-500 animate-pulse font-mono text-center tracking-tighter uppercase">
        Initializing BS-SIMPLE Ecosystem...
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans overflow-x-hidden" dir={isHe ? "rtl" : "ltr"}>
      
      {/* Header - Mobile Responsive */}
      <header className="max-w-7xl mx-auto p-6 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5">
        <div>
          <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase leading-none">BS-SIMPLE</h1>
          <p className="text-blue-400 font-bold text-sm md:text-xl mt-4 flex items-center gap-3">
            <span className="h-[2px] w-8 md:w-12 bg-blue-500"></span>
            {isHe ? "פתרונות יצירתיים, טכנולוגיה וניהול" : "CREATIVE SOLUTIONS, TECH & MANAGEMENT"}
          </p>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <button onClick={() => setLang(isHe ? 'en' : 'he')} className="flex-1 md:flex-none glass-card px-4 py-3 rounded-xl border border-blue-500/30 text-xs font-black uppercase tracking-widest">
            {isHe ? "EN" : "עברית"}
          </button>
          
          {user ? (
            <button onClick={() => supabase.auth.signOut()} className="flex-1 md:flex-none bg-red-900/20 border border-red-500/50 text-red-500 px-4 py-3 rounded-xl text-xs font-black uppercase">
              {isHe ? "יציאה" : "LOGOUT"}
            </button>
          ) : (
            <button onClick={() => setShowLogin(true)} className="flex-1 md:flex-none bg-blue-600 text-white px-4 py-3 rounded-xl text-xs font-black uppercase">
              {isHe ? "כניסת מנהל" : "ADMIN LOGIN"}
            </button>
          )}
        </div>
      </header>

      {/* Main Grid - 1 col on mobile, 3 on desktop */}
      <main className="max-w-7xl mx-auto p-6 md:p-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {projects.map((p) => (
          <div key={p.id} className="group relative bg-[#0f172a] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border border-white/5 hover:border-blue-500/50 transition-all duration-500 flex flex-col shadow-2xl">
            <div className="h-64 md:h-[400px] relative overflow-hidden">
              <img src={p.image_url} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute top-0 right-0 left-0 h-[4px]" style={{ backgroundColor: p.accent_color }}></div>
            </div>
            <div className="p-8 md:p-12 flex-grow">
              <h2 className="text-3xl md:text-5xl font-black mb-4 leading-none">{isHe ? p.name_he : p.name_en}</h2>
              <p className="text-gray-400 text-lg md:text-xl font-light mb-8 line-clamp-3">{isHe ? p.description_he : p.description_en}</p>
              <a href={p.url} className="inline-block bg-blue-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-tighter hover:bg-white hover:text-blue-600 transition-all">
                {isHe ? "כניסה למערכת" : "LAUNCH APP"}
              </a>
            </div>
          </div>
        ))}
      </main>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-6">
          <form onSubmit={handleLogin} className="bg-[#0f172a] p-10 rounded-[3rem] border border-blue-500/30 max-w-md w-full">
            <h2 className="text-3xl font-black mb-8 uppercase italic tracking-tighter text-center">Admin Access</h2>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl mb-4 focus:border-blue-500 outline-none" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl mb-8 focus:border-blue-500 outline-none" />
            <div className="flex gap-4">
              <button type="submit" className="flex-1 bg-blue-600 p-4 rounded-2xl font-black uppercase">Login</button>
              <button type="button" onClick={() => setShowLogin(false)} className="flex-1 bg-white/5 p-4 rounded-2xl font-black uppercase">Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}