import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from './components/Home';
import Pick from './components/pick/Pick';
import Ship from './components/ship/Ship'
import Deliveries from './components/delivery/Deliveries';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Auth from './components/auth/Auth';
import authModel from './models/auth';
import Product from './interfaces/product';
import Invoices from './components/invoice/Invoices';
import FlashMessage from 'react-native-flash-message';

const Tab = createBottomTabNavigator();
const routeIcons = {
  'Lager': 'home',
  'Plocklista': 'list',
  'Logga in': 'log-in-outline',
  'Inleveranser': 'bus-outline',
  'Fakturor': 'reader-outline',
}

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

  useEffect(() => {
    (async () => authModel.isLoggedIn());
  });

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
            {() => <Home products={products} setProducts={setProducts} /> }
          </Tab.Screen>
          <Tab.Screen name='Plocklista'>
          {() => <Pick setProducts={setProducts} />}
          </Tab.Screen>
          <Tab.Screen name='Inleveranser'>
          {() => <Deliveries setProducts={setProducts} />}
          </Tab.Screen>
          {isLoggedIn ?
            <Tab.Screen name='Fakturor'>
              {() => <Invoices />}
            </Tab.Screen> : 
            <Tab.Screen name='Logga in'>
              {() => <Auth setIsLoggedIn={ setIsLoggedIn } />}
            </Tab.Screen>
          }
          {isLoggedIn ?
            <Tab.Screen name='Logga ut'>
            {() => <Auth 
              setIsLoggedIn={ setIsLoggedIn } 
              isLoggedIn={isLoggedIn}
              />}
          </Tab.Screen> : null
          }
          <Tab.Screen name='Frakt'>
            {() => <Ship />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style='auto' />
      <FlashMessage position="top" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});