import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
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

const Checkout = () => {
  const { payment = {}, cart = [] } = useSelector((state) => state);
  const router = useRouter() || { prefetch: () => {}, replace: () => {} };
  const [content, setContent] = React.useState();
  const [head, setHead] = React.useState();

  React.useEffect(() => {
    router.prefetch('/');
    if (payment.status !== 'success' && cart && !cart.length)
      router.replace('/');
  }, [payment, cart]);

  React.useEffect(() => {
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
        setContent(<PaymentConfirm />);
        break;
      case 'success':
        setHead('Success');
        setContent(<PaymentSuccess />);
        break;
      case 'cancelled':
        setHead('Cancelled');
        setContent(<PaymentCancelled />);
        break;
      case 'error':
        setHead('Error');
        setContent(<PaymentError />);
        break;
      default:
        setHead('Checkout');
    }
  }, [payment.status]);

  return (
    <Box px='5%' py='20px' minHeight='600px'>
      <Head>
        <title>OpenShop - {head}</title>
        <meta name='description' content='OpenShop - Checkout selected items' />
      </Head>
      <PaymentProgress />
      {content}
    </Box>
  );
};

export default Checkout;
