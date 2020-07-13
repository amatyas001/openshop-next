import PropTypes from 'prop-types';
import { Text, Select } from '@chakra-ui/core';
import { FaArrowDown } from 'react-icons/fa';
import * as COLORS from '@app/config/colors';

const MemoProductControlsSize = (props) => {
  const { product, details, setDetails } = props;
  return product.sizes ? (
    <Select
      placeholder='Select size...'
      icon={FaArrowDown}
      height='50px'
      width='85%'
      fontSize='1.4rem'
      fontFamily='Khand'
      fontWeight='bold'
      mx='auto'
      bg={COLORS.BUTTON.transparent.base}
      color={COLORS.BUTTON.primary.base}
      border='0'
      borderRadius='0'
      value={details.buy.size || ''}
      onChange={(e) => setDetails(e.target.value)}
      _hover={{
        ...COLORS.BUTTON.transparent.hover,
        color: COLORS.BUTTON.primary.hover.bg,
        textDecoration: 'none',
        cursor: 'pointer',
      }}
      _focus={{
        ...COLORS.BUTTON.transparent.hover,
        color: COLORS.BUTTON.primary.hover.bg,
        textDecoration: 'none',
      }}
      _select={{
        ...COLORS.BUTTON.transparent.hover,
        color: COLORS.BUTTON.primary.hover.bg,
        textDecoration: 'none',
      }}
      _active={{
        ...COLORS.BUTTON.transparent.hover,
        color: COLORS.BUTTON.primary.hover.bg,
        textDecoration: 'none',
      }}
    >
      {product.sizes.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </Select>
  ) : (
    <Text
      color={COLORS.BUTTON.primary.base}
      fontFamily='Khand'
      fontSize='1.4rem'
      fontWeight='bold'
      mx='auto'
    >
      One Size
    </Text>
  );
};

MemoProductControlsSize.propTypes = {
  /**
   * Unique product object
   */
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    color: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    description: PropTypes.string,
    gender: PropTypes.string,
    img: PropTypes.string,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    review: PropTypes.string,
    sizes: PropTypes.arrayOf(PropTypes.string),
    starrating: PropTypes.number.isRequired,
  }).isRequired,

  /**
   * Unique product object and its buying details
   */
  details: PropTypes.shape({
    id: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    color: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    description: PropTypes.string,
    gender: PropTypes.string,
    img: PropTypes.string,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    review: PropTypes.string,
    sizes: PropTypes.arrayOf(PropTypes.string),
    starrating: PropTypes.number.isRequired,
    buy: PropTypes.shape({
      amount: PropTypes.number.isRequired,
      size: PropTypes.string,
      color: PropTypes.string,
    }),
  }).isRequired,

  /**
   * Handler to set product buying details in wrapper
   */
  setDetails: PropTypes.func.isRequired,
};

/**
 * Renders a select input element with available product sizes as options
 * or plain *One Size* text if there are no sizes given.
 *
 * @see https://amatyas001.github.io/openshop-next/#productcard
 */
export const ProductControlsSize = React.memo(
  MemoProductControlsSize,
  /* istanbul ignore next */
  (prev, next) => prev.details.buy.size === next.details.buy.size
);
