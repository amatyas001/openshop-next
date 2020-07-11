import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import createStore from 'redux-mock-store';
import { paymentForm } from '@app/lib/redux/actions';
import { PaymentReview } from '@app/components';

const mockStore = createStore([]);

describe('<PaymentReview />', () => {
  let tree,
    back = jest.fn(),
    store = mockStore({
      cart: [
        {
          id: 'mock_id',
          name: 'mock_name',
          price: 10,
          amount: 10,
          color: 'mock_color',
          starrating: 3,
          buy: {
            amount: 1,
          },
        },
      ],
    });

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

    store.clearActions();
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
