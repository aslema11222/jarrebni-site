// ===== INIT =====
document.addEventListener('DOMContentLoaded', async () => {
  if (await JARREBNI.isLoggedIn()) {
    await showDashboard();
  } else {
    showLogin();
  }
});

// ===== AUTH =====
function showLogin() {
  document.getElementById('loginScreen').classList.remove('hidden');
  document.getElementById('dashboard').classList.add('hidden');
  document.getElementById('accessDenied').classList.add('hidden');
}

async function showDashboard() {
  document.getElementById('loginScreen').classList.add('hidden');
  document.getElementById('accessDenied').classList.add('hidden');
  document.getElementById('dashboard').classList.remove('hidden');
  await renderAdminProducts();
  await loadSettingsForm();
  updateStats();
  startOrderNotificationPolling();
}

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn   = e.target.querySelector('button[type="submit"]');
  const email = document.getElementById('emailInput').value.trim();
  const pwd   = document.getElementById('passwordInput').value;
  btn.disabled = true;
  btn.textContent = '⏳ جاري التحقق...';
  const ok = await JARREBNI.login(email, pwd);
  if (ok) {
    await showDashboard();
  } else {
    document.getElementById('loginError').classList.remove('hidden');
    document.getElementById('passwordInput').value = '';
    document.getElementById('passwordInput').focus();
    btn.disabled = false;
    btn.textContent = 'دخول →';
  }
});

document.getElementById('logoutBtn').addEventListener('click', async () => {
  if (!confirm('هل تريد تسجيل الخروج؟')) return;
  await JARREBNI.logout();
  closeSidebar();
  showLogin();
});

// ===== MOBILE SIDEBAR =====
const sidebar        = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function openSidebar()  { sidebar.classList.add('open'); sidebarOverlay.classList.add('open'); }
function closeSidebar() { sidebar.classList.remove('open'); sidebarOverlay.classList.remove('open'); }

document.getElementById('sidebarToggle').addEventListener('click', openSidebar);
sidebarOverlay.addEventListener('click', closeSidebar);

// ===== SIDEBAR NAV =====
const SECTIONS = ['products', 'orders', 'customers', 'reviews', 'settings'];

document.querySelectorAll('.nav-item[data-section]').forEach(item => {
  item.addEventListener('click', async () => {
    document.querySelectorAll('.nav-item[data-section]').forEach(n => n.classList.remove('active'));
    item.classList.add('active');
    const sec = item.dataset.section;
    SECTIONS.forEach(s => {
      document.getElementById(s + 'Section').classList.toggle('hidden', s !== sec);
    });
    if (sec === 'orders')    await renderOrders();
    if (sec === 'customers') await renderCustomers();
    if (sec === 'reviews')   await renderAdminReviews();
    closeSidebar();
  });
});

// ===== ADMIN TABS =====
let currentAdminTab = 'fruits';
document.querySelectorAll('.admin-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentAdminTab = tab.dataset.tab;
    document.getElementById('adminFruitsGrid').classList.toggle('hidden', currentAdminTab !== 'fruits');
    document.getElementById('adminVeggiesGrid').classList.toggle('hidden', currentAdminTab !== 'veggies');
  });
});

// ===== RENDER PRODUCTS =====
async function renderAdminProducts() {
  const data = await JARREBNI.getProducts();
  fillGrid('adminFruitsGrid',  data.fruits,  'fruits');
  fillGrid('adminVeggiesGrid', data.veggies, 'veggies');
  updateStats(data);
}

function fillGrid(gridId, items, category) {
  const grid = document.getElementById(gridId);
  grid.innerHTML = '';
  items.forEach(p => {
    const card = document.createElement('div');
    card.className = 'admin-product-card';
    const media = p.image
      ? `<img src="${p.image}" class="card-img" alt="${p.name}">`
      : `<div class="card-emoji">${p.emoji}</div>`;
    card.innerHTML = `
      <span class="edit-badge">✏️ تعديل</span>
      ${media}
      <div class="card-name">${p.name}</div>
      <div class="card-price">${p.price} دت/${p.unit}</div>
    `;
    card.addEventListener('click', () => openEditModal(p, category));
    grid.appendChild(card);
  });
}

