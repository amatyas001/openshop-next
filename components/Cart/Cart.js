import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, getAmount } from '../../redux/actions';
import {
  Text,
  Flex,
  Heading,
  Collapse,
  Box,
  SimpleGrid,
} from '@chakra-ui/core';
import { FaTrashAlt, FaInfo } from 'react-icons/fa';
import { Button } from '../index';

export const Cart = (props) => {
  const [show, setShow] = React.useState(false);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAmount());
  }, [state.cart]);

  return (
    <Flex
      flexDirection='column'
      width={{ sm: '90%', md: '70%', lg: '60%', xl: '50%' }}
      {...props}
    >
      {state.cart && state.cart.length > 0 && (
        <>
          <Button
            onClick={() => setShow(!show)}
            bg={show ? 'gray.800' : 'none'}
            color={show ? 'gray.100' : 'black'}
          >
            <Heading as='span' fontSize='1.7rem'>
              checkout&nbsp;
              <Text fontSize='1.9rem' color='red.400' d='inline'>
                {state.cart.length}
              </Text>
              &nbsp;item
            </Heading>
          </Button>
          <Collapse mt={4} isOpen={show} borderBottom='1px' mb='10px' px='3%'>
            {state.cart.map((item) => (
              <Flex my='3%' fontSize='1.2rem' key={item.id}>
                <Text as='span'>
                  <strong>{item.name}</strong>
                  &nbsp;-&nbsp;{item.price}&nbsp;$
                </Text>
                <Link href={`/items/[id]`} as={`/items/${item.id}`}>
                  <Text
                    as={FaInfo}
                    ml='auto'
                    color='blue.400'
                    cursor='pointer'
                  />
                </Link>
                <Text
                  as={FaTrashAlt}
                  ml='10px'
                  color='red.600'
                  onClick={() => dispatch(removeFromCart(item))}
                  cursor='pointer'
                />
              </Flex>
            ))}
            <Box borderTop='1px'>
              <Text textAlign='center'>
                TOTAL PRICE OF {state.cart.length} ITEM(S)
              </Text>
              <SimpleGrid columns='2' py='10px'>
                <Button width='100%' bg='gray.200'>
                  buy items
                </Button>
                <Heading my='auto' ml='auto'>
                  {state.amount}&nbsp;$
                </Heading>
              </SimpleGrid>
            </Box>
          </Collapse>
        </>
      )}
    </Flex>
  );
};
