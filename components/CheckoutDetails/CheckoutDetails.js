import { v1 as uuidv1 } from 'uuid';
import Router, { useRouter } from 'next/router';
import { useStripe } from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import {
  paymentReset,
  checkoutFinished,
  paymentToken,
  clearCart,
} from '../../redux/actions';
import { Flex, Text, Heading, Spinner } from '@chakra-ui/core';
import { StripeForm, StripeConfirm, Button } from '../index';

export const CheckoutDetails = () => {
  const stripe = useStripe();
  const dispatch = useDispatch();
  const payment = useSelector((state) => state.payment);
  const router = useRouter();
  const [content, setContent] = React.useState(false);

  React.useEffect(() => {
    Router.prefetch('/');
  }, []);

  React.useEffect(() => {
    if (payment) {
      if (!payment.status) router.replace('/');
      dispatch(paymentToken(uuidv1()));
      switch (payment.status) {
        case 'success':
          dispatch(checkoutFinished());
          setContent(
            <>
              <Heading>Payment Successful</Heading>
              <Text fontSize='1.5rem'>
                Received intent number:{' '}
                <Text as='span' fontWeight='bold' color='purple.800'>
                  {payment.intent}
                </Text>
              </Text>
              <Text>
                This was a sample transaction to demonstrate the payment flow.
                Thank you!
              </Text>
            </>
          );
          break;
        case 'canceled':
          dispatch(clearCart());
          dispatch(checkoutFinished());
          setContent(
            <>
              <Heading>Payment Cancelled</Heading>
              <Text fontSize='1.5rem'>
                Successfuly cancelled intent:{' '}
                <Text as='span' fontWeight='bold' color='purple.800'>
                  {payment.intent.id}
                </Text>
              </Text>
            </>
          );
          break;
        case 'error':
          setContent(
            <>
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
                <em>{payment.error}</em>
              </Text>
              <Button onClick={() => dispatch(paymentReset())}>retry</Button>
            </>
          );
          break;
        default:
          setContent(<Spinner size='150px' size='150px' my='50px' />);
      }
    }
  }, [payment, stripe]);

  return (
    <Flex
      flexDirection='column'
      alignItems='center'
      width={{ sm: '100%', md: '80%', lg: '60%', xl: '50%' }}
      mx='auto'
    >
      {payment.status !== 'success' &&
      payment.status !== 'error' &&
      payment.status !== 'canceled' ? (
        <>
          <StripeForm />
          <StripeConfirm />
        </>
      ) : (
        content || <Spinner size='150px' size='150px' my='50px' />
      )}
    </Flex>
  );
};
