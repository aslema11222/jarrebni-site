// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  if (JARREBNI.isLoggedIn()) showDashboard();
  else showLogin();
});

// ===== AUTH =====
function showLogin() {
  // Always redirect to the central login page
  window.location.href = 'login.html';
}

function showDashboard() {
  document.getElementById('loginScreen').classList.add('hidden');
  document.getElementById('dashboard').classList.remove('hidden');
  renderAdminProducts();
  loadSettingsForm();
  updateStats();
  updateOrdersBadge();
}

document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const pwd = document.getElementById('passwordInput').value;
  if (JARREBNI.login(pwd)) {
    showDashboard();
  } else {
    document.getElementById('loginError').classList.remove('hidden');
    document.getElementById('passwordInput').value = '';
    document.getElementById('passwordInput').focus();
  }
});

document.getElementById('logoutBtn').addEventListener('click', () => {
  if (confirm('هل تريد تسجيل الخروج؟')) {
    JARREBNI.logout();
    closeSidebar();
    showLogin();
  }
});

// ===== MOBILE SIDEBAR =====
const sidebar        = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function openSidebar()  { sidebar.classList.add('open'); sidebarOverlay.classList.add('open'); }
function closeSidebar() { sidebar.classList.remove('open'); sidebarOverlay.classList.remove('open'); }

document.getElementById('sidebarToggle').addEventListener('click', openSidebar);
sidebarOverlay.addEventListener('click', closeSidebar);

// ===== SIDEBAR NAV =====
document.querySelectorAll('.nav-item[data-section]').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.nav-item[data-section]').forEach(n => n.classList.remove('active'));
    item.classList.add('active');
    const sec = item.dataset.section;
    document.getElementById('productsSection').classList.toggle('hidden', sec !== 'products');
    document.getElementById('ordersSection').classList.toggle('hidden', sec !== 'orders');
    document.getElementById('settingsSection').classList.toggle('hidden', sec !== 'settings');
    if (sec === 'orders') renderOrders();
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
function renderAdminProducts() {
  const data = JARREBNI.getProducts();
  fillGrid('adminFruitsGrid', data.fruits, 'fruits');
  fillGrid('adminVeggiesGrid', data.veggies, 'veggies');
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
  currentEditId = null;
  currentImageData = '';
  document.getElementById('modalTitle').textContent = 'إضافة منتج جديد';
  document.getElementById('editCategory').value = currentAdminTab;
  document.getElementById('editId').value = '';
  document.getElementById('editEmoji').value = '🍊';
  document.getElementById('editName').value = '';
  document.getElementById('editDesc').value = '';
  document.getElementById('editPrice').value = '';
  document.getElementById('editUnit').value = 'كغ';
  setPreview('', '🍊');
  document.getElementById('deleteProductBtn').classList.add('hidden');
  document.getElementById('editModal').classList.remove('hidden');
});

// ===== EDIT MODAL =====
let currentEditId   = null;
let currentImageData = '';

