import * as Auth from './auth.js';
import * as Products from './products.js';
import * as Transactions from './transactions.js';
import * as Reports from './reports.js';
import * as Api from './api.js';
import * as UI from './ui.js';

/**
 * Flow utama aplikasi POS:
 * 1. Inisialisasi modul Auth
 * 2. Inisialisasi modul Produk
 * 3. Inisialisasi modul Transaksi
 * 4. Inisialisasi modul Laporan
 * 5. (Opsional) Fetch data awal dari API
 * 6. Atur tab default di Demo POS
 */
function initApp() {
  console.log('initApp() called');

  Auth.initAuthListeners();
  Products.initProductModule();
  Transactions.initTransactionModule();
  Reports.initReportModule();

  // Contoh flow panggilan awal:
  // Api.fetchExchangeRate().then(rate => {
  //   console.log('Initial exchange rate:', rate);
  // });

  // Set tab default
  UI.setActiveTab('produk');
  bindTabInteractions();
  bindNavigationShortcuts();
  bindMarketingInteractions();
  bindDemoGate();
}

function bindTabInteractions() {
  console.log('bindTabInteractions() called');
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      UI.setActiveTab(button.dataset.tab);
    });
  });
}

function bindNavigationShortcuts() {
  console.log('bindNavigationShortcuts() called');
  const navLoginBtn = document.getElementById('navLoginBtn');
  const navRegisterBtn = document.getElementById('navRegisterBtn');
  const heroDemoBtn = document.getElementById('heroDemoBtn');
  const panelLoginBtn = document.getElementById('panelLoginBtn');
  const panelRegisterBtn = document.getElementById('panelRegisterBtn');

  if (navLoginBtn) {
    navLoginBtn.addEventListener('click', () => {
      document.getElementById('auth').scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (navRegisterBtn) {
    navRegisterBtn.addEventListener('click', () => {
      document.getElementById('auth').scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (heroDemoBtn) {
    heroDemoBtn.addEventListener('click', () => {
      document.getElementById('demo').scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (panelLoginBtn) {
    panelLoginBtn.addEventListener('click', () => {
      document.getElementById('auth').scrollIntoView({ behavior: 'smooth' });
      UI.showToast('Panel login ditekan', 'info');
    });
  }

  if (panelRegisterBtn) {
    panelRegisterBtn.addEventListener('click', () => {
      document.getElementById('auth').scrollIntoView({ behavior: 'smooth' });
      UI.showToast('Panel register dibuka', 'info');
    });
  }
}

function bindMarketingInteractions() {
  console.log('bindMarketingInteractions() called');
  const pricingButtons = document.querySelectorAll('[data-plan]');
  const contactForm = document.getElementById('contactForm');

  pricingButtons.forEach((button) => {
    button.addEventListener('click', () => {
      console.log('Pricing selected:', button.dataset.plan);
      UI.showToast(`Paket ${button.dataset.plan} dipilih (dummy)`, 'info');
    });
  });

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const contactData = Object.fromEntries(new FormData(contactForm));
      console.log('contactForm submitted:', contactData);
      UI.showToast('Pesan contact dikirim (dummy)', 'success');
    });
  }
}

function bindDemoGate() {
  console.log('bindDemoGate() called');
  const guardLoginBtn = document.getElementById('guardLoginBtn');
  const guardPeekBtn = document.getElementById('guardPeekBtn');

  if (guardLoginBtn) {
    guardLoginBtn.addEventListener('click', () => {
      document.getElementById('auth').scrollIntoView({ behavior: 'smooth' });
      UI.showToast('Mulai login sebelum akses demo', 'warning');
    });
  }

  if (guardPeekBtn) {
    guardPeekBtn.addEventListener('click', () => {
      UI.toggleDemoAccess(true);
      UI.showToast('Preview demo dibuka (dummy)', 'info');
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded event fired');
  initApp();
});
