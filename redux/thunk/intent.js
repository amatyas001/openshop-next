import { paymentConfirm, paymentError } from '../actions';

// Creating payment intent through lambda function
export function paymentIntent(details, items, token) {
  return async (dispatch) => {
    try {
      const axios = await import('axios');
      /* istanbul ignore next */
      const intent = await axios.post(
        process.env.NODE_ENV === 'production'
          ? 'https://openshop.netlify.app/.netlify/functions/intent'
          : 'http://localhost:9000/.netlify/functions/intent',
        {
          // cart items
          items,
          // idempotency key
          token,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // push confirm screen
      dispatch(paymentConfirm(details, intent.data));
    } catch (error) {
      dispatch(paymentError(error));
    }
  };
}
