import { useState, useEffect } from 'react';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Text, Button, View, Platform, Alert } from "react-native";
import { Base, Typography, Form } from '../../styles';
import orderModel from '../../models/orders';
import invoiceModel from '../../models/invoices';
import Order from '../../interfaces/order'; 
import Invoice from '../../interfaces/invoice'; 
import { NavigationRouteContext } from '@react-navigation/native';

type InvoiceDDProps = {
  invoice: Partial<Invoice>,
  setInvoice: (invoice: Partial<Invoice>) => void,
  currentOrder: Partial<Order>,
  setCurrentOrder: (order: Partial<Order>) => void,
}

type invoiceFormProps = {
  navigation: any
  invoices: Invoice[],
  setInvoices: (invoices: Invoice[]) => void,
}

type DateProps = {
  invoice: Partial<Invoice>,
  setInvoice: (invoice: Partial<Invoice>) => void,
}

function validateInvoice(invoice: Partial<Invoice>) {
  if (
      !invoice.order_id || 
      !invoice.creation_date || 
      !invoice.due_date) {
      
      Alert.alert(
          "Fyll i alla fælt",
          'Alla fælten ær inte ifyllda',
          [
            { text: "Ok", }
          ]
      );
      return false;
  }
  return true
}

function OrdersDropdown(props: InvoiceDDProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [showPlaceHolder, setShowPlaceHolder] = useState<Boolean>(true);
  let ordersHash: any = {};

  useEffect(() => {
    (async () => {
      setOrders(await orderModel.getOrders())
    })();
  }, []);

  const itemsList = 
    orders
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
            setShowPlaceHolder(false);
            props.invoice.order_id = itemValue;
            props.setInvoice({...props.invoice, order_id: itemValue});
            props.setCurrentOrder(ordersHash[itemValue]);
          }}
       >
         {showPlaceHolder ? 
          <Picker.Item label="-" value="none" /> :
          null
         }
        {itemsList}
      </Picker>
  );
}

function DateDropDown(props: DateProps) {
  const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
  const [show, setShow] = useState<Boolean>(false);

  const onChange = (event: any, date: any) => {
    if (event.type !== 'dismissed') {
      setDropDownDate(date);
      const dueDate = new Date(date);
      dueDate.setDate(dueDate.getUTCDate() + 31);
      props.setInvoice({
        ...props.invoice,
        creation_date: date.toLocaleDateString('se-sv'),
        due_date: dueDate.toLocaleDateString('se-sv')
      });
    }
    setShow(false);
  }

  const showDatePicker = () => {
     setShow(true);
  };

  return (
      <View style={ Form.div(14) }>
          {Platform.OS === 'android' && (
          <Button color="#222" onPress={showDatePicker} title="Visa datumvæljare"/>
          )}
          {(show || Platform.OS === "ios") && (
              <RNDateTimePicker
                  mode={'date'}
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={onChange}
                  value={dropDownDate}
              />
          )}
      </View>
  )
};

export default function InvoiceForm( props: invoiceFormProps) {
  const [invoice, setInvoice] = useState<Partial<Invoice>>({});
  const [currentOrder, setCurrentOrder] = useState<Partial<Order>>({})

  async function addInvoice() {
    if (!validateInvoice(invoice)) {
      return;
    }
    
    if (currentOrder) {
      if (currentOrder.order_items) {
        invoice.total_price = currentOrder.order_items
          .map((prod) => prod.price * prod.amount)
          .reduce((total, price) => total += price);
        await invoiceModel.addInvoice(invoice);
        currentOrder.status_id = 600;
        await orderModel.updateOrder(currentOrder);
        props.setInvoices(await invoiceModel.getInvoices());
        props.navigation.replace("List");
      }
    }
  }

  return (
    <View style={ Base.base }>
      <Text style={ Typography.header1 }>Skapa faktura</Text>
      <Text style={ Typography.label }>Vælj order</Text>
      <OrdersDropdown
        invoice={invoice}
        setInvoice={setInvoice}
        currentOrder={currentOrder}
        setCurrentOrder={setCurrentOrder}
      />
      <DateDropDown 
        invoice={invoice}
        setInvoice={setInvoice}
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