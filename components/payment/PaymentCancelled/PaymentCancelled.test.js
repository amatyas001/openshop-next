import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { INITIAL_STATE } from '@app/config';
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

    act(() => {
      tree = create(
        <Provider store={store}>
          <PaymentCancelled />
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
        'data-testid': 'cancelled-details',
      }).props.children
    ).toContain(store.getState().payment.intent.id);
  });

  it('should render with initial state', () => {
    act(() => {
      tree = create(
        <Provider store={mockStore(INITIAL_STATE)}>
          <PaymentCancelled />
        </Provider>
      );
    });

    expect(tree.toJSON()).toMatchSnapshot();

    expect(
      tree.root.findByProps({
        'data-testid': 'cancelled-details',
      }).props.children
    ).toBeUndefined();
  });
});
