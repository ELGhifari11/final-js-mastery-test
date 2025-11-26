import * as Storage from './storage.js';
import * as UI from './ui.js';

/**
 * Inisialisasi modul produk:
 * - Bind event submit form produk
 * - Bind tombol edit/delete di tabel
 */
export function initProductModule() {
  console.log('initProductModule() called');
  // TODO: addEventListener dsb.
  const productForm = document.getElementById('productForm');
  const editBtn = document.getElementById('editProductBtn');
  const deleteBtn = document.getElementById('deleteProductBtn');

  if (productForm) {
    productForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(productForm));
      console.log('productForm submitted:', data);
      createProduct(data);
    });
  }

  if (editBtn) {
    editBtn.addEventListener('click', () => {
      updateProduct('demo-id', { name: 'Updated name' });
    });
  }

  if (deleteBtn) {
    deleteBtn.addEventListener('click', () => {
      deleteProduct('demo-id');
    });
  }
}

/**
 * Flow create product:
 * 1. Validasi formData
 * 2. Ambil list produk via storage.js
 * 3. Tambah produk baru
 * 4. Simpan via storage.js
 * 5. Panggil renderProductTable()
 */
export function createProduct(productData) {
  console.log('createProduct() called with:', productData);
  // TODO
  Storage.getProducts();
  Storage.saveProducts([]);
  renderProductTable();
  UI.showToast('Produk ditambahkan (dummy)', 'success');
}

/**
 * Flow update product:
 * 1. Ambil produk by id
 * 2. Update field yang diubah
 * 3. Simpan via storage.js
 * 4. renderProductTable()
 */
export function updateProduct(productId, updatedData) {
  console.log('updateProduct() called with:', productId, updatedData);
  // TODO
  Storage.getProducts();
  Storage.saveProducts([]);
  renderProductTable();
  UI.showToast('Produk diupdate (dummy)', 'info');
}

/**
 * Flow delete product:
 * 1. Konfirmasi (nantinya via UI)
 * 2. Hapus dari list
 * 3. Simpan via storage.js
 * 4. renderProductTable()
 */
export function deleteProduct(productId) {
  console.log('deleteProduct() called with:', productId);
  // TODO
  Storage.getProducts();
  Storage.saveProducts([]);
  renderProductTable();
  UI.showToast('Produk dihapus (dummy)', 'warning');
}

/**
 * Merender tabel produk dari data di storage.
 */
export function renderProductTable() {
  console.log('renderProductTable() called');
  // TODO: ambil dari storage & update DOM
}