function openEditModal(product, category) {
  currentEditId    = product.id;
  currentImageData = product.image || '';

  document.getElementById('modalTitle').textContent    = 'تعديل المنتج';
  document.getElementById('editCategory').value        = category;
  document.getElementById('editId').value              = product.id;
  document.getElementById('editEmoji').value           = product.emoji;
  document.getElementById('editName').value            = product.name;
  document.getElementById('editDesc').value            = product.desc;
  document.getElementById('editPrice').value           = product.price;
  document.getElementById('editUnit').value            = product.unit;

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

// Close modal
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('editModal').addEventListener('click', (e) => {
  if (e.target === document.getElementById('editModal')) closeModal();
});
function closeModal() {
  document.getElementById('editModal').classList.add('hidden');
  document.getElementById('imageUpload').value = '';
}

// Emoji input updates preview
document.getElementById('editEmoji').addEventListener('input', (e) => {
  if (!currentImageData) setPreview('', e.target.value);
});

// Image upload
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

// Remove image → use emoji
document.getElementById('removeImageBtn').addEventListener('click', () => {
  currentImageData = '';
  setPreview('', document.getElementById('editEmoji').value || '🍊');
});

// ===== SAVE PRODUCT =====
document.getElementById('saveProductBtn').addEventListener('click', () => {
  const name  = document.getElementById('editName').value.trim();
  const emoji = document.getElementById('editEmoji').value.trim() || '🛒';
  const desc  = document.getElementById('editDesc').value.trim();
  const price = document.getElementById('editPrice').value.trim();
  const unit  = document.getElementById('editUnit').value.trim() || 'كغ';
  const cat   = document.getElementById('editCategory').value;

  if (!name || !price) { showToast('يرجى ملء الاسم والسعر', true); return; }

  const data = JARREBNI.getProducts();
  const list = data[cat];

  if (currentEditId) {
    const idx = list.findIndex(p => p.id === currentEditId);
    if (idx !== -1) list[idx] = { ...list[idx], emoji, image: currentImageData, name, desc, price, unit };
  } else {
    list.push({ id: cat[0] + Date.now(), emoji, image: currentImageData, name, desc, price, unit });
  }

  JARREBNI.saveProducts(data);
  renderAdminProducts();
  updateStats();
  closeModal();
  showToast('✓ تم الحفظ بنجاح');
});

// ===== DELETE PRODUCT =====
document.getElementById('deleteProductBtn').addEventListener('click', () => {
  const name = document.getElementById('editName').value;
  if (!confirm(`هل تريد حذف "${name}"؟`)) return;

  const cat  = document.getElementById('editCategory').value;
  const data = JARREBNI.getProducts();
  const list = data[cat];
  const idx  = list.findIndex(p => p.id === currentEditId);
  if (idx !== -1) list.splice(idx, 1);

  JARREBNI.saveProducts(data);
  renderAdminProducts();
  updateStats();
  closeModal();
  showToast('✓ تم الحذف');
});

// ===== SETTINGS =====
function loadSettingsForm() {
  const s = JARREBNI.getSettings();
  document.getElementById('settingPhone').value    = s.phone;
  document.getElementById('settingWhatsapp').value = s.whatsapp;
  document.getElementById('settingPromo').value    = s.promoText || '';
}

document.getElementById('saveSettingsBtn').addEventListener('click', () => {
  const phone    = document.getElementById('settingPhone').value.trim();
  const whatsapp = document.getElementById('settingWhatsapp').value.trim();
  const promo    = document.getElementById('settingPromo').value.trim();
  const newPwd   = document.getElementById('newPassword').value;
  const confPwd  = document.getElementById('confirmPassword').value;

  const settings = JARREBNI.getSettings();
  if (phone)    settings.phone    = phone;
  if (whatsapp) settings.whatsapp = whatsapp;
  settings.promoText = promo;

  if (newPwd) {
    if (newPwd !== confPwd) { showToast('كلمتا المرور غير متطابقتين', true); return; }
    if (newPwd.length < 6)  { showToast('كلمة المرور يجب أن تكون 6 أحرف على الأقل', true); return; }
    settings.password = newPwd;
  }

  JARREBNI.saveSettings(settings);
  document.getElementById('newPassword').value     = '';
  document.getElementById('confirmPassword').value = '';
  showToast('✓ تم حفظ الإعدادات');
});

document.getElementById('resetProductsBtn').addEventListener('click', () => {
  if (!confirm('هل تريد إعادة تعيين جميع المنتجات إلى الإعدادات الافتراضية؟\nسيتم حذف جميع التعديلات والصور!')) return;
  localStorage.removeItem('jarrebni_products');
  renderAdminProducts();
  updateStats();
  showToast('✓ تم إعادة تعيين المنتجات');
});

// ===== STATS =====
function updateStats() {
  const data = JARREBNI.getProducts();
  const f = data.fruits.length;
  const v = data.veggies.length;
  document.getElementById('statFruits').textContent  = f;
  document.getElementById('statVeggies').textContent = v;
  document.getElementById('statTotal').textContent   = f + v;
}

// ===== ORDERS =====
const STATUS_LABELS = {
  new:       '🆕 جديد',
  confirmed: '✅ مؤكد',
  delivered: '📦 تم التوصيل',
  cancelled: '❌ ملغى'
};
const STATUS_COLORS = {
  new:       '#E8820C',
  confirmed: '#2196F3',
  delivered: '#4CAF50',
  cancelled: '#e53935'
};

let ordersFilterValue = 'all';

document.getElementById('ordersFilterStatus').addEventListener('change', (e) => {
  ordersFilterValue = e.target.value;
  renderOrders();
});

document.getElementById('clearAllOrdersBtn').addEventListener('click', () => {
  if (!confirm('هل تريد حذف جميع الطلبات نهائياً؟')) return;
  localStorage.removeItem('jarrebni_orders');
  renderOrders();
  updateOrdersBadge();
  showToast('✓ تم مسح جميع الطلبات');
});

function renderOrders() {
  let orders = JARREBNI.getOrders();
  updateOrdersStats(orders);

  if (ordersFilterValue !== 'all') {
    orders = orders.filter(o => o.status === ordersFilterValue);
  }

  const empty = document.getElementById('ordersEmpty');
  const list  = document.getElementById('ordersList');
  list.innerHTML = '';

  if (orders.length === 0) {
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';

  orders.forEach(order => {
    const card = document.createElement('div');
    card.className = 'order-card';
    const color = STATUS_COLORS[order.status] || '#999';
    card.style.borderRightColor = color;
    card.innerHTML = `
      <div class="order-card-header">
        <div class="order-id-date">
          <span class="order-id">${order.id}</span>
          <span class="order-date">🕐 ${order.date}</span>
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
      <div class="order-card-actions">
        <select class="order-status-select" data-id="${order.id}">
          <option value="new"       ${order.status==='new'       ? 'selected':''}>🆕 جديد</option>
          <option value="confirmed" ${order.status==='confirmed' ? 'selected':''}>✅ مؤكد</option>
          <option value="delivered" ${order.status==='delivered' ? 'selected':''}>📦 تم التوصيل</option>
          <option value="cancelled" ${order.status==='cancelled' ? 'selected':''}>❌ ملغى</option>
        </select>
        <a class="btn-call" href="tel:${order.phone}">📞 اتصل</a>
        <button class="btn-delete-order" data-id="${order.id}">🗑️</button>
      </div>
    `;
    list.appendChild(card);
  });

  list.querySelectorAll('.order-status-select').forEach(sel => {
    sel.addEventListener('change', () => {
      JARREBNI.updateOrderStatus(sel.dataset.id, sel.value);
      renderOrders();
      updateOrdersBadge();
      showToast('✓ تم تحديث حالة الطلب');
    });
  });

  list.querySelectorAll('.btn-delete-order').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!confirm('هل تريد حذف هذا الطلب؟')) return;
      JARREBNI.deleteOrder(btn.dataset.id);
      renderOrders();
      updateOrdersBadge();
      showToast('✓ تم حذف الطلب');
    });
  });
}

function updateOrdersStats(orders) {
  const all    = orders || JARREBNI.getOrders();
  const newC   = all.filter(o => o.status === 'new').length;
  const conf   = all.filter(o => o.status === 'confirmed').length;
  const deliv  = all.filter(o => o.status === 'delivered').length;
  document.getElementById('statOrdersNew').textContent       = newC;
  document.getElementById('statOrdersConfirmed').textContent = conf;
  document.getElementById('statOrdersDelivered').textContent = deliv;
  document.getElementById('statOrdersTotal').textContent     = all.length;
}

function updateOrdersBadge() {
  const newCount = JARREBNI.getOrders().filter(o => o.status === 'new').length;
  const badge = document.getElementById('navOrdersBadge');
  badge.textContent = newCount;
  badge.classList.toggle('hidden', newCount === 0);
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
