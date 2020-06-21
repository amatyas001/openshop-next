import { useDispatch } from 'react-redux';
import { FaSearch, FaRev } from 'react-icons/fa';
import { Box, Button, Collapse, Flex } from '@chakra-ui/core';
import { filterReset } from '@app/redux/actions';
import { FilterName, FilterPrice, FilterColor } from '@app/components';

export const FilterPanel = ({ items }) => {
  const dispatch = useDispatch();

  const [show, setShow] = React.useState(false);

  return (
    <>
      <Button
        onClick={() => setShow(!show)}
        name='togglefilters'
        width={{ sm: '100%', md: '80%', lg: '70%', xl: '60%' }}
        mx='auto'
        mt='25px'
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
        <Box as={FaSearch} mr='5px' fontSize='1rem' />
        {show ? 'hide filters' : 'show filters'}
      </Button>
      <Collapse isOpen={show}>
        <Flex
          as='form'
          name='filters'
          flexDirection='column'
          width={{ sm: '90%', md: '70%', lg: '60%', xl: '50%' }}
          mx='auto'
          px='5%'
          py='15px'
          border='1px'
          borderColor='purple.400'
          bg='purple.100'
        >
          <FilterName />
          <FilterPrice />
          <FilterColor items={items} />
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
        </Flex>
      </Collapse>
    </>
  );
};
