import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowDown } from 'react-icons/fa';
import { Box, Heading, Select } from '@chakra-ui/core';
import { filterColor } from '@app/lib/redux/actions';
import * as COLORS from '@app/config/colors';

/**
 * Extracts the unique color values of a given product list and displays
 * them as a selectable list.
 *
 * @see https://amatyas001.github.io/openshop-next/#filterpanel
 */
export const FilterColor = (props) => {
  const { products } = props;
  const { filters } = useSelector((state) => state);
  const dispatch = useDispatch();

  const colors = products.reduce((a, c) => a.concat(c.color), ['All']);

  return (
    <Box>
      <Heading
        as='label'
        htmlFor='color'
        fontSize='1.3rem'
        color={COLORS.HEADING.dark}
      >
        Color
        <Select
          icon={FaArrowDown}
          name='color'
          width='100%'
          height='43px'
          py='3px'
          fontSize='1.4rem'
          fontFamily='Khand'
          fontWeight='bold'
          bg={COLORS.BUTTON.transparent.base}
          color={COLORS.BUTTON.primary.base}
          border='0'
          borderBottom='1px'
          borderRadius='0'
          value={filters.color}
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
          onChange={(e) => {
            dispatch(filterColor(e.target.value));
          }}
          {...props}
        >
          {[...new Set(colors)].sort().map((color) => {
            return (
              <option key={color} value={color}>
                {color}
              </option>
            );
          })}
        </Select>
      </Heading>
    </Box>
  );
};

FilterColor.propTypes = {
  /**
   * List of available products
   */
  products: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ).isRequired,
};
