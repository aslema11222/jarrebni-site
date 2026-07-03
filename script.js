// ===== INIT =====
document.addEventListener('DOMContentLoaded', async () => {
  showProductsLoading(true);
  await loadSettings();
  await renderProducts();
  showProductsLoading(false);
  initReveal();
  initPromoBar();
  await initReviews();
});

function showProductsLoading(on) {
  ['fruitsGrid', 'veggiesGrid'].forEach(id => {
    const g = document.getElementById(id);
    if (!g) return;
    if (on) g.innerHTML = '<div class="products-loading">⏳ جاري التحميل...</div>';
  });
}

// ===== SETTINGS =====
async function loadSettings() {
  const s = await JARREBNI.getSettings();
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
  if (s.hours) {
    const el = document.getElementById('hoursDisplay');
    if (el) el.innerHTML = s.hours.replace(/\n/g, '<br>');
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
async function renderProducts() {
  const data = await JARREBNI.getProducts();
  renderGrid('fruitsGrid', data.fruits);
  renderGrid('veggiesGrid', data.veggies);
}

function renderGrid(gridId, items) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  grid.innerHTML = '';
  const s = { whatsapp: '' }; // settings loaded separately
  items.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    const thumb = p.image
      ? `<img src="${p.image}" class="product-img" alt="${p.name}">`
      : `<div class="product-emoji">${p.emoji}</div>`;
    const addLabel  = (typeof t === 'function') ? t('btn.add')   : '+ أضف';
    const doneLabel = (typeof t === 'function') ? t('btn.added') : '✓ تمت';
    const waLabel   = (typeof t === 'function') ? t('btn.wa')    : '💬 واتساب';
    const pName = (typeof t === 'function') ? (t(`product.${p.id}.name`) !== `product.${p.id}.name` ? t(`product.${p.id}.name`) : p.name) : p.name;
    const pDesc = (typeof t === 'function') ? (t(`product.${p.id}.desc`) !== `product.${p.id}.desc` ? t(`product.${p.id}.desc`) : p.desc) : p.desc;
    const pUnit = (typeof translateUnit === 'function') ? translateUnit(p.unit) : p.unit;
    const waNum = document.querySelector('.wa-link')?.href?.split('wa.me/')?.[1]?.split('?')?.[0] || '';
    const waMsg = encodeURIComponent(`مرحباً جربني! أريد طلب: ${p.name} (${p.price} دت/${p.unit})`);
    const waHref = waNum && waNum !== '216XXXXXXXX' ? `https://wa.me/${waNum}?text=${waMsg}` : '#';
    card.innerHTML = `
      ${thumb}
      <h3>${pName}</h3>
      <p>${pDesc}</p>
      <div class="product-footer">
        <span class="price">${p.price} دت/${pUnit}</span>
        <button class="btn-add">${addLabel}</button>
      </div>
      <a class="btn-wa-product" href="${waHref}" target="_blank">${waLabel}</a>
    `;
    card.querySelector('.btn-add').addEventListener('click', (e) => {
      addToCart(p);
      const btn = e.currentTarget;
      btn.classList.add('added');
      btn.textContent = doneLabel;
      setTimeout(() => { btn.classList.remove('added'); btn.textContent = addLabel; }, 1800);
    });
    grid.appendChild(card);
  });
  initReveal();
}

// ===== CART STATE =====
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
  const ids    = Object.keys(cart);
  const total  = ids.reduce((sum, id) => sum + parseFloat(cart[id].product.price) * cart[id].qty, 0);
  const count  = ids.reduce((sum, id) => sum + cart[id].qty, 0);

  const floatBtn = document.getElementById('cartFloatBtn');
  floatBtn.style.display = count > 0 ? 'flex' : 'none';
  document.getElementById('cartCount').textContent = count;

  document.getElementById('cartEmpty').style.display      = ids.length === 0 ? 'flex' : 'none';
  document.getElementById('cartItemsList').style.display  = ids.length > 0  ? 'flex' : 'none';
  document.getElementById('cartFooter').style.display     = ids.length > 0  ? 'flex' : 'none';

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

  document.getElementById('cartTotalDisplay').textContent = `${total.toFixed(2)} دت`;
}

// ===== CART PANEL =====
const cartPanel   = document.getElementById('cartPanel');
const cartOverlay = document.getElementById('cartOverlay');

function openCart()  { cartPanel.classList.add('open'); cartOverlay.classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeCart() { cartPanel.classList.remove('open'); cartOverlay.classList.remove('open'); document.body.style.overflow = ''; }

document.getElementById('cartFloatBtn').addEventListener('click', openCart);
document.getElementById('cartClose').addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);
document.getElementById('clearCartBtn').addEventListener('click', clearCart);

document.getElementById('cartOrderBtn').addEventListener('click', () => {
  const lines = Object.values(cart).map(({ product: p, qty }) =>
    `${qty} ${p.unit} ${p.name} (${p.price} دت/${p.unit})`
  );
  document.getElementById('orderProducts').value = lines.join('\n');
  closeCart();
  document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
});

