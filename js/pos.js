import {
  getAllProducts,
  addProduct,
  updateProductById,
  deleteProductById,
  getAllTransactions,
  addTransaction,
  saveAllProducts,
} from './storage.js';
import { generateId, formatCurrency, showNotification } from './utils.js';
import { fetchExternalData } from './api.js';

let cartItems = [];

function initPosApp() {
  const productForm = document.getElementById('productForm');
  const clearProductBtn = document.getElementById('clearProductBtn');
  const navButtons = document.querySelectorAll('.nav-item');
  const cartForm = document.getElementById('cartForm');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const importSampleBtn = document.getElementById('importSampleBtn');

  navButtons.forEach((btn) => {
    btn.addEventListener('click', () => switchView(btn.dataset.view));
  });

  if (productForm) {
    productForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(productForm);
      const payload = {
        id: formData.get('id') || '',
        name: formData.get('name')?.trim(),
        category: formData.get('category')?.trim(),
        price: Number(formData.get('price')) || 0,
        stock: Number(formData.get('stock')) || 0,
      };
      if (payload.id) {
        updateProduct(payload.id, payload);
      } else {
        createProduct(payload);
      }
      productForm.reset();
    });
  }

  if (clearProductBtn) {
    clearProductBtn.addEventListener('click', () => {
      productForm.reset();
    });
  }

  if (cartForm) {
    cartForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const productId = document.getElementById('cartProductSelect')?.value;
      const qty = Number(document.getElementById('cartQty')?.value) || 1;
      addItemToCart(productId, qty);
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', finalizeTransaction);
  }

  if (importSampleBtn) {
    importSampleBtn.addEventListener('click', loadInitialPosDataFromApi);
  }

  refreshAllViews();
  loadInitialPosDataFromApi();
}

function switchView(name) {
  const buttons = document.querySelectorAll('.nav-item');
  const views = document.querySelectorAll('.view');
  buttons.forEach((btn) => btn.classList.toggle('active', btn.dataset.view === name));
  views.forEach((view) => {
    view.classList.toggle('hidden', view.id !== `view-${name}`);
  });
}

function loadInitialPosData() {
  renderProducts();
  renderCart();
  renderReports();
  updateOverviewStats();
  updateProductSelect();
}

async function loadInitialPosDataFromApi() {
  const data = await fetchExternalData();
  if (!data || !Array.isArray(data) || data.length === 0) {
    return;
  }
  const existing = getAllProducts();
  const merged = [...existing];
  data.forEach((item) => {
    const found = merged.find((p) => p.name === item.name);
    if (!found) {
      merged.push(item);
    }
  });
  saveAndRefreshProducts(merged);
  showNotification('Produk contoh berhasil diimport');
  const apiStat = document.getElementById('statApi');
  if (apiStat) {
    apiStat.textContent = `${data.length} produk contoh`;
  }
}

function saveAndRefreshProducts(list) {
  saveAllProducts(list);
  renderProducts();
  updateProductSelect();
  updateOverviewStats();
}

function createProduct(payload) {
  if (!payload.name) {
    showNotification('Nama produk wajib diisi', true);
    return;
  }
  const product = {
    id: generateId(),
    name: payload.name,
    category: payload.category || '-',
    price: payload.price,
    stock: payload.stock,
    createdAt: new Date().toISOString(),
  };
  addProduct(product);
  renderProducts();
  updateProductSelect();
  updateOverviewStats();
  showNotification('Produk ditambahkan');
}

function updateProduct(id, payload) {
  updateProductById(id, {
    name: payload.name,
    category: payload.category,
    price: payload.price,
    stock: payload.stock,
  });
  renderProducts();
  updateProductSelect();
  updateOverviewStats();
  showNotification('Produk diperbarui');
}

function deleteProduct(id) {
  deleteProductById(id);
  renderProducts();
  updateProductSelect();
  updateOverviewStats();
  showNotification('Produk dihapus');
}

function addItemToCart(productId, quantity) {
  if (!productId) {
    showNotification('Pilih produk terlebih dahulu', true);
    return;
  }
  const product = getAllProducts().find((item) => item.id === productId);
  if (!product) {
    showNotification('Produk tidak ditemukan', true);
    return;
  }
  const existing = cartItems.find((item) => item.productId === productId);
  if (existing) {
    existing.qty += quantity;
    existing.subtotal = existing.qty * existing.price;
  } else {
    cartItems.push({
      id: generateId(),
      productId,
      name: product.name,
      qty: quantity,
      price: product.price,
      subtotal: product.price * quantity,
    });
  }
  renderCart();
  showNotification('Ditambahkan ke cart');
}

function removeItemFromCart(id) {
  cartItems = cartItems.filter((item) => item.id !== id);
  renderCart();
  showNotification('Item dihapus');
}

function finalizeTransaction() {
  if (cartItems.length === 0) {
    showNotification('Cart masih kosong', true);
    return;
  }
  let totalQty = 0;
  let totalPrice = 0;
  for (const item of cartItems) {
    totalQty += item.qty;
    totalPrice += item.subtotal;
  }
  const transaction = {
    id: generateId(),
    items: [...cartItems],
    totalQty,
    totalPrice,
    createdAt: new Date().toISOString(),
  };
  addTransaction(transaction);
  cartItems = [];
  renderCart();
  renderReports();
  updateOverviewStats();
  showNotification('Transaksi disimpan');
}

