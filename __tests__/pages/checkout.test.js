import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Checkout from '@app/pages/checkout';

const mockStore = configureStore([]);

describe('<Checkout />', () => {
  let tree, store;

  const status = ['review', 'form', 'confirm', 'success', 'cancelled', 'error'];

  it('should render unauthorized component', async () => {
    await act(async () => {
      tree = create(
        <Provider store={mockStore({})}>
          <Checkout />
        </Provider>
      );
    });

    expect(tree.toJSON()).toMatchSnapshot();
  });

  status.map((item) => {
    it(`should render ${item} component`, async () => {
      store = mockStore({
        cart: [
          {
            id: 'mock_id',
            name: 'mock_name',
            description: 'mock_desc',
            img: 'mock_img',
            price: 10,
            starrating: 5,
            color: 'mock_color',
            amount: 10,
            buy: {
              amount: 1,
            },
          },
        ],
        payment: {
          status: item,
          intent: { id: 'id' },
          error: { message: 'message' },
          details: { name: 'name' },
        },
      });

      await act(async () => {
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
