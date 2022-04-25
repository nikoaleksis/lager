import config from '../config/config.json';
import Product from '../interfaces/product';

const products = {
  getProducts: async function getProducts() {
    const response = await fetch(`${config.base_url}/products?api_key=${config.api_key}`);
    const result = await response.json();
    return result.data;
  },
  getProduct: async function getProduct(id: number) {
    const response = await fetch(`${config.base_url}/products/${id}?api_key=${config.api_key}`)
    const result = await response.json();

    return result.data;
  },
  updateProduct: async function updateProduct(product: Partial<Product>) {
    const payload = JSON.stringify(
      Object.assign(product, {api_key: config.api_key})
    );

    const response = await fetch(`${config.base_url}/products`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: payload,
    });
    return response.status;
  }
}

export default products;