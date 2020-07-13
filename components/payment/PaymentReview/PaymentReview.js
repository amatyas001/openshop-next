import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { Flex } from '@chakra-ui/core';
import { paymentForm } from '@app/lib/redux/actions';
import { CartContent, CartAmount, Button } from '@app/components';

/**
 * Displays current cart content to be purchesed and control buttons.
 * User has the oprion to go back the previously visited page or
 * continue payment process to [PaymentForm](#paymentform)
 *
 * @visibleName Payment Review
 * @example
 * ```jsx
 * <PaymentReview />
 * ```
 */
export const PaymentReview = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <Flex flexDirection='column' alignItems='center' justifyContent='space-between' {...props}>
      <CartContent details />
      <Flex mt='30px' width='100%'>
        <Button
          width='20%'
          onClick={() => router.back()}
          data-testid='review-button-back'
          variant='secondary'
        >
          BACK
        </Button>
        <Button
          width='40%'
          mx='auto'
          onClick={() => dispatch(paymentForm())}
          data-testid='review-button-form'
        >
          PAYMENT DETAILS
        </Button>
        <CartAmount width='20%' />
      </Flex>
    </Flex>
  );
};
