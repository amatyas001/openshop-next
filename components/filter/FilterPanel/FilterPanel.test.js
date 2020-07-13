import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import createStore from 'redux-mock-store';
import { FilterPanel } from '@app/components';
import { mockProduct } from '@app/mocks';
import { INITIAL_STATE } from '@app/config';

let tree;
let store;
const mockStore = createStore([]);
const products = mockProduct(5);

describe('<FilterPanel />', () => {
  beforeAll(() => {
    store = mockStore(INITIAL_STATE);
    act(() => {
      tree = create(
        <Provider store={store}>
          <FilterPanel products={products} />
        </Provider>
      );
    });
  });

  it('should render with required props', () => {
    expect.assertions(1);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
