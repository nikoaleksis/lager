import config from '../config/config.json';
import Delivery from '../interfaces/delivery';

const deliveries = {
  getDeliveries: async function getDeliveries() {
    const response = await fetch(`${config.base_url}/deliveries?api_key=${config.api_key}`);
    const result = await response.json();
    return result.data;
  },
  addDelivery: async function addDelivery(delivery: Partial<Delivery>) {
    const payload = JSON.stringify(
      Object.assign(delivery, {api_key: config.api_key}));

    const response = await fetch(
      `${config.base_url}/deliveries`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: payload,
      }
      );
    return response.status;
  },
};

export default deliveries;