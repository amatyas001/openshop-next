import { create, act } from 'react-test-renderer';
import createStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { mockProduct } from '@app/mocks';
import { CartAmount } from '@app/components/';

const mockStore = createStore([]);

const mock_amount = 1;

describe('<CartAmount />', () => {
  let tree, store, products;

  beforeAll(() => {
    products = mockProduct(5);

    store = mockStore({
      cart: [
        ...products.map((product) => ({
          ...product,
          buy: { amount: mock_amount },
        })),
      ],
    });

    act(() => {
      tree = create(
        <Provider store={store}>
          <CartAmount />
        </Provider>
      );
    });
  });

  it('should render without props', () => {
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should display total amount as two decimal value', () => {
    expect(
      tree.root.findByProps({
        'data-testid': 'cart-amount-value',
      }).props.children[0]
    ).toEqual(
      store
        .getState()
        .cart.reduce((a, c) => (a += c.price * mock_amount), 0)
        .toFixed(2)
    );
  });
});
