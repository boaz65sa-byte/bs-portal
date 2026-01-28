import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Trash2, Plus, X, Globe, LogOut, User } from 'lucide-react'; // אייקונים יפים

// הגדרת החיבור ל-Supabase
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function App() {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);
  const [lang, setLang] = useState('he'); // שפה דיפולטיבית
  const [loading, setLoading] = useState(true);
  
  // משתנים לטופס התחברות
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(false);

  // משתנים להוספת פרויקט חדש
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProject, setNewProject] = useState({
    name_he: '', name_en: '', 
    description_he: '', description_en: '', 
    url: '', image_url: '', accent_color: '#3b82f6'
  });

  const isHe = lang === 'he';

  useEffect(() => {
    // 1. בדיקת משתמש מחובר
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // 2. טעינת הפרויקטים
    fetchProjects();

    return () => subscription.unsubscribe();
  }, []);

  async function fetchProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error) setProjects(data || []);
    setLoading(false);
  }

  // התחברות
  async function handleLogin(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert("שגיאה בהתחברות: " + error.message);
    else {
      setShowLogin(false);
      setEmail('');
      setPassword('');
    }
  }

  // הוספת פרויקט
  async function handleAddProject(e) {
    e.preventDefault();
    // בדיקה פשוטה שהשדות לא ריקים
    if (!newProject.name_he) return alert('חובה למלא שם בעברית');

    const { error } = await supabase.from('projects').insert([newProject]);
    if (error) {
      alert('שגיאה בשמירה: ' + error.message);
    } else {
      setShowAddModal(false);
      setNewProject({ name_he: '', name_en: '', description_he: '', description_en: '', url: '', image_url: '', accent_color: '#3b82f6' });
      fetchProjects(); // רענון הרשימה
    }
  }

  // מחיקת פרויקט
  async function handleDelete(id) {
    if (!window.confirm('בטוח שאתה רוצה למחוק את הפרויקט הזה?')) return;
    
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (!error) fetchProjects();
    else alert(error.message);
  }

  if (loading) return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center">
      <div className="text-blue-500 animate-pulse text-xl font-mono">LOADING BS-SIMPLE...</div>
    </div>
  );

  return (
    <div className={`min-h-screen bg-[#020617] text-white font-sans ${isHe ? 'rtl' : 'ltr'}`} dir={isHe ? "rtl" : "ltr"}>
      
      {/* Header */}
      <header className="max-w-7xl mx-auto p-6 flex flex-col md:flex-row justify-between items-center gap-6 border-b border-white/10 sticky top-0 bg-[#020617]/80 backdrop-blur-md z-40">
        <div className="text-center md:text-right">
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter">BS-SIMPLE</h1>
          <p className="text-blue-400 text-sm md:text-base font-bold tracking-widest mt-2">
            {isHe ? "פתרונות יצירתיים, טכנולוגיה וניהול" : "CREATIVE SOLUTIONS & TECH"}
          </p>
        </div>

        <div className="flex gap-3">
          <button onClick={() => setLang(isHe ? 'en' : 'he')} className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition">
            <Globe size={20} />
          </button>

          {user ? (
            <>
              <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full font-bold transition shadow-lg shadow-blue-900/20">
                <Plus size={20} />
                <span>{isHe ? "פרויקט חדש" : "New Project"}</span>
              </button>
              <button onClick={() => supabase.auth.signOut()} className="p-3 bg-red-500/10 text-red-500 rounded-full hover:bg-red-500/20 transition">
                <LogOut size={20} />
              </button>
            </>
          ) : (
            <button onClick={() => setShowLogin(true)} className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-full font-bold hover:bg-white/20 transition">
              <User size={20} />
              <span>{isHe ? "כניסה" : "Login"}</span>
            </button>
          )}
        </div>
      </header>

      {/* Grid */}
      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {projects.map((p) => (
          <div key={p.id} className="group relative bg-[#0f172a] rounded-3xl overflow-hidden border border-white/5 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-2 shadow-2xl">
            {/* כפתור מחיקה למנהל בלבד */}
            {user && (
              <button 
                onClick={(e) => { e.preventDefault(); handleDelete(p.id); }}
                className="absolute top-4 right-4 z-10 p-2 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={16} />
              </button>
            )}
            
            <div className="h-48 overflow-hidden relative">
              {p.image_url ? (
                <img src={p.image_url} alt={p.name_en} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition duration-700" />
              ) : (
                <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-600 text-4xl font-black">BS</div>
              )}
              <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: p.accent_color }}></div>
            </div>

            <div className="p-8">
              <h2 className="text-2xl font-bold mb-3">{isHe ? p.name_he : p.name_en}</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 h-16 overflow-hidden">
                {isHe ? p.description_he : p.description_en}
              </p>
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-white/5 hover:bg-blue-600 hover:text-white py-4 rounded-xl font-bold transition-colors border border-white/10">
                {isHe ? "כניסה למערכת" : "LAUNCH APP"}
              </a>
            </div>
          </div>
        ))}
      </main>

      {/* מודל התחברות */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1e293b] p-8 rounded-3xl max-w-sm w-full border border-white/10 relative">
            <button onClick={() => setShowLogin(false)} className="absolute top-4 left-4 text-gray-400"><X /></button>
            <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="bg-black/20 p-4 rounded-xl border border-white/10 text-white" />
              <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="bg-black/20 p-4 rounded-xl border border-white/10 text-white" />
              <button type="submit" className="bg-blue-600 py-4 rounded-xl font-bold hover:bg-blue-500">התחבר</button>
            </form>
          </div>
        </div>
      )}

      {/* מודל הוספת פרויקט */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#1e293b] p-8 rounded-3xl max-w-2xl w-full border border-white/10 relative my-10">
            <button onClick={() => setShowAddModal(false)} className="absolute top-6 left-6 text-gray-400"><X /></button>
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">הוספת פרויקט חדש</h2>
            
            <form onSubmit={handleAddProject} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-xs text-gray-500 mb-1 block">שם הפרויקט (עברית)</label>
                <input required className="w-full bg-black/20 p-3 rounded-xl border border-white/10" value={newProject.name_he} onChange={e => setNewProject({...newProject, name_he: e.target.value})} />
              </div>
              <div className="col-span-2">
                <label className="text-xs text-gray-500 mb-1 block">שם הפרויקט (אנגלית)</label>
                <input required className="w-full bg-black/20 p-3 rounded-xl border border-white/10" value={newProject.name_en} onChange={e => setNewProject({...newProject, name_en: e.target.value})} />
              </div>
              
              <div className="col-span-2 md:col-span-1">
                <label className="text-xs text-gray-500 mb-1 block">תיאור קצר (עברית)</label>
                <textarea className="w-full bg-black/20 p-3 rounded-xl border border-white/10 h-24" value={newProject.description_he} onChange={e => setNewProject({...newProject, description_he: e.target.value})} />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="text-xs text-gray-500 mb-1 block">תיאור קצר (אנגלית)</label>
                <textarea className="w-full bg-black/20 p-3 rounded-xl border border-white/10 h-24" value={newProject.description_en} onChange={e => setNewProject({...newProject, description_en: e.target.value})} />
              </div>

              <div className="col-span-2">
                <label className="text-xs text-gray-500 mb-1 block">קישור לאפליקציה (URL)</label>
                <input className="w-full bg-black/20 p-3 rounded-xl border border-white/10 text-blue-400" placeholder="https://..." value={newProject.url} onChange={e => setNewProject({...newProject, url: e.target.value})} />
              </div>

              <div className="col-span-2 md:col-span-1">
                 <label className="text-xs text-gray-500 mb-1 block">לינק לתמונה</label>
                 <input className="w-full bg-black/20 p-3 rounded-xl border border-white/10" placeholder="/image.jpg או https://..." value={newProject.image_url} onChange={e => setNewProject({...newProject, image_url: e.target.value})} />
              </div>
              <div className="col-span-2 md:col-span-1">
                 <label className="text-xs text-gray-500 mb-1 block">צבע מותג</label>
                 <input type="color" className="w-full h-12 bg-transparent cursor-pointer" value={newProject.accent_color} onChange={e => setNewProject({...newProject, accent_color: e.target.value})} />
              </div>

              <button type="submit" className="col-span-2 bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-bold mt-4 transition">
                שמור ופרסם באתר
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}