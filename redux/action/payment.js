import { v1 as uuidv1 } from 'uuid';

export const PAYMENT_PROGRESS = 'PAYMENT_PROGRESS';

export function paymentReview() {
  return {
    type: PAYMENT_PROGRESS,
    payment: { status: 'review', details: {}, intent: {}, token: uuidv1() },
  };
}

export function paymentForm() {
  return {
    type: PAYMENT_PROGRESS,
    payment: { status: 'form' },
  };
}

export function paymentConfirm(details, intent) {
  return {
    type: PAYMENT_PROGRESS,
    payment: {
      status: 'confirm',
      details,
      intent,
    },
  };
}

export function paymentSuccess(intent) {
  return {
    type: PAYMENT_PROGRESS,
    payment: {
      status: 'success',
      token: false,
      intent,
    },
    cart: [],
  };
}

export function paymentCancelled(intent) {
  return {
    type: PAYMENT_PROGRESS,
    payment: {
      status: 'cancelled',
      intent,
    },
  };
}

export function paymentError(error) {
  return {
    type: PAYMENT_PROGRESS,
    payment: { status: 'error', error },
  };
}

export function paymentReset() {
  return {
    type: PAYMENT_PROGRESS,
    payment: { status: 'review', token: false, intent: false, error: false },
  };
}
