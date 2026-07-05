function normalizePhone(raw) {
  let p = raw.replace(/[\s\-\.\(\)]/g, '');
  if (p.startsWith('+216')) p = p.slice(4);
  else if (p.startsWith('00216')) p = p.slice(5);
  else if (p.startsWith('216') && p.length === 11) p = p.slice(3);
  return p;
}

const STATUS_MAP = {
  new:        { label: '🆕 جديد',           color: '#E8820C', step: 0 },
  confirmed:  { label: '✅ مؤكد',           color: '#2196F3', step: 1 },
  preparing:  { label: '🍳 قيد التحضير',    color: '#9C27B0', step: 2 },
  delivering: { label: '🚚 في الطريق',      color: '#00ACC1', step: 3 },
  delivered:  { label: '📦 تم التوصيل',     color: '#4CAF50', step: 4 },
  cancelled:  { label: '❌ ملغى',           color: '#e53935', step: -1 }
};

const STEPS = [
  { icon: '✅', label: 'مؤكد' },
  { icon: '🍳', label: 'تحضير' },
  { icon: '🚚', label: 'في الطريق' },
  { icon: '📦', label: 'تم التوصيل' }
];

const _trackSb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.getElementById('searchBtn').addEventListener('click', search);
document.getElementById('phoneInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') search();
});

async function search() {
  const raw     = document.getElementById('phoneInput').value.trim();
  const phone   = normalizePhone(raw);
  const errorEl = document.getElementById('errorMsg');
  const results = document.getElementById('results');
  const btn     = document.getElementById('searchBtn');

  errorEl.textContent = '';
  errorEl.classList.add('hidden');

  if (!phone || !/^[2579]\d{7}$/.test(phone)) {
    errorEl.textContent = 'أدخل رقم هاتف تونسي صحيح (مثال: 21234567)';
    errorEl.classList.remove('hidden');
    return;
  }

  btn.disabled = true;
  btn.textContent = '⏳ جاري البحث...';
  results.innerHTML = '';

  const { data, error } = await _trackSb
    .from('orders')
    .select('*')
    .eq('phone', phone)
    .order('created_at', { ascending: false });

  btn.disabled = false;
  btn.textContent = '🔍 بحث';

  if (error) {
    const isNetwork = !navigator.onLine || error.message?.includes('fetch');
    errorEl.textContent = isNetwork
      ? '⚠️ لا يوجد اتصال بالإنترنت — تحقق من اتصالك وحاول مجدداً'
      : 'حدث خطأ — تأكد من رقم الهاتف وحاول مجدداً';
    errorEl.classList.remove('hidden');
    return;
  }

  if (!data || data.length === 0) {
    results.innerHTML = `
      <div class="no-orders">
        <span>🔍</span>
        لم نجد أي طلبات بهذا الرقم<br/>
        <small style="font-size:.85rem;opacity:.7">تأكد من الرقم الذي أدخلته عند الطلب</small>
      </div>`;
    return;
  }

  results.innerHTML = `<p style="color:#666;font-size:.9rem;margin-bottom:12px">وجدنا ${data.length} طلب(ات) بهذا الرقم:</p>`;

  data.forEach(order => {
    const st    = STATUS_MAP[order.status] || STATUS_MAP.new;
    const card  = document.createElement('div');
    card.className = 'order-track-card';
    card.style.borderRightColor = st.color;

    const stepsHtml = order.status === 'cancelled'
      ? `<p style="color:#e53935;text-align:center;font-weight:700;margin:12px 0">❌ تم إلغاء الطلب</p>`
      : buildSteps(st.step);

    card.innerHTML = `
      <div class="order-track-header">
        <div>
          <div class="order-track-id">طلب رقم: ${order.id}</div>
          <div class="order-track-date">🕐 ${order.order_date || ''}</div>
        </div>
        <span class="status-badge" style="background:${st.color}">${st.label}</span>
      </div>
      ${stepsHtml}
      <div class="order-detail">
        ${order.products_text ? `🛒 ${order.products_text.replace(/\n/g,' · ')}` : ''}
        ${order.total && order.total !== '0' ? `<br/>💰 المجموع: <strong>${order.total} دت</strong>` : ''}
        ${order.address ? `<br/>📍 ${order.address}` : ''}
      </div>
    `;
    results.appendChild(card);
  });
}

function buildSteps(currentStep) {
  const items = STEPS.map((s, i) => {
    const done    = i < currentStep;
    const current = i === currentStep;
    const cls     = done ? 'done' : current ? 'current' : '';
    return `
      <div class="step-item">
        <div class="step-dot ${cls}">${done ? '✓' : s.icon}</div>
        <div class="step-label ${cls}">${s.label}</div>
      </div>`;
  }).join('');
  return `<div class="progress-steps">${items}</div>`;
}
