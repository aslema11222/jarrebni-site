// ============================================================
//  JARREBNI — Supabase client
//  Remplace products-data.js — toutes les opérations sont async
// ============================================================
//
//  CONFIGURATION :
//  1. Aller sur https://supabase.com → créer un compte + projet
//  2. Dans SQL Editor du projet, coller supabase-setup.sql et exécuter
//  3. Dans Authentication > Users, cliquer "Add User" pour créer ton compte admin
//  4. Dans Settings > API, copier Project URL et anon public key
//  5. Remplacer les deux valeurs ci-dessous
//
const SUPABASE_URL      = 'https://frcepxpnhsifhdcmpdsl.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_8UFRF09WFB3OO1hBX5ZGkg_V5wMQbR9';

const _sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const JARREBNI = (() => {

  // ===== AUTH =====
  async function login(email, password) {
    const { error } = await _sb.auth.signInWithPassword({ email, password });
    return !error;
  }

  async function logout() {
    await _sb.auth.signOut();
  }

  async function isLoggedIn() {
    const { data: { session } } = await _sb.auth.getSession();
    return !!session;
  }

  async function changePassword(newPassword) {
    const { error } = await _sb.auth.updateUser({ password: newPassword });
    return !error;
  }

  async function getAdminEmail() {
    const { data: { user } } = await _sb.auth.getUser();
    return user ? user.email : '';
  }

  // ===== PRODUCTS =====
  async function getProducts() {
    const { data, error } = await _sb
      .from('products')
      .select('*')
      .order('created_at', { ascending: true });
    if (error || !data) return { fruits: [], veggies: [] };
    const map = r => ({
      id: r.id, category: r.category,
      emoji: r.emoji, image: r.image || '',
      name: r.name, desc: r.description,
      price: r.price, unit: r.unit,
      priceWholesale: r.price_wholesale || '',
      minWholesale:   r.min_wholesale   || '10',
      featured:       r.featured        || false
    });
    return {
      fruits:  data.filter(p => p.category === 'fruits').map(map),
      veggies: data.filter(p => p.category === 'veggies').map(map)
    };
  }

  async function upsertProduct(product) {
    const { error } = await _sb.from('products').upsert({
      id:              product.id,
      category:        product.category,
      emoji:           product.emoji          || '🛒',
      image:           product.image          || '',
      name:            product.name,
      description:     product.desc           || '',
      price:           String(product.price),
      unit:            product.unit           || 'كغ',
      price_wholesale: String(product.priceWholesale || ''),
      min_wholesale:   String(product.minWholesale   || '10'),
      featured:        product.featured || false
    });
    return !error;
  }

  async function toggleFeatured(id, featured) {
    const { error } = await _sb.from('products').update({ featured }).eq('id', id);
    return !error;
    return !error;
  }

  async function deleteProduct(id) {
    const { error } = await _sb.from('products').delete().eq('id', id);
    return !error;
  }

  async function resetProducts() {
    await _sb.from('products').delete().neq('id', '');
    const defaults = [
      { id:'f1', category:'fruits',  emoji:'🍊', name:'برتقال طازج', description:'غني بفيتامين C، حلو ولذيذ',         price:'1.5', unit:'كغ'  },
      { id:'f2', category:'fruits',  emoji:'🍎', name:'تفاح أحمر',   description:'طازج ومقرمش من المزرعة مباشرة',     price:'3',   unit:'كغ'  },
      { id:'f3', category:'fruits',  emoji:'🍌', name:'موز',          description:'ناضج بشكل مثالي، غني بالبوتاسيوم',  price:'2',   unit:'كغ'  },
      { id:'f4', category:'fruits',  emoji:'🍇', name:'عنب أخضر',    description:'حبات كبيرة، حلوة وعصيرية',          price:'4',   unit:'كغ'  },
      { id:'f5', category:'fruits',  emoji:'🍓', name:'فراولة',       description:'طازجة، حمراء ولذيذة',               price:'5',   unit:'كغ'  },
      { id:'f6', category:'fruits',  emoji:'🥭', name:'مانجو',        description:'استوائية، ناضجة وعطرية',            price:'6',   unit:'كغ'  },
      { id:'f7', category:'fruits',  emoji:'🍋', name:'ليمون',        description:'طازج، غني بالفيتامينات',            price:'1.2', unit:'كغ'  },
      { id:'f8', category:'fruits',  emoji:'🫐', name:'توت أزرق',     description:'غني بمضادات الأكسدة',              price:'8',   unit:'كغ'  },
      { id:'v1', category:'veggies', emoji:'🥕', name:'جزر',          description:'طازج ومقرمش، غني بالفيتامينات',    price:'0.9', unit:'كغ'  },
      { id:'v2', category:'veggies', emoji:'🍅', name:'طماطم',        description:'حمراء ناضجة، مثالية للطبخ',         price:'1.2', unit:'كغ'  },
      { id:'v3', category:'veggies', emoji:'🥦', name:'بروكلي',       description:'خضروات صحية وغذائية',               price:'3',   unit:'كغ'  },
      { id:'v4', category:'veggies', emoji:'🥑', name:'أفوكادو',      description:'ناضج ومثالي، غني بالدهون الصحية',   price:'4',   unit:'حبة' },
      { id:'v5', category:'veggies', emoji:'🧅', name:'بصل',          description:'طازج، أساسي في كل مطبخ',            price:'0.8', unit:'كغ'  },
      { id:'v6', category:'veggies', emoji:'🫑', name:'فلفل ألوان',   description:'أحمر، أخضر وأصفر، طازج',           price:'2.5', unit:'كغ'  },
      { id:'v7', category:'veggies', emoji:'🥬', name:'خس',           description:'أخضر طازج، مثالي للسلطات',          price:'0.8', unit:'حبة' },
      { id:'v8', category:'veggies', emoji:'🥒', name:'خيار',         description:'طازج ومنعش، مثالي صيفاً',           price:'1',   unit:'كغ'  },
    ];
    const { error } = await _sb.from('products').insert(defaults);
    return !error;
  }

  // ===== SETTINGS =====
  async function getSettings() {
    const defaults = {
      phone:     '+216 XX XXX XXX',
      whatsapp:  '216XXXXXXXX',
      promoText: '🔥 عرض الأسبوع: توصيل مجاني في بنزرت الشمالية!',
      hours:     'السبت - الخميس: 8:00ص - 8:00م\nالجمعة: مغلق',
      minOrder:  '0'
    };
    const { data } = await _sb.from('settings').select('key, value');
    (data || []).forEach(row => { defaults[row.key] = row.value; });
    return defaults;
  }

  async function saveSettings(updates) {
    const rows = Object.entries(updates).map(([key, value]) => ({ key, value: String(value) }));
    const { error } = await _sb.from('settings').upsert(rows);
    return !error;
  }

  // ===== ORDERS =====
  async function getOrders() {
    const { data, error } = await _sb
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    if (error || !data) return [];
    return data.map(o => ({
      id:       o.id,
      date:     o.order_date,
      name:     o.name,
      phone:    o.phone,
      address:  o.address,
      products: o.products_text,
      notes:    o.notes,
      total:    o.total,
      status:   o.status
    }));
  }

  async function saveOrder(order) {
    const { error } = await _sb.from('orders').insert({
      id:            order.id,
      name:          order.name,
      phone:         order.phone,
      address:       order.address,
      products_text: order.products || '',
      notes:         order.notes    || '',
      status:        'new',
      total:         String(order.total || '0'),
      order_date:    order.date
    });
    return !error;
  }

  async function updateOrderStatus(id, status) {
    const { error } = await _sb.from('orders').update({ status }).eq('id', id);
    return !error;
  }

  async function deleteOrder(id) {
    const { error } = await _sb.from('orders').delete().eq('id', id);
    return !error;
  }

  async function deleteAllOrders() {
    const { error } = await _sb.from('orders').delete().neq('id', '');
    return !error;
  }

  // ===== REVIEWS =====
  async function getReviews() {
    const { data, error } = await _sb
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });
    if (error || !data) return [];
    return data.map(r => ({
      id: r.id, date: r.review_date,
      name: r.name, text: r.text, rating: r.rating
    }));
  }

  async function saveReview(review) {
    const { error } = await _sb.from('reviews').insert({
      id:          review.id,
      name:        review.name,
      text:        review.text,
      rating:      review.rating,
      review_date: review.date
    });
    return !error;
  }

  async function deleteReview(id) {
    const { error } = await _sb.from('reviews').delete().eq('id', id);
    return !error;
  }

  async function deleteAllReviews() {
    const { error } = await _sb.from('reviews').delete().neq('id', '');
    return !error;
  }

  return {
    login, logout, isLoggedIn, changePassword, getAdminEmail,
    getProducts, upsertProduct, deleteProduct, resetProducts, toggleFeatured,
    getSettings, saveSettings,
    getOrders, saveOrder, updateOrderStatus, deleteOrder, deleteAllOrders,
    getReviews, saveReview, deleteReview, deleteAllReviews
  };
})();
