import { useDispatch, useSelector } from 'react-redux';
import { Heading, Input } from '@chakra-ui/core';
import { filterName } from '@app/redux/actions';

/**
 * Displays a labelled text input. This component does not need
 * extrenal list of items like many other filters because it just
 * stores the string pattern to look for in the name.
 *
 * > ***State***
 * > - `filters.name`
 *
 * > ***Elements***
 * > - [Input](https://chakra-ui.com/input)
 *
 * @example
 * ```jsx
 * <FilterName />
 * ```
 */
export const FilterName = (props) => {
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
        {...props}
      />
    </>
  );
};
