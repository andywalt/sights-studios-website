import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AIRescueSection from './AIRescueSection';

const renderComponent = () =>
  render(<BrowserRouter><AIRescueSection /></BrowserRouter>);

test('renders the main headline', () => {
  renderComponent();
  expect(screen.getByText(/Your AI App Isn't Working/i)).toBeInTheDocument();
});

test('renders Schedule a Call CTA', () => {
  renderComponent();
  expect(screen.getByText(/Schedule a Call/i)).toBeInTheDocument();
});

test('renders Learn More link', () => {
  renderComponent();
  expect(screen.getByText(/Learn More/i)).toBeInTheDocument();
});

test('renders all four symptom tags', () => {
  renderComponent();
  expect(screen.getByText('Broken builds')).toBeInTheDocument();
  expect(screen.getByText('Stalled MVPs')).toBeInTheDocument();
  expect(screen.getByText('AI code debt')).toBeInTheDocument();
  expect(screen.getByText('Ghost developers')).toBeInTheDocument();
});
