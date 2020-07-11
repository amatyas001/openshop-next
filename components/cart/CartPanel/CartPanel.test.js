import { create, act } from 'react-test-renderer';
import { CartPanel } from './CartPanel';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { INITIAL_STATE } from '@app/config/';
import { mockProduct } from '@app/mocks';
import { panelToggle, paymentReview } from '@app/lib/redux/actions';

const mockStore = configureStore([]);
jest.mock('next/link', () => ({ children }) => children);

describe('<CartPanel />', () => {
  let tree, store;

  describe('on empty cart', () => {
    beforeAll(() => {
      act(() => {
        store = mockStore(INITIAL_STATE);

        tree = create(
          <Provider store={store}>
            <CartPanel />
          </Provider>
        );
      });
    });

    it('should render without props', () => {
      expect(tree.toJSON()).toMatchSnapshot();
    });

    it('should close panel with button', () => {
      act(() => {
        tree.root
          .findByProps({
            'data-testid': 'cart-panel-button-close',
          })
          .props.onClick();
      });
      expect(store.getActions()).toEqual([panelToggle('cart', false)]);
    });

    it('should render disabled continue button', () => {
      expect(
        tree.root.findByProps({
          'data-testid': 'cart-panel-button-continue',
        }).props.disabled
      ).toBeTruthy();
    });
  });

  describe('on non empty cart', () => {
    beforeAll(() => {
      store = mockStore({
        ...INITIAL_STATE,
        cart: [{ ...mockProduct(1)[0], buy: { amount: 1 } }],
      });

      act(() => {
        tree = create(
          <Provider store={store}>
            <CartPanel />
          </Provider>
        );
      });
    });

    it('should render without props', () => {
      expect(tree.toJSON()).toMatchSnapshot();
    });

    it('should render enabled continue button', () => {
      expect(
        tree.root.findByProps({
          'data-testid': 'cart-panel-button-continue',
        }).props.disabled
      ).toBeFalsy();
    });

    it('should continue to payment review', () => {
      act(() => {
        tree.root
          .findByProps({
            'data-testid': 'cart-panel-button-continue',
          })
          .props.onClick({
            preventDefault: jest.fn(),
            currentTarget: {
              nodeName: 'button',
            },
          });
      });

      expect(store.getActions()).toEqual([
        panelToggle('cart', false),
        paymentReview(),
      ]);
    });
  });
});
