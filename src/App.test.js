import { render, screen } from './test-utils';
import App from './App';

test('fetches countries data after render', () => {
  render(<App />);

  expect(screen.getByText(/Loading.../)).toBeInTheDocument();
});
