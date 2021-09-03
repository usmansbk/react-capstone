import PropTypes from 'prop-types';

const Icon = ({ name }) => <span className="material-icons">{name}</span>;

export default Icon;

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};
