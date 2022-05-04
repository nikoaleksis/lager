import { useEffect, useState } from 'react';
import { ScrollView, Text, Button } from 'react-native';
import { Base, Typography } from '../../styles';
import { Card, CardTitle, CardContent } from 'react-native-material-cards';
import Delivery from '../../interfaces/delivery';
import deliveryModel from '../../models/deliveries';

export default function Deliveries({ navigation } : { navigation: any}) {
  const [deliveries, setDeliveriesList] = useState<Delivery[]>([]);
  let listOfDeliveries;
  useEffect(() => {
    (async () => setDeliveriesList(await deliveryModel.getDeliveries()))();
  }, []);

  
  listOfDeliveries = deliveries.map((delivery, index) => {
    return <Card style={Base.card} key={ index }>
      <CardTitle title={`${delivery.amount}st. ${delivery.product_name}`} />
      <CardContent text={`Levererad: ${delivery.delivery_date}`} />
      <CardContent text={`Kommentar: ${delivery.comment}`} />
    </Card>
  });
  
  return (
    <ScrollView style={Base.base}>
      <Text style={Typography.header2}>Inleveranser</Text>
      { listOfDeliveries.length === 0 ? 
        <Text style={ Typography.normalWarning }>Det finns inga inleveranser</Text> : 
        listOfDeliveries }
      <Button
        color={'#222'}
        title="Skapa ny inleverans"
        onPress={() => navigation.navigate('Form')}
      />
    </ScrollView>
  );
};