/* Shared data layer — uses localStorage for persistence */
const JARREBNI = (() => {
  const KEYS = {
    PRODUCTS: 'jarrebni_products',
    SETTINGS: 'jarrebni_settings',
    ORDERS:   'jarrebni_orders',
    REVIEWS:  'jarrebni_reviews',
    GALLERY:  'jarrebni_gallery',
    AUTH:     'jarrebni_auth'
  };

  const DEFAULT_PRODUCTS = {
    fruits: [
      { id:'f1', emoji:'🍊', image:'', name:'برتقال طازج',  desc:'غني بفيتامين C، حلو ولذيذ',            price:'1.5', unit:'كغ'  },
      { id:'f2', emoji:'🍎', image:'', name:'تفاح أحمر',    desc:'طازج ومقرمش من المزرعة مباشرة',        price:'3',   unit:'كغ'  },
      { id:'f3', emoji:'🍌', image:'', name:'موز',           desc:'ناضج بشكل مثالي، غني بالبوتاسيوم',   price:'2',   unit:'كغ'  },
      { id:'f4', emoji:'🍇', image:'', name:'عنب أخضر',     desc:'حبات كبيرة، حلوة وعصيرية',            price:'4',   unit:'كغ'  },
      { id:'f5', emoji:'🍓', image:'', name:'فراولة',        desc:'طازجة، حمراء ولذيذة',                  price:'5',   unit:'كغ'  },
      { id:'f6', emoji:'🥭', image:'', name:'مانجو',         desc:'استوائية، ناضجة وعطرية',               price:'6',   unit:'كغ'  },
      { id:'f7', emoji:'🍋', image:'', name:'ليمون',         desc:'طازج، غني بالفيتامينات',              price:'1.2', unit:'كغ'  },
      { id:'f8', emoji:'🫐', image:'', name:'توت أزرق',      desc:'غني بمضادات الأكسدة',                 price:'8',   unit:'كغ'  },
    ],
    veggies: [
      { id:'v1', emoji:'🥕', image:'', name:'جزر',           desc:'طازج ومقرمش، غني بالفيتامينات',       price:'0.9', unit:'كغ'  },
      { id:'v2', emoji:'🍅', image:'', name:'طماطم',         desc:'حمراء ناضجة، مثالية للطبخ',           price:'1.2', unit:'كغ'  },
      { id:'v3', emoji:'🥦', image:'', name:'بروكلي',        desc:'خضروات صحية وغذائية',                  price:'3',   unit:'كغ'  },
      { id:'v4', emoji:'🥑', image:'', name:'أفوكادو',       desc:'ناضج ومثالي، غني بالدهون الصحية',     price:'4',   unit:'حبة' },
      { id:'v5', emoji:'🧅', image:'', name:'بصل',           desc:'طازج، أساسي في كل مطبخ',              price:'0.8', unit:'كغ'  },
      { id:'v6', emoji:'🫑', image:'', name:'فلفل ألوان',    desc:'أحمر، أخضر وأصفر، طازج',              price:'2.5', unit:'كغ'  },
      { id:'v7', emoji:'🥬', image:'', name:'خس',            desc:'أخضر طازج، مثالي للسلطات',            price:'0.8', unit:'حبة' },
      { id:'v8', emoji:'🥒', image:'', name:'خيار',          desc:'طازج ومنعش، مثالي صيفاً',            price:'1',   unit:'كغ'  },
    ]
  };

  const DEFAULT_SETTINGS = {
    phone:     '+216 XX XXX XXX',
    whatsapp:  '216XXXXXXXX',
    password:  'jarrebni2025',
    promoText: '🔥 عرض الأسبوع: توصيل مجاني في بنزرت الشمالية!',
    hours:     'السبت - الخميس: 8:00ص - 8:00م\nالجمعة: مغلق'
  };

  function clone(obj) { return JSON.parse(JSON.stringify(obj)); }

  return {
    getProducts() {
      try {
        const s = localStorage.getItem(KEYS.PRODUCTS);
        return s ? JSON.parse(s) : clone(DEFAULT_PRODUCTS);
      } catch { return clone(DEFAULT_PRODUCTS); }
    },
    saveProducts(data) {
      localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(data));
    },
    getSettings() {
      try {
        const s = localStorage.getItem(KEYS.SETTINGS);
        return s ? { ...DEFAULT_SETTINGS, ...JSON.parse(s) } : { ...DEFAULT_SETTINGS };
      } catch { return { ...DEFAULT_SETTINGS }; }
    },
    saveSettings(data) {
      localStorage.setItem(KEYS.SETTINGS, JSON.stringify(data));
    },
    isLoggedIn() {
      return sessionStorage.getItem(KEYS.AUTH) === '1';
    },
    login(pwd) {
      if (pwd === this.getSettings().password) {
        sessionStorage.setItem(KEYS.AUTH, '1');
        return true;
      }
      return false;
    },
    logout() {
      sessionStorage.removeItem(KEYS.AUTH);
    },
    getOrders() {
      try {
        const s = localStorage.getItem(KEYS.ORDERS);
        return s ? JSON.parse(s) : [];
      } catch { return []; }
    },
    saveOrder(order) {
      const orders = this.getOrders();
      orders.unshift(order); // newest first
      localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
    },
    updateOrderStatus(id, status) {
      const orders = this.getOrders();
      const idx = orders.findIndex(o => o.id === id);
      if (idx !== -1) {
        orders[idx].status = status;
        localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
      }
    },
    deleteOrder(id) {
      const orders = this.getOrders().filter(o => o.id !== id);
      localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
    },
    getReviews() {
      try {
        const s = localStorage.getItem(KEYS.REVIEWS);
        return s ? JSON.parse(s) : [];
      } catch { return []; }
    },
    saveReview(review) {
      const reviews = this.getReviews();
      reviews.unshift(review);
      localStorage.setItem(KEYS.REVIEWS, JSON.stringify(reviews));
    },
    deleteReview(id) {
      const reviews = this.getReviews().filter(r => r.id !== id);
      localStorage.setItem(KEYS.REVIEWS, JSON.stringify(reviews));
    },
    getGallery() {
      try {
        const s = localStorage.getItem(KEYS.GALLERY);
        return s ? JSON.parse(s) : [];
      } catch { return []; }
    },
    saveGalleryPhoto(photo) {
      const gallery = this.getGallery();
      gallery.unshift(photo);
      localStorage.setItem(KEYS.GALLERY, JSON.stringify(gallery));
    },
    deleteGalleryPhoto(id) {
      const gallery = this.getGallery().filter(p => p.id !== id);
      localStorage.setItem(KEYS.GALLERY, JSON.stringify(gallery));
    }
  };
})();
