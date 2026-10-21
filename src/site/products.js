// Product pages (/#/app/<id>). Texts from the product bots (/workspace/site-pages). Privacy claims only where approved.
export const PRODUCTS = {
  snapchef: {
    id: 'snapchef', name: 'SnapChef', icon: '/products/snapchef/icon.png', accent: '#c2410c',
    links: { appstore: 'https://apps.apple.com/il/app/id6819405074' },
    web: 'https://menu-master-plan.vercel.app/',
    tagline: {
      he: 'מצלמים מתכון או את המקרר, ו-SnapChef מבשלת איתכם.',
      en: 'Snap a recipe or your fridge, and SnapChef cooks with you.',
      ar: 'صوّر وصفة أو ثلاجتك، وSnapChef يطبخ معك.',
      ru: 'Сфотографируйте рецепт или холодильник, и SnapChef готовит вместе с вами.',
    },
    desc: {
      he: 'SnapChef הופכת צילום של מתכון לכרטיס מתכון מסודר, ומציעה מנות ממה שיש לכם בבית.',
      en: 'SnapChef turns a photo of a recipe into a clean recipe card and suggests dishes from what you already have.',
      ar: 'يحوّل SnapChef صورة الوصفة إلى بطاقة وصفة مرتبة، ويقترح أطباقًا مما لديك في المنزل.',
      ru: 'SnapChef превращает фото рецепта в аккуратную карточку и предлагает блюда из того, что уже есть дома.',
    },
    features: [
      { i: '📸', he: 'צילום מתכון: הופך צילום לכרטיס מתכון', en: 'Snap a recipe into a card', ar: 'صوّر وصفة لتصبح بطاقة', ru: 'Фото рецепта превращается в карточку' },
      { i: '👨‍🍳', he: 'שף אישי: רעיונות למנות ממה שיש במקרר', en: 'Personal chef: ideas from your fridge', ar: 'طاهٍ شخصي: أفكار مما في ثلاجتك', ru: 'Личный шеф: идеи из вашего холодильника' },
      { i: '🥗', he: 'ערכים תזונתיים', en: 'Nutrition facts', ar: 'القيم الغذائية', ru: 'Пищевая ценность' },
      { i: '⚠️', he: 'זיהוי אלרגנים', en: 'Allergen detection', ar: 'كشف مسببات الحساسية', ru: 'Определение аллергенов' },
      { i: '📖', he: 'ספר מתכונים אישי', en: 'Personal cookbook', ar: 'كتاب وصفات شخصي', ru: 'Личная книга рецептов' },
      { i: '🌙', he: 'מצב כהה', en: 'Dark mode', ar: 'الوضع الداكن', ru: 'Тёмная тема' },
    ],
    shots: [],
  },
  tenants: {
    id: 'tenants', homeId: 'vaad', name: { he: 'ניהול דיירים', en: 'Tenant Manager', ar: 'إدارة السكان', ru: 'Управление жильцами' },
    icon: '/products/tenants/icon.jpg', accent: '#0369a1', links: {}, privacy: true,
    tagline: {
      he: 'ועד הבית בכיס: דיירים, תשלומים ומעקב, בלי אקסלים.',
      en: 'Your building committee in your pocket: tenants, payments and tracking, no spreadsheets.',
      ar: 'لجنة البناية في جيبك: السكان والمدفوعات والمتابعة، بدون جداول.',
      ru: 'Домовой комитет в кармане: жильцы, платежи и учёт без таблиц.',
    },
    desc: {
      he: 'אפליקציה פשוטה לוועדי בתים: מנהלים רשימת דיירים, רושמים תשלומי ועד חודשיים ורואים מי שילם ומי לא. הנתונים נשמרים על המכשיר, בלי הרשמה ובלי צורך ברשת.',
      en: 'A simple app for building committees: manage tenants, record monthly fees and see who paid at a glance. Data stays on your device: no sign-up, works offline.',
      ar: 'تطبيق بسيط للجان البنايات: أدِر قائمة السكان، وسجّل الرسوم الشهرية، واعرف من دفع بنظرة واحدة. تبقى البيانات على جهازك: بلا تسجيل ويعمل دون إنترنت.',
      ru: 'Простое приложение для домовых комитетов: список жильцов, ежемесячные взносы и кто заплатил — с первого взгляда. Данные остаются на устройстве: без регистрации, работает офлайн.',
    },
    features: [
      { i: '👥', he: 'ניהול דיירים: הוספה, עריכה ופרטי קשר', en: 'Tenant list with contacts', ar: 'قائمة السكان مع جهات الاتصال', ru: 'Список жильцов с контактами' },
      { i: '📅', he: 'טבלת תשלומים חודשית: מי שילם ומי חייב', en: 'Monthly payments table', ar: 'جدول المدفوعات الشهرية', ru: 'Таблица ежемесячных платежей' },
      { i: '💰', he: 'מעקב חובות ויתרות', en: 'Debt and balance tracking', ar: 'متابعة الديون والأرصدة', ru: 'Учёт долгов и остатков' },
      { i: '🔒', he: 'הנתונים נשמרים רק במכשיר, בלי הרשמה', en: 'On-device data, no account', ar: 'البيانات على الجهاز فقط، بلا حساب', ru: 'Данные только на устройстве, без аккаунта' },
      { i: '🇮🇱', he: 'עברית מלאה ו-RTL, באייפון ובאייפד', en: 'Full Hebrew RTL, iPhone & iPad', ar: 'دعم كامل للعبرية من اليمين لليسار، iPhone وiPad', ru: 'Полный иврит (RTL), iPhone и iPad' },
      { i: '🧭', he: 'הדרכת פתיחה קצרה למשתמש חדש', en: 'Quick onboarding tour', ar: 'جولة تعريفية قصيرة', ru: 'Короткое знакомство для новых пользователей' },
    ],
    shots: ['/products/tenants/splash.jpg'],
  },
  winrswipe: {
    id: 'winrswipe', name: 'WinrSwipe', icon: '/products/winrswipe/icon.jpg', accent: '#ff4d1c', links: {}, soonAll: true,
    banner: '/products/winrswipe/banner.jpg',
    support: 'https://winrsweip-boaz-s-projects-6bda35e8.vercel.app/support',
    privacyUrl: 'https://winrsweip-boaz-s-projects-6bda35e8.vercel.app/privacy',
    tagline: {
      he: 'מחליקים, מציעים, קונים. יד 2 בסגנון טינדר.',
      en: 'Swipe. Bid. Win. Second-hand deals, Tinder-style.',
      ar: 'اسحب. زايد. اربح. صفقات مستعملة بأسلوب تيندر.',
      ru: 'Свайп. Ставка. Победа. Б/у сделки в стиле Tinder.',
    },
    desc: {
      he: 'WinrSwipe הוא מרקטפלייס מקומי ליד 2 בישראל. מחליקים בין מודעות באזור שלכם, מציעים מחיר ומתאמים את המסירה בצ\'אט עם המוכר. חינם לשימוש.',
      en: 'WinrSwipe is a local second-hand marketplace for Israel. Swipe through listings near you, place a bid, and arrange the handoff in chat with the seller. Free to use.',
      ar: 'WinrSwipe سوق محلي للمستعمل في إسرائيل. اسحب بين الإعلانات القريبة منك، قدّم عرض سعر، ونسّق التسليم بالدردشة مع البائع. مجاني.',
      ru: 'WinrSwipe — локальный маркетплейс б/у товаров в Израиле. Листайте объявления рядом, делайте ставку и договаривайтесь о передаче в чате с продавцом. Бесплатно.',
    },
    features: [
      { i: '👆', he: 'החלקה בין מודעות באזור', en: 'Swipe through local listings', ar: 'اسحب بين الإعلانات القريبة', ru: 'Листайте объявления рядом' },
      { i: '💸', he: 'הצעת מחיר בלחיצה', en: 'One-tap bidding', ar: 'مزايدة بنقرة واحدة', ru: 'Ставка в одно касание' },
      { i: '📷', he: 'פרסום פריט עם תמונות תוך דקה', en: 'Publish an item with photos in a minute', ar: 'انشر غرضًا مع صور خلال دقيقة', ru: 'Объявление с фото за минуту' },
      { i: '💬', he: 'צ\'אט מובנה עם המוכר', en: 'Built-in chat with the seller', ar: 'دردشة مدمجة مع البائع', ru: 'Встроенный чат с продавцом' },
      { i: '🍎', he: 'התחברות עם Apple או מייל, טלפון אופציונלי', en: 'Sign in with Apple or email, phone optional', ar: 'الدخول عبر Apple أو البريد، والهاتف اختياري', ru: 'Вход через Apple или e-mail, телефон по желанию' },
      { i: '🗑️', he: 'מחיקת חשבון בכל רגע', en: 'Delete your account anytime', ar: 'احذف حسابك في أي وقت', ru: 'Удаление аккаунта в любой момент' },
    ],
    shots: ['01', '05', '06', '08', '09', '10'].map(n => `/products/winrswipe/s${n}.jpg`),
  },
};
export const HOME_TO_PRODUCT = { snapchef: 'snapchef', vaad: 'tenants' };
export const P = {
  back: { he: 'חזרה לכל האפליקציות', en: 'Back to all apps', ar: 'العودة إلى كل التطبيقات', ru: 'Ко всем приложениям' },
  features: { he: 'מה יש בפנים', en: "What's inside", ar: 'ماذا يوجد بالداخل', ru: 'Что внутри' },
  shots: { he: 'מבט מקרוב', en: 'A closer look', ar: 'نظرة أقرب', ru: 'Взгляд поближе' },
  get: { he: 'להורדה', en: 'Get the app', ar: 'حمّل التطبيق', ru: 'Скачать' },
  web: { he: 'פתיחה בדפדפן', en: 'Open in browser', ar: 'افتح في المتصفح', ru: 'Открыть в браузере' },
  soonBadge: { he: 'בקרוב', en: 'Coming soon', ar: 'قريبًا', ru: 'Скоро' },
  support: { he: 'תמיכה', en: 'Support', ar: 'الدعم', ru: 'Поддержка' },
  privacy: { he: 'מדיניות פרטיות', en: 'Privacy policy', ar: 'سياسة الخصوصية', ru: 'Политика конфиденциальности' },
  more: { he: 'לעמוד המוצר', en: 'Product page', ar: 'صفحة المنتج', ru: 'Страница продукта' },
  privacyBody: {
    he: ['ניהול דיירים לא דורשת הרשמה ולא אוספת שום מידע אישי.', 'כל הנתונים שאתם מזינים (דיירים, תשלומים ויתרות) נשמרים רק על המכשיר שלכם ולא נשלחים לשום שרת.', 'אין פרסומות ואין מעקב. מחיקת האפליקציה מוחקת את כל הנתונים.'],
    en: ['Tenant Manager requires no sign-up and collects no personal data.', 'Everything you enter (tenants, payments and balances) is stored only on your device and is never sent to any server.', 'No ads and no tracking. Deleting the app deletes all its data.'],
    ar: ['لا يتطلب التطبيق تسجيلًا ولا يجمع أي بيانات شخصية.', 'كل ما تدخله (السكان والمدفوعات والأرصدة) يُحفظ على جهازك فقط ولا يُرسل إلى أي خادم.', 'لا إعلانات ولا تتبّع. حذف التطبيق يحذف كل بياناته.'],
    ru: ['Приложение не требует регистрации и не собирает персональные данные.', 'Всё, что вы вводите (жильцы, платежи, остатки), хранится только на вашем устройстве и никуда не отправляется.', 'Без рекламы и отслеживания. Удаление приложения удаляет все данные.'],
  },
};
