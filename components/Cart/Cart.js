import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, getAmount } from '../../redux/actions';
import {
  Text,
  Flex,
  Heading,
  Collapse,
  Box,
  Image,
  SimpleGrid,
} from '@chakra-ui/core';
import { FaTrashAlt, FaInfo, FaStripe } from 'react-icons/fa';
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
      {state.cart && state.cart.length > 0 ? (
        <>
          <Button
            onClick={() => setShow(!show)}
            bg={show ? 'gray.800' : 'none'}
            color={show ? 'gray.100' : 'black'}
          >
            <Heading as='span' fontSize='1.7rem'>
              {show ? 'hide' : 'show'}&nbsp;cart
            </Heading>
          </Button>
          <Collapse mt={4} isOpen={show} borderBottom='1px' mb='10px' px='3%'>
            {state.cart.map((item) => (
              <Flex my='3%' fontSize='1.2rem' key={item.id} alignItems='center'>
                <Image
                  src={`/images/products/${item.img}`}
                  size='60px'
                  objectFit='contain'
                />
                <Text as='span' ml='10px'>
                  <strong>{item.name}</strong> - <em>{item.color}</em>
                </Text>
                <Text as='span' ml='auto'>
                  {item.price}&nbsp;$
                </Text>
                <Link href={`/items/[id]`} as={`/items/${item.id}`}>
                  <Text
                    as={FaInfo}
                    ml='20px'
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
            <Box>
              <Text
                textAlign='right'
                pr='10px'
                bg='gray.800'
                color='gray.100'
                py='5px'
                lineHeight='1.4rem'
              >
                TOTAL PRICE OF{' '}
                <Text
                  fontWeight='bold'
                  color='white'
                  mx='3px'
                  d='inline'
                  fontSize='1.4rem'
                >
                  {state.cart.length}
                </Text>{' '}
                ITEM(s)
              </Text>
              <Flex width='100%' alignItems='center' pb='7px' mt='-8px'>
                <Button width='30%' bg='purple.800' color='gray.200'>
                  buy items
                </Button>
                <Box mx='auto' d='flex' alignItems='center'>
                  <Text fontSize='0.9rem' mb='' d='inline'>
                    SECURE TRANSACTION BY
                  </Text>
                  <Text
                    d='inline'
                    ml='5px'
                    as={FaStripe}
                    color='purple.400'
                    fontSize='3.5rem'
                  />
                </Box>
                <Heading my='auto' ml='20px'>
                  {state.amount}&nbsp;$
                </Heading>
              </Flex>
            </Box>
          </Collapse>
        </>
      ) : (
        <Button>
          <Heading as='span' fontSize='1.7rem'>
            no items in cart
          </Heading>
        </Button>
      )}
    </Flex>
  );
};
