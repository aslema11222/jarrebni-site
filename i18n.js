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
      'nav.order':'اطلب الآن','nav.gallery':'معرضنا','nav.reviews':'التقييمات','nav.contact':'تواصل معنا',
      'contact.phone.title':'اتصل بنا',
      'gallery.tag':'معرض صورنا','gallery.title':'من مزرعتنا إلى منزلك',
      'gallery.desc':'صور حقيقية من مخزوننا وتوصيلاتنا اليومية',
      'gallery.empty':'لا توجد صور بعد — المدير سيضيفها قريباً',
      'btn.wa':'💬 واتساب',
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
      // Why us
      'whyus.tag':'لماذا جربني؟','whyus.title':'نختلف لأننا نهتم','whyus.desc':'نقدم لك تجربة تسوق فريدة ومريحة',
      'feature.fresh.title':'طازج 100%','feature.fresh.desc':'نختار منتجاتنا يومياً من أفضل المزارع المحلية لضمان الطزاجة الكاملة',
      'feature.delivery.title':'توصيل سريع','feature.delivery.desc':'نوصل طلبك إلى باب منزلك في أقل من 24 ساعة في جميع المناطق',
      'feature.price.title':'أسعار منافسة','feature.price.desc':'أفضل جودة بأسعار معقولة، نضمن لك قيمة حقيقية مقابل كل دينار',
      'feature.quality.title':'جودة مضمونة','feature.quality.desc':'كل منتج يمر بمعايير صارمة للجودة قبل وصوله إليك',
      'feature.easy.title':'طلب سهل','feature.easy.desc':'اطلب عبر الهاتف أو واتساب، بدون تعقيد ولا انتظار طويل',
      'feature.eco.title':'تغليف صديق للبيئة','feature.eco.desc':'نستخدم مواد تغليف طبيعية للحفاظ على طازجية المنتجات',
      // Testimonials
      'testimonials.tag':'آراء عملائنا','testimonials.title':'ماذا يقولون عنا',
      'testimonial.1.text':'"منتجات رائعة وطازجة جداً! التوصيل كان سريعاً والأسعار معقولة. أنصح الجميع بتجربة جربني"',
      'testimonial.1.name':'أحمد سعيد','testimonial.1.since':'عميل منذ 2025',
      'testimonial.2.text':'"أخيراً وجدت من يوفر فواكه وخضروات طازجة بجودة عالية! الفراولة كانت لذيذة جداً 🍓"',
      'testimonial.2.name':'فاطمة محمد','testimonial.2.since':'عميلة منذ 2025',
      'testimonial.3.text':'"خدمة ممتازة وأسعار لا تُقاوم. الطلب وصل في الوقت المحدد والمنتجات كانت طازجة جداً"',
      'testimonial.3.name':'كريم بن علي','testimonial.3.since':'عميل منذ 2025',
      // Footer
      'footer.desc':'فواكه وخضروات طازجة من بنزرت الشمالية 🇹🇳',
      'footer.year':'© 2025 جربني - بنزرت، تونس',
      'footer.links':'روابط سريعة','footer.products.title':'منتجاتنا',
      'footer.fruits':'🍊 فواكه موسمية','footer.veggies':'🥦 خضروات طازجة',
      'footer.delivery':'🚚 توصيل في بنزرت','footer.quality':'⭐ جودة مضمونة 🇹🇳',
      // Order steps
      'step.1':'اختر منتجاتك وأضفها للسلة','step.2':'أدخل بياناتك',
      'step.3':'نتواصل معك للتأكيد','step.4':'نوصل إلى بابك 🚛',
      'contact.tag':'تواصل معنا','contact.title':'نحن هنا لمساعدتك',
      'settings.title':'الإعدادات',
      'settings.lang.title':'اللغة / Langue / Language',
      'settings.lang.desc':'اختر لغة عرض الموقع',
      'settings.save':'💾 حفظ','settings.saved':'✓ تم الحفظ!',
      // Reviews
      'reviews.tag':'التقييمات','reviews.title':'شارك تجربتك معنا','reviews.desc':'رأيك يهمنا ويساعد الآخرين على الاختيار',
      'review.form.title':'✍️ أضف تقييمك',
      'review.form.name':'اسمك','review.form.name.ph':'أدخل اسمك',
      'review.form.rating':'التقييم','review.form.rating.hint':'انقر على النجوم',
      'review.form.text':'تعليقك','review.form.text.ph':'شارك تجربتك مع جربني...',
      'review.form.submit':'⭐ أرسل تقييمي',
      'review.sent':'✓ شكراً!','review.toast':'✓ تم إرسال تقييمك!',
      'review.empty':'لا توجد تقييمات بعد. كن أول من يقيّم!',
      'review.error.rating':'يرجى اختيار عدد النجوم',
      'review.label.1':'ضعيف','review.label.2':'مقبول','review.label.3':'جيد','review.label.4':'جيد جداً','review.label.5':'ممتاز',
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
      'nav.order':'Commander','nav.gallery':'Galerie','nav.reviews':'Avis','nav.contact':'Contact',
      'contact.phone.title':'Appelez-nous',
      'gallery.tag':'Notre galerie','gallery.title':'De notre ferme à votre maison',
      'gallery.desc':'Photos réelles de notre stock et de nos livraisons quotidiennes',
      'gallery.empty':'Pas encore de photos — l\'admin en ajoutera bientôt',
      'btn.wa':'💬 WhatsApp',
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
      // Why us
      'whyus.tag':'Pourquoi nous?','whyus.title':'Nous sommes différents car nous nous soucions','whyus.desc':'Nous vous offrons une expérience de shopping unique et agréable',
      'feature.fresh.title':'Frais 100%','feature.fresh.desc':'Nous sélectionnons nos produits chaque jour dans les meilleures fermes locales',
      'feature.delivery.title':'Livraison rapide','feature.delivery.desc':'Nous livrons votre commande à votre porte en moins de 24 heures dans toutes les zones',
      'feature.price.title':'Prix compétitifs','feature.price.desc':'Meilleure qualité à prix raisonnables, nous vous garantissons une vraie valeur pour chaque dinar',
      'feature.quality.title':'Qualité garantie','feature.quality.desc':'Chaque produit passe par des normes strictes de qualité avant de vous parvenir',
      'feature.easy.title':'Commande facile','feature.easy.desc':'Commandez par téléphone ou WhatsApp, sans complication ni longue attente',
      'feature.eco.title':'Emballage écologique','feature.eco.desc':'Nous utilisons des matériaux d\'emballage naturels pour préserver la fraîcheur des produits',
      // Testimonials
      'testimonials.tag':'Avis clients','testimonials.title':'Ce qu\'ils disent de nous',
      'testimonial.1.text':'"Des produits excellents et très frais! La livraison était rapide et les prix raisonnables. Je recommande Jarrebni à tous"',
      'testimonial.1.name':'Ahmed Saïd','testimonial.1.since':'Client depuis 2025',
      'testimonial.2.text':'"J\'ai enfin trouvé des fruits et légumes frais de haute qualité! Les fraises étaient délicieuses 🍓"',
      'testimonial.2.name':'Fatima Mohammed','testimonial.2.since':'Cliente depuis 2025',
      'testimonial.3.text':'"Service excellent et prix imbattables. La commande est arrivée à temps et les produits étaient très frais"',
      'testimonial.3.name':'Karim Ben Ali','testimonial.3.since':'Client depuis 2025',
      // Footer
      'footer.desc':'Fruits et légumes frais de Bizerte Nord 🇹🇳',
      'footer.year':'© 2025 Jarrebni - Bizerte, Tunisie',
      'footer.links':'Liens rapides','footer.products.title':'Nos produits',
      'footer.fruits':'🍊 Fruits de saison','footer.veggies':'🥦 Légumes frais',
      'footer.delivery':'🚚 Livraison à Bizerte','footer.quality':'⭐ Qualité garantie 🇹🇳',
      // Order steps
      'step.1':'Choisissez vos produits et ajoutez-les au panier','step.2':'Entrez vos informations',
      'step.3':'Nous vous contactons pour confirmer','step.4':'Nous livrons à votre porte 🚛',
      'contact.tag':'Contactez-nous','contact.title':'Nous sommes là pour vous',
      'settings.title':'Paramètres',
      'settings.lang.title':'اللغة / Langue / Language',
      'settings.lang.desc':'Choisissez la langue d\'affichage',
      'settings.save':'💾 Enregistrer','settings.saved':'✓ Enregistré!',
      // Reviews
      'reviews.tag':'Avis','reviews.title':'Partagez votre expérience','reviews.desc':'Votre avis nous aide et aide les autres à choisir',
      'review.form.title':'✍️ Ajouter un avis',
      'review.form.name':'Votre nom','review.form.name.ph':'Entrez votre nom',
      'review.form.rating':'Note','review.form.rating.hint':'Cliquez sur les étoiles',
      'review.form.text':'Votre commentaire','review.form.text.ph':'Partagez votre expérience avec Jarrebni...',
      'review.form.submit':'⭐ Envoyer mon avis',
      'review.sent':'✓ Merci!','review.toast':'✓ Votre avis a été envoyé!',
      'review.empty':'Pas encore d\'avis. Soyez le premier à donner votre avis!',
      'review.error.rating':'Veuillez choisir une note',
      'review.label.1':'Mauvais','review.label.2':'Passable','review.label.3':'Bien','review.label.4':'Très bien','review.label.5':'Excellent',
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
      'nav.order':'Order now','nav.gallery':'Gallery','nav.reviews':'Reviews','nav.contact':'Contact',
      'contact.phone.title':'Call us',
      'gallery.tag':'Our gallery','gallery.title':'From our farm to your home',
      'gallery.desc':'Real photos from our stock and daily deliveries',
      'gallery.empty':'No photos yet — the admin will add them soon',
      'btn.wa':'💬 WhatsApp',
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
      // Why us
      'whyus.tag':'Why us?','whyus.title':'We differ because we care','whyus.desc':'We offer you a unique and comfortable shopping experience',
      'feature.fresh.title':'100% Fresh','feature.fresh.desc':'We select our products daily from the best local farms to ensure complete freshness',
      'feature.delivery.title':'Fast delivery','feature.delivery.desc':'We deliver your order to your door in less than 24 hours in all areas',
      'feature.price.title':'Competitive prices','feature.price.desc':'Best quality at reasonable prices, we guarantee you real value for every dinar',
      'feature.quality.title':'Guaranteed quality','feature.quality.desc':'Every product goes through strict quality standards before reaching you',
      'feature.easy.title':'Easy ordering','feature.easy.desc':'Order by phone or WhatsApp, without complications or long waits',
      'feature.eco.title':'Eco-friendly packaging','feature.eco.desc':'We use natural packaging materials to preserve the freshness of products',
      // Testimonials
      'testimonials.tag':'Customer reviews','testimonials.title':'What they say about us',
      'testimonial.1.text':'"Excellent and very fresh products! The delivery was fast and the prices reasonable. I recommend Jarrebni to everyone"',
      'testimonial.1.name':'Ahmed Said','testimonial.1.since':'Customer since 2025',
      'testimonial.2.text':'"I finally found fresh fruits and vegetables of high quality! The strawberries were delicious 🍓"',
      'testimonial.2.name':'Fatima Mohammed','testimonial.2.since':'Customer since 2025',
      'testimonial.3.text':'"Excellent service and unbeatable prices. The order arrived on time and the products were very fresh"',
      'testimonial.3.name':'Karim Ben Ali','testimonial.3.since':'Customer since 2025',
      // Footer
      'footer.desc':'Fresh fruits and vegetables from Bizerte Nord 🇹🇳',
      'footer.year':'© 2025 Jarrebni - Bizerte, Tunisia',
      'footer.links':'Quick links','footer.products.title':'Our products',
      'footer.fruits':'🍊 Seasonal fruits','footer.veggies':'🥦 Fresh vegetables',
      'footer.delivery':'🚚 Delivery in Bizerte','footer.quality':'⭐ Guaranteed quality 🇹🇳',
      // Order steps
      'step.1':'Choose your products and add them to the cart','step.2':'Enter your information',
      'step.3':'We contact you to confirm','step.4':'We deliver to your door 🚛',
      'contact.tag':'Contact us','contact.title':'We\'re here to help you',
      'settings.title':'Settings',
      'settings.lang.title':'اللغة / Langue / Language',
      'settings.lang.desc':'Choose the display language',
      'settings.save':'💾 Save','settings.saved':'✓ Saved!',
      // Reviews
      'reviews.tag':'Reviews','reviews.title':'Share your experience','reviews.desc':'Your feedback helps us and others choose',
      'review.form.title':'✍️ Add your review',
      'review.form.name':'Your name','review.form.name.ph':'Enter your name',
      'review.form.rating':'Rating','review.form.rating.hint':'Click on the stars',
      'review.form.text':'Your comment','review.form.text.ph':'Share your experience with Jarrebni...',
      'review.form.submit':'⭐ Send my review',
      'review.sent':'✓ Thank you!','review.toast':'✓ Your review has been sent!',
      'review.empty':'No reviews yet. Be the first to review!',
      'review.error.rating':'Please choose a star rating',
      'review.label.1':'Poor','review.label.2':'Fair','review.label.3':'Good','review.label.4':'Very good','review.label.5':'Excellent',
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

  // Re-render product grids and reviews if on shop page
  if (typeof renderProducts === 'function') renderProducts();
  if (typeof renderReviews  === 'function') renderReviews();
}

document.addEventListener('DOMContentLoaded', () => applyLang(getLang()));
window.addEventListener('pageshow', () => applyLang(getLang()));
