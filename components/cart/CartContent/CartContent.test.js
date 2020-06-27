import { create, act } from 'react-test-renderer';
import { CartContent } from './CartContent';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { getAmount } from '@app/redux/actions';

const mockStore = configureStore([]);

describe('<CartContent />', () => {
  let tree, store;

  beforeAll(() => {
    store = mockStore({
      cart: [],
      amount: 0,
    });

    act(() => {
      tree = create(
        <Provider store={store}>
          <CartContent />
        </Provider>
      );
    });
  });

  it('should render without props', () => {
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should get amount from store', () => {
    expect(store.getActions()).toEqual([getAmount()]);
  });
});
