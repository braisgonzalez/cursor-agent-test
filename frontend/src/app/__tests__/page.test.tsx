import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../page';
import '@testing-library/jest-dom';

// Mock fetch for API call
beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ body: 'Hello from Python!' }),
    })
  );
});

afterAll(() => {
  // @ts-ignore
  global.fetch.mockRestore?.();
});

describe('Home page', () => {
  it('renders the counter and increments/decrements', () => {
    render(<Home />);
    const plusBtn = screen.getByRole('button', { name: '+' });
    const minusBtn = screen.getByRole('button', { name: '-' });
    expect(screen.getByText('0')).toBeInTheDocument();
    fireEvent.click(plusBtn);
    expect(screen.getByText('1')).toBeInTheDocument();
    fireEvent.click(minusBtn);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('calls the API and displays the result', async () => {
    render(<Home />);
    const apiBtn = screen.getByRole('button', { name: /call hello\.py api/i });
    fireEvent.click(apiBtn);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Hello from Python!')).toBeInTheDocument();
    });
  });

  it('changes the background color when clicking Change Background Color', () => {
    render(<Home />);
    const colorBtn = screen.getByRole('button', { name: /change background color/i });
    const pageDiv = screen.getByTestId('page-container');
    const initialBg = pageDiv.style.background;
    fireEvent.click(colorBtn);
    expect(pageDiv.style.background).not.toBe(initialBg);
  });
}); 