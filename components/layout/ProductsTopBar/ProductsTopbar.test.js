import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import createStore from 'redux-mock-store';
import { ProductsTopBar } from '@app/components';
import { mockProduct } from '@app/__mocks__/@app/mocks';
import { INITIAL_STATE } from '@app/config';

const mockStore = createStore([]);

const products = mockProduct(5);

const setIndex = jest.fn();

const mock_scroll = jest.fn();

window.scrollTo = mock_scroll;

describe('<ProductsTopBar />', () => {
  describe('on single page result', () => {
    let tree, store;

    beforeAll(() => {
      store = mockStore(INITIAL_STATE);

      act(() => {
        tree = create(
          <Provider store={store}>
            <ProductsTopBar
              page={1}
              max={1}
              products={products}
              index={0}
              setIndex={setIndex}
            />
          </Provider>
        );
      });
    });

    it('should render with required props', () => {
      expect(tree.toJSON()).toMatchSnapshot();
    });

    it('should render disabled buttons', () => {
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
    let tree, store, page, max, previous, next;

    beforeAll(() => {
      page = 2;
      max = 4;
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
      mock_scroll.mockClear();
    });

    it('should render with required props', () => {
      expect(tree.toJSON()).toMatchSnapshot();
    });

    it('should render enabled buttons', () => {
      expect(previous.props.disabled).toBeFalsy();
      expect(next.props.disabled).toBeFalsy();
    });

    it('should go to next section', () => {
      act(() => {
        next.props.onClick();
      });

      expect(setIndex).toHaveBeenCalledTimes(1);
      expect(setIndex).toHaveBeenCalledWith(page * 10);
      expect(mock_scroll).toHaveBeenCalledTimes(1);
    });

    it('should go to previous section', () => {
      act(() => {
        previous.props.onClick();
      });

      expect(setIndex).toHaveBeenCalledTimes(1);
      expect(setIndex).toHaveBeenCalledWith((page - 2) * 10);
      expect(mock_scroll).toHaveBeenCalledTimes(1);
    });
  });
});
