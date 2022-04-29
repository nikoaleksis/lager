import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InvoiceForm from './InvoiceForm';
import Order from '../../interfaces/order';

const Stack = createNativeStackNavigator();

type InvoicesProps = {
  orders: Order[],
  setOrders: (orders: Order[]) => void,
};

export default function Invoices(props: InvoicesProps) {
  return (
    <Stack.Navigator initialRouteName="Form">
      {/*<Stack.Screen name="List" component={InvoicesList} />*/}
      <Stack.Screen name="Form" options={{ title: "Formulær" }}>
        {(screenProps) => <InvoiceForm orders={props.orders} setOrders={props.setOrders} />}
      </Stack.Screen> 
    </Stack.Navigator>
  );
};