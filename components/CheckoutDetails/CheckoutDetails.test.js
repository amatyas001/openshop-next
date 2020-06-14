import { Provider } from 'react-redux';
import { create } from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {
  paymentReset,
  checkoutFinished,
  paymentToken,
  clearCart,
} from '../../redux/actions';
import { CheckoutDetails } from './CheckoutDetails';

const mockStore = configureStore([]);
const mock_prefetch = jest.fn();
const mock_replace = jest.fn();
const mock_uuid = 'uuid';

jest.mock('@stripe/react-stripe-js', () => ({
  useStripe: () => true,
  useElements: jest.fn(),
  CardElement: () => 'CardElement',
}));

jest.mock('next/router', () => ({
  useRouter: () => ({
    replace: mock_replace,
    prefetch: mock_prefetch,
  }),
}));

jest.mock('uuid', () => ({
  v1: () => mock_uuid,
}));

describe('<CheckoutDetails />', () => {
  let tree;

  afterEach(() => {
    mock_prefetch.mockClear();
    mock_replace.mockClear();
  });

  describe('when payment initialized', () => {
    let store;
    beforeEach(() => {
      store = mockStore({
        payment: { status: true },
      });
      tree = create(
        <Provider store={store}>
          <CheckoutDetails />
        </Provider>
      );
    });

    it('should render without props', () => {
      expect(tree.toJSON()).toMatchSnapshot();
    });

    it('should prefetch index page', () => {
      expect(mock_prefetch).toHaveBeenCalledTimes(1);
      expect(mock_prefetch).toHaveBeenCalledWith('/');
    });

    it('should create token', () => {
      expect(store.getActions()).toEqual([paymentToken(mock_uuid)]);
    });

    describe('on form incomplete', () => {
      it('should render details form', () => {
        expect(tree.root.findByType('form').type).toBe('form');
      });
    });

    describe('on form complete', () => {
      const states = ['success', 'canceled', 'error'];
      states.map((item) => {
        it(`should render ${item} content`, () => {
          store = mockStore({
            payment: { status: item, intent: { id: 'id' } },
          });
          tree = create(
            <Provider store={store}>
              <CheckoutDetails />
            </Provider>
          );
          switch (item) {
            case 'success':
              expect(store.getActions()).toEqual([
                paymentToken(mock_uuid),
                checkoutFinished(),
              ]);
              break;
            case 'canceled':
              expect(store.getActions()).toEqual([
                paymentToken(mock_uuid),
                clearCart(),
                checkoutFinished(),
              ]);
              break;
            case 'error':
              expect(store.getActions()).toEqual([paymentToken(mock_uuid)]);
              break;
          }
          expect(tree.toJSON()).toMatchSnapshot();
        });
      });
    });

    describe('on error', () => {
      it('should reset progress', () => {
        store = mockStore({
          payment: { status: 'error' },
        });
        tree = create(
          <Provider store={store}>
            <CheckoutDetails />
          </Provider>
        );
        tree.root.findByType('button').props.onClick();
        expect(store.getActions()).toEqual([
          paymentToken(mock_uuid),
          paymentReset(),
        ]);
      });
    });
  });

  describe('when payment not initialized', () => {
    let store;
    beforeEach(() => {
      store = mockStore({
        payment: { status: false },
      });
      tree = create(
        <Provider store={store}>
          <CheckoutDetails />
        </Provider>
      );
    });

    it('should render without props', () => {
      expect(tree.toJSON()).toMatchSnapshot();
    });

    it('should redirect to home page', () => {
      expect(mock_replace).toHaveBeenCalledTimes(1);
      expect(mock_replace).toHaveBeenCalledWith('/');
    });
  });
});
