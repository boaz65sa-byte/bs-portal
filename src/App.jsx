import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Globe, Plus, LogOut, User, Trash2, LayoutGrid, Info } from 'lucide-react';

// חיבור ל-Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
  const [projects, setProjects] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null); // משתנה לשמירת שגיאות
  const [loading, setLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState({}); // מידע טכני לפתרון בעיות

  useEffect(() => {
    async function debugFetch() {
      try {
        setLoading(true);
        setErrorMsg(null);
        
        // 1. בדיקה האם המפתחות קיימים
        if (!supabaseUrl || !supabaseKey) {
          throw new Error("Missing API Keys! Check Vercel Environment Variables.");
        }

        setDebugInfo(prev => ({ ...prev, url: supabaseUrl, hasKey: !!supabaseKey }));

        // 2. ניסיון למשוך נתונים (בלי מיונים מסובכים)
        console.log("Fetching projects...");
        const { data, error } = await supabase.from('projects').select('*');

        if (error) {
          throw error;
        }

        // 3. הצלחה
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

  // תצוגה
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 font-sans" dir="rtl">
      
      <h1 className="text-4xl font-black mb-8 text-center text-blue-500">בדיקת מערכת BS-SIMPLE</h1>

      {/* אזור הדיבוג - מופיע רק אם יש בעיות */}
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* בדיקת טעינה */}
        {loading && (
          <div className="p-6 bg-blue-900/30 border border-blue-500 rounded-xl text-center animate-pulse">
            <h2 className="text-xl font-bold">...בודק חיבור לשרת</h2>
          </div>
        )}

        {/* הצגת שגיאה קריטית */}
        {errorMsg && (
          <div className="p-6 bg-red-900/50 border-2 border-red-500 rounded-xl">
            <h2 className="text-2xl font-bold text-red-400 mb-2">❌ זוהתה שגיאה:</h2>
            <p className="font-mono text-lg bg-black/30 p-4 rounded text-white">{errorMsg}</p>
            <p className="mt-4 text-sm text-gray-300">צלם את המסך הזה ושלח לי</p>
          </div>
        )}

        {/* הצגת סטטוס אם אין שגיאה אבל גם אין פרויקטים */}
        {!loading && !errorMsg && projects.length === 0 && (
          <div className="p-6 bg-yellow-900/30 border border-yellow-500 rounded-xl text-center">
            <h2 className="text-xl font-bold text-yellow-400">⚠️ החיבור הצליח, אבל הטבלה ריקה</h2>
            <p className="mt-2">הנתונים הגיעו מ-Supabase, אבל הרשימה ריקה (0 פרויקטים).</p>
            <div className="mt-4 text-left bg-black/30 p-4 rounded text-xs font-mono text-gray-400">
              Debug Info: {JSON.stringify(debugInfo, null, 2)}
            </div>
          </div>
        )}

        {/* הצגת הפרויקטים אם הכל עובד */}
        {projects.length > 0 && (
          <div className="grid gap-4">
            <div className="p-4 bg-green-900/30 border border-green-500 rounded-xl text-center mb-4">
              <h2 className="text-xl font-bold text-green-400">✅ הכל תקין! ({projects.length} פרויקטים)</h2>
            </div>
            {projects.map(p => (
              <div key={p.id} className="p-6 bg-slate-800