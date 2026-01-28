import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Trash2, Plus, X, Globe, LogOut, User, ArrowRight, LayoutGrid, Info } from 'lucide-react';

// חיבור למסד הנתונים
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function App() {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);
  const [lang, setLang] = useState('he');
  const [loading, setLoading] = useState(true);
  
  // משתנים להתחברות
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(false);

  // משתנים להוספת פרויקט
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProject, setNewProject] = useState({
    name_he: '', name_en: '', 
    description_he: '', description_en: '', 
    url: '', image_url: '', accent_color: '#3b82f6'
  });

  const isHe = lang === 'he';

  useEffect(() => {
    // בדיקת משתמש מחובר
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // טעינת הפרויקטים
    fetchProjects();

    return () => subscription.unsubscribe();
  }, []);

  async function fetchProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('id', { ascending: false }); // מציג את החדשים למעלה
    
    if (error) console.error('Error fetching:', error);
    else setProjects(data || []);
    setLoading(false);
  }

  // התחברות למערכת
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

  // הוספת פרויקט חדש
  async function handleAddProject(e) {
    e.preventDefault();
    const { error } = await supabase.from('projects').insert([newProject]);
    if (error) alert("שגיאה בשמירה: " + error.message);
    else {
      setShowAddModal(false);
      // איפוס הטופס
      setNewProject({ name_he: '', name_en: '', description_he: '', description_en: '', url: '', image_url: '', accent_color: '#3b82f6' });
      fetchProjects();
    }
  }

  // מחיקת פרויקט
  async function handleDelete(id) {
    if (!window.confirm('למחוק את הפרויקט הזה לתמיד?')) return;
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (!error) fetchProjects();
    else alert("שגיאה במחיקה");
  }

  if (loading) return <div className="min-h-screen bg-[#020617] text-blue-500 flex items-center justify-center font-mono">LOADING BS-SIMPLE...</div>;

  return (
    <div className={`min-h-screen bg-[#020617] text-white font-sans overflow-x-hidden`} dir={isHe ? "rtl" : "ltr"}>
      
      {/* תפריט עליון */}
      <nav className="fixed w-full z-50 bg-[#020617]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="text-2xl font-black italic tracking-tighter cursor-pointer" onClick={() => window.scrollTo(0,0)}>BS-SIMPLE</div>
          
          <div className="flex items-center gap-4">
            <button onClick={() => setLang(isHe ? 'en' : 'he')} className="p-2 hover:bg-white/10 rounded-full transition text-gray-400 hover:text-white">
              <Globe size={20}/>
            </button>
            
            {user ? (
               <div className="flex gap-2">
                 <button onClick={() => setShowAddModal(true)} className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition shadow-lg shadow-blue-900/20">
                    <Plus size={16}/> {isHe ? "הוסף פרויקט" : "Add Project"}
                 </button>
                 <button onClick={() => supabase.auth.signOut()} className="bg-red-500/10 text-red-400 hover:bg-red-500/20 p-2 rounded-full transition">
                    <LogOut size={20}/>
                 </button>
               </div>
            ) : (
               <button onClick={() => setShowLogin(true)} className="bg-white/5 hover:bg-white/10 px-5 py-2 rounded-full text-sm font-bold transition border border-white/5">
                  {isHe ? "כניסה למנהל" : "Admin Login"}
               </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section - דף הבית */}
      <section className="relative pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* אפקט אור רקע */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full -z-10 pointer-events-none"></div>
        
        <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
          {isHe ? "הופכים מורכב" : "MAKING COMPLEX"} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            {isHe ? "לפשוט וחכם" : "SIMPLE & SMART"}
          </span>
        </h1>
        
        <p className="text-lg md:text-2xl text-gray-400 max-w-3xl leading-relaxed mb-12">
          {isHe 
            ? "אנחנו מחברים בין עולמות של ניהול מתקדם, קולינריה עילית, מוזיקה וטכנולוגיה. המטרה שלנו היא ליצור פתרונות מדויקים שחוסכים זמן ומשפרים חיים."
            : "Bridging the worlds of advanced management, culinary arts, music, and technology. Our mission is to create precise solutions that save time and enhance life."}
        </p>

        <a href="#projects" className="bg-white text-black px-8 py-4 rounded-full font-black text-lg hover:scale-105 transition flex items-center gap-2 shadow-xl shadow-white/10">
          {isHe ? "לצפייה בפרויקטים" : "VIEW PROJECTS"} <ArrowRight size={20} />
        </a>
      </section>

      {/* Grid Projects - רשימת הפרויקטים */}
      <section id="projects" className="py-24 bg-[#020617]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-3 text-white/90">
            <LayoutGrid className="text-blue-500" />
            {isHe ? "האפליקציות שלנו" : "Our Applications"}
          </h2>

          {projects.length === 0 ? (
            <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/20">
              <p className="text-xl text-gray-500">{isHe ? "טוען פרויקטים..." : "Loading projects..."}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((p) => (
                <div key={p.id} className="group bg-[#0f172a] rounded-3xl overflow-hidden border border-white/5 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-300 relative flex flex-col h-full">
                  
                  {/* כפתור מחיקה - רק למנהל */}
                  {user && (
                    <button 
                      onClick={(e) => { e.preventDefault(); handleDelete(p.id); }}
                      className="absolute top-4 right-4 z-20 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg"
                      title="Delete Project"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}

                  {/* תמונה */}
                  <div className="relative h-56 overflow-hidden bg-slate-800">
                    {p.image_url ? (
                       <img src={p.image_url} alt={p.name_en} className="w-full h-full object-cover group-hover:scale-110 transition duration-700 opacity-90 group-hover:opacity-100" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl font-black text-slate-700">BS</div>
                    )}
                    {/* פס צבעוני למטה */}
                    <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: p.accent_color }}></div>
                  </div>
                  
                  {/* תוכן הכרטיס */}
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold mb-3 text-white">{isHe ? p.name_he : p.name_en}</h3>
                    <p className="text-gray-400 text-sm mb-8 line-clamp-3 leading-relaxed flex-1">
                      {isHe ? p.description_he : p.description_en}
                    </p>
                    
                    <a 
                      href={p.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="mt-auto flex items-center justify-center gap-2 w-full bg-white/5 hover:bg-blue-600 text-white py-4 rounded-xl font-bold transition border border-white/10 hover:border-transparent group-hover:shadow-lg group-hover:shadow-blue-900/50"
                    >
                      {isHe ? "כניסה לאפליקציה" : "LAUNCH APP"} <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 text-center text-gray-600 text-sm">
        <p>© 2026 BS-SIMPLE. All rights reserved.</p>
        <p className="mt-2">Built with Supabase & React</p>
      </footer>

      {/* --- מודלים (חלונות קופצים) --- */}

      {/* מודל התחברות */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#1e293b] p-8 rounded-3xl w-full max-w-sm border border-white/10 relative shadow-2xl">
            <button onClick={() => setShowLogin(false)} className="absolute top-5 right-5 text-gray-400 hover:text-white"><X/></button>
            <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full bg-black/30 p-4 rounded-xl border border-white/10 focus:border-blue-500 outline-none transition" required />
              <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full bg-black/30 p-4 rounded-xl border border-white/10 focus:border-blue-500 outline-none transition" required />
              <button className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-bold shadow-lg shadow-blue-900/20 transition">התחבר למערכת</button>
            </form>
          </div>
        </div>
      )}

      {/* מודל הוספת פרויקט */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-in zoom-in-95 duration-200">
          <div className="bg-[#1e293b] p-8 rounded-3xl w-full max-w-2xl border border-white/10 relative my-10 shadow-2xl">
            <button onClick={() => setShowAddModal(false)} className="absolute top-6 left-6 text-gray-400 hover:text-white"><X/></button>
            <h2 className="text-2xl font-bold mb-8 text-center text-blue-400">הוספת פרויקט חדש</h2>
            
            <form onSubmit={handleAddProject} className="grid md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs text-gray-500 mr-1">שם הפרויקט (עברית)</label>
                <input placeholder="למשל: בוזוקי מאסטרו" value={newProject.name_he} onChange={e=>setNewProject({...newProject, name_he: e.target.value})} className="w-full bg-black/30 p-3 rounded-xl border border-white/10 focus:border-blue-500 outline-none" required />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-gray-500 mr-1">Project Name (English)</label>
                <input placeholder="e.g. Bouzouki Maestro" value={newProject.name_en} onChange={e=>setNewProject({...newProject, name_en: e.target.value})} className="w-full bg-black/30 p-3 rounded-xl border border-white/10 focus:border-blue-500 outline-none" required dir="ltr" />
              </div>

              <div className="md:col-span-1 space-y-2">
                 <label className="text-xs text-gray-500 mr-1">תיאור קצר (עברית)</label>
                 <textarea value={newProject.description_he} onChange={e=>setNewProject({...newProject, description_he: e.target.value})} className="w-full bg-black/30 p-3 rounded-xl border border-white/10 h-32 resize-none focus:border-blue-500 outline-none" />
              </div>
              <div className="md:col-span-1 space-y-2">
                 <label className="text-xs text-gray-500 mr-1">Description (English)</label>
                 <textarea value={newProject.description_en} onChange={e=>setNewProject({...newProject, description_en: e.target.value})} className="w-full bg-black/30 p-3 rounded-xl border border-white/10 h-32 resize-none focus:border-blue-500 outline-none" dir="ltr" />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs text-gray-500 mr-1">קישור לאפליקציה (URL)</label>
                <input placeholder="https://..." value={newProject.url} onChange={e=>setNewProject({...newProject, url: e.target.value})} className="w-full bg-black/30 p-3 rounded-xl border border-white/10 text-blue-400 focus:border-blue-500 outline-none" dir="ltr" />
              </div>

              <div className="space-y-2">
                 <label className="text-xs text-gray-500 mr-1">קישור לתמונה</label>
                 <input placeholder="https://..." value={newProject.image_url} onChange={e=>setNewProject({...newProject, image_url: e.target.value})} className="w-full bg-black/30 p-3 rounded-xl border border-white/10 focus:border-blue-500 outline-none" dir="ltr" />
              </div>
              <div className="space-y-2">
                 <label className="text-xs text-gray-500 mr-1">צבע מותג</label>
                 <div className="flex items-center gap-2 bg-black/30 p-2 rounded-xl border border-white/10">
                   <input type="color" value={newProject.accent_color} onChange={e=>setNewProject({...newProject, accent_color: e.target.value})} className="w-10 h-10 bg-transparent cursor-pointer rounded overflow-hidden" />
                   <span className="text-sm text-gray-400">{newProject.accent_color}</span>
                 </div>
              </div>

              <button className="md:col-span-2 bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-bold mt-4 shadow-lg shadow-blue-900/20 transition transform active:scale-95">
                שמור ופרסם באתר
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}