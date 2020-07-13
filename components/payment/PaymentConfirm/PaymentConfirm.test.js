import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { INITIAL_STATE } from '@app/config';
import { mockProductWithBuyAmount } from '@app/mocks';
import { paymentSuccess, paymentError } from '@app/lib/redux/actions';
import { PaymentConfirm } from '@app/components';

const mockStore = configureStore([]);

let tree;
let store;
let submit;
let card;
const state = {
  ...INITIAL_STATE,
  cart: mockProductWithBuyAmount(1),
  payment: {
    status: 'confirm',
    details: {
      name: 'mock_name',
      email: 'mock_email',
      phone: 'mock_phone',
      address: 'mock_address',
    },
    intent: {
      id: 'mock_id',
      secret: 'mock_secret',
    },
    token: 'token',
  },
};

describe('<PaymentConfirm />', () => {
  beforeAll(() => {
    store = mockStore(state);
    act(() => {
      tree = create(
        <Provider store={store}>
          <PaymentConfirm />
        </Provider>
      );
    });
    store.clearActions();
    submit = tree.root.findByProps({
      'data-testid': 'confirm-controls-confirm',
    });
    card = tree.root.findByProps({
      'data-testid': 'confirm-card-element',
    });
  });

  it('should render without props', () => {
    expect.assertions(1);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should not dispatch paymentSuccess', async () => {
    expect.assertions(1);
    act(() => {
      card.props.onChange({ complete: false });
    });
    await act(async () => {
      await submit.props.onClick();
    });
    expect(store.getActions()).toEqual([]);
  });

  it('should dispatch paymentSuccess', async () => {
    expect.assertions(1);
    act(() => {
      card.props.onChange({ complete: true });
    });
    await act(async () => {
      await submit.props.onClick();
    });
    expect(store.getActions()).toEqual([
      paymentSuccess({
        status: 'succeeded',
        ...store.getState().payment.intent,
      }),
    ]);
  });

  it('should dispatch paymentError', async () => {
    expect.assertions(1);
    // Mocking error response from Stripe API
    // See: __mocks__/@stripe/react-stripe-js/useStripe
    state.payment.intent.secret = 'error';
    store = mockStore(state);
    act(() => {
      tree = create(
        <Provider store={store}>
          <PaymentConfirm />
        </Provider>
      );
    });
    store.clearActions();
    submit = tree.root.findByProps({
      'data-testid': 'confirm-controls-confirm',
    });
    card = tree.root.findByProps({
      'data-testid': 'confirm-card-element',
    });
    act(() => {
      card.props.onChange({
        complete: true,
      });
    });
    await act(async () => {
      await submit.props.onClick();
    });
    expect(store.getActions()).toEqual([paymentError('mock_error')]);
  });

  it('should render with initial state', () => {
    expect.assertions(1);
    act(() => {
      tree = create(
        <Provider store={mockStore(INITIAL_STATE)}>
          <PaymentConfirm />
        </Provider>
      );
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
