import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { Flex, SimpleGrid } from '@chakra-ui/core';
import { paymentForm } from '@app/redux/actions';
import { CartContent, Button } from '@app/components';

// Review cart items before payment
export const PaymentReview = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <Flex flexDirection='column' alignItems='center' {...props}>
      {/* cart */}
      <Flex flexDirection='column' width='100%'>
        <CartContent mx='auto' />
      </Flex>

      {/* controls */}
      <SimpleGrid columns='2' spacing='15px' mt='30px' width='100%'>
        {/* back */}
        <Button
          bg='gray.600'
          color='gray.100'
          width='100%'
          onClick={() => router.back()}
          data-testid='review-button-back'
        >
          BACK TO SHOPPING
        </Button>

        {/* continue */}
        <Button
          bg='purple.800'
          color='gray.100'
          width='100%'
          onClick={() => dispatch(paymentForm())}
          data-testid='review-button-form'
        >
          PAYMENT DETAILS
        </Button>
      </SimpleGrid>
    </Flex>
  );
};
