import * as Storage from './storage.js';
import * as UI from './ui.js';

/**
 * Menghubungkan form login & register dengan handler JS.
 * Dipanggil dari main.js saat initApp.
 */
export function initAuthListeners() {
  console.log('initAuthListeners() called');
  // TODO: addEventListener ke form login & register
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const logoutBtn = document.getElementById('logoutBtn');

  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = Object.fromEntries(new FormData(loginForm));
      console.log('loginForm submitted with data:', formData);
      handleLogin(formData);
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = Object.fromEntries(new FormData(registerForm));
      console.log('registerForm submitted with data:', formData);
      handleRegister(formData);
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      handleLogout();
    });
  }
}

/**
 * Flow register:
 * 1. Validasi data
 * 2. Cek email sudah terdaftar?
 * 3. Simpan ke storage via storage.js
 * 4. Tampilkan notifikasi via ui.js
 */
export function handleRegister(formData) {
  console.log('handleRegister() called with:', formData);
  // TODO: implement flow register
  Storage.getUsers();
  Storage.saveUsers([]);
  UI.showToast('Register flow executed', 'success');
}

/**
 * Flow login:
 * 1. Ambil users via storage.js
 * 2. Cek email+password
 * 3. Set currentUser via storage.js
 * 4. Update UI via ui.js
 */
export function handleLogin(formData) {
  console.log('handleLogin() called with:', formData);
  // TODO: implement flow login
  Storage.getUsers();
  Storage.setCurrentUser(formData);
  UI.toggleAuthUI(true, formData);
  UI.showToast('Login flow executed', 'info');
}

/**
 * Flow logout:
 * 1. clearCurrentUser via storage.js
 * 2. Update UI ke guest via ui.js
 */
export function handleLogout() {
  console.log('handleLogout() called');
  // TODO
  Storage.clearCurrentUser();
  UI.toggleAuthUI(false, null);
  UI.showToast('Logout flow executed', 'info');
}

/**
 * Mengecek apakah user sudah login.
 */
export function isAuthenticated() {
  console.log('isAuthenticated() called');
  // TODO: return boolean
  const user = Storage.getCurrentUser();
  return Boolean(user);
}
