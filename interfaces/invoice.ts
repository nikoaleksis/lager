export default interface Invoice {
  id: number,
  order_id: number,
  total_price: number,
  creation_date: Date,
  due_date: Date,
};