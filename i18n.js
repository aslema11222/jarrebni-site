/* Internationalization — Arabic / French / English */
const LANG_KEY = 'jarrebni_lang';

const TRANSLATIONS = {
  ar: {
    code:'ar', dir:'rtl', name:'العربية', flag:'🇹🇳',
    t:{
      'brand.sub':'فواكه وخضروات طازجة • توصيل سريع',
      'role.choose':'اختر دورك للمتابعة',
      'role.client.title':'زبون',
      'role.client.desc':'تصفح المنتجات الطازجة\nوقدّم طلبك بسهولة',
      'role.client.tag1':'🍊 فواكه','role.client.tag2':'🥦 خضروات','role.client.tag3':'🚚 توصيل',
      'role.admin.title':'مدير',
      'role.admin.desc':'إدارة المنتجات والأسعار\nولوحة التحكم الكاملة',
      'role.admin.tag1':'📷 صور','role.admin.tag2':'💰 أسعار','role.admin.tag3':'📊 إدارة',
      'role.enter':'دخول',
      'auth.title':'دخول المدير',
      'auth.desc':'أدخل كلمة المرور للوصول إلى لوحة التحكم',
      'auth.ph':'كلمة المرور',
      'auth.error':'❌ كلمة المرور غير صحيحة',
      'auth.submit':'دخول',
      'auth.hint':'كلمة المرور الافتراضية: <code>jarrebni2025</code>',
      'back':'→ رجوع',
      'nav.home':'الرئيسية','nav.products':'منتجاتنا','nav.whyus':'لماذا جربني',
      'nav.order':'اطلب الآن','nav.contact':'تواصل معنا',
      'hero.tag':'🚚 توصيل سريع إلى باب منزلك',
      'hero.btn.order':'اطلب الآن','hero.btn.browse':'تصفح المنتجات',
      'products.tag':'منتجاتنا','products.title':'أطيب المنتجات الطازجة',
      'products.desc':'نختار لك الأجود والأطيب من الفواكه والخضروات الموسمية',
      'tab.fruits':'🍊 الفواكه','tab.veggies':'🥦 الخضروات',
      'order.tag':'اطلب الآن','order.title':'ابدأ طلبك اليوم',
      'order.desc':'أضف المنتجات إلى سلتك ثم أكمل بياناتك، أو تواصل معنا مباشرة',
      'form.name':'الاسم الكامل','form.name.ph':'أدخل اسمك الكامل',
      'form.phone':'رقم الهاتف','form.phone.ph':'+216 XX XXX XXX',
      'form.address':'العنوان / الولاية','form.address.ph':'بنزرت الشمالية - أدخل عنوانك بالتفصيل',
      'form.products':'المنتجات المطلوبة','form.products.ph':'مثال: 2 كغ برتقال، 1 كغ تفاح...',
      'form.notes':'ملاحظات إضافية','form.notes.ph':'أي طلبات خاصة...',
      'form.submit':'🚛 أرسل طلبي',
      'cart.title':'🛒 سلة الطلب','cart.empty':'السلة فارغة',
      'cart.empty.hint':'أضف منتجات من القائمة',
      'cart.total':'المجموع التقريبي:',
      'cart.order':'🚛 أكمل الطلب','cart.clear':'مسح السلة',
      'contact.tag':'تواصل معنا','contact.title':'نحن هنا لمساعدتك',
      'settings.title':'الإعدادات',
      'settings.lang.title':'اللغة / Langue / Language',
      'settings.lang.desc':'اختر لغة عرض الموقع',
      'settings.save':'💾 حفظ','settings.saved':'✓ تم الحفظ!',
    }
  },
  fr: {
    code:'fr', dir:'ltr', name:'Français', flag:'🇫🇷',
    t:{
      'brand.sub':'Fruits et légumes frais • Livraison rapide',
      'role.choose':'Choisissez votre rôle',
      'role.client.title':'Client',
      'role.client.desc':'Parcourez les produits frais\net passez commande facilement',
      'role.client.tag1':'🍊 Fruits','role.client.tag2':'🥦 Légumes','role.client.tag3':'🚚 Livraison',
      'role.admin.title':'Admin',
      'role.admin.desc':'Gérez les produits et les prix\net accédez au tableau de bord',
      'role.admin.tag1':'📷 Photos','role.admin.tag2':'💰 Prix','role.admin.tag3':'📊 Gestion',
      'role.enter':'Entrer',
      'auth.title':'Connexion Administrateur',
      'auth.desc':'Entrez le mot de passe pour accéder au tableau de bord',
      'auth.ph':'Mot de passe',
      'auth.error':'❌ Mot de passe incorrect',
      'auth.submit':'Connexion',
      'auth.hint':'Mot de passe par défaut: <code>jarrebni2025</code>',
      'back':'← Retour',
      'nav.home':'Accueil','nav.products':'Produits','nav.whyus':'Pourquoi nous',
      'nav.order':'Commander','nav.contact':'Contact',
      'hero.tag':'🚚 Livraison rapide à votre porte',
      'hero.btn.order':'Commander','hero.btn.browse':'Voir les produits',
      'products.tag':'Nos produits','products.title':'Nos meilleurs produits frais',
      'products.desc':'Nous sélectionnons les meilleurs fruits et légumes de saison pour vous',
      'tab.fruits':'🍊 Fruits','tab.veggies':'🥦 Légumes',
      'order.tag':'Commander','order.title':'Commandez aujourd\'hui',
      'order.desc':'Ajoutez des produits à votre panier puis complétez vos informations',
      'form.name':'Nom complet','form.name.ph':'Entrez votre nom complet',
      'form.phone':'Numéro de téléphone','form.phone.ph':'+216 XX XXX XXX',
      'form.address':'Adresse / Région','form.address.ph':'Bizerte Nord - Entrez votre adresse',
      'form.products':'Produits souhaités','form.products.ph':'Ex: 2 kg oranges, 1 kg pommes...',
      'form.notes':'Notes supplémentaires','form.notes.ph':'Demandes spéciales...',
      'form.submit':'🚛 Envoyer ma commande',
      'cart.title':'🛒 Panier','cart.empty':'Panier vide',
      'cart.empty.hint':'Ajoutez des produits depuis la liste',
      'cart.total':'Total approximatif:',
      'cart.order':'🚛 Finaliser','cart.clear':'Vider le panier',
      'contact.tag':'Contactez-nous','contact.title':'Nous sommes là pour vous',
      'settings.title':'Paramètres',
      'settings.lang.title':'اللغة / Langue / Language',
      'settings.lang.desc':'Choisissez la langue d\'affichage',
      'settings.save':'💾 Enregistrer','settings.saved':'✓ Enregistré!',
    }
  },
  en: {
    code:'en', dir:'ltr', name:'English', flag:'🇬🇧',
    t:{
      'brand.sub':'Fresh fruits & vegetables • Fast delivery',
      'role.choose':'Choose your role',
      'role.client.title':'Customer',
      'role.client.desc':'Browse fresh products\nand place your order easily',
      'role.client.tag1':'🍊 Fruits','role.client.tag2':'🥦 Vegetables','role.client.tag3':'🚚 Delivery',
      'role.admin.title':'Admin',
      'role.admin.desc':'Manage products and prices\nand access the full dashboard',
      'role.admin.tag1':'📷 Photos','role.admin.tag2':'💰 Prices','role.admin.tag3':'📊 Management',
      'role.enter':'Enter',
      'auth.title':'Admin Login',
      'auth.desc':'Enter the password to access the dashboard',
      'auth.ph':'Password',
      'auth.error':'❌ Incorrect password',
      'auth.submit':'Login',
      'auth.hint':'Default password: <code>jarrebni2025</code>',
      'back':'← Back',
      'nav.home':'Home','nav.products':'Products','nav.whyus':'Why us',
      'nav.order':'Order now','nav.contact':'Contact',
      'hero.tag':'🚚 Fast delivery to your door',
      'hero.btn.order':'Order now','hero.btn.browse':'Browse products',
      'products.tag':'Our products','products.title':'Our best fresh products',
      'products.desc':'We select the best seasonal fruits and vegetables for you',
      'tab.fruits':'🍊 Fruits','tab.veggies':'🥦 Vegetables',
      'order.tag':'Order now','order.title':'Start your order today',
      'order.desc':'Add products to your cart then complete your information',
      'form.name':'Full name','form.name.ph':'Enter your full name',
      'form.phone':'Phone number','form.phone.ph':'+216 XX XXX XXX',
      'form.address':'Address / Region','form.address.ph':'Bizerte Nord - Enter your address',
      'form.products':'Requested products','form.products.ph':'Ex: 2 kg oranges, 1 kg apples...',
      'form.notes':'Additional notes','form.notes.ph':'Special requests...',
      'form.submit':'🚛 Send my order',
      'cart.title':'🛒 Cart','cart.empty':'Cart is empty',
      'cart.empty.hint':'Add products from the list',
      'cart.total':'Approximate total:',
      'cart.order':'🚛 Complete order','cart.clear':'Clear cart',
      'contact.tag':'Contact us','contact.title':'We\'re here to help you',
      'settings.title':'Settings',
      'settings.lang.title':'اللغة / Langue / Language',
      'settings.lang.desc':'Choose the display language',
      'settings.save':'💾 Save','settings.saved':'✓ Saved!',
    }
  }
};

function getLang()       { return localStorage.getItem(LANG_KEY) || 'ar'; }
function setLang(code)   { localStorage.setItem(LANG_KEY, code); applyLang(code); }

function applyLang(code) {
  const L = TRANSLATIONS[code] || TRANSLATIONS.ar;
  document.documentElement.dir  = L.dir;
  document.documentElement.lang = L.code;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (L.t[key] !== undefined) el.textContent = L.t[key];
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    if (L.t[key] !== undefined) el.innerHTML = L.t[key];
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.dataset.i18nPh;
    if (L.t[key] !== undefined) el.placeholder = L.t[key];
  });
}

document.addEventListener('DOMContentLoaded', () => applyLang(getLang()));
