import { Flex, Heading, SimpleGrid, Text } from '@chakra-ui/core';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { useDispatch } from 'react-redux';
import {
  paymentSuccess,
  paymentCancel,
  paymentError,
} from '../../redux/actions';
import { Button, CartContent } from '../index';

// Review and confirm payment intent
export const PaymentConfirm = ({ details, intent }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const handleConfirm = async () => {
    if (stripe) {
      const card = elements.getElement(CardElement);

      // confirm
      const result = await stripe.confirmCardPayment(intent.secret, {
        payment_method: {
          card: card,
          billing_details: {
            name: details.name,
            email: details.email,
            phone: details.phone,
          },
        },
      });

      // success
      if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
        dispatch(paymentSuccess(result.paymentIntent));
      }

      // error
      if (result.error) {
        dispatch(paymentError(result.error));
      }
    }
    return;
  };

  return (
    <Flex flexDirection='column' alignItems='center' width='100%'>
      {/* header */}
      <Heading>hey {details.name}!</Heading>
      <Text fontSize='1.1rem' fontWeight='bold'>
        Please review your payment details:
      </Text>

      {/* body */}
      <SimpleGrid columns={{ sm: 1, lg: 2 }} borderTop='1px' borderBottom='1px'>
        {/* intent */}
        <SimpleGrid
          columns='2'
          spacing='10px'
          fontSize='0.9rem'
          fontWeight='bold'
          flexDirection='column'
          p='3%'
        >
          <Text>INTENT ID</Text>
          <Text color='purple.800'>{intent.id}</Text>
          <Text>EMAIL</Text>
          <Text color='purple.800'>{details.email}</Text>
          <Text>PHONE</Text>
          <Text color='purple.800'>{details.phone}</Text>
          <Text>ADDRESS</Text>
          <Text color='purple.800'>{details.address}</Text>
        </SimpleGrid>

        {/* cart */}
        <CartContent />
      </SimpleGrid>

      {/* controls */}
      <SimpleGrid columns='2' spacing='15px'>
        {/* cancel */}
        <Button
          width='40%'
          bg='red.500'
          color='gray.100'
          onClick={() => {
            dispatch(paymentCancel(intent.id));
          }}
        >
          CANCEL ORDER
        </Button>

        {/* confirm */}
        <Button
          width='40%'
          bg='purple.800'
          color='gray.100'
          onClick={handleConfirm}
        >
          CONFIRM ORDER
        </Button>
      </SimpleGrid>
    </Flex>
  );
};
