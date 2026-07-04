// ===== CLIENT CARD =====
document.getElementById('clientCard').addEventListener('click', (e) => {
  e.preventDefault();
  const card = document.getElementById('clientCard');
  card.style.transform = 'scale(0.96)';
  card.querySelector('.role-btn').innerHTML = '<span>جاري الدخول...</span>';
  setTimeout(() => { window.location.href = 'shop.html'; }, 450);
});

// ===== ADMIN CARD =====
document.getElementById('adminCard').addEventListener('click', (e) => {
  e.preventDefault();
  const card = document.getElementById('adminCard');
  card.style.transform = 'scale(0.96)';
  card.querySelector('.role-btn').innerHTML = '<span>جاري الدخول...</span>';
  setTimeout(() => { window.location.href = 'admin.html'; }, 400);
});
