import config from '../config/config.json';
import Invoice from '../interfaces/invoice';
import storageModel from './storage';

const invoice = {
  addInvoice: async function addInvoice(invoice: Partial<Invoice>) {
    const payload = JSON.stringify(
      Object.assign(invoice, {api_key: config.api_key}));
    const tokenObj = await storageModel.readToken();
    const token = tokenObj.token;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', token);

    const response = await fetch(
      `${config.base_url}/invoices`,
      {
        method: 'POST',
        headers: headers,
        body: payload,
      }
      );
    console.log(response.status);
    return response.status;
  }
}

export default invoice;