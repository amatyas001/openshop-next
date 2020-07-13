import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import createStore from 'redux-mock-store';
import { INITIAL_STATE } from '@app/config';
import { filterColor } from '@app/lib/redux/actions';
import { mockProductWithColor } from '@app/mocks';
import { FilterColor } from '@app/components';

let tree;
let store;
const mockStore = createStore([]);
const { products, colors } = mockProductWithColor(5);

describe('<FilterColor />', () => {
  beforeAll(() => {
    store = mockStore(INITIAL_STATE);
    act(() => {
      tree = create(
        <Provider store={store}>
          <FilterColor products={products} />
        </Provider>
      );
    });
  });

  it('should render with required props', () => {
    expect.assertions(1);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should render unique colors as options', () => {
    const options = tree.root.findAllByType('option');
    expect.assertions(options.length + 1);
    expect(options.length).toEqual(colors.length);
    options.forEach((c, i) => {
      expect(c.props.children).toContain(colors[i]);
    });
  });

  colors.forEach((value) => {
    it(`should handle filtering ${value}`, async () => {
      expect.assertions(1);
      await act(async () => {
        tree.root.findByType('select').props.onChange({ target: { value } });
      });
      expect(store.getActions()).toEqual([filterColor(value)]);
      store.clearActions();
    });
  });
});
