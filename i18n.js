/* Internationalization — Arabic / French / English */
const LANG_KEY = 'jarrebni_lang';

const TRANSLATIONS = {
  ar: {
    code:'ar', name:'العربية', flag:'🇹🇳',
    t:{
      'brand.sub':'فواكه وخضروات طازجة • توصيل سريع',
      'role.choose':'اختر دورك للمتابعة',
      'role.client.title':'زبون',
      'role.client.desc':'تصفح المنتجات الطازجة وقدّم طلبك بسهولة',
      'role.client.tag1':'🍊 فواكه','role.client.tag2':'🥦 خضروات','role.client.tag3':'🚚 توصيل',
      'role.admin.title':'مدير',
      'role.admin.desc':'إدارة المنتجات والأسعار ولوحة التحكم الكاملة',
      'role.admin.tag1':'📷 صور','role.admin.tag2':'💰 أسعار','role.admin.tag3':'📊 إدارة',
      'role.enter':'دخول',
      'auth.title':'دخول المدير','auth.desc':'أدخل كلمة المرور للوصول إلى لوحة التحكم',
      'auth.ph':'كلمة المرور','auth.error':'❌ كلمة المرور غير صحيحة',
      'auth.submit':'دخول','auth.hint':'كلمة المرور الافتراضية: <code>jarrebni2025</code>',
      'back':'→ رجوع',
      'nav.home':'الرئيسية','nav.products':'منتجاتنا','nav.whyus':'لماذا جربني',
      'nav.order':'اطلب الآن','nav.contact':'تواصل معنا',
      'hero.tag':'🚚 توصيل سريع إلى باب منزلك',
      'hero.btn.order':'اطلب الآن','hero.btn.browse':'تصفح المنتجات',
      'products.tag':'منتجاتنا','products.title':'أطيب المنتجات الطازجة',
      'products.desc':'نختار لك الأجود والأطيب من الفواكه والخضروات الموسمية',
      'tab.fruits':'🍊 الفواكه','tab.veggies':'🥦 الخضروات',
      'btn.add':'+ أضف','btn.added':'✓ تمت',
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
      // Units
      'unit.كغ':'كغ','unit.حبة':'حبة','unit.علبة':'علبة',
      // Fruits
      'product.f1.name':'برتقال طازج','product.f1.desc':'غني بفيتامين C، حلو ولذيذ',
      'product.f2.name':'تفاح أحمر','product.f2.desc':'طازج ومقرمش من المزرعة مباشرة',
      'product.f3.name':'موز','product.f3.desc':'ناضج بشكل مثالي، غني بالبوتاسيوم',
      'product.f4.name':'عنب أخضر','product.f4.desc':'حبات كبيرة، حلوة وعصيرية',
      'product.f5.name':'فراولة','product.f5.desc':'طازجة، حمراء ولذيذة',
      'product.f6.name':'مانجو','product.f6.desc':'استوائية، ناضجة وعطرية',
      'product.f7.name':'ليمون','product.f7.desc':'طازج، غني بالفيتامينات',
      'product.f8.name':'توت أزرق','product.f8.desc':'غني بمضادات الأكسدة',
      // Veggies
      'product.v1.name':'جزر','product.v1.desc':'طازج ومقرمش، غني بالفيتامينات',
      'product.v2.name':'طماطم','product.v2.desc':'حمراء ناضجة، مثالية للطبخ',
      'product.v3.name':'بروكلي','product.v3.desc':'خضروات صحية وغذائية',
      'product.v4.name':'أفوكادو','product.v4.desc':'ناضج ومثالي، غني بالدهون الصحية',
      'product.v5.name':'بصل','product.v5.desc':'طازج، أساسي في كل مطبخ',
      'product.v6.name':'فلفل ألوان','product.v6.desc':'أحمر، أخضر وأصفر، طازج',
      'product.v7.name':'خس','product.v7.desc':'أخضر طازج، مثالي للسلطات',
      'product.v8.name':'خيار','product.v8.desc':'طازج ومنعش، مثالي صيفاً',
    }
  },

  fr: {
    code:'fr', name:'Français', flag:'🇫🇷',
    t:{
      'brand.sub':'Fruits et légumes frais • Livraison rapide',
      'role.choose':'Choisissez votre rôle',
      'role.client.title':'Client',
      'role.client.desc':'Parcourez les produits frais et passez commande facilement',
      'role.client.tag1':'🍊 Fruits','role.client.tag2':'🥦 Légumes','role.client.tag3':'🚚 Livraison',
      'role.admin.title':'Admin',
      'role.admin.desc':'Gérez les produits et les prix et accédez au tableau de bord',
      'role.admin.tag1':'📷 Photos','role.admin.tag2':'💰 Prix','role.admin.tag3':'📊 Gestion',
      'role.enter':'Entrer',
      'auth.title':'Connexion Administrateur','auth.desc':'Entrez le mot de passe pour accéder au tableau de bord',
      'auth.ph':'Mot de passe','auth.error':'❌ Mot de passe incorrect',
      'auth.submit':'Connexion','auth.hint':'Mot de passe par défaut: <code>jarrebni2025</code>',
      'back':'← Retour',
      'nav.home':'Accueil','nav.products':'Produits','nav.whyus':'Pourquoi nous',
      'nav.order':'Commander','nav.contact':'Contact',
      'hero.tag':'🚚 Livraison rapide à votre porte',
      'hero.btn.order':'Commander','hero.btn.browse':'Voir les produits',
      'products.tag':'Nos produits','products.title':'Nos meilleurs produits frais',
      'products.desc':'Nous sélectionnons les meilleurs fruits et légumes de saison pour vous',
      'tab.fruits':'🍊 Fruits','tab.veggies':'🥦 Légumes',
      'btn.add':'+ Ajouter','btn.added':'✓ Ajouté',
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
      // Units
      'unit.كغ':'kg','unit.حبة':'pièce','unit.علبة':'boîte',
      // Fruits
      'product.f1.name':'Orange fraîche','product.f1.desc':'Riche en vitamine C, douce et délicieuse',
      'product.f2.name':'Pomme rouge','product.f2.desc':'Fraîche et croquante, directement de la ferme',
      'product.f3.name':'Banane','product.f3.desc':'Mûre à point, riche en potassium',
      'product.f4.name':'Raisin vert','product.f4.desc':'Gros grains, sucrés et juteux',
      'product.f5.name':'Fraise','product.f5.desc':'Fraîche, rouge et délicieuse',
      'product.f6.name':'Mangue','product.f6.desc':'Tropicale, mûre et parfumée',
      'product.f7.name':'Citron','product.f7.desc':'Frais, riche en vitamines',
      'product.f8.name':'Myrtille','product.f8.desc':'Riche en antioxydants',
      // Veggies
      'product.v1.name':'Carotte','product.v1.desc':'Fraîche et croquante, riche en vitamines',
      'product.v2.name':'Tomate','product.v2.desc':'Rouge et mûre, idéale pour cuisiner',
      'product.v3.name':'Brocoli','product.v3.desc':'Légume sain et nutritif',
      'product.v4.name':'Avocat','product.v4.desc':'Mûr et parfait, riche en bonnes graisses',
      'product.v5.name':'Oignon','product.v5.desc':'Frais, essentiel en cuisine',
      'product.v6.name':'Poivrons colorés','product.v6.desc':'Rouge, vert et jaune, frais',
      'product.v7.name':'Laitue','product.v7.desc':'Verte et fraîche, idéale pour les salades',
      'product.v8.name':'Concombre','product.v8.desc':'Frais et rafraîchissant, idéal en été',
    }
  },

  en: {
    code:'en', name:'English', flag:'🇬🇧',
    t:{
      'brand.sub':'Fresh fruits & vegetables • Fast delivery',
      'role.choose':'Choose your role',
      'role.client.title':'Customer',
      'role.client.desc':'Browse fresh products and place your order easily',
      'role.client.tag1':'🍊 Fruits','role.client.tag2':'🥦 Vegetables','role.client.tag3':'🚚 Delivery',
      'role.admin.title':'Admin',
      'role.admin.desc':'Manage products and prices and access the full dashboard',
      'role.admin.tag1':'📷 Photos','role.admin.tag2':'💰 Prices','role.admin.tag3':'📊 Management',
      'role.enter':'Enter',
      'auth.title':'Admin Login','auth.desc':'Enter the password to access the dashboard',
      'auth.ph':'Password','auth.error':'❌ Incorrect password',
      'auth.submit':'Login','auth.hint':'Default password: <code>jarrebni2025</code>',
      'back':'← Back',
      'nav.home':'Home','nav.products':'Products','nav.whyus':'Why us',
      'nav.order':'Order now','nav.contact':'Contact',
      'hero.tag':'🚚 Fast delivery to your door',
      'hero.btn.order':'Order now','hero.btn.browse':'Browse products',
      'products.tag':'Our products','products.title':'Our best fresh products',
      'products.desc':'We select the best seasonal fruits and vegetables for you',
      'tab.fruits':'🍊 Fruits','tab.veggies':'🥦 Vegetables',
      'btn.add':'+ Add','btn.added':'✓ Added',
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
      // Units
      'unit.كغ':'kg','unit.حبة':'piece','unit.علبة':'box',
      // Fruits
      'product.f1.name':'Fresh Orange','product.f1.desc':'Rich in vitamin C, sweet and delicious',
      'product.f2.name':'Red Apple','product.f2.desc':'Fresh and crunchy, straight from the farm',
      'product.f3.name':'Banana','product.f3.desc':'Perfectly ripe, rich in potassium',
      'product.f4.name':'Green Grapes','product.f4.desc':'Large grains, sweet and juicy',
      'product.f5.name':'Strawberry','product.f5.desc':'Fresh, red and delicious',
      'product.f6.name':'Mango','product.f6.desc':'Tropical, ripe and fragrant',
      'product.f7.name':'Lemon','product.f7.desc':'Fresh, rich in vitamins',
      'product.f8.name':'Blueberry','product.f8.desc':'Rich in antioxidants',
      // Veggies
      'product.v1.name':'Carrot','product.v1.desc':'Fresh and crunchy, rich in vitamins',
      'product.v2.name':'Tomato','product.v2.desc':'Red and ripe, perfect for cooking',
      'product.v3.name':'Broccoli','product.v3.desc':'Healthy and nutritious vegetable',
      'product.v4.name':'Avocado','product.v4.desc':'Ripe and perfect, rich in healthy fats',
      'product.v5.name':'Onion','product.v5.desc':'Fresh, essential in every kitchen',
      'product.v6.name':'Colored Peppers','product.v6.desc':'Red, green and yellow, fresh',
      'product.v7.name':'Lettuce','product.v7.desc':'Fresh green, perfect for salads',
      'product.v8.name':'Cucumber','product.v8.desc':'Fresh and refreshing, perfect for summer',
    }
  }
};

function getLang()     { return localStorage.getItem(LANG_KEY) || 'ar'; }
function setLang(code) { localStorage.setItem(LANG_KEY, code); }

function t(key) {
  const L = TRANSLATIONS[getLang()] || TRANSLATIONS.ar;
  return L.t[key] !== undefined ? L.t[key] : (TRANSLATIONS.ar.t[key] || key);
}

function translateUnit(unit) {
  return t('unit.' + unit) || unit;
}

function applyLang(code) {
  const L = TRANSLATIONS[code] || TRANSLATIONS.ar;

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

  // Re-render product grids if renderProducts exists (shop page)
  if (typeof renderProducts === 'function') renderProducts();
}

document.addEventListener('DOMContentLoaded', () => applyLang(getLang()));
window.addEventListener('pageshow', () => applyLang(getLang()));
