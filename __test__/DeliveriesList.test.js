import { render } from '@testing-library/react-native';
import React from 'react';
import DeliveriesList from '../components/delivery/DeliveriesList';

const deliveriesList = (
  <DeliveriesList 
    navigation={{
      navigate: jest.fn()
    }} 
  />
);

test('it should render deliveries based on amount in list', async () => {
  const deliveries = [
    {
      amount: 2,
      product_name: 'Test1',
      delivery_date: new Date(),
      comment: 'asdlkdsalkj',
    },
    {
      amount: 3,
      product_name: 'Test2',
      delivery_date: new Date(),
      comment: 'asdlkdsalkj',
    },
  ];

  jest
    .spyOn(React, 'useState')
    .mockImplementationOnce(() => React.useState(deliveries));
  
  const { getByText } = render(deliveriesList);

  const firstDelivery = getByText(`${deliveries[0].amount}st. ${deliveries[0].product_name}`);
  const secondDelivery = getByText(`${deliveries[1].amount}st. ${deliveries[1].product_name}`);
  
  expect(firstDelivery).toBeDefined();
  expect(secondDelivery).toBeDefined();
});
