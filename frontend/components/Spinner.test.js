// Import the Spinner component into this file and test
// that it renders what it should for the different props it can take.
test('sanity', () => {
  expect(true).toBe(true)
})
import Spinner from './Spinner';
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Spinner Component', () => {
  test('renders loading spinner when loading is true', () => {
    render(<Spinner loading={true} />);
    const spinnerElement = screen.getByTestId('spinner');
    expect(spinnerElement).toBeInTheDocument();
  });

  test('renders nothing when loading is false', () => {
    const { container } = render(<Spinner loading={false} />);
    expect(container.firstChild).toBeNull();
  });

  test('renders error message when error is provided', () => {
    const errorMessage = 'An error occurred';
    render(<Spinner loading={false} error={errorMessage} />);
    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
  });
});
