import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Heading, Input } from '@chakra-ui/core';
import { filterName } from '@app/redux/actions';

/**
 * Displays a text input and **dispatch filter event** based on
 * the input. By sending the action to the store, it will create a
 * subkey **`name`** in the **`filter` object**
 *
 * For more information: [Chakra/Input](https://chakra-ui.com/input)
 */
export const FilterName = () => {
  const dispatch = useDispatch();
  const { filters = { name: '' } } = useSelector((state) => state);

  return (
    <>
      <Heading as='label' htmlFor='name' fontSize='1.3rem'>
        Name
      </Heading>
      <Input
        name='name'
        placeholder='Filter by name...'
        width='94%'
        size='md'
        mb='20px'
        px='3%'
        value={filters.name}
        onChange={(e) => dispatch(filterName(e.target.value.toLowerCase()))}
      />
    </>
  );
};
