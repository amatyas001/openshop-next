import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { PaymentCancelled } from '@app/components';

const mockStore = configureStore([]);

describe('<PaymentCancelled />', () => {
  let tree, store;

  beforeAll(() => {
    store = mockStore({
      payment: { status: 'cancelled', intent: { id: 'mock_id' } },
      cart: [{ id: 'id' }],
      amount: 100,
    });
  });

  it('should render without props', () => {
    act(() => {
      tree = create(
        <Provider store={store}>
          <PaymentCancelled />
        </Provider>
      );
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should render intent details', () => {
    act(() => {
      tree = create(
        <Provider store={store}>
          <PaymentCancelled />
        </Provider>
      );
    });
    expect(
      tree.root.findByProps({
        'data-testid': 'cancelled-details',
      }).props.children
    ).toContain(store.getState().payment.intent.id);
  });
});
