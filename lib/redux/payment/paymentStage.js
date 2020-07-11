import { v1 as uuidv1 } from 'uuid';

export const PAYMENT_STAGE = 'PAYMENT_STAGE';

/**
 * Loads [PaymentReview](#paymentreview) component on checkout page.
 * Generates a new token on each dispatch which is handled n the reducer.
 */
export const paymentReview = () => {
  return {
    type: PAYMENT_STAGE,
    payment: { status: 'review', details: {}, intent: {}, token: uuidv1() },
  };
};

/**
 * Loads [PaymentForm](#paymentform) component on checkout page.
 */
export const paymentForm = () => {
  return {
    type: PAYMENT_STAGE,
    payment: { status: 'form' },
  };
};

/**
 * Loads [PaymentConfirm](#paymentconfirm) component on checkout page.
 *
 * @param {*} details User details object from [PaymentForm](#paymentform)
 * @param {*} intent Intent object created on submitting [PaymentForm](#paymentform)
 */
export const paymentConfirm = (details, intent) => {
  return {
    type: PAYMENT_STAGE,
    payment: {
      status: 'confirm',
      details,
      intent,
    },
  };
};

/**
 * Loads [PaymentSuccess](#paymentsuccess) component on successful confirmation of
 * the payment intent in [PaymentConfirm](#paymentconfirm) stage. Resets the payment
 * token end cart to their default empty state.
 *
 * @param {*} intent Confirmed intent details to display feedback to the user
 */
export const paymentSuccess = (intent) => {
  return {
    type: PAYMENT_STAGE,
    payment: {
      status: 'success',
      token: false,
      intent,
    },
    cart: [],
  };
};

/**
 * Loads [PaymentCancelled](#paymentcancelled) component in the checkout page if
 * payment intent cancelled in the [PaymentConfirm](#paymentconfirm) stage. Resets
 * the payment token.
 *
 * @param {*} intent Cancelled intent details to display feedback to the user
 */
export const paymentCancelled = (intent) => {
  return {
    type: PAYMENT_STAGE,
    payment: {
      status: 'cancelled',
      token: false,
      intent,
    },
  };
};

/**
 * Load [PaymentError](#paymenterror) component in the checkout page if any unexpected
 * behaviour happens during the payment process. Resets the payment token.
 *
 * @param {*} error Details of the failure
 */
export const paymentError = (error) => {
  return {
    type: PAYMENT_STAGE,
    payment: { status: 'error', error, token: false },
  };
};

/**
 * Restart payment process with empty values and load [PaymentReview](#paymentreview)
 * component which generates a new token.
 */
export const paymentReset = () => {
  return {
    type: PAYMENT_STAGE,
    payment: { status: 'review', token: false, intent: false, error: false },
  };
};
