import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { Box } from '@chakra-ui/core';
import { Spinner } from '@app/components';
import * as COLORS from '@app/config/colors';

const PaymentProgress = dynamic(() =>
  import('@app/components').then((mod) => mod.PaymentProgress)
);

const PaymentReview = dynamic(() =>
  import('@app/components').then((mod) => mod.PaymentReview)
);

const PaymentForm = dynamic(() =>
  import('@app/components').then((mod) => mod.PaymentForm)
);

const PaymentConfirm = dynamic(() =>
  import('@app/components').then((mod) => mod.PaymentConfirm)
);

const PaymentSuccess = dynamic(() =>
  import('@app/components').then((mod) => mod.PaymentSuccess)
);

const PaymentCancelled = dynamic(() =>
  import('@app/components').then((mod) => mod.PaymentCancelled)
);

const PaymentError = dynamic(() =>
  import('@app/components').then((mod) => mod.PaymentError)
);

const PaymentUnauthorized = dynamic(() =>
  import('@app/components').then((mod) => mod.PaymentUnauthorized)
);

const Checkout = () => {
  const { payment = { status: false }, cart = [] } = useSelector(
    (state) => state
  );
  const [content, setContent] = React.useState();
  const [head, setHead] = React.useState();

  React.useEffect(() => {
    if (!cart.length && payment.status !== 'success') {
      setHead('Checkout');
      setContent(<PaymentUnauthorized />);
    } else {
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
      }
    }
  }, [payment.status, cart.length]);

  return (
    <Box px='5%' py='20px' minHeight='600px' bg={COLORS.BG.light}>
      <Head>
        <title>OpenShop - {head}</title>
        <meta name='description' content='OpenShop - Checkout selected items' />
      </Head>
      {cart.length && payment.status ? <PaymentProgress /> : ''}
      <React.Suspense
        fallback={
          <Spinner size='150px' mx='auto' my={{ sm: '150px', lg: '300px' }} />
        }
      >
        {content}
      </React.Suspense>
    </Box>
  );
};

export default Checkout;
