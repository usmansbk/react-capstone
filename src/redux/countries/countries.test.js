import reducer, { loadCountries, loadCountry } from './countries';

test('should return the initial state', () => {
  const initialState = {
    total: 0,
    list: [],
    selected: null,
  };

  expect(reducer(undefined, {})).toEqual(initialState);
});

test('should handle adding countries data', () => {
  const prevState = {
    total: 0,
    list: [],
  };

  const list = [
    { country: 'Testing country 1', confirmed: 3 },
    { country: 'Testing country 2', confirmed: 2 },
  ];

  const newState = reducer(prevState, loadCountries({
    list,
    total: 5,
  }));

  expect(newState).toEqual({
    total: 5,
    list,
  });
});

test('should add selected country data', () => {
  const prevState = {
    total: 0,
    list: [],
    selected: null,
  };

  const data = {
    All: {
      country: 'Testing',
    },
  };

  const newState = reducer(prevState, loadCountry(data));

  expect(newState).toEqual({
    total: 0,
    list: [],
    selected: data,
  });
});
