import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mockProduct } from '@app/mocks';
import { ProductCard } from './ProductCard';

const mockStore = configureStore([]);

describe('<ProductCard />', () => {
  let tree, store;

  const product = mockProduct(1)[0];

  beforeAll(() => {
    store = mockStore({});

    act(() => {
      tree = create(
        <Provider store={store}>
          <ProductCard product={product} />
        </Provider>
      );
    });
  });

  it('should render with required props', () => {
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
