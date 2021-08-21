import { showLoading, hideLoading } from 'react-redux-loading-bar';
import * as API from './api';

const LOAD_COUNTRIES = 'cases/load-countries';
const LOAD_COUNTRY = 'cases/load-country';

export const loadCountries = (payload) => ({
  type: LOAD_COUNTRIES,
  payload,
});

export const loadCountry = (payload) => ({
  type: LOAD_COUNTRY,
  payload,
});

export const fetchCountry = (name) => async (dispatch) => {
  dispatch(showLoading());
  const data = await API.getCountry(name);

  dispatch(loadCountry(data));
  dispatch(hideLoading());
};

export const fetchCountries = (continent) => async (dispatch) => {
  dispatch(showLoading());
  const map = await API.getCountries(continent);

  const data = Object.values(map).reduce((accumulator, currentValue) => {
    const { All: { country, confirmed } } = currentValue;

    accumulator.list.push({ name: country, confirmed });
    accumulator.total += confirmed;

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
    case LOAD_COUNTRY:
      return { ...state, selected: action.payload };
    default:
      return state;
  }
};

export default reducer;
