import { FaSearch } from 'react-icons/fa';
import { Box } from '@chakra-ui/core';
import { Button } from '@app/components';
import { useDispatch, useSelector } from 'react-redux';
import { panelToggle } from '@app/lib/redux/actions';

/**
 * Controls the visibility of product filters
 *
 * @see https://amatyas001.github.io/openshop-next/#filterpanel
 */
export const FilterButton = (props) => {
  const { filters } = useSelector((state) => state.panel);
  const dispatch = useDispatch();

  return (
    <Button
      onClick={() => dispatch(panelToggle('filters', !filters))}
      name='toggle-filters'
      _active={{
        transform: 'none',
      }}
      {...props}
    >
      <Box as={FaSearch} mr='5px' fontSize='1rem' />
      {filters ? 'hide filters' : 'show filters'}
    </Button>
  );
};
