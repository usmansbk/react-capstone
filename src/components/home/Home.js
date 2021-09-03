import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCountries } from '../../redux/countries/countries';
import Icon from '../Icon';
import './Home.css';
import virus from '../../assets/virus.svg';
import map from '../../assets/europe.png';

const format = (n) => n.toLocaleString('en-US');

const Item = ({ confirmed, name }) => (
  <div className="Home-item-content">
    <div className="Home-item-icon">
      <Icon name="arrow_right" />
    </div>
    <div className="Home-item-top">
      <img src={virus} alt="" className="Home-item-image" />
    </div>
    <div className="Home-item-bottom">
      <h4 className="Home-title">{name}</h4>
      <p className="Home-subtitle">{format(confirmed)}</p>
    </div>
  </div>
);

const Grid = ({ items = [] }) => (
  <ul className="Home-grid">
    {items.map(({ name, confirmed }) => (
      <li key={name} className="Home-grid-item">
        <Link to={`/country/${name}`}>
          <Item confirmed={confirmed} name={name} />
        </Link>
      </li>
    ))}
  </ul>
);

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
        <div className="Home-banner-left">
          <img src={map} alt="" className="Home-map" />
        </div>
        <div className="Home-banner-right">
          <h1 className="Home-title">{continent}</h1>
          <p className="Home-subtitle">{`${format(totalConfirmed)} cases`}</p>
        </div>
      </div>
      <section className="Home-stats">
        <h5 className="Home-stats-title">STATS BY COUNTRY</h5>
        <Grid items={items} />
      </section>
    </section>
  );
};

export default Home;

Item.propTypes = {
  confirmed: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

Grid.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(Item.propTypes)).isRequired,
};
