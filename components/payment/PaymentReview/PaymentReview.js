import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { Flex, SimpleGrid } from '@chakra-ui/core';
import { paymentForm } from '@app/redux/actions';
import { CartContent, Button } from '@app/components';

/**
 * Displays current cart content to be purchesed and control buttons.
 * User has the oprion to go back the previously visited page or
 * continue payment process to [PaymentForm](#paymentform)
 *
 * ***State Dependencies***
 * - `payment.status === 'review'`
 *
 * ***Wrapped Components***
 * - [CartContent](#cartcontent)
 *
 * @example
 * ```jsx
 * <PaymentReview />
 * ```
 */
export const PaymentReview = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <Flex flexDirection='column' alignItems='center' {...props}>
      <CartContent />
      <SimpleGrid columns='2' spacing='15px' mt='30px' width='100%'>
        <Button
          bg='gray.600'
          color='gray.100'
          width='100%'
          onClick={() => router.back()}
          data-testid='review-button-back'
        >
          BACK TO SHOPPING
        </Button>
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
