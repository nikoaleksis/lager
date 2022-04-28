import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DeliveriesList from './DeliveriesList';
import DeliveryForm from './DeliveryForm';
import Product from '../../interfaces/product';

const Stack = createNativeStackNavigator();

export default function Deliveries({ setProducts } : {setProducts: (product: Array<Product>) => void}) {
  return (
    <Stack.Navigator initialRouteName="List">
      <Stack.Screen name="List" component={DeliveriesList} />
      <Stack.Screen name="Form" options={{ title: "Formulær" }}>
        {(props) => <DeliveryForm {...props} setProducts={setProducts} />}
      </Stack.Screen> 
    </Stack.Navigator>
  );
};