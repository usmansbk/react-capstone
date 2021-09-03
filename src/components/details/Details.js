import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchCountry } from '../../redux/countries/countries';
import Icon from '../Icon';
import map from '../../assets/europe.png';
import './Details.css';

const format = (n) => n.toLocaleString('en-US');

const Details = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const { country, loading } = useSelector((state) => ({
    loading: state.loadingBar.default,
    country: state.countries.selected,
  }));

  useEffect(() => {
    dispatch(fetchCountry(name));
  }, []);

  if (loading || !country) {
    return null;
  }

  const { All } = country;

  return (
    <section>
      <header className="App-header">
        <Link to="/">
          <Icon name="arrow_back_ios" />
        </Link>
        <h5 className="App-header-title">town/city views</h5>
      </header>
      <div className="Details-banner">
        <div className="Details-banner-left">
          <img src={map} alt="" className="App-map" />
        </div>
        <div className="Details-banner-right">
          <h1 className="App-title">{All.country}</h1>
          <p className="App-subtitle">{`${format(All.confirmed)} cases`}</p>
        </div>
      </div>
      <section className="Home-stats">
        <h5 className="App-section-title">CITY/TOWN BREAKDOWN - 2021</h5>
      </section>
    </section>
  );
};

export default Details;
