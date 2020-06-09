import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, getAmount, paymentActive } from '../../redux/actions';
import { Text, Flex, Heading, Box, Image } from '@chakra-ui/core';
import { FaTrashAlt, FaInfo, FaStripe } from 'react-icons/fa';
import { Button } from '../index';

export const CartItems = () => {
  const router = useRouter();
  const { cart, amount } = useSelector((state) => state);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const prefetchRoutes = (url) => {
      url.match(/^\/item[\w]*$/gi) && Router.prefetch('/items/[id]', url);
    };
    Router.events.on('beforeHistoryChange', prefetchRoutes);
    return () => {
      Router.events.off('beforeHistoryChange', prefetchRoutes);
    };
  }, []);

  React.useEffect(() => {
    dispatch(getAmount());
  }, [cart]);

  return (
    <>
      {cart &&
        cart.map((item) => (
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
            {router.pathname !== '/checkout' && (
              <>
                <Text
                  as={FaInfo}
                  ml='20px'
                  color='blue.400'
                  cursor='pointer'
                  onClick={() => router.replace(`/items/${item.id}`)}
                />
                <Text
                  as={FaTrashAlt}
                  ml='10px'
                  color='red.600'
                  onClick={() => dispatch(removeFromCart(item))}
                  cursor='pointer'
                />
              </>
            )}
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
            as='span'
            fontWeight='bold'
            color='white'
            mx='3px'
            d='inline'
            fontSize='1.4rem'
          >
            {cart && cart.length}
          </Text>{' '}
          ITEM(s)
        </Text>
        <Flex
          width='100%'
          alignItems='center'
          pb='7px'
          mt='-8px'
          flexWrap='wrap'
        >
          {router.pathname !== '/checkout' && (
            <Link href='/checkout'>
              <Button
                width='30%'
                bg='purple.800'
                color='gray.200'
                onClick={() => dispatch(paymentActive())}
              >
                continue
              </Button>
            </Link>
          )}
          <Box mx='auto' d='flex' alignItems='center'>
            <Text fontSize='0.7rem' mb='' d='inline'>
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
            {cart && amount}&nbsp;$
          </Heading>
        </Flex>
      </Box>
    </>
  );
};
