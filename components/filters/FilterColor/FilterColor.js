import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Heading, Select } from '@chakra-ui/core';
import { filterColor } from '@app/redux/actions';

/**
 * Extracts the colors from the given items array and displays
 * them as `options` in a `select` input field. Changing the value
 * **dispatch filter event** and create **`color` subkey** in the
 * **`filter` object**.
 *
 * For more information: [Chakra/Select](https://chakra-ui.com/select)
 */
export const FilterColor = ({ items }) => {
  const dispatch = useDispatch();
  const { filters = { color: 'All' } } = useSelector((state) => state);

  const [colors, setColors] = React.useState(['All']);

  React.useEffect(() => {
    let list = ['All'];
    items.forEach((item) => list.push(item.color));
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
      >
        {colors}
      </Select>
    </>
  );
};

FilterColor.propTypes = {
  /**
   * Array of available items
   */
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};
