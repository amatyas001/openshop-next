import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { PaymentSuccess } from '@app/components/';

const mockStore = configureStore([]);

describe('<PaymentSuccess />', () => {
  let tree, store;

  beforeAll(() => {
    store = mockStore({
      payment: {
        status: 'form',
        token: 'token',
        intent: {
          id: 'mock_id',
        },
      },
      cart: [{ id: 'id' }],
      amount: 100,
    });

    act(() => {
      tree = create(
        <Provider store={store}>
          <PaymentSuccess />
        </Provider>
      );
    });
  });

  it('should render without props', () => {
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should render intent details', () => {
    expect(
      tree.root.findByProps({
        'data-testid': 'success-content',
      }).props.children
    ).toContain(store.getState().payment.intent.id);
  });
});
