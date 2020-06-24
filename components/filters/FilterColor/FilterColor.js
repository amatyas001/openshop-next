import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Heading, Select } from '@chakra-ui/core';
import { filterColor } from '@app/redux/actions';

/**
 * Displays available all available color as a single `option` element in a
 * labelled `select` input field.
 *
 * Extracts the colors from passed items array and converts the list into
 * a `Set` of item colors in alphabetically ascending order.
 *
 * > ***State***
 * > - `filters.color`
 *
 * > ***Elements***
 * > - [Select](https://chakra-ui.com/select)
 *
 * @example
 * ```jsx
 * <FilterColor items={itemsArray} />
 * ```
 */
export const FilterColor = (props) => {
  const dispatch = useDispatch();
  const { filters = { color: 'All' } } = useSelector((state) => state);

  const [colors, setColors] = React.useState(['All']);

  React.useEffect(() => {
    let list = ['All'];
    props.items.forEach((item) => list.push(item.color));
    setColors(
      [...new Set(list)].sort().map((c) => {
        return (
          <option key={c} value={c}>
            {c}
          </option>
        );
      })
    );
  }, []);

  return (
    <>
      <Heading as='label' htmlFor='color' fontSize='1.3rem'>
        Color
      </Heading>
      <Select
        name='color'
        width='100%'
        size='sm'
        value={filters.color}
        onChange={(e) => {
          dispatch(filterColor(e.target.value));
        }}
        {...props}
      >
        {colors}
      </Select>
    </>
  );
};

FilterColor.propTypes = {
  /**
   * Array of items to be filtered
   */
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};
