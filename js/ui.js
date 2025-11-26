/**
 * Menampilkan toast notifikasi.
 */
export function showToast(message, type) {
  console.log('showToast() called with:', { message, type });
  // TODO
}

/**
 * Mengatur tab aktif di section Demo POS.
 */
export function setActiveTab(tabName) {
  console.log('setActiveTab() called with:', tabName);
  // TODO
  const buttons = document.querySelectorAll('.tab-btn');
  const contents = document.querySelectorAll('.tab-content');

  buttons.forEach((btn) => {
    const isActive = btn.dataset.tab === tabName;
    btn.classList.toggle('active', isActive);
  });

  contents.forEach((content) => {
    const isActive = content.id === `tab-${tabName}`;
    content.classList.toggle('active', isActive);
  });
}

/**
 * Mengupdate tampilan UI berdasarkan status login.
 */
export function toggleAuthUI(isLoggedIn, user) {
  console.log('toggleAuthUI() called with:', { isLoggedIn, user });
  // TODO
  const activeUserEl = document.getElementById('activeUser');
  if (activeUserEl) {
    activeUserEl.textContent = isLoggedIn && user ? user.email || 'user@poslite.app' : 'guest@poslite.app';
  }
}

/**
 * Format angka jadi string currency.
 */
export function formatCurrency(value) {
  console.log('formatCurrency() called with:', value);
  // TODO
  return `Rp${value || 0}`;
}
