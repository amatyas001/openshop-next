import { CART_MANAGE, addToCart, removeFromCart } from '@app/lib/redux/actions';

describe('CART_MANAGE', () => {
  describe('Add', () => {
    it('should create proper action without payload', () => {
      const expected = {
        type: CART_MANAGE,
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
        type: CART_MANAGE,
        cart: {
          status: 'add',
          item: payload,
        },
      };
      expect(addToCart(payload)).toEqual(expected);
    });
  });

  describe('Remove', () => {
    it('should create proper action without payload', () => {
      const expected = {
        type: CART_MANAGE,
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
        type: CART_MANAGE,
        cart: {
          status: 'remove',
          item: payload,
        },
      };
      expect(removeFromCart(payload)).toEqual(expected);
    });
  });
});
