import { ScrollView, Button, Text, TouchableOpacity, Alert } from 'react-native';
import { Base, Typography, Table } from '../../styles';
import { DataTable } from 'react-native-paper';
import invoiceModel from '../../models/invoices';
import Invoice from '../../interfaces/invoice';

type InvoiceListProps = {
  invoices: Invoice[],
  setInvoices: (invoices: Invoice[]) => void,
  navigation: any,
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const year = date.getUTCFullYear();
  const month = 
    (date.getUTCMonth() + 1).toString().length === 1 ?
    `0${date.getUTCMonth() + 1}` : date.getUTCMonth() + 1;
  const day = 
    (date.getUTCDate()).toString().length === 1 ?
    `0${date.getUTCDate() + 1}` : date.getUTCDate();
  
  return `${year}-${month}-${day}`
}

function showInvoiceDetails(invoice: Partial<Invoice>) {
  Alert.alert(
    "Fakturadetaljer",
    `Namn: ${invoice.name}
    Adress: ${invoice.address}
    Postkod: ${invoice.zip}
    Stad: ${invoice.city}
    Skapad: ${formatDate(invoice.creation_date as string)}
    Førfallodatum: ${formatDate(invoice.due_date as string)}
    Pris: ${invoice.total_price}SEK`,
    [
      { text: "Ok", }
    ]
);
}

export default function InvoiceList(props: InvoiceListProps) {
  const table = props.invoices.map((invoice) => {
    return (
      <TouchableOpacity 
        accessibilityLabel="Klicka før mer info"
        key={invoice.id} 
        onPress={() => showInvoiceDetails(invoice)} >
        <DataTable.Row >
          <DataTable.Cell><Text style={{ color: '#fff' }}>{invoice.name}</Text></DataTable.Cell>
          <DataTable.Cell numeric><Text style={{ color: '#fff' }}>{formatDate(invoice.due_date)}</Text></DataTable.Cell>
        </DataTable.Row>
      </TouchableOpacity>
    );
  });

  return (
    <ScrollView style={ Base.base }>
      <Text style={ Typography.header3 }>Alla fakturor</Text>
      <DataTable>
        <DataTable.Header style={ Table.tableBackground }>
          <DataTable.Title><Text style={ Table.tableFontColor}>Namn</Text></DataTable.Title>
          <DataTable.Title numeric><Text style={ Table.tableFontColor}>Førfallodatum</Text></DataTable.Title>
        </DataTable.Header>
        {table}
      </DataTable>
      <Button
        color='#222'
        title='Skapa ny faktura'
        onPress={() => props.navigation.navigate('Form')}
      />
    </ScrollView>
  )
}