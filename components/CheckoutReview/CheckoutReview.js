import { checkoutDetails } from '../../redux/actions';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { Flex } from '@chakra-ui/core';
import { CartItems, Button } from '../index';

export const CheckoutReview = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <Flex flexDirection='column' alignItems='center' width='100%' mx='auto'>
      <Flex
        flexDirection='column'
        width={{ sm: '90%', md: '70%', lg: '60%', xl: '50%' }}
      >
        <CartItems mx='auto' />
      </Flex>
      <Button
        bg='gray.600'
        color='gray.100'
        width={{ sm: '90%', md: '70%', lg: '30%', xl: '30%' }}
        onClick={() => router.back()}
      >
        BACK TO SHOPPING
      </Button>
      <Button
        bg='purple.800'
        color='gray.100'
        width={{ sm: '90%', md: '70%', lg: '30%', xl: '30%' }}
        onClick={() => dispatch(checkoutDetails())}
      >
        PAYMENT DETAILS
      </Button>
    </Flex>
  );
};
