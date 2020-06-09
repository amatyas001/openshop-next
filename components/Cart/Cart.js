import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { Flex, Heading, Collapse } from '@chakra-ui/core';
import { Button, CartItems } from '../index';

export const Cart = (props) => {
  const state = useSelector((state) => state);
  const [show, setShow] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    if (router.pathname === '/checkout') setShow(true);
  }, []);

  return (
    router.pathname !== '/checkout' && (
      <Flex
        flexDirection='column'
        width={{ sm: '90%', md: '70%', lg: '60%', xl: '50%' }}
        {...props}
      >
        {state.cart && state.cart.length > 0 ? (
          <>
            {router.pathname !== '/checkout' && (
              <Button
                onClick={() => setShow(!show)}
                bg={show ? 'gray.800' : 'none'}
                color={show ? 'gray.100' : 'black'}
              >
                <Heading as='span' fontSize='1.7rem'>
                  {show ? 'hide' : 'show'}&nbsp;cart
                </Heading>
              </Button>
            )}
            <Collapse mt={4} isOpen={show} borderBottom='1px' mb='10px' px='3%'>
              <CartItems />
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
    )
  );
};
