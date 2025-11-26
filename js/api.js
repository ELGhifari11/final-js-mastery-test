async function fetchExternalData() {
  try {
    const response = await fetch('https://fakestoreapi.com/products?limit=4');
    const data = await response.json();
    const mapped = data.map((item) => ({
      id: `api-${item.id}`,
      name: item.title,
      category: item.category || 'Sample',
      price: Math.round(item.price * 15000),
      stock: 50,
      createdAt: new Date().toISOString(),
    }));
    return mapped;
  } catch (error) {
    console.error('fetchExternalData error', error);
    return [];
  }
}

export { fetchExternalData };
