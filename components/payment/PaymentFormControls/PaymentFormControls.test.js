import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '@app/redux/thunk/intent';
import { paymentReview } from '@app/redux/actions';
import { PaymentFormControls } from '@app/components';

const mockStore = configureStore([thunk]);
const mock_load = jest.fn();
const mock_details = {
  name: 'mock_name',
  email: 'mock_email',
  phone: 'mock_phone',
  address: 'mock_address',
};

describe('<PaymentForm />', () => {
  let tree, store;

  beforeAll(() => {
    store = mockStore({
      payment: { status: 'form', token: 'token' },
      cart: [{ id: 'id' }],
      amount: 100,
    });

    act(() => {
      tree = create(
        <Provider store={store}>
          <PaymentFormControls setLoading={mock_load} details={mock_details} />
        </Provider>
      );
    });
  });

  it('should render with required props', () => {
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should dispatch review state', () => {
    mock_load.mockClear();

    act(() => {
      tree.root
        .findByProps({ 'data-testid': 'form-review-button' })
        .props.onClick();
    });

    expect(store.getActions()).toEqual([paymentReview()]);
  });

  it('should dispatch payment intent', () => {
    const intent = jest
      .spyOn(actions, 'paymentIntent')
      .mockImplementation(() => jest.fn());

    mock_load.mockClear();

    act(() => {
      tree.root
        .findByProps({ 'data-testid': 'form-submit-button' })
        .props.onClick();
    });

    expect(mock_load).toHaveBeenCalledTimes(1);
    expect(intent).toHaveBeenCalledTimes(1);
    expect(intent).toHaveBeenCalledWith(
      mock_details,
      store.getState().cart,
      store.getState().payment.token
    );
  });

  it('should render disabled button', () => {
    act(() => {
      tree = create(
        <Provider store={store}>
          <PaymentFormControls setLoading={mock_load} details={{ mock: '' }} />
        </Provider>
      );
    });

    expect(
      tree.root.findByProps({
        'data-testid': 'form-submit-button',
      }).props.disabled
    ).toBeTruthy();
  });
});
