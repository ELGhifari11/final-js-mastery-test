/**
 * Flow fetch exchange rate:
 * 1. Panggil fetch ke API publik
 * 2. Mapping data
 * 3. Kembalikan data ke pemanggil
 */
export async function fetchExchangeRate() {
  console.log('fetchExchangeRate() called');
  // TODO: fetch dari API publik
  return null;
}

/**
 * Flow fetch produk dummy:
 * 1. Fetch ke API publik
 * 2. Mapping ke format produk lokal
 * 3. Return array produk
 */
export async function fetchDummyProducts() {
  console.log('fetchDummyProducts() called');
  // TODO
  return [];
}
