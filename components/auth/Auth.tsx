import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './Login';
import Logout from './Logout';
import Register from './Register';

const Stack = createNativeStackNavigator();


export default function Auth({setIsLoggedIn, isLoggedIn} : {setIsLoggedIn: () => Boolean, isLoggedIn: Boolean}) {
  return (
    <Stack.Navigator initialRouteName={isLoggedIn ? "Logout" : "Login"}>
      <Stack.Screen name="Login" options={{ title: "Logga in" }}>
        {(props) => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Logout" options={{ title: "Logga ut" }}>
        {(props) => <Logout {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
;}