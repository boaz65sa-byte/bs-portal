import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Trash2, Plus, X, Globe, LogOut, User, ArrowRight, LayoutGrid, Info } from 'lucide-react';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function App() {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);
  const [lang, setLang] = useState('he');
  const [loading, setLoading] = useState(true);
  
  // Login States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(false);

  // Admin States
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProject, setNewProject] = useState({
    name_he: '', name_en: '', 
    description_he: '', description_en: '', 
    url: '', image_url: '', accent_color: '#3b82f6'
  });

  const isHe = lang === 'he';

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    fetchProjects();
    return () => subscription.unsubscribe();
  }, []);

  async function fetchProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) console.error('Error fetching:', error);
    else setProjects(data || []);
    setLoading(false);
  }

  async function handleLogin(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else setShowLogin(false);
  }

  async function handleAddProject(e) {
    e.preventDefault();
    const { error } = await supabase.from('projects').insert([newProject]);
    if (error) alert(error.message);
    else {
      setShowAddModal(false);
      setNewProject({ name_he: '', name_en: '', description_he: '', description_en: '', url: '', image_url: '', accent_color: '#3b82f6' });
      fetchProjects();
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('למחוק את הפרויקט?')) return;
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (!error) fetchProjects();
  }

  if (loading) return <div className="min-h-screen bg-[#020617] text-blue-500 flex items-center justify-center">LOADING...</div>;

  return (
    <div className={`min-h-screen bg-[#020617] text-white font-sans overflow-x-hidden`} dir={isHe ? "rtl" : "ltr"}>
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-[#020617]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="text-2xl font-black italic tracking-tighter">BS-SIMPLE</div>
          <div className="flex gap-4">
            <button onClick={() => setLang(isHe ? 'en' : 'he')} className="p-2 hover:bg-white/10 rounded-full transition"><Globe size={20}/></button>
            {user ? (
               <div className="flex gap-2">
                 <button onClick={() => setShowAddModal(true)} className="bg-blue-600 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2"><Plus size={16}/> {isHe ? "הוסף" : "Add"}</button>
                 <button onClick={() => supabase.auth.signOut()} className="bg-red-500/20 text-red-400 p-2 rounded-full"><LogOut size={20}/></button>
               </div>
            ) : (
               <button onClick={() => setShowLogin(true)} className="bg-white/10 px-4 py-2 rounded-full text-sm font-bold hover:bg-white/20 transition">{isHe ? "כניסה" : "Login"}</button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section (דף נחיתה ראשי) */}
      <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full -z-10"></div>
        
        <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter uppercase">
          {isHe ? "הופכים מורכב" : "MAKING COMPLEX"} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            {isHe ? "לפשוט וחכם" : "SIMPLE & SMART"}
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed mb-10">
          {isHe 
            ? "אנחנו מחברים בין עולמות של ניהול מתקדם, קולינריה עילית, מוזיקה וטכנולוגיה. המטרה שלנו היא ליצור פתרונות מדויקים שחוסכים זמן ומשפרים חיים."
            : "Bridging the worlds of advanced management, culinary arts, music, and technology. Our mission is to create precise solutions that save time and enhance life."}
        </p>

        <a href="#projects" className="bg-white text-black px-8 py-4 rounded-full font-black text-lg hover:scale-105 transition flex items-center gap-2">
          {isHe ? "לצפייה בפרויקטים" : "VIEW PROJECTS"} <ArrowRight size={20} />
        </a>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white/5 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Info className="text-blue-500" />
              {isHe ? "מי אנחנו?" : "Who We Are"}
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                {isHe 
                  ? "חברת BS-SIMPLE הוקמה מתוך הבנה שניהול טוב דורש שילוב של יצירתיות וסדר. עם רקע עשיר בניהול מטבחי יוקרה, אנחנו מביאים את הדיוק של השף לעולם הטכנולוגי."
                  : "BS-SIMPLE was founded on the understanding that good management requires a blend of creativity and order. With a rich background in luxury kitchen management, we bring the chef's precision to the tech world."}
              </p>
              <p>
                {isHe
                  ? "אנו מפתחים אפליקציות לניהול מבנים, כלים ללימוד מוזיקה (בוזוקי), ופתרונות אוטומציה לעסקים."
                  : "We develop building management apps, music learning tools (Bouzouki), and business automation solutions."}
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 p-8 rounded-3xl border border-white/10">
            <h3 className="text-xl font-bold mb-4">{isHe ? "תחומי התמחות" : "Core Expertise"}</h3>
            <ul className="space-y-3">
              {['Building Management Systems', 'Music Education Tech', 'Culinary Operations', 'Business Automation'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-blue-300">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects" className="py-20 max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-black mb-12 flex items-center gap-3">
          <LayoutGrid className="text-blue-500" />
          {isHe ? "האפליקציות שלנו" : "Our Applications"}
        </h2>

        {projects.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/20">
            <p className="text-xl text-gray-500">{isHe ? "אין פרויקטים להצגה כרגע" : "No projects to display"}</p>
            {user && <button onClick={() => setShowAddModal(true)} className="mt-4 text-blue-400 hover:underline">הוסף פרויקט ראשון</button>}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p) => (
              <div key={p.id} className="group bg-[#0f172a] rounded-3xl overflow-hidden border border-white/5 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-300">
                <div className="relative h-56 overflow-hidden">
                  {user && (
                    <button onClick={() => handleDelete(p.id)} className="absolute top-4 right-4 z-20 bg-red-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg">
                      <Trash2 size={16} />
                    </button>
                  )}
                  {p.image_url ? (
                     <img src={p.image_url} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                  ) : (
                    <div className="w-full h-full bg-slate-800 flex items-center justify-center text-4xl font-black text-slate-700">APP</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent"></div>
                </div>
                
                <div className="p-8 relative">
                  <div className="absolute top-0 left-8 -translate-y-1/2 w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold shadow-lg" style={{ backgroundColor: p.accent_color }}>
                    {p.name_en.charAt(0)}
                  </div>
                  <h3 className="text-2xl font-bold mt-2 mb-3">{isHe ? p.name_he : p.name_en}</h3>
                  <p className="text-gray-400 text-sm mb-6 line-clamp-3 h-16">{isHe ? p.description_he : p.description_en}</p>
                  
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-white/5 hover:bg-blue-600 text-white py-3 rounded-xl font-bold transition border border-white/10 hover:border-transparent">
                    {isHe ? "כניסה לאפליקציה" : "LAUNCH APP"} <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Admin Modals */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="bg-[#1e293b] p-8 rounded-2xl w-full max-w-sm border border-white/10 relative">
            <button onClick={() => setShowLogin(false)} className="absolute top-4 right-4"><X/></button>
            <h2 className="text-2xl font-bold mb-4 text-center">Admin Access</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full bg-black/30 p-3 rounded-lg border border-white/10" />
              <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full bg-black/30 p-3 rounded-lg border border-white/10" />
              <button className="w-full bg-blue-600 py-3 rounded-lg font-bold">Login</button>
            </form>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#1e293b] p-8 rounded-2xl w-full max-w-2xl border border-white/10 relative my-10">
            <button onClick={() => setShowAddModal(false)} className="absolute top-4 right-4"><X/></button>
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">הוספת פרויקט</h2>
            <form onSubmit={handleAddProject} className="grid md:grid-cols-2 gap-4">
              <input placeholder="Name (HE)" value={newProject.name_he} onChange={e=>setNewProject({...newProject, name_he: e.target.value})} className="bg-black/30 p-3 rounded-lg border border-white/10" required />
              <input placeholder="Name (EN)" value={newProject.name_en} onChange={e=>setNewProject({...newProject, name_en: e.target.value})} className="bg-black/30 p-3 rounded-lg border border-white/10" required />
              <textarea placeholder="Description (HE)" value={newProject.description_he} onChange={e=>setNewProject({...newProject, description_he: e.target.value})} className="bg-black/30 p-3 rounded-lg border border-white/10 md:col-span-1 h-24" />
              <textarea placeholder="Description (EN)" value={newProject.description_en} onChange={e=>setNewProject({...newProject, description_en: e.target.value})} className="bg-black/30 p-3 rounded-lg border border-white/10 md:col-span-1 h-24" />
              <input placeholder="App URL" value={newProject.url} onChange={e=>setNewProject({...newProject, url: e.target.value})} className="bg-black/30 p-3 rounded-lg border border-white/10 md:col-span-2" />
              <input placeholder="Image URL" value={newProject.image_url} onChange={e=>setNewProject({...newProject, image_url: e.target.value})} className="bg-black/30 p-3 rounded-lg border border-white/10" />
              <input type="color" value={newProject.accent_color} onChange={e=>setNewProject({...newProject, accent_color: e.target.value})} className="w-full h-12 bg-transparent cursor-pointer" />
              <button className="md:col-span-2 bg-blue-600 py-4 rounded-lg font-bold mt-4">שמור פרויקט</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}