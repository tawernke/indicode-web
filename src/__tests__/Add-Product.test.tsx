// __tests__/Add-Product.test.jsx

/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateProduct from '../pages/admin/create-product';
import { MockedProvider } from '@apollo/client/testing';
import { MeDocument } from '../generated/graphql';

const mocks = [
  {
    request: {
      query: MeDocument,
    },
    result: {
      data: {
        me: { id: 1, username: 'Admin' },
      },
    },
  },
];

test('shows product validation errors', async () => {
  render(
    <MockedProvider mocks={mocks}>
      <CreateProduct />
    </MockedProvider>,
  );

  const addProductButton = screen.getByText('Add Product');

  const user = userEvent.setup();
  user.click(addProductButton);
  
  await waitFor(() => {
    const nameError = screen.queryByTestId('nameError');
    const priceError = screen.queryByTestId('priceError');

    expect(nameError?.textContent).toMatch(
      'name is a required field',
    );
    expect(priceError?.textContent).toMatch(
      'price must be greater than 0',
    );
  });
});
