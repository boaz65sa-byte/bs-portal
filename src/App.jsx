import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Globe, Plus, LogOut, User, Trash2, LayoutGrid, Info } from 'lucide-react';

// חיבור ל-Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
  const [projects, setProjects] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState({});

  useEffect(() => {
    async function debugFetch() {
      try {
        setLoading(true);
        setErrorMsg(null);
        
        // בדיקת מפתחות
        if (!supabaseUrl || !supabaseKey) {
          throw new Error("Missing API Keys! Check Vercel Environment Variables.");
        }

        setDebugInfo(prev => ({ ...prev, url: supabaseUrl, hasKey: !!supabaseKey }));

        // משיכת נתונים
        const { data, error } = await supabase.from('projects').select('*');

        if (error) throw error;

        setProjects(data || []);
        setDebugInfo(prev => ({ ...prev, count: data?.length || 0 }));

      } catch (err) {
        console.error("Critical Error:", err);
        setErrorMsg(err.message || "Unknown Error");
      } finally {
        setLoading(false);
      }
    }

    debugFetch();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 font-sans" dir="rtl">
      
      <h1 className="text-4xl font-black mb-8 text-center text-blue-500">בדיקת מערכת</h1>

      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* טעינה */}
        {loading && (
          <div className="p-6 bg-blue-900/30 border border-blue-500 rounded-xl text-center animate-pulse">
            <h2 className="text-xl font-bold">...בודק חיבור לשרת</h2>
          </div>
        )}

        {/* שגיאה */}
        {errorMsg && (
          <div className="p-6 bg-red-900/50 border-2 border-red-500 rounded-xl">
            <h2 className="text-2xl font-bold text-red-400 mb-2">❌ זוהתה שגיאה:</h2>
            <p className="font-mono text-lg bg-black/30 p-4 rounded text-white">{errorMsg}</p>
          </div>
        )}

        {/* טבלה ריקה */}
        {!loading && !errorMsg && projects.length === 0 && (
          <div className="p-6 bg-yellow-900/30 border border-yellow-500 rounded-xl text-center">
            <h2 className="text-xl font-bold text-yellow-400">⚠️ החיבור הצליח, אבל הטבלה ריקה</h2>
            <div className="mt-4 text-left bg-black/30 p-4 rounded text-xs font-mono text-gray-400">
              Debug Info: {JSON.stringify(debugInfo, null, 2)}
            </div>
          </div>
        )}

        {/* הצלחה - רשימת פרויקטים */}
        {projects.length > 0 && (
          <div className="grid gap-4">
            <div className="p-4 bg-green-900/30 border border-green-500 rounded-xl text-center mb-4">
              <h2 className="text-xl font-bold text-green-400">✅ הכל תקין! ({projects.length} פרויקטים)</h2>
            </div>
            {projects.map((p) => (
              <div key={p.id} className="p-6 bg-slate-800 rounded-xl border border-slate-700 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">{p.name_he || p.name_en}</h3>
                  <a href={p.url} className="text-blue-400 underline text-sm">{p.url}</a>
                </div>
                <div className="w-6 h-6 rounded-full border border-white/20" style={{backgroundColor: p.accent_color}}></div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}