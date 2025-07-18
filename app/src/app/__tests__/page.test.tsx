import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
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

describe('Professional UI with Tabs', () => {
  it('renders the header and all tabs', () => {
    render(<Home />);
    expect(screen.getByText('Ocean Health Insights')).toBeInTheDocument();
    expect(screen.getByTestId('tab-home')).toBeInTheDocument();
    expect(screen.getByTestId('tab-about')).toBeInTheDocument();
    expect(screen.getByTestId('tab-data')).toBeInTheDocument();
    expect(screen.getByTestId('tab-insights')).toBeInTheDocument();
    expect(screen.getByTestId('tab-contact')).toBeInTheDocument();
  });

  it('shows Home tab content by default', () => {
    render(<Home />);
    expect(screen.getByText('Welcome to Ocean Health Insights')).toBeInTheDocument();
    expect(screen.getByText(/Python API Demo/)).toBeInTheDocument();
    expect(screen.getByText(/Counter Example/)).toBeInTheDocument();
  });

  it('switches to About tab and shows About content', () => {
    render(<Home />);
    fireEvent.click(screen.getByTestId('tab-about'));
    const tabPanel = screen.getByRole('tabpanel');
    expect(within(tabPanel).getByText('About')).toBeInTheDocument();
    expect(within(tabPanel).getByText(/This project is inspired by the Ocean Health Index/)).toBeInTheDocument();
  });

  it('switches to Data tab and shows Data content', () => {
    render(<Home />);
    fireEvent.click(screen.getByTestId('tab-data'));
    const tabPanel = screen.getByRole('tabpanel');
    expect(within(tabPanel).getByText('Data')).toBeInTheDocument();
    expect(within(tabPanel).getByText(/Data Visualization Coming Soon/)).toBeInTheDocument();
  });

  it('switches to Insights tab and shows Insights content', () => {
    render(<Home />);
    fireEvent.click(screen.getByTestId('tab-insights'));
    const tabPanel = screen.getByRole('tabpanel');
    expect(within(tabPanel).getByText('Insights')).toBeInTheDocument();
    expect(within(tabPanel).getByText(/Explore insights, analytics/)).toBeInTheDocument();
  });

  it('switches to Contact tab and shows Contact content', () => {
    render(<Home />);
    fireEvent.click(screen.getByTestId('tab-contact'));
    const tabPanel = screen.getByRole('tabpanel');
    expect(within(tabPanel).getByText('Contact')).toBeInTheDocument();
    expect(within(tabPanel).getByText(/Have questions or feedback/)).toBeInTheDocument();
    expect(within(tabPanel).getByPlaceholderText('Your Name')).toBeInTheDocument();
    expect(within(tabPanel).getByPlaceholderText('Your Email')).toBeInTheDocument();
    expect(within(tabPanel).getByPlaceholderText('Your Message')).toBeInTheDocument();
  });

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