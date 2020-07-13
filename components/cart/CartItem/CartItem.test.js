import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { INITIAL_STATE } from '@app/config/';
import { mockProductWithBuyAmount } from '@app/mocks';
import { removeFromCart } from '@app/lib/redux/actions';
import { CartItem } from '@app/components';

let tree;
let store;
const mockStore = configureStore([]);
const product = mockProductWithBuyAmount(1)[0];

describe('<CartItem />', () => {
  beforeAll(() => {
    store = mockStore(INITIAL_STATE);
    act(() => {
      tree = create(
        <Provider store={store}>
          <CartItem item={product} />
        </Provider>
      );
    });
  });

  it('should render with required props', () => {
    expect.assertions(1);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should remove item from cart', () => {
    act(() => {
      tree = create(
        <Provider store={store}>
          <CartItem item={product} icons />
        </Provider>
      );
    });
    act(() => {
      tree.root
        .findByProps({
          'data-testid': 'cart-item-button-delete',
        })
        .props.handler();
    });
    expect.assertions(1);
    expect(store.getActions()).toEqual([removeFromCart(product)]);
  });
});
