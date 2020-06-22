import { paymentCancelled, paymentError } from '@app/redux/actions';

// Canceling intent on Stripe by intent ID (cancel param)
export function paymentCancel(cancel) {
  return async (dispatch) => {
    try {
      const axios = await import('axios');
      /* istanbul ignore next */
      const intent = await axios.post(
        process.env.NODE_ENV === 'production'
          ? 'https://openshop.netlify.app/.netlify/functions/intent'
          : 'http://localhost:9000/.netlify/functions/intent',
        {
          cancel,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      // push to cancelled screen
      dispatch(paymentCancelled(intent.data));
    } catch (error) {
      // push to error screen
      dispatch(paymentError(error));
    }
  };
}
