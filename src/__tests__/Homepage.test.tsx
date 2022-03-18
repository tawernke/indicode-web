import { MockedProvider } from '@apollo/client/testing';
import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import Index from '../pages';

// afterEach(() => server.resetHandlers())

it('loads the homepage products', async () => {
  const { debug } = render(
    <MockedProvider>
      <Index />
    </MockedProvider>
  )

  debug()
})