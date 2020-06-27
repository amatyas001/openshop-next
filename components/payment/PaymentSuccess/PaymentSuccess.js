import { useSelector } from 'react-redux';
import { Heading, Text, Flex } from '@chakra-ui/core';

/**
 * Displays information about a successfuly approved intent after
 * [PaymentConfirm](#paymentconfirm) stage of payment process.
 *
 * ***State Dependencies***
 * - `payment.status === 'success'`
 * - `payment.intent`
 *
 * @example
 * ```jsx
 * <PaymentSuccess />
 * ```
 */
export const PaymentSuccess = (props) => {
  const { payment = {} } = useSelector((state) => state);
  const { intent = {} } = payment;

  return (
    <Flex flexDirection='column' width='100%' alignItems='center' {...props}>
      <Heading>Payment Successful</Heading>
      <Text fontSize='1.5rem'>
        Received intent number:{' '}
        <Text
          as='span'
          fontWeight='bold'
          color='purple.800'
          data-testid='success-content'
        >
          {intent.id}
        </Text>
      </Text>
      <Text>
        This was a sample transaction to demonstrate the payment flow. Thank
        you!
      </Text>
    </Flex>
  );
};
