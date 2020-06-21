import Head from 'next/head';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import { Box } from '@chakra-ui/core';
import {
  PaymentProgress,
  PaymentReview,
  PaymentForm,
  PaymentConfirm,
  PaymentSuccess,
  PaymentCancelled,
  PaymentError,
} from '@app/components';

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Checkout() {
  const { payment = {}, cart = [] } = useSelector((state) => state);
  const router = useRouter();
  const [content, setContent] = React.useState();
  const [head, setHead] = React.useState();

  React.useEffect(() => {
    router.prefetch('/');
    if (payment && payment.status !== 'success' && cart && !cart.length)
      router.replace('/');
  }, [payment, cart]);

  React.useEffect(() => {
    if (payment) {
      switch (payment.status) {
        case 'review':
          setHead('Review');
          setContent(<PaymentReview />);
          break;
        case 'form':
          setContent('');
          setHead('Details');
          break;
        case 'confirm':
          setContent('');
          setHead('Confirm');
          break;
        case 'success':
          setHead('Success');
          setContent(<PaymentSuccess intent={payment.intent} />);
          break;
        case 'cancelled':
          setHead('Cancelled');
          setContent(<PaymentCancelled intent={payment.intent} />);
          break;
        case 'error':
          setHead('Error');
          setContent(<PaymentError error={payment.error} />);
          break;
        default:
          setHead('Checkout');
      }
    }
  }, [payment]);

  return (
    <Box px='5%' py='20px' minHeight='600px'>
      <Head>
        <title>OpenShop - {head}</title>
        <meta name='description' content='OpenShop - Checkout selected items' />
      </Head>
      <Elements stripe={stripe}>
        <PaymentProgress />
        <>
          {/* CardElement must be mounted and to be in scope
            when handling the confirmation of intent. We use
            css to hide these modules on different states */}
          <PaymentForm />
          <PaymentConfirm details={payment.details} intent={payment.intent} />
        </>
        {content}
      </Elements>
    </Box>
  );
}
