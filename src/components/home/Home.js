import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCountries } from '../../redux/countries/countries';

const Home = () => {
  const continent = 'Europe';

  const dispatch = useDispatch();
  const { countries, total } = useSelector((state) => state.countries);

  useEffect(() => {
    if (!countries.length) {
      dispatch(fetchCountries(continent));
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
            <Link to={`/country/${country}`}>
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
