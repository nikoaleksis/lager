import { useState, useEffect } from 'react';
import { ScrollView, Text, Button } from 'react-native';
import orderModel from '../../models/orders';
import Order from '../../interfaces/order';
import { Base, Typography } from '../../styles';

export default function OrderList(
  { route, navigation, orders, setOrders } : 
  { route: any, navigation: any, orders: Order[], setOrders: (orders: Order[]) => void}
  ) {
  const { reload } = route.params || false;

  if (reload) {
    reloadOrders();
  }

  async function reloadOrders() {
    setOrders(await orderModel.getOrders());
  }

  useEffect(() => {
    reloadOrders();
  }, []);

  const listOfOrders = orders
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