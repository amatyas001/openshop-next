import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '@app/lib/redux/payment/paymentCreate';
import { paymentReview } from '@app/lib/redux/actions';
import { INITIAL_STATE } from '@app/config';
import { PaymentForm } from '@app/components';
import { mockProductWithBuyAmount } from '@app/mocks';

// Utility to prepare form fields for assertions
const complete = (form) => {
  const details = {};
  form.root.findAllByProps({ 'data-testid': `input` }).forEach((c) => {
    details[c.props.id] = 'mock_value';
    act(() => {
      c.props.onChange({ target: { value: 'mock_value' } });
    });
  });
  return details;
};

let tree;
let store;
let submit;
let back;
const mockStore = configureStore([thunk]);

describe('<PaymentForm />', () => {
  beforeAll(() => {
    store = mockStore({
      ...INITIAL_STATE,
      payment: { status: 'form', token: 'token' },
      cart: mockProductWithBuyAmount(1),
    });
    act(() => {
      tree = create(
        <Provider store={store}>
          <PaymentForm />
        </Provider>
      );
    });
    submit = tree.root.findByProps({ 'data-testid': 'form-submit-button' });
    back = tree.root.findByProps({ 'data-testid': 'form-review-button' });
  });

  it('should render without props', () => {
    expect.assertions(1);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should render disabled button', () => {
    expect.assertions(1);
    expect(submit.props.disabled).toBeTruthy();
  });

  it('should push to review state', () => {
    expect.assertions(1);
    act(() => {
      back.props.onClick();
    });
    expect(store.getActions()).toEqual([paymentReview()]);
  });

  describe('if form complete', () => {
    let details;

    beforeAll(() => {
      details = complete(tree);
    });

    it('should render enabled button', () => {
      expect.assertions(1);
      expect(submit.props.disabled).toBeFalsy();
    });

    it('should send intent with details', () => {
      expect.assertions(2);
      const intent = jest.spyOn(actions, 'paymentCreate').mockImplementation(() => jest.fn());
      act(() => {
        submit.props.onClick();
      });
      expect(intent).toHaveBeenCalledTimes(1);
      expect(intent).toHaveBeenCalledWith(
        details,
        store.getState().cart,
        store.getState().payment.token
      );
    });
  });
});
