import { useState, useEffect } from 'react';
import { ScrollView, Text, Button } from 'react-native';
import orderModel from '../models/orders';
import Order from '../interfaces/order';
import { Base, Typography } from '../styles';

export default function OrderList(
  { route, navigation } : 
  { route: any, navigation: any}
  ) {
  const { reload } = route.params || false;
  const [allOrders, setAllOrders] = useState([]);

  if (reload) {
    reloadOrders();
  }

  async function reloadOrders() {
    setAllOrders(await orderModel.getOrders());
  }

  useEffect(() => {
    reloadOrders();
  }, []);

  const listOfOrders = allOrders
    .filter((order: Order) => order.status === 'Ny')
    .map((order: Order, index: number) => {
      return <Button
        title={order.name}
        key={index}
        color="#222"
        onPress={() => {
          navigation.navigate('Details', {
            order: order
          });
        }}
      />
    });

  return (
    <ScrollView style= {Base.base}>
      <Text style={Typography.header3}>Ordrar redo att plockas</Text>
      {listOfOrders}
    </ScrollView>
  );
};