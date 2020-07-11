import PropTypes from 'prop-types';
import { Text, Select } from '@chakra-ui/core';
import { FaArrowDown } from 'react-icons/fa';
import * as COLORS from '@app/config/colors';
import { ProductShape } from '@app/lib/types';

/**
 * Renders the available colors of a specific item as a select input
 * field or plain text if there is only one option.
 *
 * @see https://amatyas001.github.io/openshop-next/#productcard
 */
export const ProductControlsColor = React.memo(
  (props) => {
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
  },
  /* istanbul ignore next */
  (prev, next) => prev.details.buy.color === next.details.buy.color
);

ProductControlsColor.propTypes = {
  /**
   * Unique item object
   */
  product: PropTypes.shape({ ...ProductShape }).isRequired,

  /**
   * Unique item object with buying details
   */
  details: PropTypes.shape({
    ...ProductShape,
    buy: PropTypes.shape({
      amount: PropTypes.number.isRequired,
      size: PropTypes.string,
      color: PropTypes.string,
    }),
  }).isRequired,

  /**
   * Set buying details
   */
  setDetails: PropTypes.func.isRequired,
};
