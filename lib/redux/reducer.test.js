import { reducer } from '@app/lib/redux/reducer';
import {
  PAYMENT_STAGE,
  filterName,
  addToCart,
  panelToggle,
  removeFromCart,
  paymentReview,
} from '@app/lib/redux/actions';
import { INITIAL_STATE } from '@app/config';

describe('Reducer', () => {
  const state = { state: 'state' };
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
    expect(reducer(state, {})).toEqual(state);
  });

  describe('PANEL_TOGGLE', () => {
    it('should toggle panel state', () => {
      expect(reducer({ ...state, panel: { mock: false } }, panelToggle('mock', true))).toEqual({
        ...state,
        panel: { mock: true },
      });
    });
  });

  describe('ITEM_FILTER', () => {
    it('should store filter values', () => {
      const value = 'value';
      expect(reducer({ ...INITIAL_STATE }, filterName(value))).toEqual({
        ...INITIAL_STATE,
        filters: {
          ...INITIAL_STATE.filters,
          name: value,
        },
      });
    });
  });

  describe('CART_MANAGE', () => {
    describe('Add', () => {
      const amount = 2;
      const item = {
        id: 'id',
        name: 'name',
        buy: {
          size: 'size',
          amount,
        },
      };
      const action = addToCart(item);

      it('should add item to empty cart', () => {
        expect(reducer({ ...state, cart: [] }, action)).toEqual({
          ...state,
          cart: [item],
        });
      });

      it('should add item to the beginning of a non-empty cart', () => {
        const newItem = 'item';
        expect(reducer({ ...state, cart: [newItem] }, action)).toEqual({
          ...state,
          cart: [item, newItem],
        });
      });

      it('should increase amount of an existing item', () => {
        expect(reducer({ ...state, cart: [item] }, action)).toEqual({
          ...state,
          cart: [
            {
              ...item,
              buy: {
                ...item.buy,
                amount: item.buy.amount + amount,
              },
            },
          ],
        });
      });
    });

    describe('Remove', () => {
      const amount = 2;
      const item = {
        id: 'id',
        name: 'name',
        buy: {
          size: 'size',
          amount,
        },
      };
      const action = removeFromCart(item);

      it('should decrease the amount of an existing item by one', () => {
        expect(reducer({ ...state, cart: [item] }, action)).toEqual({
          ...state,
          cart: [
            {
              ...item,
              buy: { ...item.buy, amount: item.buy.amount - 1 },
            },
          ],
        });
      });

      it('should remove item from cart if amount is zero', () => {
        item.buy.amount = 1;
        expect(reducer({ ...state, cart: [item] }, action)).toEqual({
          ...state,
          cart: [],
        });
      });
    });
  });

  describe('PAYMENT_STAGE', () => {
    it('should handle token', () => {
      const action = paymentReview();

      expect(reducer(state, action)).toEqual({
        ...state,
        payment: {
          status: 'review',
          details: {},
          intent: {},
          token: 'uuid',
        },
      });

      expect(reducer({ ...state, payment: { token: 'existing' } }, action)).toEqual({
        ...state,
        payment: {
          status: 'review',
          token: 'existing',
        },
      });
    });

    it('should handle status changes', () => {
      expect(
        reducer(
          { ...state, payment: { token: 'token' }, cart: ['old'] },
          {
            type: PAYMENT_STAGE,
            payment: { status: 'status' },
            cart: ['new'],
          }
        )
      ).toEqual({
        ...state,
        payment: { status: 'status', token: 'token' },
        cart: ['new'],
      });
    });
  });
});
