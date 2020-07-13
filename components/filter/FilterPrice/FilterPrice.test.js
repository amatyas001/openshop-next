import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import createStore from 'redux-mock-store';
import { INITIAL_STATE } from '@app/config';
import { filterPrice } from '@app/lib/redux/actions';
import { mockProductWithPrice } from '@app/mocks';
import { FilterPrice } from '@app/components';

let tree;
let store;
let slider;
let current;
const base = 15;
const count = 5;
const products = mockProductWithPrice(count, base);
const mockStore = createStore([]);

describe('<FilterPrice />', () => {
  beforeAll(() => {
    store = mockStore(INITIAL_STATE);
    act(() => {
      tree = create(
        <Provider store={store}>
          <FilterPrice products={products} />
        </Provider>
      );
    });
    slider = tree.root.findByProps({ 'data-testid': 'filter-price-slider' });
    current = tree.root.findByProps({ 'data-testid': 'filter-price-current' });
  });

  it('should render with required props', () => {
    expect.assertions(1);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should set maximum value', () => {
    expect.assertions(1);
    expect(slider.props.max).toEqual(count * base);
  });

  it('should handle price filter', async () => {
    expect.assertions(4);
    const value = 10;
    expect(current.props.children).toContain(slider.props.max);
    await act(async () => {
      await slider.props.onChange(value);
      slider.props.onMouseUp();
    });
    expect(store.getActions()).toEqual([filterPrice(value)]);
    expect(slider.props.value).toEqual(value);
    expect(current.props.children).toContain(value);
  });
});
