import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const Details = () => {
  const { country } = useParams();
  const { confirmed } = useSelector((state) => (
    state.countries.countries.find((elem) => elem.country === country)));

  return (
    <div>
      <Link to="/">Go Back</Link>
      <h1>{country}</h1>
      <h1>{confirmed}</h1>
    </div>
  );
};

export default Details;
