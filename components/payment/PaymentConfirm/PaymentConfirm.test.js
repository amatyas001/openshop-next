import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { paymentSuccess, paymentError } from '@app/redux/actions';
import { PaymentConfirm } from '@app/components';

const mockStore = configureStore([]);

const _state = {
  cart: [
    {
      id: 'mock_id',
      name: 'mock_name',
      desc: 'mock_desc',
      img: 'mock_img',
      price: 10,
      rating: 5,
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
});
