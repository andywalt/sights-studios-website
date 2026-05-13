import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../components/Navbar/navBar', () => () => <nav data-testid="navbar" />);

import AIRescuePage from './AIRescuePage';

const renderPage = () =>
  render(<BrowserRouter><AIRescuePage /></BrowserRouter>);

test('renders the hero headline', () => {
  renderPage();
  expect(screen.getByText(/Isn't a Lost Cause/i)).toBeInTheDocument();
});

test('renders all three process steps', () => {
  renderPage();
  expect(screen.getByText('Assess')).toBeInTheDocument();
  expect(screen.getByText('Fix or Rebuild')).toBeInTheDocument();
  expect(screen.getByText('Hand Off')).toBeInTheDocument();
});

test('renders two Schedule a Call CTAs', () => {
  renderPage();
  const ctas = screen.getAllByText(/Schedule a Call/i);
  expect(ctas.length).toBe(2);
});

test('renders tool names in Who This Is For section', () => {
  renderPage();
  expect(screen.getByText('Cursor')).toBeInTheDocument();
  expect(screen.getByText('Bolt')).toBeInTheDocument();
  expect(screen.getByText('Lovable')).toBeInTheDocument();
  expect(screen.getByText('v0')).toBeInTheDocument();
});
