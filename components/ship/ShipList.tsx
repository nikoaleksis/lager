import { useEffect, useState, useCallback } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { View, Text, Button } from 'react-native';
import Order from '../../interfaces/order';
import orderModel from '../../models/orders';
import { Base, Typography } from '../../styles';

export default function ShipList({ navigation } : { navigation : any}) {
  const [orders, setOrders] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      const orders = await orderModel.getPackedOrders();
      setOrders(orders);
    })();
  }, [isFocused]);

  const listOfOrders = orders.map((order: Order) => {
    return (
      <Button
        title={order.name}
        key={order.id}
        color='#222'
        onPress={() => {
          navigation.navigate("Order", {order: order});
        }}
      />  
    )
  })

  return (
    <View style={ Base.base }>
      <Text style={ Typography.header2 }>Ordrar redo att skickas</Text>
      {listOfOrders}
    </View>
  )
}