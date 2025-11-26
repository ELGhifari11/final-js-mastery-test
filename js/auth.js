import {
  findUserByEmail,
  addUser,
  setCurrentUser,
  getCurrentUser,
  clearCurrentUser,
} from './storage.js';
import {
  generateId,
  showNotification,
  openModal,
  closeModal,
  switchToMainAppView,
  switchToWelcomeView,
} from './utils.js';

function initAuthFlow(onAuthenticated) {
  const loginButtons = [
    document.getElementById('welcomeLoginBtn'),
    document.getElementById('ctaLoginBtn'),
  ];
  const registerButtons = [
    document.getElementById('welcomeRegisterBtn'),
    document.getElementById('ctaRegisterBtn'),
  ];

  loginButtons.forEach((btn) => {
    if (btn) {
      btn.addEventListener('click', () => openModal('login-modal'));
    }
  });

  registerButtons.forEach((btn) => {
    if (btn) {
      btn.addEventListener('click', () => openModal('register-modal'));
    }
  });

  const closeButtons = document.querySelectorAll('[data-close]');
  closeButtons.forEach((btn) => {
    btn.addEventListener('click', () => closeModal(btn.dataset.close));
  });

  const loginToRegister = document.getElementById('loginToRegister');
  const registerToLogin = document.getElementById('registerToLogin');
  if (loginToRegister) {
    loginToRegister.addEventListener('click', () => {
      closeModal('login-modal');
      openModal('register-modal');
    });
  }
  if (registerToLogin) {
    registerToLogin.addEventListener('click', () => {
      closeModal('register-modal');
      openModal('login-modal');
    });
  }

  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(loginForm);
      loginUser({
        email: formData.get('email')?.trim(),
        password: formData.get('password')?.trim(),
      }, onAuthenticated);
    });
  }

  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(registerForm);
      registerUser({
        name: formData.get('name')?.trim(),
        email: formData.get('email')?.trim(),
        password: formData.get('password')?.trim(),
        confirmPassword: formData.get('confirmPassword')?.trim(),
      }, onAuthenticated);
    });
  }
}

function registerUser(payload, onDone) {
  if (!payload.name || !payload.email || !payload.password) {
    showNotification('Lengkapi semua kolom register', true);
    return;
  }
  if (payload.password !== payload.confirmPassword) {
    showNotification('Password dan konfirmasi tidak sama', true);
    return;
  }
  const existing = findUserByEmail(payload.email);
  if (existing) {
    showNotification('Email sudah terdaftar', true);
    return;
  }
  const newUser = {
    id: generateId(),
    name: payload.name,
    email: payload.email,
    password: payload.password,
    createdAt: new Date().toISOString(),
  };
  addUser(newUser);
  showNotification('Register berhasil, silakan login');
  closeModal('register-modal');
  openModal('login-modal');
  if (typeof onDone === 'function') {
    onDone();
  }
}

function loginUser(payload, onDone) {
  if (!payload.email || !payload.password) {
    showNotification('Email dan password wajib diisi', true);
    return;
  }
  const user = findUserByEmail(payload.email);
  if (!user || user.password !== payload.password) {
    showNotification('Email atau password salah', true);
    return;
  }
  setCurrentUser(user);
  closeModal('login-modal');
  switchToMainAppView(user);
  showNotification(`Selamat datang, ${user.name}`);
  if (typeof onDone === 'function') {
    onDone();
  }
}

function logoutUser(onDone) {
  clearCurrentUser();
  switchToWelcomeView();
  showNotification('Berhasil logout');
  if (typeof onDone === 'function') {
    onDone();
  }
}

function isAuthenticated() {
  const user = getCurrentUser();
  return Boolean(user);
}

export { initAuthFlow, registerUser, loginUser, logoutUser, isAuthenticated };
