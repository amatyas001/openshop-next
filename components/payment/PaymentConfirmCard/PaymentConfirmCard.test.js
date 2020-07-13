import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mockProductWithBuyAmount } from '@app/mocks';
import { INITIAL_STATE } from '@app/config';
import { PaymentConfirmCard } from '@app/components';

let tree;
let store;
const load = jest.fn();
const set = jest.fn();
const mockStore = configureStore([]);
const state = {
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

describe('<PaymentConfirmCard/>', () => {
  beforeAll(() => {
    store = mockStore(state);
    act(() => {
      tree = create(
        <Provider store={store}>
          <PaymentConfirmCard loadHandler={load} setHandler={set} />
        </Provider>
      );
    });
  });

  it('should render with required props', () => {
    expect.assertions(1);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should lift handlers to parent', () => {
    expect.assertions(1);
    expect(set).toHaveBeenCalledTimes(1);
  });

  it('should set complete state', () => {
    expect.assertions(1);
    act(() => {
      tree.root
        .findByProps({ 'data-testid': 'confirm-card-element' })
        .props.onChange({ complete: true });
    });
    expect(set).toHaveBeenCalledTimes(2);
  });

  it('should display card error', () => {
    expect.assertions(1);
    const message = 'mock_error';
    act(() => {
      tree.root
        .findByProps({
          'data-testid': 'confirm-card-element',
        })
        .props.onChange({ error: { message } });
    });
    expect(
      tree.root.findByProps({ 'data-testid': 'confirm-card-error' }).props
        .children
    ).toContain(message);
  });

  it('should render with initial state', () => {
    expect.assertions(1);
    act(() => {
      tree = create(
        <Provider store={mockStore(INITIAL_STATE)}>
          <PaymentConfirmCard loadHandler={load} setHandler={set} />
        </Provider>
      );
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
