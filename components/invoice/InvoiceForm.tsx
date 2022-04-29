import { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Text, Button, View } from "react-native";
import { Base, Typography, Form } from '../../styles';
import orderModel from '../../models/orders';
import invoiceModel from '../../models/invoices';
import Order from '../../interfaces/order'; 
import Invoice from '../../interfaces/invoice'; 

type InvoiceProps = {
  orders: Order[],
  setOrders: (orders: Order[]) => void,
  invoice: Partial<Invoice>,
  setInvoice: (invoice: Partial<Invoice>) => void,
  currentOrder: Partial<Order>,
  setCurrentOrder: (order: Partial<Order>) => void,
}

function OrdersDropdown(props: InvoiceProps) {
  let ordersHash: any = {};

  const itemsList = 
    props.orders
      .filter((order) => order.status_id > 100 && order.status_id < 600)
      .map((order, index) => {
      ordersHash[order.id] = order;
      return <Picker.Item key={index} label={order.name} value={order.id} />;
  });

  return (
      <Picker
          style={ Form.dropdown }
          selectedValue={props.currentOrder?.id}
          onValueChange={async (itemValue) => {
            props.invoice.order_id = itemValue;
            props.setInvoice(props.invoice);
            props.setCurrentOrder(ordersHash[itemValue]);
            props.setOrders(await orderModel.getOrders());
          }}
       >
        {itemsList}
      </Picker>
  );
}



export default function InvoiceForm(props: InvoiceProps) {
  const [invoice, setInvoice] = useState<Partial<Invoice>>({});
  const [currentOrder, setCurrentOrder] = useState<Partial<Order>>({})

  useEffect(() => {
    (async () => {
      props.setOrders(await orderModel.getOrders())
    })();
  }, []);

  async function addInvoice() {
    if (currentOrder) {
      const dueDays = 14;
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + dueDays);
      invoice.creation_date = new Date();
      invoice.due_date = dueDate;

      if (currentOrder.order_items) {
        invoice.total_price = currentOrder.order_items
          .map((prod) => prod.price * prod.amount)
          .reduce((total, price) => total += price);
        await invoiceModel.addInvoice(invoice);
        currentOrder.status_id = 600;
        await orderModel.updateOrder(currentOrder);
      }
    }
  }

  return (
    <View style={ Base.base }>
      <Text style={ Typography.header1 }>Skapa faktura</Text>
      <Text style={ Typography.label }>Vælj order</Text>
      <OrdersDropdown
        orders={props.orders}
        setOrders={props.setOrders}
        invoice={invoice}
        setInvoice={setInvoice}
        currentOrder={currentOrder}
        setCurrentOrder={setCurrentOrder}
      />
      {currentOrder ?
      <Button
        color={'#222'}
        title='Skapa faktura'
        onPress={() => addInvoice()}
      />
      : null
      }
    </View>
    );
};