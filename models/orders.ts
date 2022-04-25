import config from '../config/config.json';
import Order from '../interfaces/order';
import OrderItem from '../interfaces/order_item';
import productModel from './products';

const orders = {
  getOrders: async function getOrders() {
    const response = await fetch(`${config.base_url}/orders?api_key=${config.api_key}`);
    const result = await response.json();
    return result.data;
  },
  updateOrder: async function updateOrder(order: Partial<Order>) {
    const payload = JSON.stringify(
      Object.assign(order, {api_key: config.api_key}));

    const response = await fetch(
      `${config.base_url}/orders`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: payload,
      }
      );
    return response.status;
  },
  pickOrder: async function pickOrder(order: Partial<Order>): Promise<OrderItem[]> {
    const items: Array<OrderItem> = order.order_items!;
    // Put all order items here that are not in stock
    let itemsNotInStock: Array<OrderItem> = [];

    items.forEach((item) => {
      if (item.amount > item.stock) {
        itemsNotInStock.push(item);
      }
    });

    if (itemsNotInStock.length > 0) {
      return itemsNotInStock;
    }
    // If all items in stock update the amount currently in stock
    items.forEach(async (item) => {
      const product = {
        name: item.name,
        id: item.product_id,
        stock: item.stock - item.amount,
      };
      const status = await productModel.updateProduct(product);
    });
    // Update the order status
    order.status_id = 200;
    await this.updateOrder(order);

    return itemsNotInStock
  }
}

export default orders;