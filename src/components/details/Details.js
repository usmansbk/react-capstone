import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchCountry } from '../../redux/countries/countries';

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
    return <h1>Loading...</h1>;
  }

  const { All } = country;

  return (
    <div>
      <Link to="/">Go Back</Link>
      <h1>{All.country}</h1>
      <h1>{All.confirmed}</h1>
    </div>
  );
};

export default Details;
