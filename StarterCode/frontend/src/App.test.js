import { render, screen } from '@testing-library/react';
import ProductList from './App/Page/ProductList';

test('renders product cards', async () => {
  render(<ProductList />);
  const productElements = await screen.findAllByRole('heading', { level: 5 });
  expect(productElements.length).toBeGreaterThan(0);
});
