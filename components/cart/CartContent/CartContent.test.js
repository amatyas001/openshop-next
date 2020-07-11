import { create, act } from 'react-test-renderer';
import { CartContent } from './CartContent';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { INITIAL_STATE } from '@app/config/';
import { mockProduct } from '@app/__mocks__/@app/mocks';

const mockStore = configureStore([]);

describe('<CartContent />', () => {
  let tree, store;

  it('should render without props', () => {
    act(() => {
      tree = create(
        <Provider store={mockStore(INITIAL_STATE)}>
          <CartContent />
        </Provider>
      );
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  describe('on non empty cart', () => {
    beforeAll(() => {
      store = mockStore({
        ...INITIAL_STATE,
        cart: [{ ...mockProduct(1)[0], buy: { amount: 1 } }],
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
      expect(tree.root.findByType('ul').props.children).toHaveLength(1);
    });
  });
});
