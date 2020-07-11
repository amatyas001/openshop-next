import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import createStore from 'redux-mock-store';
import { FilterColor } from '@app/components';
import { INITIAL_STATE } from '@app/config';
import { filterColor } from '@app/lib/redux/actions';
import { mockProduct } from '@app/mocks';

const mockStore = createStore([]);

const colors = ['All'];

const products = mockProduct(5).map((c, i) => {
  colors.push(`mock_color_${i}`);
  return i % 2 === 0
    ? {
        ...c,
        color: `mock_color_${i}`,
      }
    : {
        ...c,
        color: [`mock_color_${i}`, `mock_color_${i + 1}`],
      };
});

describe('<FilterColor />', () => {
  let tree, store;

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
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should render unique colors as options', () => {
    const options = tree.root.findAllByType('option');
    expect(options.length).toEqual(colors.length);
    options.map((c, i) => {
      expect(c.props.children).toContain(colors[i]);
    });
  });

  it('should handle filter state', async () => {
    await act(async () => {
      tree.root
        .findByType('select')
        .props.onChange({ target: { value: colors[0] } });
    });

    expect(store.getActions()).toEqual([filterColor(colors[0])]);
  });
});