// ===== ORDER FORM =====
document.getElementById('orderForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = '⏳ جاري الإرسال...';

  const name     = document.getElementById('clientName').value.trim();
  const phone    = document.getElementById('clientPhone').value.trim();
  const address  = document.getElementById('clientAddress').value.trim();
  const products = document.getElementById('orderProducts').value.trim();
  const notes    = document.getElementById('orderNotes').value.trim();

  const orderTotal = Object.values(cart)
    .reduce((sum, { product: p, qty }) => sum + parseFloat(p.price) * qty, 0)
    .toFixed(2);

  const ok = await JARREBNI.saveOrder({
    id:       'ORD-' + Date.now(),
    date:     new Date().toLocaleString('ar-TN'),
    name, phone, address, products, notes,
    total:    orderTotal,
    status:   'new'
  });

  if (ok) {
    btn.textContent = '✓ تم إرسال طلبك!';
    btn.style.background = 'var(--green)';
    showToast('✓ تم استلام طلبك! سنتواصل معك قريباً');
    setTimeout(() => {
      btn.textContent = '🚛 أرسل طلبي';
      btn.style.background = '';
      btn.disabled = false;
      e.target.reset();
      clearCart();
    }, 3500);
  } else {
    btn.textContent = '❌ خطأ - حاول مجدداً';
    btn.style.background = '#e53935';
    setTimeout(() => {
      btn.textContent = '🚛 أرسل طلبي';
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  }
});

// ===== TOAST =====
let toastTimer;
function showToast(msg) {
  const el = document.getElementById('cartToast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2500);
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

// ===== REVIEWS =====
let selectedRating = 0;

async function initReviews() {
  const starsInput = document.getElementById('starsInput');
  if (!starsInput) return;

  starsInput.querySelectorAll('span').forEach(star => {
    star.addEventListener('mouseover', () => highlightStars(parseInt(star.dataset.val)));
    star.addEventListener('mouseout',  () => highlightStars(selectedRating));
    star.addEventListener('click',     () => {
      selectedRating = parseInt(star.dataset.val);
      highlightStars(selectedRating);
      const hint = document.getElementById('ratingHint');
      if (hint) hint.textContent = '★'.repeat(selectedRating) + ' ' + getRatingLabel(selectedRating);
    });
  });

  document.getElementById('reviewForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    if (selectedRating === 0) {
      showToast(typeof t === 'function' ? t('review.error.rating') : 'اختر عدد النجوم');
      return;
    }
    const btn = e.target.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = '⏳ جاري الإرسال...';

    const name = document.getElementById('reviewName').value.trim();
    const text = document.getElementById('reviewText').value.trim();
    const ok = await JARREBNI.saveReview({
      id:     'REV-' + Date.now(),
      date:   new Date().toLocaleString('ar-TN'),
      name, text, rating: selectedRating
    });

    if (ok) {
      await renderReviews();
      btn.textContent = typeof t === 'function' ? t('review.sent') : '✓ شكراً!';
      btn.style.background = 'var(--green)';
      showToast(typeof t === 'function' ? t('review.toast') : '✓ تم إرسال تقييمك!');
    } else {
      btn.textContent = '❌ خطأ - حاول مجدداً';
      btn.style.background = '#e53935';
    }
    setTimeout(() => {
      btn.textContent = typeof t === 'function' ? t('review.form.submit') : '⭐ أرسل تقييمي';
      btn.style.background = '';
      btn.disabled = false;
      e.target.reset();
      selectedRating = 0;
      highlightStars(0);
      const hint = document.getElementById('ratingHint');
      if (hint) hint.textContent = typeof t === 'function' ? t('review.form.rating.hint') : 'انقر على النجوم';
    }, 2500);
  });

  await renderReviews();
}

function highlightStars(count) {
  document.querySelectorAll('#starsInput span').forEach((s, i) => {
    s.classList.toggle('active', i < count);
  });
}

function getRatingLabel(n) {
  const labels = ['','ضعيف','مقبول','جيد','جيد جداً','ممتاز'];
  if (typeof t === 'function') {
    const key = 'review.label.' + n;
    const translated = t(key);
    return translated !== key ? translated : labels[n];
  }
  return labels[n];
}

async function renderReviews() {
  const list = document.getElementById('reviewsList');
  if (!list) return;
  const reviews = await JARREBNI.getReviews();
  if (reviews.length === 0) {
    const emptyMsg = typeof t === 'function' ? t('review.empty') : 'لا توجد تقييمات بعد. كن أول من يقيّم!';
    list.innerHTML = `<p class="reviews-empty">${emptyMsg}</p>`;
    return;
  }
  list.innerHTML = reviews.map(r => {
    const stars    = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
    const initials = r.name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
    return `
      <div class="review-card">
        <div class="review-header">
          <div class="review-avatar">${initials}</div>
          <div class="review-meta">
            <strong>${r.name}</strong>
            <span class="review-date">${r.date}</span>
          </div>
          <div class="review-stars">${stars}</div>
        </div>
        <p class="review-text">"${r.text}"</p>
      </div>`;
  }).join('');
  initReveal();
}

// ===== ACTIVE NAV HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a[href^="#"]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) current = s.id; });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--orange)' : '';
  });
}, { passive: true });
