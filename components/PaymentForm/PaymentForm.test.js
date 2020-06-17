import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../redux/thunk/intent';
import { PaymentForm } from './PaymentForm';
import { paymentReview } from '../../redux/actions';

const mockStore = configureStore([thunk]);

describe('<PaymentForm />', () => {
  let tree, store;

  const completeForm = async (form) => {
    let details = {};
    await act(async () => {
      await form.root
        .findByType('CardElement')
        .props.onChange({ complete: true, error: 'mock_error' });
      await form.root.findAllByType('input').map((item) => {
        details[item.props.id] = 'mock_value';
        item.props.onChange({ target: { value: 'mock_value' } });
      });
    });
    return details;
  };

  beforeEach(() => {
    store = mockStore({
      payment: { status: 'form', token: 'token' },
      cart: [{ id: 'item' }],
      amount: 100,
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

  it('should render form element', () => {
    expect(tree.root.findByType('form')).toBeTruthy();
  });

  it('should render card element', () => {
    expect(tree.root.findByType('CardElement')).toBeTruthy();
  });

  it('should render enabled pay button when form complete', async () => {
    await completeForm(tree);
    expect(
      tree.root.findByProps({ 'data-testid': 'submit-button' }).props.disabled
    ).toEqual(false);
  });

  it('should render disabled pay button when form incomplete', () => {
    expect(
      tree.root.findByProps({ 'data-testid': 'submit-button' }).props.disabled
    ).toEqual(true);
  });

  it('should render back button', () => {
    expect(
      tree.root.findByProps({ 'data-testid': 'review-button' })
    ).toBeTruthy();
  });

  it('should send intent with details', async () => {
    const details = await completeForm(tree);
    const intent = jest
      .spyOn(actions, 'paymentIntent')
      .mockImplementation(() => jest.fn());
    await act(async () => {
      await tree.root
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

  it('should push to review state', () => {
    act(() => {
      tree.root.findByProps({ 'data-testid': 'review-button' }).props.onClick();
    });
    expect(store.getActions()).toEqual([paymentReview()]);
  });
});
