import { create, act } from 'react-test-renderer';
import { CartItem } from './CartItem';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { INITIAL_STATE } from '@app/config/';
import { mockProduct } from '@app/mocks';
import { removeFromCart } from '@app/lib/redux/actions';

const mockStore = configureStore([]);

const mock_product = { ...mockProduct(1)[0], buy: { amount: 1 } };

describe('<CartItem />', () => {
  let tree, store;

  beforeAll(() => {
    store = mockStore(INITIAL_STATE);

    act(() => {
      tree = create(
        <Provider store={store}>
          <CartItem item={mock_product} />
        </Provider>
      );
    });
  });

  it('should render with required props', () => {
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should remove item from cart', () => {
    act(() => {
      tree.root
        .findByProps({
          'data-testid': 'cart-item-button-delete',
        })
        .props.handler();
    });
    expect(store.getActions()).toEqual([removeFromCart(mock_product)]);
  });
});
