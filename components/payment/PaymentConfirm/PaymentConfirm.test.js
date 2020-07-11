import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { paymentSuccess, paymentError } from '@app/lib/redux/actions';
import { PaymentConfirm } from '@app/components';
import { INITIAL_STATE } from '@app/config';

const mockStore = configureStore([]);

const _state = {
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
  let tree, store, submit, card;

  beforeAll(() => {
    store = mockStore(_state);

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
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should not dispatch paymentSuccess', async () => {
    act(() => {
      card.props.onChange({ complete: false });
    });

    await act(async () => {
      await submit.props.onClick();
    });

    expect(store.getActions()).toEqual([]);
  });

  it('should dispatch paymentSuccess', async () => {
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

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should dispatch paymentError', async () => {
    _state.payment.intent.secret = 'error';
    store = mockStore(_state);

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
      card.props.onChange({ complete: true });
    });

    await act(async () => {
      await submit.props.onClick();
    });

    expect(store.getActions()).toEqual([paymentError('mock_error')]);
  });

  it('should render with initial state', () => {
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
