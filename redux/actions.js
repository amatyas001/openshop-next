export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const GET_AMOUNT = 'GET_AMOUNT';
export const CHECKOUT_PROGRESS = 'CHECKOUT_PROGRESS';
export const PAYMENT_PROGRESS = 'PAYMENT_PROGRESS';
export const PAYMENT_RESET = 'PAYMENT_RESET';

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

export function paymentStart() {
  return {
    type: PAYMENT_PROGRESS,
    payload: { status: 'loading' },
  };
}

/**
 *  PAYMENT FLOW
 */
export function paymentConfirm(card, details, intent) {
  return {
    type: PAYMENT_PROGRESS,
    payload: {
      status: 'confirm',
      card,
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

export function cancelPayment(id) {
  return async (dispatch) => {
    try {
      dispatch(paymentStart());
      const { loadStripe } = await import('@stripe/stripe-js');
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
      );
      stripe.paymentIntents.cancel(id, (err, intent) => {
        if (err) dispatch(paymentError(e.message));
        else dispatch(paymentCanceled(intent.id));
      });
    } catch (e) {
      dispatch(paymentError(e.message));
    }
  };
}

export function intentCart(card, details, items) {
  return async (dispatch) => {
    try {
      dispatch(paymentStart());
      const axios = await import('axios');
      const intent = await axios.post(
        process.env.NODE_ENV === 'production'
          ? 'https://openshop.netlify.com/.netlify/functions/intent'
          : 'http://localhost:9000/.netlify/functions/intent',
        {
          items,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      dispatch(paymentConfirm(card, details, intent.data));
    } catch (e) {
      dispatch(paymentError(e.message));
    }
  };
}
