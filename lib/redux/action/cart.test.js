import {
  MANAGE_CART,
  getAmount,
  addToCart,
  removeFromCart,
} from '@app/redux/actions';

// Cart processing
describe('Cart actions', () => {
  // Current cart value
  describe('Amount', () => {
    const expected = {
      type: MANAGE_CART,
      cart: {
        status: 'amount',
      },
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
  describe('Add', () => {
    it('should creat proper action without payload', () => {
      const expected = {
        type: MANAGE_CART,
        cart: {
          status: 'add',
          item: undefined,
        },
      };
      expect(addToCart()).toEqual(expected);
    });

    it('should create proper action with payload', () => {
      const payload = 'item';
      const expected = {
        type: MANAGE_CART,
        cart: {
          status: 'add',
          item: payload,
        },
      };
      expect(addToCart(payload)).toEqual(expected);
    });
  });

  // Remove item from cart
  describe('Remove', () => {
    it('should create proper action without payload', () => {
      const expected = {
        type: MANAGE_CART,
        cart: {
          status: 'remove',
          item: undefined,
        },
      };
      expect(removeFromCart()).toEqual(expected);
    });

    it('should create proper action with payload', () => {
      const payload = 'item';
      const expected = {
        type: MANAGE_CART,
        cart: {
          status: 'remove',
          item: payload,
        },
      };
      expect(removeFromCart(payload)).toEqual(expected);
    });
  });
});
