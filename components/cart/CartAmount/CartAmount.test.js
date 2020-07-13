import { create, act } from 'react-test-renderer';
import createStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { mockProductWithBuyAmount } from '@app/mocks';
import { CartAmount } from '@app/components';

let tree;
let store;
const amount = 1;
const cart = mockProductWithBuyAmount(5, amount);
const mockStore = createStore([]);

describe('<CartAmount />', () => {
  beforeAll(() => {
    store = mockStore({ cart });
    act(() => {
      tree = create(
        <Provider store={store}>
          <CartAmount />
        </Provider>
      );
    });
  });

  it('should render without props', () => {
    expect.assertions(1);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should display total amount as two decimal value', () => {
    expect.assertions(1);
    expect(
      tree.root.findByProps({
        'data-testid': 'cart-amount-value',
      }).props.children[0]
    ).toEqual(
      store
        .getState()
        .cart.reduce((a, c) => a + c.price * amount, 0)
        .toFixed(2)
    );
  });
});
