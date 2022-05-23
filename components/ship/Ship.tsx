import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShipList from './ShipList';
import ShipOrder from './ShipOrder';

const Stack = createNativeStackNavigator();

export default function Ship() {
  return (
      <Stack.Navigator initialRouteName="List">
          <Stack.Screen name="List"  options={{ title: "Fraktlista" }}>
                {(screenProps) => <ShipList {...screenProps} />}
            </Stack.Screen>
          <Stack.Screen name="Order" component={ShipOrder} options={{ title: "Karta" }} />
      </Stack.Navigator>
  );
}