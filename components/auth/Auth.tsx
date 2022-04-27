import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './Login';

const Stack = createNativeStackNavigator();


export default function Auth({setIsLoggedIn} : {setIsLoggedIn: () => Boolean}) {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" options={{ title: "Logga in" }}>
        {(props) => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
      {/*<Stack.Screen name="Register" component={Register} />*/}
    </Stack.Navigator>
  );
;}