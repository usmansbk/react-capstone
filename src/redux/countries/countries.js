const API_BASE = 'https://covid-api.mmediagroup.fr/v1/cases';

const LOAD_COUNTRIES = 'cases/load-countries';

const loadCountries = (payload) => ({
  type: LOAD_COUNTRIES,
  payload,
});

export const fetchCountries = (continent = 'Europe') => async (dispatch) => {
  const response = await fetch(`${API_BASE}?continent=${continent}`);
  const map = await response.json();
  const countries = Object.values(map).map(({ All }) => All);
  dispatch(loadCountries(countries.sort((a, b) => b.confirmed - a.confirmed)));
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_COUNTRIES:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
