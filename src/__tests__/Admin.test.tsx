// __tests__/Admin.test.jsx

/**
 * @jest-environment jsdom
 */

import React from 'react';
import { act, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { MeDocument } from '../generated/graphql';
import AllProducts from '../pages/admin';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { createMockRouter } from '../test-utils/createMockRouter';
import LayoutSwitch from '../components/LayoutSwitch';
 
const mocks = [
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
 
test('admin page does not display when user is not logged in', async () => {
  const pathname = '/admin';
  const router = createMockRouter({ pathname });

  render(
    <MockedProvider mocks={mocks}>
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
 