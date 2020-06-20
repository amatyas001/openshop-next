import { useDispatch, useSelector } from 'react-redux';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Flex, Heading, SimpleGrid, Text, Spinner } from '@chakra-ui/core';
import {
  paymentSuccess,
  paymentCancel,
  paymentError,
} from '@app/redux/actions';
import { Button, CartContent } from '@app/components';

// Review and confirm payment intent
export const PaymentConfirm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const { payment } = useSelector((store) => store);
  const { details = {}, intent = {} } = props;
  const [loading, setLoading] = React.useState(false);

  const handleConfirm = async () => {
    if (!stripe) return;

    setLoading(true);

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
  };

  return (
    <>
      <Flex
        flexDirection='column'
        alignItems='center'
        width='100%'
        d={payment.status === 'confirm' && !loading ? 'flex' : 'none'}
        aria-hidden={payment.status !== 'confirm'}
        {...props}
      >
        {/* header */}
        <Heading data-testid='confirm-intent-name'>hey {details.name}!</Heading>
        <Text fontSize='1.1rem' fontWeight='bold'>
          Please review your payment details:
        </Text>

        {/* body */}
        <SimpleGrid
          columns={{ sm: 1, lg: 2 }}
          borderTop='1px'
          borderBottom='1px'
        >
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

          {/* cart */}
          <CartContent />
        </SimpleGrid>

        {/* controls */}
        <SimpleGrid columns='2' spacing='15px'>
          {/* cancel */}
          <Button
            data-testid='confirm-button-cancel'
            width='100%'
            bg='red.500'
            color='gray.100'
            onClick={() => {
              setLoading(true);
              dispatch(paymentCancel(intent.id));
            }}
          >
            CANCEL ORDER
          </Button>

          {/* confirm */}
          <Button
            data-testid='confirm-button-confirm'
            width='100%'
            bg='purple.800'
            color='gray.100'
            disabled={!stripe}
            onClick={handleConfirm}
          >
            CONFIRM ORDER
          </Button>
        </SimpleGrid>
      </Flex>
      {payment.status === 'confirm' && loading && (
        <Spinner data-testid='confirm-spinner' size='150px' m='auto' />
      )}
    </>
  );
};
