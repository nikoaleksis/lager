export default interface Product {
  id: number,
  article_number: string,
  name: string, 
  description: string,
  specifiers: object,
  stock: number,
  location: string,
  price: 10,
  api_key: string,
}