/* eslint global-require: "off" */
import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import createStore from 'redux-mock-store';
import { paymentForm } from '@app/lib/redux/actions';
import { mockProductWithBuyAmount } from '@app/mocks';
import { INITIAL_STATE } from '@app/config';
import { PaymentReview } from '@app/components';

let tree;
let store;
const back = jest.fn();
const mockStore = createStore([]);

describe('<PaymentReview />', () => {
  beforeAll(() => {
    jest.spyOn(require('next/router'), 'useRouter').mockImplementationOnce(() => ({
      back,
    }));
    store = mockStore({
      ...INITIAL_STATE,
      cart: mockProductWithBuyAmount(1),
    });
    act(() => {
      tree = create(
        <Provider store={store}>
          <PaymentReview />
        </Provider>
      );
    });
    store.clearActions();
  });

  it('should render without props', () => {
    expect.assertions(1);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should push back router', () => {
    expect.assertions(1);
    act(() => {
      tree.root.findByProps({ 'data-testid': 'review-button-back' }).props.onClick();
    });
    expect(back).toHaveBeenCalledTimes(1);
  });

  it('should push form state', () => {
    expect.assertions(1);
    act(() => {
      tree.root.findByProps({ 'data-testid': 'review-button-form' }).props.onClick();
    });
    expect(store.getActions()).toEqual([paymentForm()]);
  });
});
