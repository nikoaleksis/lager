import { Image, Text, ScrollView } from 'react-native';
//@ts-ignore
import warehouse from '../assets/warehouse.jpg';
import Stock from './stock/Stock';
import { Base, Typography, Img } from '../styles';
import Product from '../interfaces/product';

export default function Home(
  { products, setProducts } : 
  { products: Array<Product>, setProducts: (products: Product[]) => void }
) {
  return (
    <ScrollView style={Base.base}>
      <Text style={Typography.header1}>Lager-Appen</Text>
      <Image source={warehouse} style={Img.round} />
      <Stock products={products} setProducts={setProducts}/>
    </ScrollView>
  );
}