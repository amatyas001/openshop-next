import { useSelector } from 'react-redux';
import { SimpleGrid, Text } from '@chakra-ui/core';

/**
 * @see https://amatyas001.github.io/openshop-next/#paymentconfirm
 * @ignore
 */
export const PaymentConfirmDetails = (props) => {
  const { intent, details } = useSelector((state) => state.payment);
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
