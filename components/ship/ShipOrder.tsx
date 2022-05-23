import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Base, Typography, Map } from '../../styles';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import getCoordinates from '../../models/nominatim';
import * as Location from 'expo-location';

export default function ShipOrder({ route }) {
  const { order } = route.params;
  const [marker, setMarker] = useState<any>(null);
  const [locationMarker, setLocationMarker] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string>();

  useEffect(() => {
    (async () => {
      const result = await getCoordinates(`${order.address},${order.city}`);
      const location = {
        lat: parseFloat(result[0].lat),
        lon: parseFloat(result[0].lon),
        display_name: result[0].display_name
      }

      setMarker(
        <Marker 
          coordinate={{
            latitude: location.lat,
            longitude: location.lon,
          }}
          title={location.display_name}
        />);
    })();
  }, []);

  useEffect((() => {
    (async () => {
      const {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg("Du har inte gett tillåtelse før applikationen att anvænda din lokation.");
        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocationMarker(<Marker
        coordinate={{
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        }}
        title="Min plats"
        pinColor="#228B22"
        />);
      })();
  }), []);

  return (
    <View style={Base.base}>
      <Text style={Typography.header2}>Skicka Order</Text>
      <Text style={ Typography.header3}>{ order.name }</Text>
      <Text style={ Typography.normal}>{ order.address }</Text>
      <Text style={ Typography.normal}>{ order.zip } { order.city }</Text>
      <MapView 
        initialRegion={{
          latitude: 59.9139,
          longitude: 10.7522,
          latitudeDelta: 10,
          longitudeDelta: 10,
        }}
        style={ Map.standard }
      >
        {marker}
        {locationMarker}
      </MapView>
    </View>
  )
}