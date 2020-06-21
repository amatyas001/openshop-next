import { useDispatch, useSelector } from 'react-redux';
import { Heading, Input } from '@chakra-ui/core';
import { filterName } from '@app/redux/actions';

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