function renderProducts() {
  const tbody = document.getElementById('productTableBody');
  if (!tbody) return;
  const products = getAllProducts();
  tbody.innerHTML = '';
  products.forEach((product) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.category}</td>
      <td>${formatCurrency(product.price)}</td>
      <td>${product.stock}</td>
      <td>
        <button class="action-btn" data-action="edit" data-id="${product.id}">Edit</button>
        <button class="action-btn" data-action="delete" data-id="${product.id}">Hapus</button>
      </td>
    `;
    tbody.appendChild(row);
  });
  tbody.querySelectorAll('button[data-action="edit"]').forEach((btn) => {
    btn.addEventListener('click', () => fillProductForm(btn.dataset.id));
  });
  tbody.querySelectorAll('button[data-action="delete"]').forEach((btn) => {
    btn.addEventListener('click', () => deleteProduct(btn.dataset.id));
  });
}

function fillProductForm(id) {
  const product = getAllProducts().find((item) => item.id === id);
  if (!product) return;
  const form = document.getElementById('productForm');
  if (!form) return;
  form.elements['id'].value = product.id;
  form.elements['name'].value = product.name;
  form.elements['category'].value = product.category;
  form.elements['price'].value = product.price;
  form.elements['stock'].value = product.stock;
  showNotification('Edit mode aktif');
}

function updateProductSelect() {
  const select = document.getElementById('cartProductSelect');
  if (!select) return;
  const products = getAllProducts();
  select.innerHTML = '<option value="">Pilih Produk</option>';
  products.forEach((product) => {
    const option = document.createElement('option');
    option.value = product.id;
    option.textContent = `${product.name} (${formatCurrency(product.price)})`;
    select.appendChild(option);
  });
}

function renderCart() {
  const tbody = document.getElementById('cartTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';
  cartItems.forEach((item) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.qty}</td>
      <td>${formatCurrency(item.price)}</td>
      <td>${formatCurrency(item.subtotal)}</td>
      <td><button class="action-btn" data-id="${item.id}">Hapus</button></td>
    `;
    tbody.appendChild(row);
  });
  tbody.querySelectorAll('button').forEach((btn) => {
    btn.addEventListener('click', () => removeItemFromCart(btn.dataset.id));
  });
  updateCartSummary();
}

function updateCartSummary() {
  let totalQty = 0;
  let totalPrice = 0;
  for (const item of cartItems) {
    totalQty += item.qty;
    totalPrice += item.subtotal;
  }
  const qtyEl = document.getElementById('cartTotalQty');
  const priceEl = document.getElementById('cartTotalPrice');
  if (qtyEl) qtyEl.textContent = totalQty;
  if (priceEl) priceEl.textContent = formatCurrency(totalPrice);
}

function renderReports() {
  const tbody = document.getElementById('reportTableBody');
  if (!tbody) return;
  const transactions = getAllTransactions();
  tbody.innerHTML = '';
  transactions.forEach((trx) => {
    const itemsLabel = trx.items.map((item) => `${item.name} x${item.qty}`).join(', ');
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${trx.id}</td>
      <td>${itemsLabel}</td>
      <td>${trx.totalQty}</td>
      <td>${formatCurrency(trx.totalPrice)}</td>
      <td>${new Date(trx.createdAt).toLocaleString('id-ID')}</td>
    `;
    tbody.appendChild(row);
  });
  updateReportSummary();
}

function updateReportSummary() {
  const transactions = getAllTransactions();
  let totalQty = 0;
  let totalPrice = 0;
  for (const trx of transactions) {
    totalQty += trx.totalQty;
    totalPrice += trx.totalPrice;
  }
  const trxEl = document.getElementById('reportTotalTransactions');
  const revEl = document.getElementById('reportTotalRevenue');
  if (trxEl) trxEl.textContent = transactions.length;
  if (revEl) revEl.textContent = formatCurrency(totalPrice);
}

function updateOverviewStats() {
  const products = getAllProducts();
  const transactions = getAllTransactions();
  let totalRevenue = 0;
  for (const trx of transactions) {
    totalRevenue += trx.totalPrice;
  }
  const productEl = document.getElementById('statProducts');
  const trxEl = document.getElementById('statTransactions');
  const revEl = document.getElementById('statRevenue');
  if (productEl) productEl.textContent = products.length;
  if (trxEl) trxEl.textContent = transactions.length;
  if (revEl) revEl.textContent = formatCurrency(totalRevenue);
}

function refreshAllViews() {
  renderProducts();
  updateProductSelect();
  renderCart();
  renderReports();
  updateOverviewStats();
}

export {
  initPosApp,
  loadInitialPosData,
  createProduct,
  updateProduct,
  deleteProduct,
  addItemToCart,
  removeItemFromCart,
  finalizeTransaction,
  renderProducts,
  renderCart,
  renderReports,
  loadInitialPosDataFromApi,
};
