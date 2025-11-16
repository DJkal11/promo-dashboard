import { jest, beforeEach, afterEach, describe, test, expect } from '@jest/globals';

import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from '../pages/Dashboard.jsx';

// Mock SWR so we control data without real network
import useSWR from 'swr';
jest.mock('swr', () => {
  const actual = jest.requireActual('swr');
  return {
    __esModule: true,
    default: jest.fn(),
    mutate: jest.fn(),
  };
});

const sample = [
  { id: 1, title: 'Welcome Bonus', category: 'Casino', active: true,  startDate: '2025-08-01', endDate: '2025-08-31', optedIn: false },
  { id: 2, title: 'Sports Free Bet', category: 'Sports', active: true, startDate: '2025-11-01', endDate: '2025-12-01', optedIn: true },
];

beforeEach(() => {
  useSWR.mockReturnValue({
    data: sample,
    isLoading: false,
    error: undefined,
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renders promotion cards from SWR data', () => {
  render(<Dashboard />);
  expect(screen.getByText('Welcome Bonus')).toBeInTheDocument();
  expect(screen.queryByText('No promotions match your filters.')).not.toBeInTheDocument();
});

test('client filters reduce visible items (category + date)', () => {
  render(<Dashboard />);

  // Category: Casino
  const categorySelect = screen.getByLabelText(/Category/i);
  fireEvent.change(categorySelect, { target: { value: 'Casino' } });

  // Start date beyond item #1's end -> should exclude item #1 if we set start after its end
  const startInput = screen.getByLabelText(/Start date/i);
  fireEvent.change(startInput, { target: { value: '2025-09-01' } });

  // No need to click Apply because client filtering runs on render
  // (Apply triggers SWR revalidate; our data is static here.)
  expect(screen.queryByText('Welcome Bonus')).not.toBeInTheDocument();
  // Both items are filtered out -> show empty state
 expect(screen.getByText('No promotions match your filters.')).toBeInTheDocument();
});
