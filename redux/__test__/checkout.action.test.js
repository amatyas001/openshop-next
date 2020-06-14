import {
  CHECKOUT_PROGRESS,
  PAYMENT_PROGRESS,
  PAYMENT_TOKEN,
  PAYMENT_RESET,
  checkoutReview,
  checkoutDetails,
  checkoutFinished,
  paymentActive,
  paymentConfirm,
  paymentSuccess,
  paymentCanceled,
  paymentError,
  paymentReset,
  paymentToken,
} from '../actions';

describe('Payment processing actions', () => {
  // State of checkout progress
  describe('Checkout', () => {
    // Initial
    describe('Review', () => {
      const expected = {
        type: CHECKOUT_PROGRESS,
        payload: { status: 'review' },
      };
      it('should create proper action without payload', () => {
        expect(checkoutReview()).toEqual(expected);
      });

      it('should create proper action with payload', () => {
        const payload = 'someFancyPayload';
        expect(checkoutReview(payload)).toEqual(expected);
      });
    });

    // Get user details
    describe('Details', () => {
      const expected = {
        type: CHECKOUT_PROGRESS,
        payload: { status: 'details' },
      };
      it('should create proper action without payload', () => {
        expect(checkoutDetails()).toEqual(expected);
      });

      it('should create proper action with payload', () => {
        const payload = 'someFancyPayload';
        expect(checkoutDetails(payload)).toEqual(expected);
      });
    });

    // End of progress (success | cancel | error)
    describe('Finished', () => {
      const expected = {
        type: CHECKOUT_PROGRESS,
        payload: { status: 'finished' },
      };
      it('should create proper action without payload', () => {
        expect(checkoutFinished()).toEqual(expected);
      });

      it('should create proper action with payload', () => {
        const payload = 'someFancyPayload';
        expect(checkoutFinished(payload)).toEqual(expected);
      });
    });
  });

  // Payment processing flow (Checkout -> Details)
  describe('Payment', () => {
    // Initial
    describe('Active', () => {
      const expected = {
        type: PAYMENT_PROGRESS,
        payload: { status: true },
      };
      it('should create proper action without payload', () => {
        expect(paymentActive()).toEqual(expected);
      });

      it('should create proper action with payload', () => {
        const payload = 'payload';
        expect(paymentActive(payload)).toEqual(expected);
      });
    });

    // Get user confirmation
    describe('Confirm', () => {
      it('should create proper action without payload', () => {
        const expected = {
          type: PAYMENT_PROGRESS,
          payload: { status: 'confirm', intent: undefined, details: undefined },
        };
        expect(paymentConfirm()).toEqual(expected);
      });

      it('should create proper action with payload', () => {
        const details = 'payload';
        const intent = 'payload';
        const expected = {
          type: PAYMENT_PROGRESS,
          payload: { status: 'confirm', intent, details },
        };
        expect(paymentConfirm(details, intent)).toEqual(expected);
      });
    });

    // User confirmed, payment done
    describe('Success', () => {
      it('should create proper action without payload', () => {
        const expected = {
          type: PAYMENT_PROGRESS,
          payload: { status: 'success', intent: undefined },
        };
        expect(paymentSuccess()).toEqual(expected);
      });

      it('should create proper action with payload', () => {
        const payload = 'payload';
        const expected = {
          type: PAYMENT_PROGRESS,
          payload: { status: 'success', intent: payload },
        };
        expect(paymentSuccess(payload)).toEqual(expected);
      });
    });

    // User declined, payment intent deleted
    describe('Canceled', () => {
      it('should create proper action without payload', () => {
        const expected = {
          type: PAYMENT_PROGRESS,
          payload: { status: 'canceled', intent: undefined },
        };
        expect(paymentCanceled()).toEqual(expected);
      });

      it('should create proper action with payload', () => {
        const payload = 'payload';
        const expected = {
          type: PAYMENT_PROGRESS,
          payload: { status: 'canceled', intent: payload },
        };
        expect(paymentCanceled(payload)).toEqual(expected);
      });
    });

    // Error occured, message shown
    describe('Error', () => {
      it('should create proper action without payload', () => {
        const expected = {
          type: PAYMENT_PROGRESS,
          payload: { status: 'error', error: undefined },
        };
        expect(paymentError()).toEqual(expected);
      });

      it('should create proper action with payload', () => {
        const payload = 'payload';
        const expected = {
          type: PAYMENT_PROGRESS,
          payload: { status: 'error', error: payload },
        };
        expect(paymentError(payload)).toEqual(expected);
      });
    });

    // Get-set user idempotency-key
    describe('Token', () => {
      it('should create proper action without payload', () => {
        const expected = {
          type: PAYMENT_TOKEN,
          payload: undefined,
        };
        expect(paymentToken()).toEqual(expected);
      });

      it('should create proper action with payload', () => {
        const payload = 'payload';
        const expected = {
          type: PAYMENT_TOKEN,
          payload: payload,
        };
        expect(paymentToken(payload)).toEqual(expected);
      });
    });

    // Reset payment process on failure
    describe('Reset', () => {
      it('should create proper action without payload', () => {
        const expected = {
          type: PAYMENT_RESET,
        };
        expect(paymentReset()).toEqual(expected);
      });

      it('should create proper action with payload', () => {
        const payload = 'payload';
        const expected = {
          type: PAYMENT_RESET,
        };
        expect(paymentReset(payload)).toEqual(expected);
      });
    });
  });
});
