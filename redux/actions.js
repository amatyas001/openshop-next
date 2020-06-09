export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const GET_AMOUNT = 'GET_AMOUNT';
export const CHECKOUT_PROGRESS = 'CHECKOUT_PROGRESS';
export const PAYMENT_PROGRESS = 'PAYMENT_PROGRESS';
export const PAYMENT_RESET = 'PAYMENT_RESET';
export const PAYMENT_TOKEN = 'PAYMENT_TOKEN';

/**
 *  CART ACTIONS
 */
export function addToCart(item) {
  return {
    type: ADD_TO_CART,
    payload: item,
  };
}

export function removeFromCart(item) {
  return {
    type: REMOVE_FROM_CART,
    payload: item,
  };
}

export function clearCart() {
  return {
    type: CLEAR_CART,
  };
}

export function getAmount() {
  return {
    type: GET_AMOUNT,
  };
}

/**
 *  CHECKOUT FLOW
 */
export function checkoutReview() {
  return {
    type: CHECKOUT_PROGRESS,
    payload: { status: 'review' },
  };
}

export function checkoutDetails() {
  return {
    type: CHECKOUT_PROGRESS,
    payload: { status: 'details' },
  };
}

export function checkoutFinished() {
  return {
    type: CHECKOUT_PROGRESS,
    payload: { status: 'finished' },
  };
}

export function paymentActive() {
  return {
    type: PAYMENT_PROGRESS,
    payload: { status: true },
  };
}

export function paymentToken(token) {
  return {
    type: PAYMENT_TOKEN,
    payload: token,
  };
}

/**
 *  PAYMENT FLOW
 */
export function paymentConfirm(details, intent) {
  return {
    type: PAYMENT_PROGRESS,
    payload: {
      status: 'confirm',
      details,
      intent,
    },
  };
}

export function paymentSuccess(intent) {
  return {
    type: PAYMENT_PROGRESS,
    payload: {
      status: 'success',
      intent,
    },
  };
}

export function paymentCanceled(intent) {
  return {
    type: PAYMENT_PROGRESS,
    payload: {
      status: 'canceled',
      intent,
    },
  };
}

export function paymentError(error) {
  return {
    type: PAYMENT_PROGRESS,
    payload: { status: 'error', error },
  };
}

export function paymentReset() {
  return {
    type: PAYMENT_RESET,
  };
}

export function cancelPayment(cancel) {
  return async (dispatch) => {
    try {
      const axios = await import('axios');
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
      dispatch(paymentCanceled(intent.data));
    } catch (e) {
      dispatch(paymentError(e.message));
    }
  };
}

export function intentCart(details, items, token) {
  return async (dispatch) => {
    try {
      const axios = await import('axios');
      const intent = await axios.post(
        process.env.NODE_ENV === 'production'
          ? 'https://openshop.netlify.app/.netlify/functions/intent'
          : 'http://localhost:9000/.netlify/functions/intent',
        {
          items,
          token,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      dispatch(paymentConfirm(details, intent.data));
    } catch (e) {
      dispatch(paymentError(e.message));
    }
  };
}
