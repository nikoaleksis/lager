import { render } from '@testing-library/react-native';
import InvoicesList from '../components/invoice/InvoicesList';

jest.useFakeTimers();
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

const invoices = [
  {
    id: 1,
    name: 'Test1',
    due_date: new Date(),
  },
  {
    id: 2,
    name: 'Test2',
    due_date: new Date(),
  },
]

const invoicesList = (
  <InvoicesList 
    invoices={invoices}
    setInvoices={jest.fn()}
    navigation={{
      navigate: jest.fn()
    }}
  />
);

test('Render n amount of invoices depending on list size', async () => {
  const { getAllByA11yLabel } = render(invoicesList);
  const buttons = await getAllByA11yLabel('Klicka før mer info');

  expect(buttons.length).toBe(2);
})