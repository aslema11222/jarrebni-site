// ===== CLIENT CARD =====
document.getElementById('clientCard').addEventListener('click', (e) => {
  e.preventDefault();
  const card = document.getElementById('clientCard');
  card.style.transform = 'scale(0.96)';
  card.querySelector('.role-btn').innerHTML = '<span>جاري الدخول...</span>';
  setTimeout(() => { window.location.href = 'index.html'; }, 450);
});

// ===== ADMIN CARD =====
document.getElementById('adminCard').addEventListener('click', () => {
  const roleSection = document.getElementById('roleSection');
  const authSection = document.getElementById('authSection');
  roleSection.style.opacity = '0';
  roleSection.style.transform = 'translateY(-16px)';
  roleSection.style.transition = 'opacity 0.25s, transform 0.25s';
  setTimeout(() => {
    roleSection.classList.add('hidden');
    roleSection.style.opacity = '';
    roleSection.style.transform = '';
    roleSection.style.transition = '';
    authSection.classList.remove('hidden');
    document.getElementById('adminPwd').focus();
  }, 250);
});

// ===== BACK BUTTON =====
document.getElementById('backBtn').addEventListener('click', () => {
  const authSection  = document.getElementById('authSection');
  const roleSection  = document.getElementById('roleSection');
  authSection.style.opacity = '0';
  authSection.style.transform = 'translateY(-16px)';
  authSection.style.transition = 'opacity 0.25s, transform 0.25s';
  setTimeout(() => {
    authSection.classList.add('hidden');
    authSection.style.opacity = '';
    authSection.style.transform = '';
    authSection.style.transition = '';
    roleSection.classList.remove('hidden');
    resetForm();
  }, 250);
});

// ===== PASSWORD TOGGLE =====
document.getElementById('pwdToggle').addEventListener('click', () => {
  const input = document.getElementById('adminPwd');
  const show  = input.type === 'password';
  input.type  = show ? 'text' : 'password';
  document.getElementById('pwdToggle').textContent = show ? '🙈' : '👁';
});

// ===== ENTER KEY on password =====
document.getElementById('adminPwd').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    document.getElementById('authForm').dispatchEvent(new Event('submit'));
  }
});

// ===== AUTH FORM =====
document.getElementById('authForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const pwd  = document.getElementById('adminPwd').value;
  const btn  = document.getElementById('submitBtn');
  const errEl = document.getElementById('authError');
  errEl.classList.add('hidden');

  if (JARREBNI.login(pwd)) {
    document.getElementById('submitText').textContent = '✓ جاري الدخول...';
    btn.disabled = true;
    btn.style.background = 'linear-gradient(135deg, #2D6A1F, #4A8F35)';
    document.querySelector('.auth-card').style.transform = 'scale(1.02)';
    setTimeout(() => { window.location.href = 'admin.html'; }, 600);
  } else {
    errEl.classList.remove('hidden');
    // Re-trigger animation
    errEl.style.animation = 'none';
    errEl.offsetHeight;
    errEl.style.animation = '';
    document.getElementById('adminPwd').value = '';
    document.getElementById('adminPwd').focus();
    // Shake the card
    const card = document.querySelector('.auth-card');
    card.style.animation = 'shake 0.4s';
    setTimeout(() => { card.style.animation = ''; }, 400);
  }
});

function resetForm() {
  document.getElementById('adminPwd').value          = '';
  document.getElementById('authError').classList.add('hidden');
  document.getElementById('submitText').textContent  = 'دخول';
  document.getElementById('submitBtn').disabled      = false;
  document.getElementById('submitBtn').style.background = '';
  document.getElementById('pwdToggle').textContent   = '👁';
  document.getElementById('adminPwd').type           = 'password';
  document.querySelector('.auth-card').style.transform = '';
}

// ===== KEYBOARD SHORTCUT: ESC =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !document.getElementById('authSection').classList.contains('hidden')) {
    document.getElementById('backBtn').click();
  }
});
