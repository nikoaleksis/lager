import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderList from './OrderList';
import PickList from './PickList';
import Product from '../../interfaces/product';
import Order from '../../interfaces/order';

const Stack = createNativeStackNavigator();

type PickProps = {
    setProducts: (products: Product[]) => void,
}

export default function Pick(props: PickProps) {
    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List"  options={{ title: "Lista på ordrar" }}>
                {(screenProps) => <OrderList {...screenProps} />}
            </Stack.Screen>
            <Stack.Screen name="Details" options={{ title: "Detaljer" }}>
                {(screenProps) => <PickList {...screenProps} setProducts={props.setProducts} />}
            </Stack.Screen> 
        </Stack.Navigator>
    );
}