import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderList from './OrderList';
import PickList from './PickList';

const Stack = createNativeStackNavigator();

export default function Pick({ setProducts } : {setProducts: () => void}) {
    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List" component={OrderList} options={{ title: "Lista på ordrar" }} />
            <Stack.Screen name="Details" options={{ title: "Detaljer" }}>
                {(props) => <PickList {...props} setProducts={setProducts} />}
            </Stack.Screen> 
        </Stack.Navigator>
    );
}