// ===== ADD PRODUCT =====
document.getElementById('addProductBtn').addEventListener('click', () => {
  currentEditId    = null;
  currentImageData = '';
  document.getElementById('modalTitle').textContent = 'إضافة منتج جديد';
  document.getElementById('editCategory').value     = currentAdminTab;
  document.getElementById('editId').value           = '';
  document.getElementById('editEmoji').value           = '🍊';
  document.getElementById('editName').value            = '';
  document.getElementById('editDesc').value            = '';
  document.getElementById('editPrice').value           = '';
  document.getElementById('editUnit').value            = 'كغ';
  document.getElementById('editPriceWholesale').value  = '';
  document.getElementById('editMinWholesale').value    = '';
  document.getElementById('editFeatured').checked      = false;
  setPreview('', '🍊');
  document.getElementById('deleteProductBtn').classList.add('hidden');
  document.getElementById('editModal').classList.remove('hidden');
});

// ===== EDIT MODAL =====
let currentEditId    = null;
let currentImageData = '';

function openEditModal(product, category) {
  currentEditId    = product.id;
  currentImageData = product.image || '';
  document.getElementById('modalTitle').textContent = 'تعديل المنتج';
  document.getElementById('editCategory').value     = category;
  document.getElementById('editId').value           = product.id;
  document.getElementById('editEmoji').value        = product.emoji;
  document.getElementById('editName').value         = product.name;
  document.getElementById('editDesc').value             = product.desc;
  document.getElementById('editPrice').value            = product.price;
  document.getElementById('editUnit').value             = product.unit;
  document.getElementById('editPriceWholesale').value   = product.priceWholesale || '';
  document.getElementById('editMinWholesale').value     = product.minWholesale   || '';
  document.getElementById('editFeatured').checked       = product.featured       || false;
  setPreview(product.image, product.emoji);
  document.getElementById('deleteProductBtn').classList.remove('hidden');
  document.getElementById('editModal').classList.remove('hidden');
}

function setPreview(imageData, emoji) {
  const emojiEl = document.getElementById('previewEmoji');
  const imgEl   = document.getElementById('previewImg');
  if (imageData) {
    emojiEl.classList.add('hidden');
    imgEl.src = imageData;
    imgEl.classList.remove('hidden');
  } else {
    emojiEl.textContent = emoji || '🍊';
    emojiEl.classList.remove('hidden');
    imgEl.classList.add('hidden');
    imgEl.src = '';
  }
}

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('editModal').addEventListener('click', (e) => {
  if (e.target === document.getElementById('editModal')) closeModal();
});
function closeModal() {
  document.getElementById('editModal').classList.add('hidden');
  document.getElementById('imageUpload').value = '';
}

document.getElementById('editEmoji').addEventListener('input', (e) => {
  if (!currentImageData) setPreview('', e.target.value);
});

document.getElementById('imageUpload').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    currentImageData = ev.target.result;
    setPreview(currentImageData, '');
  };
  reader.readAsDataURL(file);
});

document.getElementById('removeImageBtn').addEventListener('click', () => {
  currentImageData = '';
  setPreview('', document.getElementById('editEmoji').value || '🍊');
});

// ===== SAVE PRODUCT =====
document.getElementById('saveProductBtn').addEventListener('click', async () => {
  const name           = document.getElementById('editName').value.trim();
  const emoji          = document.getElementById('editEmoji').value.trim() || '🛒';
  const desc           = document.getElementById('editDesc').value.trim();
  const price          = document.getElementById('editPrice').value.trim();
  const unit           = document.getElementById('editUnit').value.trim() || 'كغ';
  const cat            = document.getElementById('editCategory').value;
  const priceWholesale = document.getElementById('editPriceWholesale').value.trim();
  const minWholesale   = document.getElementById('editMinWholesale').value.trim();

  if (!name || !price) { showToast('يرجى ملء الاسم والسعر', true); return; }

  const btn = document.getElementById('saveProductBtn');
  btn.disabled = true;
  btn.textContent = '⏳ جاري الحفظ...';

  const featured = document.getElementById('editFeatured').checked;
  const ok = await JARREBNI.upsertProduct({
    id:       currentEditId || (cat[0] + Date.now()),
    category: cat,
    emoji, image: currentImageData, name, desc, price, unit,
    priceWholesale, minWholesale, featured
  });

  btn.disabled = false;
  btn.textContent = '💾 حفظ';

  if (ok) {
    await renderAdminProducts();
    closeModal();
    showToast('✓ تم الحفظ بنجاح');
  } else {
    showToast('❌ خطأ في الحفظ', true);
  }
});

