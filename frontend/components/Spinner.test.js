// Import the Spinner component into this file and test
// that it renders what it should for the different props it can take.
import Spinner from './Spinner';
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Spinner component', () => {
  test('renders nothing when "on" prop is false', () => {
    const { container } = render(<Spinner on={false} />);
    expect(container.firstChild).toBeNull();
  });

  test('renders spinner and message when "on" prop is true', () => {
    render(<Spinner on={true} />);
    expect(screen.getByText('Please wait...')).toBeInTheDocument();
    expect(screen.getByText('.')).toBeInTheDocument(); // The spinning dot
  });

})