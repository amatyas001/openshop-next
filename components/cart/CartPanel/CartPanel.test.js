import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { INITIAL_STATE } from '@app/config/';
import { mockProductWithBuyAmount } from '@app/mocks';
import { panelToggle, paymentReview } from '@app/lib/redux/actions';
import { CartPanel } from '@app/components';

let tree;
let store;
const mockStore = configureStore([]);

jest.mock('next/link', () => ({ children }) => children);

describe('<CartPanel />', () => {
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
      expect.assertions(1);
      expect(tree.toJSON()).toMatchSnapshot();
    });

    it('should close panel with button', () => {
      act(() => {
        tree.root.findByProps({ 'data-testid': 'cart-panel-button-close' }).props.onClick();
      });
      expect.assertions(1);
      expect(store.getActions()).toEqual([panelToggle('cart', false)]);
    });

    it('should render disabled continue button', () => {
      expect.assertions(1);
      expect(
        tree.root.findByProps({ 'data-testid': 'cart-panel-button-continue' }).props.disabled
      ).toBeTruthy();
    });
  });

  describe('on non empty cart', () => {
    beforeAll(() => {
      store = mockStore({
        ...INITIAL_STATE,
        cart: mockProductWithBuyAmount(1),
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
      expect.assertions(1);
      expect(tree.toJSON()).toMatchSnapshot();
    });

    it('should render enabled continue button', () => {
      expect.assertions(1);
      expect(
        tree.root.findByProps({ 'data-testid': 'cart-panel-button-continue' }).props.disabled
      ).toBeFalsy();
    });

    it('should continue to payment review', () => {
      expect.assertions(1);
      act(() => {
        tree.root.findByProps({ 'data-testid': 'cart-panel-button-continue' }).props.onClick({
          preventDefault: jest.fn(),
          currentTarget: {
            nodeName: 'button',
          },
        });
      });
      expect(store.getActions()).toEqual([panelToggle('cart', false), paymentReview()]);
    });
  });
});
