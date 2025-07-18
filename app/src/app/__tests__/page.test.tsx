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

describe('Tab navigation and content', () => {
  it('shows Features tab content', () => {
    render(<Home />);
    fireEvent.click(screen.getByTestId('tab-features'));
    // The first 'Features' is the tab, the second is the card title
    expect(screen.getAllByText('Features')[1]).toBeInTheDocument();
    expect(screen.getByText(/Blazing fast Next.js frontend/i)).toBeInTheDocument();
    expect(screen.getByText(/Python FastAPI backend integration/i)).toBeInTheDocument();
  });

  it('shows Pricing tab content', () => {
    render(<Home />);
    fireEvent.click(screen.getByTestId('tab-pricing'));
    expect(screen.getAllByText('Pricing')[1]).toBeInTheDocument();
    expect(screen.getByText('Free')).toBeInTheDocument();
    expect(screen.getByText('Pro')).toBeInTheDocument();
    expect(screen.getByText('Enterprise')).toBeInTheDocument();
  });

  it('shows About tab content', () => {
    render(<Home />);
    fireEvent.click(screen.getByTestId('tab-about'));
    expect(screen.getAllByText('About Us')[0]).toBeInTheDocument();
    // The first 'Cursor Agents' is the <b> in the card, the second is in the footer
    expect(screen.getAllByText(/Cursor Agents/)[0]).toBeInTheDocument();
    expect(screen.getByText(/Lead Developer/)).toBeInTheDocument();
  });

  it('shows Contact tab content and submits form', () => {
    render(<Home />);
    fireEvent.click(screen.getByTestId('tab-contact'));
    expect(screen.getAllByText('Contact')[1]).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your Message')).toBeInTheDocument();
    // Simulate form submission
    fireEvent.change(screen.getByPlaceholderText('Your Name'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByPlaceholderText('Your Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Your Message'), { target: { value: 'Hello!' } });
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
  });
}); 