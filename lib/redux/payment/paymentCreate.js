import { paymentConfirm, paymentError } from '@app/lib/redux/actions';

/**
 * Sends a request to the serverless handler function to create a payment
 * intent through the *Stripe API*.
 *
 * @param {*} details Billing details from [PaymentForm](#paymentform)
 * @param {*} items Purchased items from [Cart](#section-cart)
 * @param {*} token Unique user idempontency key. See [Payment](#section-payment)
 */
export const paymentCreate = (details, items, token) => {
  return async (dispatch) => {
    try {
      const axios = await import('axios');
      /* istanbul ignore next */
      const intent = await axios.post(
        process.env.NODE_ENV === 'production'
          ? 'https://openshop.netlify.app/.netlify/functions/intent'
          : 'http://localhost:9000/.netlify/functions/intent',
        {
          items,
          token,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      dispatch(paymentConfirm(details, intent.data));
    } catch (error) {
      dispatch(paymentError(error));
    }
  };
};
