const API_BASE = 'https://covid-api.mmediagroup.fr/v1/cases';

const LOAD_COUNTRIES = 'cases/load-countries';

const loadCountries = (payload) => ({
  type: LOAD_COUNTRIES,
  payload,
});

export const fetchCountries = (continent) => async (dispatch) => {
  const response = await fetch(`${API_BASE}?continent=${continent}`);
  const map = await response.json();

  const data = Object.values(map).reduce((accumulator, currentValue) => {
    const { All: country } = currentValue;
    accumulator.countries.push(country);
    accumulator.total += country.confirmed;

    return accumulator;
  }, {
    continent,
    total: 0,
    countries: [],
  });

  data.countries = data.countries.sort((a, b) => b.confirmed - a.confirmed);

  dispatch(loadCountries(data));
};

const initialState = {
  total: 0,
  countries: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_COUNTRIES:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
