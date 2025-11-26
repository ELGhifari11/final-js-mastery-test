import * as Storage from './storage.js';
import * as UI from './ui.js';

/**
 * Inisialisasi modul laporan:
 * - Bind event filter tanggal (kalau ada)
 * - Render summary & tabel awal
 */
export function initReportModule() {
  console.log('initReportModule() called');
  // TODO
  const filterForm = document.getElementById('reportFilterForm');
  const resetBtn = document.getElementById('resetReportBtn');

  if (filterForm) {
    filterForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const filter = Object.fromEntries(new FormData(filterForm));
      filterReports(filter);
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      renderReportSummary();
      renderReportTable();
    });
  }

  renderReportSummary();
  renderReportTable();
}

/**
 * Menghitung dan merender ringkasan laporan:
 * - Total transaksi
 * - Total omzet
 */
export function renderReportSummary() {
  console.log('renderReportSummary() called');
  // TODO
  const isLoggedIn = Boolean(Storage.getCurrentUser());
  UI.toggleAuthUI(isLoggedIn, Storage.getCurrentUser());
}

/**
 * Merender tabel transaksi dari storage.
 */
export function renderReportTable() {
  console.log('renderReportTable() called');
  // TODO
  Storage.getTransactions();
}

/**
 * Filter laporan berdasarkan rentang tanggal.
 */
export function filterReports(filter) {
  console.log('filterReports() called with:', filter);
  // TODO
  renderReportTable();
  UI.showToast('Filter laporan dijalankan (dummy)', 'info');
}
