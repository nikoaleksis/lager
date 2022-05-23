import { useState, useEffect } from 'react';
import { ScrollView, Text, Button } from 'react-native';
import orderModel from '../../models/orders';
import Order from '../../interfaces/order';
import { OrderStatus } from '../../enum/OrderStatus';
import { Base, Typography } from '../../styles';

export default function OrderList(
  { route, navigation } : 
  { route: any, navigation: any }) {
  const [allOrders, setAllOrders] = useState([]);
  let { reload } = route.params || false;

  if (reload) {
    console.log(route.params);
    reloadOrders();
    route.params = undefined;
  }

  async function reloadOrders() {
    setAllOrders(await orderModel.getNewOrders());
  }

  useEffect(() => {
    reloadOrders();
  }, []);

  const listOfOrders = allOrders
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