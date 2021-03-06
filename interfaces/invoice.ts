export default interface Invoice {
  id: number,
  name: string,
  address: string,
  zip: string,
  city: string,
  country: string,
  order_id: number,
  total_price: number,
  creation_date: string,
  due_date: string,
};