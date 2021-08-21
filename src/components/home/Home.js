import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCountries } from '../../redux/countries/countries';
import './Home.css';

const format = (n) => n.toLocaleString('en-US');

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
      <header className="Home-header">
        <h5 className="Home-header-title">cases</h5>
      </header>
      <div className="Home-banner">
        <h1 className="Home-title">{continent}</h1>
        <p className="Home-subtitle">{`${format(totalConfirmed)} cases`}</p>
      </div>
      <section className="Home-stats">
        <h5 className="Home-stats-title">STATS BY COUNTRY</h5>
        <ul className="Home-grid">
          {items.map(({ name, confirmed }) => (
            <li key={name} className="Home-grid-item">
              <Link to={`/country/${name}`}>
                <div className="Home-item-content">
                  <h4 className="Home-title">{name}</h4>
                  <p className="Home-subtitle">{format(confirmed)}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
};

export default Home;
