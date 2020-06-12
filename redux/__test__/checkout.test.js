import {
  CHECKOUT_PROGRESS,
  checkoutReview,
  checkoutDetails,
  checkoutFinished,
} from '../actions';

describe('Actions: checkout', () => {
  describe('review', () => {
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

  describe('details', () => {
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

  describe('finished', () => {
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
