import { create, act } from 'react-test-renderer';
import { CartButton } from './CartButton';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { panelToggle } from '@app/lib/redux/actions';
import { mockProduct } from '@app/mocks';

const mockStore = configureStore([]);

describe('<CartButton />', () => {
  let tree, store;

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
      expect(tree.toJSON()).toMatchSnapshot();
    });

    it('should toggle panel collapse', () => {
      act(() => {
        tree.root.findByType('button').props.onClick();
      });
      expect(store.getActions()).toEqual([
        panelToggle('cart', !store.getState().panel.cart),
      ]);
    });
  });

  describe('on not empty cart', () => {
    let mock_amount = 2;

    beforeAll(() => {
      store = mockStore({
        cart: [
          {
            ...mockProduct(1)[0],
            buy: {
              amount: mock_amount,
            },
          },
        ],
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
      expect(tree.toJSON()).toMatchSnapshot();
    });

    it('should toggle panel collapse', () => {
      act(() => {
        tree.root.findByType('button').props.onClick();
      });
      expect(store.getActions()).toEqual([
        panelToggle('cart', !store.getState().panel.cart),
      ]);
    });

    it('should display amount of cart items', () => {
      expect(tree.root.findByType('button').props.children).toContain(
        mock_amount + ' item(s)'
      );
    });
  });
});
