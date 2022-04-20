import { useEffect, useState } from 'react';
import { ScrollView, Text, Button, Alert } from 'react-native';
import orderModel from '../models/orders';
import productModel from '../models/products';
import Product from '../interfaces/product';
import OrderItem from '../interfaces/order_item';
import { Base, Typography } from '../styles';

function alertItemNotInStock(items: Array<OrderItem>) {
  // Build a string which explains which items are not in stock
  let whichItemsNotInStock = "";
  items.forEach((item) => {
    whichItemsNotInStock += `${item.description} har inte det ønskade antalet i lager\n`;
  });
  Alert.alert(
    "Varor saknas i lager",
    whichItemsNotInStock,
    [
      { text: "Ok", }
    ]
  );
}

export default function PickList(
  { route, navigation, setProducts } : 
  { route: any, navigation: any, setProducts: (products: Array<Product>) => void}
) {
  const { order } = route.params;
  const [productsList, setProductsList] = useState([]);

  useEffect(async () => {
    setProductsList(await productModel.getProducts());
  }, []);

  async function pick() {
    const itemsNotInStock: Array<OrderItem> = await orderModel.pickOrder(order);
    if (itemsNotInStock.length > 0) {
      alertItemNotInStock(itemsNotInStock);
    }
    setProducts(await productModel.getProducts());
    navigation.navigate('List', { reload: true });
  }

  const orderItemsList = order.order_items.map((item: OrderItem, index: number) => {
    return <Text style={Typography.normal} key={index}>
      {item.name} | {item.amount}st | {item.location}
    </Text>
  });

  return (
    <ScrollView style={ Base.base }>
      <Text style={ Typography.header3 }>Kontaktuppgifter:</Text>
      <Text style={ Typography.normal }>{order.name}</Text>
      <Text style={ Typography.normal }>{order.address}</Text>
      <Text style={ Typography.normal }>{order.zip} {order.city}</Text>

      <Text style={ Typography.header3 }>Produkter:</Text>
      {orderItemsList}
      <Button color="#222" title="Packa order" onPress= {pick} />
    </ScrollView>
  )
};