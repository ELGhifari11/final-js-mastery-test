import * as Storage from './storage.js';
import * as Reports from './reports.js';
import * as UI from './ui.js';

/**
 * Inisialisasi modul transaksi:
 * - Bind event tombol tambah ke keranjang
 * - Bind tombol simpan transaksi
 */
export function initTransactionModule() {
  console.log('initTransactionModule() called');
  // TODO
  const cartForm = document.getElementById('cartForm');
  const saveBtn = document.getElementById('saveTransactionBtn');
  const removeBtn = document.getElementById('removeCartItemBtn');

  if (cartForm) {
    cartForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(cartForm));
      addItemToCart(data.product, data.qty);
    });
  }

  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      saveCurrentTransaction();
    });
  }

  if (removeBtn) {
    removeBtn.addEventListener('click', () => {
      removeItemFromCart('cart-item-id');
    });
  }
}

/**
 * Menambahkan item ke keranjang.
 */
export function addItemToCart(productId, quantity) {
  console.log('addItemToCart() called with:', { productId, quantity });
  // TODO
  calculateCartTotals();
  renderCart();
}

/**
 * Menghapus item dari keranjang.
 */
export function removeItemFromCart(cartItemId) {
  console.log('removeItemFromCart() called with:', cartItemId);
  // TODO
  calculateCartTotals();
  renderCart();
}

/**
 * Menghitung total qty & total harga di keranjang.
 */
export function calculateCartTotals() {
  console.log('calculateCartTotals() called');
  // TODO
}

/**
 * Flow simpan transaksi:
 * 1. Ambil cart
 * 2. Hitung total
 * 3. Simpan transaksi ke storage
 * 4. Kosongkan cart
 * 5. Update laporan via reports.js
 */
export function saveCurrentTransaction() {
  console.log('saveCurrentTransaction() called');
  // TODO
  Storage.saveTransactions([]);
  Reports.renderReportTable();
  Reports.renderReportSummary();
  UI.showToast('Transaksi disimpan (dummy)', 'success');
}

/**
 * Merender isi keranjang ke UI.
 */
export function renderCart() {
  console.log('renderCart() called');
  // TODO
}
