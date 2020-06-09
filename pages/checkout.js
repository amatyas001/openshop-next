import Head from 'next/head';
import { useSelector } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import {
  CheckoutProgress,
  CheckoutReview,
  CheckoutDetails,
} from '../components';

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export async function getStaticProps() {
  return {
    props: {
      initialReduxState: {
        checkout: { status: 'review' },
      },
    },
  };
}

export default function Purchase() {
  const checkout = useSelector((store) => store.checkout.status);

  return (
    <>
      <Head>
        <title>OpenShop - Checkout</title>
        <meta name='description' content='OpenShop - Checkout selected items' />
      </Head>
      <Elements stripe={stripe}>
        <CheckoutProgress />
        {checkout === 'review' ? <CheckoutReview /> : <CheckoutDetails />}
      </Elements>
    </>
  );
}
