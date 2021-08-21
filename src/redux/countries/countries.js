import { showLoading, hideLoading } from 'react-redux-loading-bar';

const API_BASE = 'https://covid-api.mmediagroup.fr/v1/cases';

const LOAD_COUNTRIES = 'cases/load-countries';
const GET_COUNTRY = 'cases/get-country';

const loadCountries = (payload) => ({
  type: LOAD_COUNTRIES,
  payload,
});

const loadCountry = (payload) => ({
  type: GET_COUNTRY,
  payload,
});

export const fetchCountry = (name) => async (dispatch) => {
  dispatch(showLoading());
  const response = await fetch(`${API_BASE}?country=${name}`);
  const data = await response.json();

  dispatch(loadCountry(data));
  dispatch(hideLoading());
};

export const fetchCountries = (continent) => async (dispatch) => {
  dispatch(showLoading());
  const response = await fetch(`${API_BASE}?continent=${continent}`);
  const map = await response.json();

  const data = Object.values(map).reduce((accumulator, currentValue) => {
    const { All: country } = currentValue;
    accumulator.list.push(country);
    accumulator.total += country.confirmed;

    return accumulator;
  }, {
    total: 0,
    list: [],
  });

  data.list = data.list.sort((a, b) => b.confirmed - a.confirmed);

  dispatch(loadCountries(data));
  dispatch(hideLoading());
};

const initialState = {
  total: 0,
  list: [],
  selected: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_COUNTRIES:
      return action.payload;
    case GET_COUNTRY:
      return { ...state, selected: action.payload };
    default:
      return state;
  }
};

export default reducer;
