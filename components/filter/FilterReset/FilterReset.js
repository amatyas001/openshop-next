import { useDispatch } from 'react-redux';
import { FaRev } from 'react-icons/fa';
import { Box } from '@chakra-ui/core';
import { Button } from '@app/components';
import { filterReset } from '@app/lib/redux/actions';

/**
 * A button to reset all filter values to their defaults.
 *
 * @see https://amatyas001.github.io/openshop-next/#filterpanel
 */
export const FilterReset = (props) => {
  const dispatch = useDispatch();

  return (
    <Button
      name='reset'
      onClick={() => {
        dispatch(filterReset());
      }}
      m='auto'
      {...props}
    >
      <Box as={FaRev} mr='5px' fontSize='1rem' />
      {props.children || /* istanbul ignore next */ 'reset'}
    </Button>
  );
};
