import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { paymentToken } from '../../redux/actions';
import Checkout from '../checkout';

const mockStore = configureStore([]);

const mock_prefetch = jest.fn();
const mock_replace = jest.fn();

jest.spyOn(require('next/router'), 'useRouter').mockImplementation(() => {
  return {
    prefetch: mock_prefetch,
    replace: mock_replace,
  };
});

describe('Checkout page', () => {
  let tree, store;

  afterEach(() => {
    mock_prefetch.mockClear();
    mock_replace.mockClear();
  });

  it('should prefetch home page', () => {
    store = mockStore({ cart: [] });
    act(() => {
      tree = create(
        <Provider store={store}>
          <Checkout />
        </Provider>
      );
    });
    expect(mock_prefetch).toHaveBeenCalledTimes(1);
    expect(mock_prefetch).toHaveBeenCalledWith('/');
  });

  describe('when there is no item in cart', () => {
    beforeEach(() => {
      store = mockStore({ cart: [] });
      act(() => {
        tree = create(
          <Provider store={store}>
            <Checkout />
          </Provider>
        );
      });
    });

    it('should redirect to home page', () => {
      expect(mock_replace).toHaveBeenCalledTimes(1);
      expect(mock_replace).toHaveBeenCalledWith('/');
    });

    it('should not create token', () => {
      expect(store.getActions()).toEqual([]);
    });
  });

  describe('when there are items in cart', () => {
    beforeEach(() => {
      store = mockStore({
        cart: ['item'],
        payment: { status: 'status' },
      });
      act(() => {
        tree = create(
          <Provider store={store}>
            <Checkout />
          </Provider>
        );
      });
    });

    it('should not redirect to home page', () => {
      expect(mock_replace).not.toHaveBeenCalled();
    });

    it('should create token', () => {
      expect(store.getActions()).toEqual([paymentToken('mock_uuid')]);
    });

    const status = [
      'review',
      'form',
      'confirm',
      'success',
      'cancelled',
      'error',
    ];

    status.map((item) => {
      it(`should render ${item} component in Elements`, () => {
        store = mockStore({
          cart: [
            {
              id: 'id',
              name: 'name',
              price: 'price',
              img: 'img',
              color: 'color',
            },
          ],
          payment: {
            status: item,
            intent: { id: 'id' },
            error: { message: 'message' },
            details: { name: 'name' },
          },
        });
        act(() => {
          tree = create(
            <Provider store={store}>
              <Checkout />
            </Provider>
          );
        });
        expect(tree.toJSON()).toMatchSnapshot();
      });
    });
  });
});
