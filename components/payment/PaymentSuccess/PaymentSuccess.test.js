import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mockProductWithBuyAmount } from '@app/mocks';
import { INITIAL_STATE } from '@app/config/';
import { PaymentSuccess } from '@app/components/';

let tree;
let store;
const mockStore = configureStore([]);

describe('<PaymentSuccess />', () => {
  beforeAll(() => {
    store = mockStore({
      ...INITIAL_STATE,
      payment: {
        status: 'form',
        token: 'token',
        intent: {
          id: 'mock_id',
        },
      },
      cart: mockProductWithBuyAmount(1),
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
    expect.assertions(1);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should render intent details', () => {
    expect.assertions(1);
    expect(tree.root.findByProps({ 'data-testid': 'success-content' }).props.children).toContain(
      store.getState().payment.intent.id
    );
  });

  it('should render with intial state', () => {
    expect.assertions(1);
    act(() => {
      tree = create(
        <Provider store={mockStore(INITIAL_STATE)}>
          <PaymentSuccess />
        </Provider>
      );
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
