import { useSelector } from 'react-redux';
import { SimpleGrid, Text } from '@chakra-ui/core';

/**
 * Displays recieved intent information and user details.
 *
 * ***State Dependencies***
 * - `payment.status === 'confrim'`
 * - `payment.intent`
 * - `payment.details`
 *
 * @example
 * ```jsx
 * <PaymentConfirmDetails />
 * ```
 */
export const PaymentConfirmDetails = (props) => {
  const { payment = {} } = useSelector((state) => state);
  const { intent = {}, details = {} } = payment;

  return (
    <SimpleGrid
      columns='4'
      spacing='10px'
      fontSize='0.9rem'
      fontWeight='bold'
      {...props}
    >
      <Text>INTENT ID</Text>
      <Text color='purple.800' data-testid='confirm-intent-id'>
        {intent.id}
      </Text>
      <Text>EMAIL</Text>
      <Text color='purple.800' data-testid='confirm-intent-email'>
        {details.email}
      </Text>
      <Text>PHONE</Text>
      <Text color='purple.800' data-testid='confirm-intent-phone'>
        {details.phone}
      </Text>
      <Text>ADDRESS</Text>
      <Text color='purple.800' data-testid='confirm-intent-address'>
        {details.address}
      </Text>
    </SimpleGrid>
  );
};
