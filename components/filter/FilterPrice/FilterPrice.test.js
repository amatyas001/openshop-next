import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import createStore from 'redux-mock-store';
import { FilterPrice } from '@app/components';
import { INITIAL_STATE } from '@app/config';
import { filterPrice } from '@app/lib/redux/actions';
import { mockProduct } from '@app/__mocks__/@app/mocks';

const mockStore = createStore([]);

const products = mockProduct(5).map((c, i) => {
  return {
    ...c,
    price: i * 15,
  };
});

describe('<FilterPrice />', () => {
  let tree, store, slider, current;

  beforeAll(() => {
    store = mockStore(INITIAL_STATE);

    act(() => {
      tree = create(
        <Provider store={store}>
          <FilterPrice products={products} />
        </Provider>
      );
    });

    slider = tree.root.findByProps({
      'data-testid': 'filter-price-slider',
    });

    current = tree.root.findByProps({
      'data-testid': 'filter-price-current',
    });
  });

  it('should render with required props', () => {
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should set maximum value', () => {
    expect(slider.props.max).toEqual((products.length - 1) * 15);
  });

  it('should handle price filter', async () => {
    const mock_value = 10;

    expect(current.props.children).toContain(slider.props.max);

    await act(async () => {
      await slider.props.onChange(mock_value);
      slider.props.onMouseUp();
    });

    expect(store.getActions()).toEqual([filterPrice(mock_value)]);
    expect(slider.props.value).toEqual(mock_value);
    expect(current.props.children).toContain(mock_value);
  });
});
