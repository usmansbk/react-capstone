import { render, screen, fireEvent } from './test-utils';
import App from './App';

jest.mock('./redux/countries/api.js');

test('home page should fetch and render countries', async () => {
  render(<App />);

  expect(screen.getByText(/Loading.../)).toBeInTheDocument();
  expect(await screen.findByText(/Loading.../)).not.toBeInTheDocument();
});

test('details page should fetch and render country', async () => {
  render(<App />);

  fireEvent.click(screen.getByText(/Testing1/));
  expect(screen.getByText(/Loading.../)).toBeInTheDocument();

  expect(await screen.findByText(/Testing3/)).toBeInTheDocument();
});
