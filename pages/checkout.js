import Head from 'next/head';
import { useRouter } from 'next/router';
import { v1 as uuidv1 } from 'uuid';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Box } from '@chakra-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { paymentToken } from '../redux/actions';
import {
  PaymentProgress,
  PaymentReview,
  PaymentForm,
  PaymentConfirm,
  PaymentSuccess,
  PaymentCancelled,
  PaymentError,
} from '../components';

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Checkout() {
  const { payment, cart } = useSelector((state) => state);
  const router = useRouter();
  const dispatch = useDispatch();
  const [content, setContent] = React.useState();
  const [head, setHead] = React.useState();

  React.useEffect(() => {
    router.prefetch('/');
    if (!cart.length) router.replace('/');
    if (payment) {
      dispatch(paymentToken(uuidv1()));
      switch (payment.status) {
        case 'review':
          setHead('Review');
          setContent(<PaymentReview />);
          break;
        case 'form':
          setHead('Details');
          setContent(<PaymentForm />);
          break;
        case 'confirm':
          setHead('Confirm');
          setContent(
            <PaymentConfirm details={payment.details} intent={payment.intent} />
          );
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
  }, [payment, cart]);

  return (
    <Box px='5%' py='20px'>
      <Head>
        <title>OpenShop - {head}</title>
        <meta name='description' content='OpenShop - Checkout selected items' />
      </Head>
      <Elements stripe={stripe}>
        <PaymentProgress />
        {content}
      </Elements>
    </Box>
  );
}
