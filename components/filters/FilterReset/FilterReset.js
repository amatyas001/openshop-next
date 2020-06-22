import { useDispatch } from 'react-redux';
import { FaRev } from 'react-icons/fa';
import { Box, Button } from '@chakra-ui/core';
import { filterReset } from '@app/redux/actions';

export const FilterReset = () => {
  const dispatch = useDispatch();

  return (
    <>
      {' '}
      <Button
        name='reset'
        onClick={() => {
          dispatch(filterReset(''));
        }}
        width='100%'
        mt='10px'
        mx='auto'
        fontSize='1.3rem'
        bg='purple.800'
        color='gray.100'
        border='1px'
        borderColor='purple.400'
        borderRadius='0'
        _hover={{
          bg: 'purple.400',
          color: 'gray.100',
          cursor: 'pointer',
          textDecoration: 'underline',
        }}
      >
        <Box as={FaRev} mr='5px' fontSize='1rem' />
        reset
      </Button>
    </>
  );
};
