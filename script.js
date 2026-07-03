// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  loadSettings();
  renderProducts();
  initReveal();
  initPromoBar();
});

// ===== SETTINGS (phone / whatsapp from localStorage) =====
function loadSettings() {
  const s = JARREBNI.getSettings();
  document.querySelectorAll('.wa-link').forEach(el => {
    el.href = `https://wa.me/${s.whatsapp}`;
  });
  document.querySelectorAll('.phone-display').forEach(el => {
    el.textContent = s.phone;
  });
  if (s.promoText) {
    const el = document.getElementById('promoText');
    if (el) el.textContent = s.promoText;
  }
}

// ===== PROMO BAR =====
function initPromoBar() {
  const bar = document.getElementById('promoBar');
  if (!bar) return;
  if (sessionStorage.getItem('promoClosed')) bar.classList.add('hidden');
  document.getElementById('promoClose').addEventListener('click', () => {
    bar.classList.add('hidden');
    sessionStorage.setItem('promoClosed', '1');
  });
}

// ===== HEADER SCROLL =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

// ===== MOBILE NAV =====
const navToggle = document.getElementById('navToggle');
const nav = document.querySelector('.nav');
navToggle.addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

// ===== PRODUCT TABS =====
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const target = tab.dataset.tab;
    document.getElementById('fruitsGrid').classList.toggle('hidden', target !== 'fruits');
    document.getElementById('veggiesGrid').classList.toggle('hidden', target !== 'veggies');
  });
});

// ===== RENDER PRODUCTS =====
function renderProducts() {
  const data = JARREBNI.getProducts();
  renderGrid('fruitsGrid', data.fruits);
  renderGrid('veggiesGrid', data.veggies);
}

function renderGrid(gridId, items) {
  const grid = document.getElementById(gridId);
  grid.innerHTML = '';
  items.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    const thumb = p.image
      ? `<img src="${p.image}" class="product-img" alt="${p.name}">`
      : `<div class="product-emoji">${p.emoji}</div>`;
    card.innerHTML = `
      ${thumb}
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <div class="product-footer">
        <span class="price">${p.price} دت/${p.unit}</span>
        <button class="btn-add">+ أضف</button>
      </div>
    `;
    card.querySelector('.btn-add').addEventListener('click', (e) => {
      addToCart(p);
      const btn = e.currentTarget;
      btn.classList.add('added');
      btn.textContent = '✓ تمت';
      setTimeout(() => { btn.classList.remove('added'); btn.textContent = '+ أضف'; }, 1800);
    });
    grid.appendChild(card);
  });
  initReveal();
}

// ===== CART STATE =====
// { [id]: { product, qty } }
let cart = {};

function addToCart(product) {
  if (cart[product.id]) {
    cart[product.id].qty++;
  } else {
    cart[product.id] = { product, qty: 1 };
  }
  syncCart();
  showToast(`✓ تمت إضافة ${product.name}`);
}

function updateQty(id, delta) {
  if (!cart[id]) return;
  cart[id].qty += delta;
  if (cart[id].qty <= 0) delete cart[id];
  syncCart();
}

function clearCart() {
  cart = {};
  syncCart();
}

function syncCart() {
  const ids = Object.keys(cart);
  const total = ids.reduce((sum, id) => sum + parseFloat(cart[id].product.price) * cart[id].qty, 0);
  const count = ids.reduce((sum, id) => sum + cart[id].qty, 0);

  // Float button
  const floatBtn = document.getElementById('cartFloatBtn');
  floatBtn.style.display = count > 0 ? 'flex' : 'none';
  document.getElementById('cartCount').textContent = count;

  // Empty / list
  document.getElementById('cartEmpty').style.display = ids.length === 0 ? 'flex' : 'none';
  document.getElementById('cartItemsList').style.display = ids.length > 0 ? 'flex' : 'none';
  document.getElementById('cartFooter').style.display = ids.length > 0 ? 'flex' : 'none';

  // Render items
  const list = document.getElementById('cartItemsList');
  list.innerHTML = '';
  ids.forEach(id => {
    const { product: p, qty } = cart[id];
    const thumb = p.image
      ? `<img src="${p.image}" class="cart-item-thumb-img" alt="${p.name}">`
      : `<span class="cart-item-thumb">${p.emoji}</span>`;
    const item = document.createElement('div');
    item.className = 'cart-item';
    item.innerHTML = `
      ${thumb}
      <div class="cart-item-info">
        <div class="cart-item-name">${p.name}</div>
        <div class="cart-item-price">${p.price} دت/${p.unit}</div>
      </div>
      <div class="cart-item-qty">
        <button class="qty-btn" data-id="${id}" data-delta="-1">−</button>
        <span class="qty-value">${qty}</span>
        <button class="qty-btn" data-id="${id}" data-delta="1">+</button>
      </div>
    `;
    list.appendChild(item);
  });
  list.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => updateQty(btn.dataset.id, parseInt(btn.dataset.delta)));
  });

  // Total
  document.getElementById('cartTotalDisplay').textContent = `${total} دت`;
}

// ===== CART PANEL =====
const cartPanel   = document.getElementById('cartPanel');
const cartOverlay = document.getElementById('cartOverlay');

function openCart() {
  cartPanel.classList.add('open');
  cartOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  cartPanel.classList.remove('open');
  cartOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('cartFloatBtn').addEventListener('click', openCart);
document.getElementById('cartClose').addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);
document.getElementById('clearCartBtn').addEventListener('click', clearCart);

document.getElementById('cartOrderBtn').addEventListener('click', () => {
  // Pre-fill order form
  const lines = Object.values(cart).map(({ product: p, qty }) =>
    `${qty} ${p.unit} ${p.name} (${p.price} دت/${p.unit})`
  );
  document.getElementById('orderProducts').value = lines.join('\n');
  closeCart();
  document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
});

// ===== ORDER FORM =====
document.getElementById('orderForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name     = document.getElementById('clientName').value.trim();
  const phone    = document.getElementById('clientPhone').value.trim();
  const address  = document.getElementById('clientAddress').value.trim();
  const products = document.getElementById('orderProducts').value.trim();
  const notes    = document.getElementById('orderNotes').value.trim();

  const order = {
    id:       'ORD-' + Date.now(),
    date:     new Date().toLocaleString('ar-TN'),
    name,
    phone,
    address,
    products,
    notes,
    status:   'new'
  };
  JARREBNI.saveOrder(order);

  const form = e.target;
  const btn  = form.querySelector('button[type="submit"]');
  btn.textContent = '✓ تم إرسال طلبك!';
  btn.style.background = 'var(--green)';
  btn.disabled = true;
  showToast('✓ تم استلام طلبك! سنتواصل معك قريباً');
  setTimeout(() => {
    btn.textContent = '🚛 أرسل طلبي';
    btn.style.background = '';
    btn.disabled = false;
    form.reset();
    clearCart();
  }, 3500);
});

// ===== TOAST =====
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('cartToast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2500);
}

// ===== SCROLL REVEAL =====
function initReveal() {
  document.querySelectorAll(
    '.product-card:not(.revealed), .feature-card:not(.revealed), .testimonial-card:not(.revealed), .contact-card:not(.revealed)'
  ).forEach(el => {
    el.classList.add('revealed');
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    revealObserver.observe(el);
  });
}
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// ===== ACTIVE NAV HIGHLIGHT =====
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav a[href^="#"]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) current = s.id; });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--orange)' : '';
  });
}, { passive: true });
