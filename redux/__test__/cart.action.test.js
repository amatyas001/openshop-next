import {
  GET_AMOUNT,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  getAmount,
  addToCart,
  removeFromCart,
  clearCart,
} from '../actions';

// Cart processing
describe('Cart actions', () => {
  // Current cart value
  describe('getAmount', () => {
    const expected = {
      type: GET_AMOUNT,
    };
    it('should create proper action without payload', () => {
      expect(getAmount()).toEqual(expected);
    });

    it('should create proper action with payload', () => {
      const payload = 'someFancyPayload';
      expect(getAmount(payload)).toEqual(expected);
    });
  });

  // Add item to cart
  describe('addToCart', () => {
    it('should create proper action without payload', () => {
      const expected = {
        type: ADD_TO_CART,
        payload: undefined,
      };
      expect(addToCart()).toEqual(expected);
    });

    it('should create proper action with payload', () => {
      const payload = 'item';
      const expected = {
        type: ADD_TO_CART,
        payload,
      };
      expect(addToCart(payload)).toEqual(expected);
    });
  });

  // Remove item from cart
  describe('removeFromCart', () => {
    it('should create proper action without payload', () => {
      const expected = {
        type: REMOVE_FROM_CART,
        payload: undefined,
      };
      expect(removeFromCart()).toEqual(expected);
    });

    it('should create proper action with payload', () => {
      const payload = 'item';
      const expected = {
        type: REMOVE_FROM_CART,
        payload: payload,
      };
      expect(removeFromCart(payload)).toEqual(expected);
    });
  });

  // Delete all items from cart
  describe('clearCart', () => {
    const expected = {
      type: CLEAR_CART,
    };
    it('should create proper action without payload', () => {
      expect(clearCart()).toEqual(expected);
    });

    it('should create proper action with payload', () => {
      const payload = 'someFancyPayload';
      expect(clearCart(payload)).toEqual(expected);
    });
  });
});
