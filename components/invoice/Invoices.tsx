import { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InvoiceForm from './InvoiceForm';
import InvoicesList from './InvoicesList';
import invoiceModel from '../../models/invoices';
import Invoice from '../../interfaces/invoice';
import Order from '../../interfaces/order';

const Stack = createNativeStackNavigator();

export default function Invoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  
  useEffect(() => {
    (async () => setInvoices(await invoiceModel.getInvoices()))();
  }, []);

  return (
    <Stack.Navigator initialRouteName="List">
      <Stack.Screen name="List" options={{ title: "Fakturalista" }}>
        {(screenProps) => <InvoicesList
          navigation={screenProps.navigation}
          invoices={invoices}
          setInvoices={setInvoices}
        />}
      </Stack.Screen>
      <Stack.Screen name="Form" options={{ title: "Formulær" }}>
        {(screenProps) => <InvoiceForm
          navigation={screenProps.navigation}
          invoices={invoices}
          setInvoices={setInvoices}
        />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};