// ===== DELETE PRODUCT =====
document.getElementById('deleteProductBtn').addEventListener('click', async () => {
  const name = document.getElementById('editName').value;
  if (!confirm(`هل تريد حذف "${name}"؟`)) return;
  const ok = await JARREBNI.deleteProduct(currentEditId);
  if (ok) {
    await renderAdminProducts();
    closeModal();
    showToast('✓ تم الحذف');
  } else {
    showToast('❌ خطأ في الحذف', true);
  }
});

// ===== SETTINGS =====
async function loadSettingsForm() {
  const s = await JARREBNI.getSettings();
  document.getElementById('settingPhone').value    = s.phone     || '';
  document.getElementById('settingWhatsapp').value = s.whatsapp  || '';
  document.getElementById('settingPromo').value    = s.promoText || '';
  document.getElementById('settingHours').value    = s.hours     || '';
  document.getElementById('settingMinOrder').value = s.minOrder  || '0';
  const email = await JARREBNI.getAdminEmail();
  const emailEl = document.getElementById('adminEmailDisplay');
  if (emailEl) emailEl.value = email;
}

document.getElementById('saveSettingsBtn').addEventListener('click', async () => {
  const phone    = document.getElementById('settingPhone').value.trim();
  const whatsapp = document.getElementById('settingWhatsapp').value.trim();
  const promo    = document.getElementById('settingPromo').value.trim();
  const hours    = document.getElementById('settingHours').value.trim();
  const newPwd   = document.getElementById('newPassword').value;
  const confPwd  = document.getElementById('confirmPassword').value;

  const btn = document.getElementById('saveSettingsBtn');
  btn.disabled = true;

  if (newPwd) {
    if (newPwd !== confPwd) { showToast('كلمتا المرور غير متطابقتين', true); btn.disabled = false; return; }
    if (newPwd.length < 6)  { showToast('كلمة المرور يجب أن تكون 6 أحرف على الأقل', true); btn.disabled = false; return; }
    const pwdOk = await JARREBNI.changePassword(newPwd);
    if (!pwdOk) { showToast('❌ خطأ في تغيير كلمة المرور', true); btn.disabled = false; return; }
  }

  const minOrder = document.getElementById('settingMinOrder').value || '0';
  const updates  = {};
  if (phone)    updates.phone     = phone;
  if (whatsapp) updates.whatsapp  = whatsapp;
  updates.promoText = promo;
  updates.minOrder  = minOrder;
  if (hours)    updates.hours     = hours;

  const ok = await JARREBNI.saveSettings(updates);
  btn.disabled = false;
  document.getElementById('newPassword').value     = '';
  document.getElementById('confirmPassword').value = '';
  showToast(ok ? '✓ تم حفظ الإعدادات' : '❌ خطأ في الحفظ', !ok);
});

document.getElementById('resetProductsBtn').addEventListener('click', async () => {
  if (!confirm('هل تريد إعادة تعيين جميع المنتجات إلى الإعدادات الافتراضية؟\nسيتم حذف جميع التعديلات!')) return;
  const btn = document.getElementById('resetProductsBtn');
  btn.disabled = true;
  const ok = await JARREBNI.resetProducts();
  btn.disabled = false;
  if (ok) {
    await renderAdminProducts();
    showToast('✓ تم إعادة تعيين المنتجات');
  } else {
    showToast('❌ خطأ', true);
  }
});

// ===== STATS =====
function updateStats(data) {
  if (!data) return;
  document.getElementById('statFruits').textContent  = data.fruits.length;
  document.getElementById('statVeggies').textContent = data.veggies.length;
  document.getElementById('statTotal').textContent   = data.fruits.length + data.veggies.length;
}

