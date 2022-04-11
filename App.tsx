import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
//@ts-ignore
import warehouse from './assets/warehouse.jpg';
import Stock from './components/Stock';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.base}>
        <Text style={{color: '#fff', fontSize: 42, margin: 8}}>Lager-Appen</Text>
        <Image source={warehouse} style={{ 
          width: 320, 
          height: 240, 
          marginLeft: 5, 
          marginRight: 5,
          borderRadius: 150,
          borderWidth: 3,
          borderColor: '#fff' }} />
        <Stock />
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  base: {
    flex: 1,
    backgroundColor: '#333',
    paddingLeft: 12,
    paddingRight: 12,
  }
});