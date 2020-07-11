import { useSelector, useDispatch } from 'react-redux';
import { Flex, Text } from '@chakra-ui/core';
import { paymentReset } from '@app/lib/redux/actions';
import { Button } from '@app/components';

/**
 * Displays error details if request fails in either [PaymentForm](#paymentform)
 * or [PaymentConfirm](#paymentconfirm) stages. Also rendering a button to get
 * the user back to the [PaymentReview](#paymentreview) stage and restart process.
 *
 * ***State Dependencies***
 * - `payment.status === 'error'`
 * - `payment.error`
 *
 * @visibleName Payment Error
 * @example
 * ```jsx
 * <PaymentError />
 * ```
 */
export const PaymentError = (props) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.payment);
  return (
    <Flex flexDirection='column' alignItems='center' width='100%' {...props}>
      <Text
        py='15px'
        px='20px'
        my='50px'
        fontSize='1.3rem'
        bg='red.400'
        color='gray.100'
        borderRadius='5px'
        d='block'
        width='100%'
      >
        <strong>Error:</strong>
        <br />
        <em data-testid='error-message'>{error.message}</em>
      </Text>
      <Button
        data-testid='error-button-retry'
        width='100%'
        onClick={() => dispatch(paymentReset())}
      >
        retry payment process
      </Button>
    </Flex>
  );
};
