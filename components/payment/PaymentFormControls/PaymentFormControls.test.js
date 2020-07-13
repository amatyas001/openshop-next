import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '@app/lib/redux/payment/paymentCreate';
import { paymentReview } from '@app/lib/redux/actions';
import { mockProductWithBuyAmount } from '@app/mocks';
import { INITIAL_STATE } from '@app/config/';
import { PaymentFormControls } from '@app/components';

let tree;
let store;
const validDetials = {
  name: 'mock_name',
  email: 'mock_email',
  phone: 'mock_phone',
  address: 'mock_address',
};
const invalidDetails = {
  name: '',
  email: '',
  phone: '',
  address: '',
};
const mockStore = configureStore([thunk]);
const load = jest.fn();

describe('<PaymentFormControls />', () => {
  beforeAll(() => {
    store = mockStore({
      ...INITIAL_STATE,
      payment: { status: 'form', token: 'token' },
      cart: mockProductWithBuyAmount(1),
    });
    act(() => {
      tree = create(
        <Provider store={store}>
          <PaymentFormControls setLoading={load} details={validDetials} />
        </Provider>
      );
    });
  });

  it('should render with required props', () => {
    expect.assertions(1);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should dispatch review state', () => {
    expect.assertions(1);
    load.mockClear();
    act(() => {
      tree.root
        .findByProps({ 'data-testid': 'form-review-button' })
        .props.onClick();
    });
    expect(store.getActions()).toEqual([paymentReview()]);
  });

  it('should not dispatch payment intent', () => {
    expect.assertions(2);
    let failed;
    act(() => {
      failed = create(
        <Provider store={store}>
          <PaymentFormControls setLoading={load} details={invalidDetails} />
        </Provider>
      );
    });
    store.clearActions();
    act(() => {
      failed.root
        .findByProps({ 'data-testid': 'form-submit-button' })
        .props.onClick();
    });
    expect(load).not.toHaveBeenCalled();
    expect(store.getActions()).toEqual([]);
  });

  it('should dispatch payment intent', () => {
    expect.assertions(3);
    const intent = jest
      .spyOn(actions, 'paymentCreate')
      .mockImplementation(() => jest.fn());
    load.mockClear();
    act(() => {
      tree.root
        .findByProps({ 'data-testid': 'form-submit-button' })
        .props.onClick();
    });
    expect(load).toHaveBeenCalledTimes(1);
    expect(intent).toHaveBeenCalledTimes(1);
    expect(intent).toHaveBeenCalledWith(
      validDetials,
      store.getState().cart,
      store.getState().payment.token
    );
  });

  it('should render disabled button', () => {
    expect.assertions(1);
    act(() => {
      tree = create(
        <Provider store={store}>
          <PaymentFormControls setLoading={load} details={invalidDetails} />
        </Provider>
      );
    });
    expect(
      tree.root.findByProps({
        'data-testid': 'form-submit-button',
      }).props.disabled
    ).toBeTruthy();
  });

  it('should render with initial state', () => {
    expect.assertions(1);
    act(() => {
      tree = create(
        <Provider store={mockStore(INITIAL_STATE)}>
          <PaymentFormControls setLoading={load} details={validDetials} />
        </Provider>
      );
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
