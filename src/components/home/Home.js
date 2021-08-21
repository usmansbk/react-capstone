import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCountries } from '../../redux/countries/countries';

const Home = () => {
  const continent = 'Europe';

  const dispatch = useDispatch();
  const { items, totalConfirmed, loading } = useSelector((state) => ({
    ...state.countries,
    loading: state.loadingBar.default,
  }));

  useEffect(() => {
    if (!items.length) {
      dispatch(fetchCountries(continent));
    }
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <section>
      <h1>
        {continent}
        {' '}
        -
        {' '}
        {totalConfirmed}
      </h1>
      <ul>
        {items.map(({ name, confirmed }) => (
          <li key={name}>
            <Link to={`/country/${name}`}>
              {name}
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
