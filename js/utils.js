function generateId() {
  const randomPart = Math.random().toString(16).slice(2, 8);
  return `${Date.now()}-${randomPart}`;
}

function formatCurrency(value) {
  const number = Number(value) || 0;
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
}

function showNotification(message, isError = false) {
  const toast = document.getElementById('notification');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.toggle('error', Boolean(isError));
  toast.classList.remove('hidden');
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 2200);
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('hidden');
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('hidden');
  }
}

function switchToMainAppView(user) {
  const app = document.getElementById('app-main');
  const welcome = document.getElementById('welcome-screen');
  const label = document.getElementById('currentUserLabel');
  if (welcome) {
    welcome.classList.add('hidden');
  }
  if (app) {
    app.classList.remove('hidden');
  }
  if (label && user) {
    label.textContent = user.name;
  }
}

function switchToWelcomeView() {
  const app = document.getElementById('app-main');
  const welcome = document.getElementById('welcome-screen');
  if (app) {
    app.classList.add('hidden');
  }
  if (welcome) {
    welcome.classList.remove('hidden');
  }
}

export { generateId, formatCurrency, showNotification, openModal, closeModal, switchToMainAppView, switchToWelcomeView };
