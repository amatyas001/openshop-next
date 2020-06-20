import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import createStore from 'redux-mock-store';
import { paymentReset } from '../../redux/action/payment';
import { PaymentError } from './PaymentError';

let mockStore = createStore([]);

describe('<PaymentError />', () => {
  let tree,
    store = mockStore({}),
    error = { message: 'mock_message' };

  it('should render without props', () => {
    act(() => {
      tree = create(
        <Provider store={store}>
          <PaymentError />
        </Provider>
      );
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  beforeEach(() => {
    act(() => {
      tree = create(
        <Provider store={store}>
          <PaymentError error={error} />
        </Provider>
      );
    });
  });

  it('should render with props', () => {
    expect(tree.toJSON()).toMatchSnapshot();
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
