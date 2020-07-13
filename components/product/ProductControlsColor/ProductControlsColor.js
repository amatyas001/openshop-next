import PropTypes from 'prop-types';
import { Text, Select } from '@chakra-ui/core';
import { FaArrowDown } from 'react-icons/fa';
import * as COLORS from '@app/config/colors';

const MemoProductControlsColor = (props) => {
  const { product, details, setDetails } = props;
  return Array.isArray(product.color) ? (
    <Select
      placeholder='Select color...'
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
      value={details.buy.color || ''}
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
      {product.color.map((item) => (
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
      {product.color}
    </Text>
  );
};

MemoProductControlsColor.propTypes = {
  /**
   * Unique item object
   */
  product: PropTypes.shape({
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
  }).isRequired,

  /**
   * Unique item object with buying details
   */
  details: PropTypes.shape({
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
 * Renders the available colors of a specific item as a select input
 * field or plain text if there is only one option.
 *
 * @see https://amatyas001.github.io/openshop-next/#productcard
 */
export const ProductControlsColor = React.memo(
  MemoProductControlsColor,
  /* istanbul ignore next */
  (prev, next) => prev.details.buy.color === next.details.buy.color
);
