import { Heading, Flex, Text } from '@chakra-ui/core';
import { useSelector } from 'react-redux';

/**
 * Displays information about a cancelled intent after
 * [PaymentConfrim](#paymentconfirm) stage of payment process.
 *
 * @visibleName Payment Cancelled
 * @example
 * ```jsx
 * <PaymentCancelled />
 * ```
 */
export const PaymentCancelled = (props) => {
  const { intent } = useSelector((state) => state.payment);
  return (
    <Flex alignItems='center' flexDirection='column' width='100%' {...props}>
      <Heading>Payment Cancelled</Heading>
      <Text fontSize='1.5rem'>
        Successfuly cancelled intent:{' '}
        <Text
          as='span'
          fontWeight='bold'
          color='purple.800'
          data-testid='cancelled-details'
        >
          {intent.id}
        </Text>
      </Text>
    </Flex>
  );
};
