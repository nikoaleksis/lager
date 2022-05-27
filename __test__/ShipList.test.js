import { render } from '@testing-library/react-native';
import React from 'react';
import ShipList from '../components/ship/ShipList';

jest.mock('@react-navigation/native', () => ({
  useIsFocused: jest.fn(),
}));

const shipList = (
  <ShipList
    navigation={{ 
      navigate: jest.fn()
    }}
  />
);

test('Testing that the ShipList component contains the correct title', async () => {
  const title = 'Ordrar redo att skickas';
  const { getByText } = render(shipList);
  const header = await getByText(title);

  expect(header).toBeDefined();
});

test('Testing that n amount of buttons are rendered depending on size of orders', async () => {
  const orders = [
    {
      name: 'Test1',
      id: 1
    },
    {
      name: 'Test2',
      id: 2
    },
    {
      name: 'Test3',
      id: 3
    },
  ];
  
  jest
    .spyOn(React, 'useState')
    .mockImplementationOnce(() => React.useState(orders));

  const { getByText } = render(shipList);

  const firstButton = getByText(orders[0].name);
  const secondButton = getByText(orders[1].name);
  const thirdButton = getByText(orders[2].name);
  
  expect(firstButton).toBeDefined();
  expect(secondButton).toBeDefined();
  expect(thirdButton).toBeDefined();
});