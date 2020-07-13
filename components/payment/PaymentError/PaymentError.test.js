import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import createStore from 'redux-mock-store';
import { paymentReset } from '@app/lib/redux/actions';
import { PaymentError } from '@app/components';
import { INITIAL_STATE } from '@app/config/';

let tree;
let store;
const mockStore = createStore([]);

describe('<PaymentError />', () => {
  beforeAll(() => {
    store = mockStore({
      ...INITIAL_STATE,
      payment: { status: 'error', error: { message: 'mock_error' } },
    });
    act(() => {
      tree = create(
        <Provider store={store}>
          <PaymentError />
        </Provider>
      );
    });
  });

  it('should render without props', () => {
    expect.assertions(1);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should render error message', () => {
    expect.assertions(1);
    expect(tree.root.findByProps({ 'data-testid': 'error-message' }).props.children).toContain(
      store.getState().payment.error.message
    );
  });

  it('should render retry button', () => {
    expect.assertions(1);
    expect(tree.root.findByProps({ 'data-testid': 'error-button-retry' })).toBeTruthy();
  });

  it('should push reset state', async () => {
    expect.assertions(1);
    await act(async () => {
      await tree.root.findByProps({ 'data-testid': 'error-button-retry' }).props.onClick();
    });
    expect(store.getActions()).toEqual([paymentReset()]);
  });

  it('should render with initial state', () => {
    expect.assertions(1);
    act(() => {
      tree = create(
        <Provider store={mockStore(INITIAL_STATE)}>
          <PaymentError />
        </Provider>
      );
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
