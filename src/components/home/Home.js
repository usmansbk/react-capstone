import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCountries } from '../../redux/countries/countries';

const Home = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);

  useEffect(() => {
    dispatch(fetchCountries('Europe'));
  }, []);

  return (
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
  );
};

export default Home;
