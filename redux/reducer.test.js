import {
  PAYMENT_PROGRESS,
  addToCart,
  removeFromCart,
  getAmount,
  paymentReview,
} from './actions';
import { reducer } from './reducer';

describe('Reducer', () => {
  const mock_state = { state: 'state' };
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
    expect(reducer(mock_state, {})).toEqual(mock_state);
  });

  describe('MANAGE_CART', () => {
    it('should handle add', () => {
      const mock_action = addToCart('item');

      // add item to empty cart
      expect(reducer(mock_state, mock_action)).toEqual({
        ...mock_state,
        cart: [mock_action.cart.item],
      });

      // add item next to others
      expect(reducer({ ...mock_state, cart: ['item'] }, mock_action)).toEqual({
        ...mock_state,
        cart: ['item', mock_action.cart.item],
      });
    });

    it('should handle remove', () => {
      const mock_action = removeFromCart({ id: 'item' });

      // remove item by id
      expect(
        reducer({ ...mock_state, cart: [{ id: 'item' }] }, mock_action)
      ).toEqual({
        ...mock_state,
        cart: [],
      });

      // keep other items
      expect(
        reducer(
          { ...mock_state, cart: [{ id: 'item' }, { id: 'stay' }] },
          mock_action
        )
      ).toEqual({
        ...mock_state,
        cart: [{ id: 'stay' }],
      });
    });

    it('should handle amount', () => {
      const mock_action = getAmount();

      // get sum of item price with two decimals
      expect(
        reducer(
          { ...mock_state, cart: [{ price: 1 }, { price: 2 }] },
          mock_action
        )
      ).toEqual({
        ...mock_state,
        cart: [{ price: 1 }, { price: 2 }],
        amount: parseInt(3).toFixed(2),
      });
    });
  });

  describe('PAYMENT_PROGRESS', () => {
    it('should handle token', () => {
      const mock_action = paymentReview();

      // add new token
      expect(reducer(mock_state, mock_action)).toEqual({
        ...mock_state,
        payment: {
          status: 'review',
          details: {},
          intent: {},
          token: 'mock_uuid',
        },
      });

      // return existing token
      expect(
        reducer({ ...mock_state, payment: { token: 'existing' } }, mock_action)
      ).toEqual({
        ...mock_state,
        payment: {
          status: 'review',
          token: 'existing',
        },
      });
    });

    // extend payment && rewrite cart
    it('should handle status changes', () => {
      expect(
        reducer(
          { ...mock_state, payment: { token: 'token' }, cart: ['old'] },
          {
            type: PAYMENT_PROGRESS,
            payment: { status: 'status' },
            cart: ['new'],
          }
        )
      ).toEqual({
        ...mock_state,
        payment: { status: 'status', token: 'token' },
        cart: ['new'],
      });
    });
  });
});
