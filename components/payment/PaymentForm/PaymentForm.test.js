import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '@app/redux/thunk/intent';
import { paymentReview } from '@app/redux/actions';
import { PaymentForm } from '@app/components';

const mockStore = configureStore([thunk]);

// fill form fields with mock values and mock
// card element state for further assertions
const completeForm = async (form) => {
  let details = {};

  await act(async () => {
    await form.root
      .findByType('CardElement')
      .props.onChange({ complete: true });

    await form.root.findAllByType('input').map((item) => {
      details[item.props.id] = 'mock_value';
      item.props.onChange({ target: { value: 'mock_value' } });
    });
  });

  return details;
};

describe('<PaymentForm />', () => {
  let tree, store;

  beforeAll(() => {
    store = mockStore({
      payment: { status: 'form', token: 'token' },
      cart: [{ id: 'id' }], // token and cart are passed to intent
      amount: 100, // amount is displayed in the submit button
    });

    act(() => {
      tree = create(
        <Provider store={store}>
          <PaymentForm />
        </Provider>
      );
    });
  });

  it('should render without props', () => {
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should push to review state', () => {
    act(() => {
      tree.root.findByProps({ 'data-testid': 'review-button' }).props.onClick();
    });

    expect(store.getActions()).toEqual([paymentReview()]);
  });

  it('should display card error', async () => {
    const mock_error = 'error';
    await act(async () => {
      await tree.root
        .findByType('CardElement')
        .props.onChange({ error: { message: mock_error } });
    });

    expect(
      tree.root.findByProps({ 'data-testid': 'form-card-error' }).props.children
    ).toContain(mock_error);
  });

  describe('when form completed', () => {
    let details;

    beforeAll(async () => {
      details = await completeForm(tree);
    });

    it('should render form values and enabled button', () => {
      expect(tree.toJSON()).toMatchSnapshot();
    });

    it('should send intent with details', () => {
      const intent = jest
        .spyOn(actions, 'paymentIntent')
        .mockImplementation(() => jest.fn());

      act(() => {
        tree.root
          .findByProps({ 'data-testid': 'submit-button' })
          .props.onClick({ preventDefault: jest.fn() });
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
