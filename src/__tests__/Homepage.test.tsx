import { MockedProvider } from '@apollo/client/testing';
import React from 'react';
import { render } from '@testing-library/react';
import Index from '../pages';

it('loads the homepage products', async () => {
  render(
    <MockedProvider>
      <Index />
    </MockedProvider>,
  );
});