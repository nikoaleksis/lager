import { render } from '@testing-library/react-native';
import Stock from '../components/stock/Stock';

jest.mock('../components/stock/StockList', () => 'StockList');

test('Header should contain text Lagerførteckning', async () => {
  const { getByText } = render(<Stock />);
  const header = await getByText('Lagerförteckning');

  expect(header).toBeDefined();
});