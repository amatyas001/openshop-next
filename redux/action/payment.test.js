import {
  PAYMENT_PROGRESS,
  paymentReview,
  paymentForm,
  paymentConfirm,
  paymentSuccess,
  paymentCancelled,
  paymentError,
  paymentReset,
} from '@app/redux/actions';

describe('Payment actions', () => {
  describe('Review', () => {
    const expected = {
      type: PAYMENT_PROGRESS,
      payment: {
        status: 'review',
        details: {},
        intent: {},
        token: 'mock_uuid',
      },
    };
    it('should create proper action without payload', () => {
      expect(paymentReview()).toEqual(expected);
    });

    it('should create proper action with payload', () => {
      const payload = 'payload';
      expect(paymentReview(payload)).toEqual(expected);
    });
  });

  describe('Form', () => {
    const expected = {
      type: PAYMENT_PROGRESS,
      payment: { status: 'form' },
    };
    it('should create proper action without payload', () => {
      expect(paymentForm()).toEqual(expected);
    });

    it('should create proper action with payload', () => {
      const payload = 'payload';
      expect(paymentForm(payload)).toEqual(expected);
    });
  });

  describe('Confirm', () => {
    it('should create proper action without payload', () => {
      const expected = {
        type: PAYMENT_PROGRESS,
        payment: {
          status: 'confirm',
          intent: undefined,
          details: undefined,
        },
      };
      expect(paymentConfirm()).toEqual(expected);
    });

    it('should create proper action with payload', () => {
      const details = 'payload';
      const intent = 'payload';
      const expected = {
        type: PAYMENT_PROGRESS,
        payment: { status: 'confirm', intent, details },
      };
      expect(paymentConfirm(details, intent)).toEqual(expected);
    });
  });

  describe('Success', () => {
    it('should create proper action without payload', () => {
      const expected = {
        type: PAYMENT_PROGRESS,
        payment: {
          status: 'success',
          intent: undefined,
          token: false,
        },
        cart: [],
      };
      expect(paymentSuccess()).toEqual(expected);
    });

    it('should create proper action with payload', () => {
      const payload = 'payload';
      const expected = {
        type: PAYMENT_PROGRESS,
        payment: { status: 'success', intent: payload, token: false },
        cart: [],
      };
      expect(paymentSuccess(payload)).toEqual(expected);
    });
  });

  describe('Cancelled', () => {
    it('should create proper action without payload', () => {
      const expected = {
        type: PAYMENT_PROGRESS,
        payment: {
          status: 'cancelled',
          intent: undefined,
          token: false,
        },
      };
      expect(paymentCancelled()).toEqual(expected);
    });

    it('should create proper action with payload', () => {
      const payload = 'payload';
      const expected = {
        type: PAYMENT_PROGRESS,
        payment: {
          status: 'cancelled',
          intent: payload,
          token: false,
        },
      };
      expect(paymentCancelled(payload)).toEqual(expected);
    });
  });

  describe('Error', () => {
    it('should create proper action without payload', () => {
      const expected = {
        type: PAYMENT_PROGRESS,
        payment: {
          status: 'error',
          error: undefined,
          token: false,
        },
      };
      expect(paymentError()).toEqual(expected);
    });

    it('should create proper action with payload', () => {
      const payload = 'payload';
      const expected = {
        type: PAYMENT_PROGRESS,
        payment: { status: 'error', error: payload, token: false },
      };
      expect(paymentError(payload)).toEqual(expected);
    });
  });

  describe('Reset', () => {
    it('should create proper action without payload', () => {
      const expected = {
        type: PAYMENT_PROGRESS,
        payment: {
          status: 'review',
          token: false,
          intent: false,
          error: false,
        },
      };
      expect(paymentReset()).toEqual(expected);
    });

    it('should create proper action with payload', () => {
      const payload = 'payload';
      const expected = {
        type: PAYMENT_PROGRESS,
        payment: {
          status: 'review',
          token: false,
          intent: false,
          error: false,
        },
      };
      expect(paymentReset(payload)).toEqual(expected);
    });
  });
});
