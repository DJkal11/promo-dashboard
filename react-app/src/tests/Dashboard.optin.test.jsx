import { jest, beforeEach, afterEach, describe, test, expect } from '@jest/globals';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Dashboard from '../pages/Dashboard.jsx';

// Mock SWR
import useSWR, { mutate } from 'swr';
jest.mock('swr', () => {
  const actual = jest.requireActual('swr');
  return {
    __esModule: true,
    default: jest.fn(),
    mutate: jest.fn(),
  };
});

// Mock API helpers
jest.mock('../fetch', () => {
  return {
    fetcher: jest.fn(), // not used directly here
    patchJson: jest.fn(),
  };
});

import { patchJson } from '../fetch';

beforeEach(() => {
  useSWR.mockReturnValue({
    data: [
      { id: 1, title: 'Welcome Bonus', category: 'Casino', active: false, startDate: '2025-08-01', endDate: '2025-08-31', optedIn: false },
    ],
    isLoading: false,
    error: undefined,
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

test('clicking toggle calls PATCH with optedIn/active synced and then revalidates', async () => {
  patchJson.mockResolvedValueOnce({ id: 1, optedIn: true, active: true });
  render(<Dashboard />);

  // In current UI copy: inactive & not opted in → button reads "Opt In"
  const btn = screen.getByRole('button', { name: /Opt In/i });
  fireEvent.click(btn);

  // PATCH called with both fields toggled true
  expect(patchJson).toHaveBeenCalledWith('/promotions/1', { optedIn: true, active: true });

  // After success, we should revalidate via mutate(...)
  await waitFor(() => {
    expect(mutate).toHaveBeenCalled();
  });
});
