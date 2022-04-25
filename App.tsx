import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from './components/Home';
import Pick from './components/Pick';
import Deliveries from './components/Deliveries';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const routeIcons = {
  'Lager': 'home',
  'Plock': 'list'
}

export default function App() {
  const [products, setProducts] = useState([]);
  
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
        let iconName = routeIcons[route.name] || 'alert';

        return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
      })}
      >
          <Tab.Screen name='Lager'>
            {() => <Home products={products} setProducts={setProducts} />}
          </Tab.Screen>
          <Tab.Screen name='Plocklista'>
          {() => <Pick setProducts={setProducts} />}
          </Tab.Screen>
          <Tab.Screen name='Inleveranser'>
          {() => <Deliveries setProducts={ setProducts }/>}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style='auto' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});