import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import createStore from 'redux-mock-store';
import { ProductsTopBar } from '@app/components';
import { mockProduct } from '@app/__mocks__/@app/mocks';
import { INITIAL_STATE } from '@app/config';

let tree;
let store;
const mockStore = createStore([]);
const products = mockProduct(5);
const setIndex = jest.fn();
const scroll = jest.fn();
window.scrollTo = scroll;

describe('<ProductsTopBar />', () => {
  describe('on single page result', () => {
    beforeAll(() => {
      store = mockStore(INITIAL_STATE);
      act(() => {
        tree = create(
          <Provider store={store}>
            <ProductsTopBar page={1} max={1} products={products} index={0} setIndex={setIndex} />
          </Provider>
        );
      });
    });

    it('should render with required props', () => {
      expect.assertions(1);
      expect(tree.toJSON()).toMatchSnapshot();
    });

    it('should render disabled buttons', () => {
      expect.assertions(2);
      expect(
        tree.root.findByProps({
          'data-testid': 'products-top-previous',
        }).props.disabled
      ).toBeTruthy();
      expect(
        tree.root.findByProps({
          'data-testid': 'products-top-next',
        }).props.disabled
      ).toBeTruthy();
    });
  });

  describe('on multiple page result', () => {
    let previous;
    let next;
    const page = 2;
    const max = 4;

    beforeAll(() => {
      store = mockStore(INITIAL_STATE);
      act(() => {
        tree = create(
          <Provider store={store}>
            <ProductsTopBar
              page={page}
              max={max}
              products={products}
              index={(page - 1) * 10}
              setIndex={setIndex}
            />
          </Provider>
        );
      });
      previous = tree.root.findByProps({
        'data-testid': 'products-top-previous',
      });
      next = tree.root.findByProps({
        'data-testid': 'products-top-next',
      });
    });

    afterEach(() => {
      setIndex.mockClear();
      scroll.mockClear();
    });

    it('should render with required props', () => {
      expect.assertions(1);
      expect(tree.toJSON()).toMatchSnapshot();
    });

    it('should render enabled buttons', () => {
      expect.assertions(2);
      expect(previous.props.disabled).toBeFalsy();
      expect(next.props.disabled).toBeFalsy();
    });

    it('should go to next section', () => {
      expect.assertions(3);
      act(() => {
        next.props.onClick();
      });
      expect(setIndex).toHaveBeenCalledTimes(1);
      expect(setIndex).toHaveBeenCalledWith(page * 10);
      expect(scroll).toHaveBeenCalledTimes(1);
    });

    it('should go to previous section', () => {
      expect.assertions(3);
      act(() => {
        previous.props.onClick();
      });
      expect(setIndex).toHaveBeenCalledTimes(1);
      expect(setIndex).toHaveBeenCalledWith((page - 2) * 10);
      expect(scroll).toHaveBeenCalledTimes(1);
    });
  });
});
