import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowDown } from 'react-icons/fa';
import { Box, Heading, Select } from '@chakra-ui/core';
import { filterColor } from '@app/lib/redux/actions';
import * as COLORS from '@app/config/colors';
import { ProductShape } from '@app/lib/types';

/**
 * Extracts the unique color values of a given product list and displays
 * them as a selectable list.
 *
 * @see https://amatyas001.github.io/openshop-next/#filterpanel
 */
export const FilterColor = (props) => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state);
  const [colors, setColors] = React.useState(['All']);

  React.useEffect(() => {
    let list = ['All'];
    props.products.forEach((item) => {
      Array.isArray(item.color)
        ? item.color.forEach((item) => list.push(item))
        : list.push(item.color);
    });
    setColors(
      [...new Set(list)].sort().map((color) => {
        return (
          <option key={color} value={color}>
            {color}
          </option>
        );
      })
    );
  }, []);

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
          {colors}
        </Select>
      </Heading>
    </Box>
  );
};

FilterColor.propTypes = {
  /**
   * Product list where the color values are extracted from
   */
  products: PropTypes.arrayOf(PropTypes.shape({ ...ProductShape })).isRequired,
};
