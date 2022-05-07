// __tests__/Admin.test.jsx

/**
 * @jest-environment jsdom
 */

import React from 'react';
import { act, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { MeDocument, ProductsDocument } from '../generated/graphql';
import AllProducts from '../pages/admin';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { createMockRouter } from '../test-utils/createMockRouter';
import LayoutSwitch from '../components/LayoutSwitch';
 
const noUserMock = [
  {
    request: {
      query: MeDocument,
    },
    result: {
      data: {
        me: null,
      },
    },
  },
];

const userMock = [
  {
    request: {
      query: MeDocument,
    },
    result: {
      data: {
        me: {
          id: 1,
          username: 'username',
          password: 'passoword',
        },
      },
    },
  },
  {
    request: {
      query: ProductsDocument,
      variables: {
        limit: 15,
      },
    },
    result: {
      data: {
        publicProducts: {
          hasMore: false,
          publicProducts: [{
            createdAt: '1651067825812',
            deleted: false,
            id: 1,
            imageUrl: 'https://res.cloudinary.com/dsekfgaelifhl.jpg',
            isPublic: true,
            isSold: false,
            name: 'Test product',
            price: 100,
            quantity: 1,
            updatedAt: '1651067825812',
            uuid: '4568985463-e153-4642-b819-3856298',
            __typename: 'Product',
          }],
        },
      },
    },
  },
];
 
test('admin page does not display when user is not logged in', async () => {
  const pathname = '/admin';
  const router = createMockRouter({ pathname });

  render(
    <MockedProvider mocks={noUserMock}>
      <RouterContext.Provider value={router}>
        <LayoutSwitch>
          <AllProducts />
        </LayoutSwitch>
      </RouterContext.Provider>
    </MockedProvider>,
  );

  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0));
  });

  expect(router.replace).toHaveBeenCalledWith(
    `/login?next=${pathname}`,
  );

});

test('admin page shows when user is logged in', async () => {
  const pathname = '/admin';
  const router = createMockRouter({ pathname });

  render(
    <MockedProvider mocks={userMock}>
      <RouterContext.Provider value={router}>
        <LayoutSwitch>
          <AllProducts />
        </LayoutSwitch>
      </RouterContext.Provider>
    </MockedProvider>,
  );
});