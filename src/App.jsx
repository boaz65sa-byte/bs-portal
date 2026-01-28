async function fetchProjects() {
    // מנסים למשוך רק את ה-ID והשם כדי לראות שהחיבור עובד
    console.log("Starting fetch...");
    
    const { data, error } = await supabase
      .from('projects')
      .select('*'); // הורדנו את המיון (order) למקרה שהוא עושה בעיות
    
    if (error) {
      alert("שגיאה בטעינה: " + error.message); // זה יקפיץ לך הודעה למסך עם הסיבה המדויקת!
      console.error('Error fetching:', error);
    } else {
      if (data.length === 0) alert("החיבור הצליח אבל הטבלה ריקה!");
      setProjects(data || []);
    }
    setLoading(false);
  }