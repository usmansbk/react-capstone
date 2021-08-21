import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCountries } from '../../redux/countries/countries';

const Home = () => {
  const continent = 'Europe';

  const dispatch = useDispatch();
  const { countries, total } = useSelector((state) => {
    const data = Object.values(state.countries).reduce((accumulator, currentValue) => {
      const { All: country } = currentValue;
      accumulator.countries.push(country);
      accumulator.total += country.confirmed;

      return accumulator;
    }, {
      total: 0,
      countries: [],
    });

    data.countries = data.countries.sort((a, b) => b.confirmed - a.confirmed);
    return data;
  });

  useEffect(() => {
    if (!countries.length) {
      dispatch(fetchCountries('Europe'));
    }
  }, []);

  return (
    <section>
      <h1>
        {continent}
        {' '}
        -
        {' '}
        {total}
      </h1>
      <ul>
        {countries.map(({ country, confirmed, abbreviation }) => (
          <li key={abbreviation}>
            <Link to={`/details/${country}`}>
              {country}
              {' '}
              -
              {' '}
              {confirmed}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Home;
