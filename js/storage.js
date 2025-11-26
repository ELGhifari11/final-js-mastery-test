const USERS_KEY = 'pos_users';
const CURRENT_USER_KEY = 'pos_current_user';
const POS_STATE_KEY = 'pos_state';

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return fallback;
    }
    return JSON.parse(raw);
  } catch (error) {
    console.error('loadFromStorage error', error);
    return fallback;
  }
}

function saveToStorage(key, value) {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
  } catch (error) {
    console.error('saveToStorage error', error);
  }
}

// User helpers
function getAllUsers() {
  return loadFromStorage(USERS_KEY, []);
}

function saveAllUsers(users) {
  saveToStorage(USERS_KEY, users);
}

function findUserByEmail(email) {
  const users = getAllUsers();
  return users.find((user) => user.email === email) || null;
}

function addUser(user) {
  const users = getAllUsers();
  users.push(user);
  saveAllUsers(users);
}

function setCurrentUser(user) {
  saveToStorage(CURRENT_USER_KEY, user);
}

function getCurrentUser() {
  return loadFromStorage(CURRENT_USER_KEY, null);
}

function clearCurrentUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

// POS state helpers
function getPosState() {
  const defaultState = { products: [], transactions: [] };
  return loadFromStorage(POS_STATE_KEY, defaultState);
}

function savePosState(state) {
  saveToStorage(POS_STATE_KEY, state);
}

function getAllProducts() {
  const state = getPosState();
  return state.products || [];
}

function saveAllProducts(products) {
  const state = getPosState();
  state.products = products;
  savePosState(state);
}

function findProductById(id) {
  const products = getAllProducts();
  return products.find((product) => product.id === id) || null;
}

function addProduct(product) {
  const products = getAllProducts();
  products.push(product);
  saveAllProducts(products);
}

function updateProductById(id, updatedData) {
  const products = getAllProducts();
  const updatedProducts = products.map((product) => {
    if (product.id === id) {
      return { ...product, ...updatedData };
    }
    return product;
  });
  saveAllProducts(updatedProducts);
}

function deleteProductById(id) {
  const products = getAllProducts();
  const filtered = products.filter((product) => product.id !== id);
  saveAllProducts(filtered);
}

function getAllTransactions() {
  const state = getPosState();
  return state.transactions || [];
}

function saveAllTransactions(transactions) {
  const state = getPosState();
  state.transactions = transactions;
  savePosState(state);
}

function addTransaction(transaction) {
  const transactions = getAllTransactions();
  transactions.push(transaction);
  saveAllTransactions(transactions);
}

export {
  loadFromStorage,
  saveToStorage,
  getAllUsers,
  saveAllUsers,
  findUserByEmail,
  addUser,
  setCurrentUser,
  getCurrentUser,
  clearCurrentUser,
  getPosState,
  savePosState,
  getAllProducts,
  saveAllProducts,
  findProductById,
  addProduct,
  updateProductById,
  deleteProductById,
  getAllTransactions,
  saveAllTransactions,
  addTransaction,
};
