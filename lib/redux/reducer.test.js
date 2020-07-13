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
  const mock_state = { state: 'state' };
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
    expect(reducer(mock_state, {})).toEqual(mock_state);
  });

  describe('PANEL_TOGGLE', () => {
    it('should toggle panel state', () => {
      expect(reducer({ ...mock_state, panel: { mock: false } }, panelToggle('mock', true))).toEqual(
        {
          ...mock_state,
          panel: { mock: true },
        }
      );
    });
  });

  describe('ITEM_FILTER', () => {
    it('should store filter values', () => {
      const mock_value = 'mock_value';
      expect(reducer({ ...INITIAL_STATE }, filterName(mock_value))).toEqual({
        ...INITIAL_STATE,
        filters: {
          ...INITIAL_STATE.filters,
          name: mock_value,
        },
      });
    });
  });

  describe('CART_MANAGE', () => {
    describe('Add', () => {
      const mock_amount = 2;
      const mock_item = {
        id: 'mock_id',
        name: 'mock_name',
        buy: {
          size: 'mock_size',
          amount: mock_amount,
        },
      };
      const mock_action = addToCart(mock_item);

      it('should add item to empty cart', () => {
        expect(reducer({ ...mock_state, cart: [] }, mock_action)).toEqual({
          ...mock_state,
          cart: [mock_item],
        });
      });

      it('should add item to the beginning of a non-empty cart', () => {
        const mock_item_2 = 'mock_item';
        expect(reducer({ ...mock_state, cart: [mock_item_2] }, mock_action)).toEqual({
          ...mock_state,
          cart: [mock_item, mock_item_2],
        });
      });

      it('should increase amount of an existing item', () => {
        expect(reducer({ ...mock_state, cart: [mock_item] }, mock_action)).toEqual({
          ...mock_state,
          cart: [
            {
              ...mock_item,
              buy: {
                ...mock_item.buy,
                amount: mock_item.buy.amount + mock_amount,
              },
            },
          ],
        });
      });
    });

    describe('Remove', () => {
      const mock_amount = 2;
      const mock_item = {
        id: 'mock_id',
        name: 'mock_name',
        buy: {
          size: 'mock_size',
          amount: mock_amount,
        },
      };
      const mock_action = removeFromCart(mock_item);

      it('should decrease the amount of an existing item by one', () => {
        expect(reducer({ ...mock_state, cart: [mock_item] }, mock_action)).toEqual({
          ...mock_state,
          cart: [
            {
              ...mock_item,
              buy: { ...mock_item.buy, amount: mock_item.buy.amount - 1 },
            },
          ],
        });
      });

      it('should remove item from cart if amount is zero', () => {
        mock_item.buy.amount = 1;
        expect(reducer({ ...mock_state, cart: [mock_item] }, mock_action)).toEqual({
          ...mock_state,
          cart: [],
        });
      });
    });
  });

  describe('PAYMENT_STAGE', () => {
    it('should handle token', () => {
      const mock_action = paymentReview();

      expect(reducer(mock_state, mock_action)).toEqual({
        ...mock_state,
        payment: {
          status: 'review',
          details: {},
          intent: {},
          token: 'mock_uuid',
        },
      });

      expect(reducer({ ...mock_state, payment: { token: 'existing' } }, mock_action)).toEqual({
        ...mock_state,
        payment: {
          status: 'review',
          token: 'existing',
        },
      });
    });

    it('should handle status changes', () => {
      expect(
        reducer(
          { ...mock_state, payment: { token: 'token' }, cart: ['old'] },
          {
            type: PAYMENT_STAGE,
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
