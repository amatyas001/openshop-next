import { paymentCancelled, paymentError } from '@app/lib/redux/actions';

/**
 * Sends a cancel request to the serverless handler function
 * to cancel a pending Stripe Intent.
 *
 * @param {*} cancel Intent object to cancel
 */
export const paymentCancel = (cancel) => {
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

      dispatch(paymentCancelled(intent.data));
    } catch (error) {
      dispatch(paymentError(error));
    }
  };
};
