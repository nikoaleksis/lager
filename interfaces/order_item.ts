export default interface OrderItem {
  product_id: number,
  article_number: string,
  name: string,
  description: string,
  specifiers: object,
  stock: number,
  location: string,
  price: number
  amount: number
}