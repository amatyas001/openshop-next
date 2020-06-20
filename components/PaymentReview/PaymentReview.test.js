import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import createStore from 'redux-mock-store';
import { paymentForm } from '../../redux/actions';
import { PaymentReview } from './PaymentReview';

const mockStore = createStore([]);

jest
  .spyOn(require('../CartContent/CartContent'), 'CartContent')
  .mockImplementation(() => 'CartContent');

describe('<PaymentReview />', () => {
  let tree,
    back = jest.fn(),
    store = mockStore({});

  beforeAll(() => {
    jest
      .spyOn(require('next/router'), 'useRouter')
      .mockImplementationOnce(() => ({
        back,
      }));

    act(() => {
      tree = create(
        <Provider store={store}>
          <PaymentReview />
        </Provider>
      );
    });
  });

  it('should render without props', () => {
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should push back router', () => {
    act(() => {
      tree.root
        .findByProps({ 'data-testid': 'review-button-back' })
        .props.onClick();
    });

    expect(back).toHaveBeenCalledTimes(1);
  });

  it('should push form state', () => {
    act(() => {
      tree.root
        .findByProps({ 'data-testid': 'review-button-form' })
        .props.onClick();
    });

    expect(store.getActions()).toEqual([paymentForm()]);
  });
});