// ===== ORDERS =====
const STATUS_LABELS = {
  new:        '🆕 جديد',
  confirmed:  '✅ مؤكد',
  preparing:  '🍳 قيد التحضير',
  delivering: '🚚 في الطريق',
  delivered:  '📦 تم التوصيل',
  cancelled:  '❌ ملغى'
};
const STATUS_COLORS = {
  new:        '#E8820C',
  confirmed:  '#2196F3',
  preparing:  '#9C27B0',
  delivering: '#00ACC1',
  delivered:  '#4CAF50',
  cancelled:  '#e53935'
};

let ordersFilterValue = 'all';

document.getElementById('ordersFilterStatus').addEventListener('change', async (e) => {
  ordersFilterValue = e.target.value;
  await renderOrders();
});

document.getElementById('clearAllOrdersBtn').addEventListener('click', async () => {
  if (!confirm('هل تريد حذف جميع الطلبات نهائياً؟')) return;
  const ok = await JARREBNI.deleteAllOrders();
  if (ok) {
    await renderOrders();
    showToast('✓ تم مسح جميع الطلبات');
  } else {
    showToast('❌ خطأ في المسح', true);
  }
});

async function renderOrders() {
  let orders = await JARREBNI.getOrders();
  updateOrdersStats(orders);

  if (ordersFilterValue !== 'all') {
    orders = orders.filter(o => o.status === ordersFilterValue);
  }

  const empty = document.getElementById('ordersEmpty');
  const list  = document.getElementById('ordersList');
  list.innerHTML = '';

  if (orders.length === 0) { empty.style.display = 'block'; return; }
  empty.style.display = 'none';

  orders.forEach(order => {
    const card  = document.createElement('div');
    card.className = 'order-card';
    const color = STATUS_COLORS[order.status] || '#999';
    card.style.borderRightColor = color;
    card.innerHTML = `
      <div class="order-card-header">
        <div class="order-id-date">
          <span class="order-id">${order.id}</span>
          <span class="order-date">🕐 ${order.date || ''}</span>
        </div>
        <span class="order-status-badge" style="background:${color}">${STATUS_LABELS[order.status] || order.status}</span>
      </div>
      <div class="order-client-info">
        <span>👤 ${order.name}</span>
        <span>📞 <a href="tel:${order.phone}">${order.phone}</a></span>
        <span>📍 ${order.address}</span>
      </div>
      ${order.products ? `<div class="order-products-text">🛒 ${order.products.replace(/\n/g, ' · ')}</div>` : ''}
      ${order.notes    ? `<div class="order-notes">📝 ${order.notes}</div>` : ''}
      ${order.total && order.total !== '0' ? `<div class="order-products-text" style="color:#4CAF50;font-weight:700">💰 المجموع: ${order.total} دت</div>` : ''}
      <div class="order-card-actions">
        <select class="order-status-select" data-id="${order.id}">
          <option value="new"        ${order.status==='new'        ?'selected':''}>🆕 جديد</option>
          <option value="confirmed"  ${order.status==='confirmed'  ?'selected':''}>✅ مؤكد</option>
          <option value="preparing"  ${order.status==='preparing'  ?'selected':''}>🍳 قيد التحضير</option>
          <option value="delivering" ${order.status==='delivering' ?'selected':''}>🚚 في الطريق</option>
          <option value="delivered"  ${order.status==='delivered'  ?'selected':''}>📦 تم التوصيل</option>
          <option value="cancelled"  ${order.status==='cancelled'  ?'selected':''}>❌ ملغى</option>
        </select>
        <a class="btn-call" href="tel:${order.phone}">📞 اتصل</a>
        <button class="btn-print-order" data-id="${order.id}">🖨️</button>
        <button class="btn-delete-order" data-id="${order.id}">🗑️</button>
      </div>
    `;
    list.appendChild(card);
  });

  list.querySelectorAll('.order-status-select').forEach(sel => {
    sel.addEventListener('change', async () => {
      await JARREBNI.updateOrderStatus(sel.dataset.id, sel.value);
      await renderOrders();
      showToast('✓ تم تحديث حالة الطلب');
    });
  });

  list.querySelectorAll('.btn-print-order').forEach(btn => {
    btn.addEventListener('click', () => {
      const order = orders.find(o => o.id === btn.dataset.id);
      if (order) printInvoice(order);
    });
  });

  list.querySelectorAll('.btn-delete-order').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (!confirm('هل تريد حذف هذا الطلب؟')) return;
      await JARREBNI.deleteOrder(btn.dataset.id);
      await renderOrders();
      showToast('✓ تم حذف الطلب');
    });
  });
}

