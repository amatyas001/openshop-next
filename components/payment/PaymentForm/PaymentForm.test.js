import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '@app/redux/thunk/intent';
import { paymentReview } from '@app/redux/actions';
import { PaymentForm } from '@app/components';

const mockStore = configureStore([thunk]);

const completeForm = (form) => {
  let details = {};

  form.root.findAllByProps({ 'data-testid': `input` }).map((item) => {
    details[item.props.id] = 'mock_value';
    act(() => {
      item.props.onChange({ target: { value: 'mock_value' } });
    });
  });

  return details;
};

describe('<PaymentForm />', () => {
  let tree, store, submitButton, backButton;

  beforeAll(() => {
    store = mockStore({
      payment: { status: 'form', token: 'token' },
      cart: [{ id: 'id' }],
      amount: 100,
    });

    act(() => {
      tree = create(
        <Provider store={store}>
          <PaymentForm />
        </Provider>
      );
    });

    submitButton = tree.root.findByProps({
      'data-testid': 'form-submit-button',
    });

    backButton = tree.root.findByProps({
      'data-testid': 'form-review-button',
    });
  });

  it('should render without props', () => {
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should render disabled button', () => {
    expect(submitButton.props.disabled).toBeTruthy();
  });

  it('should push to review state', () => {
    act(() => {
      backButton.props.onClick();
    });
    expect(store.getActions()).toEqual([paymentReview()]);
  });

  describe('if form complete', () => {
    let details;

    beforeAll(() => {
      details = completeForm(tree);
    });

    it('should render enabled button', () => {
      expect(submitButton.props.disabled).toBeFalsy();
    });

    it('should send intent with details', () => {
      const intent = jest
        .spyOn(actions, 'paymentIntent')
        .mockImplementation(() => jest.fn());

      act(() => {
        submitButton.props.onClick();
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
