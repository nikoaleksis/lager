import { Text, ScrollView, } from 'react-native';
import { Typography } from '../../styles';
import Product from '../../interfaces/product';
import StockList from './StockList';

export default function Stock(
  { products, setProducts } : 
  { products: Array<Product>, setProducts: (products: Array<Product>) => void }
) {
  return (
    <ScrollView>
      <Text style={Typography.header3}>Lagerförteckning</Text>
      <StockList products={products} setProducts={setProducts} />
    </ScrollView>
  );
}