function updateOrdersStats(orders) {
  const newC    = orders.filter(o => o.status === 'new').length;
  const conf    = orders.filter(o => o.status === 'confirmed').length;
  const deliv   = orders.filter(o => o.status === 'delivered').length;
  const revenue = orders
    .filter(o => o.status === 'delivered' && o.total)
    .reduce((s, o) => s + parseFloat(o.total || 0), 0)
    .toFixed(2);
  document.getElementById('statOrdersNew').textContent       = newC;
  document.getElementById('statOrdersConfirmed').textContent = conf;
  document.getElementById('statOrdersDelivered').textContent = deliv;
  document.getElementById('statOrdersTotal').textContent     = orders.length;
  document.getElementById('statOrdersRevenue').textContent   = revenue + ' دت';
}

// ===== CUSTOMERS =====
async function renderCustomers() {
  const orders = await JARREBNI.getOrders();
  const grid   = document.getElementById('customersGrid');
  const empty  = document.getElementById('customersEmpty');
  grid.innerHTML = '';

  if (orders.length === 0) {
    empty.classList.remove('hidden');
    document.getElementById('statCustomersTotal').textContent  = 0;
    document.getElementById('statCustomersOrders').textContent = 0;
    return;
  }
  empty.classList.add('hidden');

  const map = {};
  orders.forEach(o => {
    const key = o.phone || 'unknown';
    if (!map[key]) {
      map[key] = { name: o.name, phone: o.phone, address: o.address, orders: [], totalSpent: 0 };
    }
    map[key].orders.push(o);
    if (o.status === 'delivered' && o.total) {
      map[key].totalSpent += parseFloat(o.total);
    }
  });

  const customers = Object.values(map).sort((a, b) => b.orders.length - a.orders.length);
  document.getElementById('statCustomersTotal').textContent  = customers.length;
  document.getElementById('statCustomersOrders').textContent = orders.length;

  customers.forEach(c => {
    const lastOrder = c.orders[0];
    const delivered = c.orders.filter(o => o.status === 'delivered').length;
    const initials  = (c.name || '?').split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
    const card = document.createElement('div');
    card.className = 'customer-card';
    card.innerHTML = `
      <div class="customer-avatar">${initials}</div>
      <div class="customer-info">
        <div class="customer-name">${c.name || '—'}</div>
        <div class="customer-phone"><a href="tel:${c.phone}">📞 ${c.phone || '—'}</a></div>
        <div class="customer-address">📍 ${c.address || '—'}</div>
      </div>
      <div class="customer-stats">
        <div class="customer-stat"><span>${c.orders.length}</span><label>طلب</label></div>
        <div class="customer-stat"><span>${delivered}</span><label>✅ موصّل</label></div>
        <div class="customer-stat"><span>${c.totalSpent.toFixed(2)}</span><label>💰 دت</label></div>
      </div>
      <div class="customer-last-order">آخر طلب: ${lastOrder.date || '—'}</div>
    `;
    grid.appendChild(card);
  });
}

// ===== SOUND NOTIFICATION =====
let lastOrderCount = 0;
function startOrderNotificationPolling() {
  setInterval(async () => {
    try {
      const orders  = await JARREBNI.getOrders();
      const current = orders.filter(o => o.status === 'new').length;
      if (current > lastOrderCount) {
        playNotifSound();
        showToast('🔔 طلب جديد وصل!');
      }
      lastOrderCount = current;
    } catch(e) {}
  }, 15000);
}

function playNotifSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [0, 0.15, 0.30].forEach((delay, i) => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = i === 0 ? 660 : i === 1 ? 880 : 1100;
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.3, ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.25);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 0.25);
    });
  } catch(e) {}
}

