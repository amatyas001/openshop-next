import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import createStore from 'redux-mock-store';
import { paymentReset } from '@app/redux/action/payment';
import { PaymentError } from '@app/components';

let mockStore = createStore([]);

describe('<PaymentError />', () => {
  let tree,
    store = mockStore({
      payment: { status: 'error', error: { message: 'mock_error' } },
    });

  beforeAll(() => {
    act(() => {
      tree = create(
        <Provider store={store}>
          <PaymentError />
        </Provider>
      );
    });
  });

  it('should render without props', () => {
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should render error message', () => {
    expect(
      tree.root.findByProps({
        'data-testid': 'error-message',
      }).props.children
    ).toContain(store.getState().payment.error.message);
  });

  it('should render retry button', () => {
    expect(
      tree.root.findByProps({ 'data-testid': 'error-button-retry' })
    ).toBeTruthy();
  });

  it('should push reset state', async () => {
    await act(async () => {
      await tree.root
        .findByProps({ 'data-testid': 'error-button-retry' })
        .props.onClick();
    });

    expect(store.getActions()).toEqual([paymentReset()]);
  });
});
