import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { panelToggle } from '@app/lib/redux/actions';
import { mockProductWithBuyAmount } from '@app/mocks';
import { CartButton } from '@app/components';

let tree;
let store;
const mockStore = configureStore([]);

describe('<CartButton />', () => {
  describe('on empty cart', () => {
    beforeAll(() => {
      store = mockStore({
        cart: [],
        panel: {
          cart: false,
        },
      });
      act(() => {
        tree = create(
          <Provider store={store}>
            <CartButton />
          </Provider>
        );
      });
    });

    it('should render without props', () => {
      expect.assertions(1);
      expect(tree.toJSON()).toMatchSnapshot();
    });

    it('should toggle panel collapse', () => {
      expect.assertions(1);
      act(() => {
        tree.root.findByType('button').props.onClick();
      });
      expect(store.getActions()).toEqual([
        panelToggle('cart', !store.getState().panel.cart),
      ]);
    });
  });

  describe('on not empty cart', () => {
    const amount = 1;

    beforeAll(() => {
      store = mockStore({
        cart: mockProductWithBuyAmount(1, amount),
        panel: { cart: false },
      });
      act(() => {
        tree = create(
          <Provider store={store}>
            <CartButton />
          </Provider>
        );
      });
    });

    it('should render without props', () => {
      expect.assertions(1);
      expect(tree.toJSON()).toMatchSnapshot();
    });

    it('should toggle panel collapse', () => {
      expect.assertions(1);
      act(() => {
        tree.root.findByType('button').props.onClick();
      });
      expect(store.getActions()).toEqual([
        panelToggle('cart', !store.getState().panel.cart),
      ]);
    });

    it('should display amount of cart items', () => {
      expect.assertions(1);
      expect(tree.root.findByType('button').props.children).toContain(
        `${amount} item(s)`
      );
    });
  });
});
