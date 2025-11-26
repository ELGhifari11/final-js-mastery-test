import { initAuthFlow, isAuthenticated, logoutUser } from './auth.js';
import { initPosApp, loadInitialPosData } from './pos.js';
import { getCurrentUser } from './storage.js';
import { switchToMainAppView, switchToWelcomeView, showNotification } from './utils.js';

let posInitialized = false;

function initApp() {
  initAuthFlow(handleAuthenticated);
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => logoutUser());
  }

  if (isAuthenticated()) {
    const user = getCurrentUser();
    switchToMainAppView(user);
    ensurePosReady();
  } else {
    switchToWelcomeView();
  }
}

function handleAuthenticated() {
  const user = getCurrentUser();
  if (user) {
    switchToMainAppView(user);
    ensurePosReady();
    showNotification('Dashboard terbuka');
  }
}

function ensurePosReady() {
  loadInitialPosData();
  if (!posInitialized) {
    initPosApp();
    posInitialized = true;
  }
}

document.addEventListener('DOMContentLoaded', initApp);
