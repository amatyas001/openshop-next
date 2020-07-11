import PropTypes from 'prop-types';

export const ProductShape = {
  id: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  description: PropTypes.string,
  gender: PropTypes.string,
  img: PropTypes.string,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  review: PropTypes.string,
  sizes: PropTypes.arrayOf(PropTypes.string),
  starrating: PropTypes.number.isRequired,
};

export const FieldShape = PropTypes.arrayOf(
  PropTypes.shape({
    name: PropTypes.string.isReguired,
    type: PropTypes.string.isReguired,
    placeholder: PropTypes.string.isReguired,
  })
);
