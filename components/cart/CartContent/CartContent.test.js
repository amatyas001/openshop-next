import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { INITIAL_STATE } from '@app/config/';
import { mockProductWithBuyAmount } from '@app/mocks';
import { CartContent } from '@app/components';

const mockStore = configureStore([]);

let tree;
let store;

describe('<CartContent />', () => {
  it('should render without props', () => {
    act(() => {
      tree = create(
        <Provider store={mockStore(INITIAL_STATE)}>
          <CartContent />
        </Provider>
      );
    });
    expect.assertions(1);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  describe('on non empty cart', () => {
    beforeAll(() => {
      store = mockStore({
        ...INITIAL_STATE,
        cart: mockProductWithBuyAmount(3),
      });
      act(() => {
        tree = create(
          <Provider store={store}>
            <CartContent />
          </Provider>
        );
      });
    });

    it('should render cart items', () => {
      expect.assertions(1);
      expect(tree.root.findByType('ul').props.children).toHaveLength(store.getState().cart.length);
    });
  });
});