// ===== REVIEWS =====
async function renderAdminReviews() {
  const reviews = await JARREBNI.getReviews();
  const empty   = document.getElementById('reviewsEmpty');
  const list    = document.getElementById('adminReviewsList');
  list.innerHTML = '';

  const total = reviews.length;
  const avg   = total > 0
    ? (reviews.reduce((s, r) => s + r.rating, 0) / total).toFixed(1)
    : '—';
  document.getElementById('statReviewsTotal').textContent = total;
  document.getElementById('statReviewsAvg').textContent   = avg !== '—' ? avg + ' ★' : '—';

  if (total === 0) { empty.style.display = 'block'; return; }
  empty.style.display = 'none';

  reviews.forEach(r => {
    const stars = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
    const card  = document.createElement('div');
    card.className = 'order-card';
    card.innerHTML = `
      <div class="order-card-header">
        <div class="order-id-date">
          <span class="order-id">${r.id}</span>
          <span class="order-date">🕐 ${r.date || ''}</span>
        </div>
        <span class="order-status-badge" style="background:#F5A034;font-size:1rem;letter-spacing:2px">${stars}</span>
      </div>
      <div class="order-client-info"><span>👤 ${r.name}</span></div>
      <div class="order-products-text">💬 "${r.text}"</div>
      <div class="order-card-actions">
        <button class="btn-delete-order btn-delete-review" data-id="${r.id}">🗑️ حذف</button>
      </div>
    `;
    list.appendChild(card);
  });

  list.querySelectorAll('.btn-delete-review').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (!confirm('هل تريد حذف هذا التقييم؟')) return;
      await JARREBNI.deleteReview(btn.dataset.id);
      await renderAdminReviews();
      showToast('✓ تم حذف التقييم');
    });
  });
}

document.getElementById('clearAllReviewsBtn').addEventListener('click', async () => {
  if (!confirm('هل تريد حذف جميع التقييمات نهائياً؟')) return;
  const ok = await JARREBNI.deleteAllReviews();
  if (ok) {
    await renderAdminReviews();
    showToast('✓ تم مسح جميع التقييمات');
  } else {
    showToast('❌ خطأ', true);
  }
});

// ===== PRINT INVOICE =====
function printInvoice(order) {
  const win = window.open('', '_blank', 'width=700,height=900');
  win.document.write(`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8"/>
<title>فاتورة ${order.id}</title>
<style>
  body{font-family:Arial,sans-serif;padding:40px;color:#222;max-width:600px;margin:auto}
  h1{color:#2E7D32;font-size:1.6rem;margin-bottom:4px}
  .sub{color:#888;margin-bottom:24px}
  table{width:100%;border-collapse:collapse;margin:20px 0}
  th{background:#2E7D32;color:#fff;padding:10px;text-align:right}
  td{padding:10px;border-bottom:1px solid #eee;text-align:right}
  .total{font-size:1.2rem;font-weight:bold;color:#E8820C;text-align:left;margin-top:12px}
  .footer{margin-top:32px;color:#aaa;font-size:.85rem;text-align:center}
  @media print{button{display:none}}
</style>
</head>
<body>
<h1>🍊 جربني — فاتورة طلب</h1>
<p class="sub">بنزرت الشمالية، تونس</p>
<table>
  <tr><th>البيان</th><th>التفاصيل</th></tr>
  <tr><td>رقم الطلب</td><td>${order.id}</td></tr>
  <tr><td>التاريخ</td><td>${order.date || ''}</td></tr>
  <tr><td>الاسم</td><td>${order.name}</td></tr>
  <tr><td>الهاتف</td><td>${order.phone}</td></tr>
  <tr><td>العنوان</td><td>${order.address}</td></tr>
  <tr><td>المنتجات</td><td>${(order.products || '').replace(/\n/g,'<br>')}</td></tr>
  ${order.notes ? `<tr><td>ملاحظات</td><td>${order.notes}</td></tr>` : ''}
  <tr><td>الحالة</td><td>${order.status || ''}</td></tr>
</table>
<div class="total">المجموع: ${order.total || '0'} دت</div>
<div class="footer">شكراً لتعاملكم مع جربني 🍊 — jarrebni-site.pages.dev</div>
<br/><button onclick="window.print()" style="padding:10px 24px;background:#2E7D32;color:#fff;border:none;border-radius:8px;font-size:1rem;cursor:pointer">🖨️ طباعة</button>
</body></html>`);
  win.document.close();
}

// ===== TOAST =====
let toastTimer;
function showToast(msg, isError = false) {
  const toast = document.getElementById('adminToast');
  toast.textContent = msg;
  toast.classList.toggle('error', isError);
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}
