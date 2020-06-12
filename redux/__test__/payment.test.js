import {
  PAYMENT_PROGRESS,
  paymentActive,
  paymentConfirm,
  paymentSuccess,
  paymentCanceled,
} from '../actions';

describe('Actions: payment', () => {
  describe('active', () => {
    const expected = {
      type: PAYMENT_PROGRESS,
      payload: { status: true },
    };
    it('should create proper action without payload', () => {
      expect(paymentActive()).toEqual(expected);
    });

    it('should create proper action with payload', () => {
      const payload = 'someFancyPayload';
      expect(paymentActive(payload)).toEqual(expected);
    });
  });

  describe('confirm', () => {
    it('should create proper action without payload', () => {
      const expected = {
        type: PAYMENT_PROGRESS,
        payload: { status: 'confirm', intent: undefined, details: undefined },
      };
      expect(paymentConfirm()).toEqual(expected);
    });

    it('should create proper action with payload', () => {
      const details = 'details';
      const intent = 'intent';
      const expected = {
        type: PAYMENT_PROGRESS,
        payload: { status: 'confirm', intent, details },
      };
      expect(paymentConfirm(details, intent)).toEqual(expected);
    });
  });

  describe('success', () => {
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

  describe('canceled', () => {
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
});
