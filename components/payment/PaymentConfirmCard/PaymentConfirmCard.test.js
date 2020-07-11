import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { PaymentConfirmCard } from '@app/components';
import { INITIAL_STATE } from '@app/config';

const mockStore = configureStore([]);

const mock_load = jest.fn();
const mock_set = jest.fn();

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

describe('<PaymentConfirmCard/>', () => {
  let tree, store;

  beforeAll(() => {
    store = mockStore(_state);

    act(() => {
      tree = create(
        <Provider store={store}>
          <PaymentConfirmCard loadHandler={mock_load} setHandler={mock_set} />
        </Provider>
      );
    });
  });

  it('should render with required props', () => {
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should lift handlers to parent', () => {
    expect(mock_set).toHaveBeenCalledTimes(1);
  });

  it('should set complete state', () => {
    act(() => {
      tree.root
        .findByProps({
          'data-testid': 'confirm-card-element',
        })
        .props.onChange({ complete: true });
    });

    expect(mock_set).toHaveBeenCalledTimes(2);
  });

  it('should display card error', () => {
    const mock_error = 'mock_error';

    act(() => {
      tree.root
        .findByProps({
          'data-testid': 'confirm-card-element',
        })
        .props.onChange({ error: { message: mock_error } });
    });

    expect(
      tree.root.findByProps({
        'data-testid': 'confirm-card-error',
      }).props.children
    ).toContain(mock_error);
  });

  it('should render with initial state', () => {
    act(() => {
      tree = create(
        <Provider store={mockStore(INITIAL_STATE)}>
          <PaymentConfirmCard loadHandler={mock_load} setHandler={mock_set} />
        </Provider>
      );
    });

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
