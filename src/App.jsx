import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Trash2, Plus, X, Globe, LogOut, ArrowRight, LayoutGrid, Cpu, Lightbulb, Music, ChefHat } from 'lucide-react';

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
      .order('id', { ascending: false });
    
    if (error) console.error('Error fetching:', error);
    else setProjects(data || []);
    setLoading(false);
  }

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

  async function handleAddProject(e) {
    e.preventDefault();
    const { error } = await supabase.from('projects').insert([newProject]);
    if (error) alert("שגיאה בשמירה: " + error.message);
    else {
      setShowAddModal(false);
      setNewProject({ name_he: '', name_en: '', description_he: '', description_en: '', url: '', image_url: '', accent_color: '#3b82f6' });
      fetchProjects();
    }
  }

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
          <div className="text-2xl font-black italic tracking-tighter cursor-pointer flex items-center gap-2" onClick={() => window.scrollTo(0,0)}>
            <Lightbulb className="text-yellow-500" size={24} />
            BS-SIMPLE
          </div>
          
          <div className="flex items-center gap-4">
            <button onClick={() => setLang(isHe ? 'en' : 'he')} className="p-2 hover:bg-white/10 rounded-full transition text-gray-400 hover:text-white font-bold text-xs">
              {isHe ? 'EN' : 'HE'}
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
        {/* אפקט רקע */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full -z-10 pointer-events-none"></div>
        
        {/* כותרת ראשית */}
        <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[1.1]">
          {isHe ? "פתרונות יצירתיים" : "CREATIVE SOLUTIONS"} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
            {isHe ? "בחשיבה אחרת" : "OUT OF THE BOX"}
          </span>
        </h1>
        
        {/* טקסט הסבר על החברה */}
        <p className="text-lg md:text-2xl text-gray-300 max-w-4xl leading-relaxed mb-10 border-r-4 border-blue-500 pr-6 text-right md:text-center md:border-none md:pr-0">
          {isHe 
            ? "אנחנו ב-BS-SIMPLE מתמחים בפיצוח אתגרים מורכבים באמצעות פתרונות טכנולוגיים פשוטים וחכמים. החוזקה שלנו היא השילוב הייחודי בין עולמות תוכן מגוונים – מניהול מטבחים וקולינריה, דרך מוזיקה