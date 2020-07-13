import { create, act } from 'react-test-renderer';
import { mockProduct } from '@app/mocks';
import { ProductControlsAmount } from '@app/components';

let tree;
let wrapper;
const setter = jest.fn();
const product = mockProduct(1)[0];
const details = {
  ...product,
  buy: {
    amount: 0,
  },
};

describe('<ProductControlsAmount />', () => {
  beforeAll(() => {
    act(() => {
      tree = create(
        <ProductControlsAmount product={product} details={details} setDetails={setter} />
      );
    });
    wrapper = tree.root.findByProps({
      'data-testid': 'product-amount-wrapper',
    });
  });

  afterEach(() => {
    setter.mockClear();
  });

  it('should render with required props', () => {
    expect.assertions(1);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("should have default value of '0'", () => {
    expect.assertions(1);
    expect(wrapper.props.value).toEqual(0);
  });

  it("should have min value of '0'", () => {
    expect.assertions(1);
    expect(wrapper.props.min).toEqual(0);
  });

  it('should have max value of product amount', () => {
    expect.assertions(1);
    expect(wrapper.props.max).toEqual(product.amount);
  });

  it('should call setter function', () => {
    expect.assertions(2);
    act(() => {
      wrapper.props.onChange(1);
    });
    expect(setter).toHaveBeenCalledTimes(1);
    expect(setter).toHaveBeenCalledWith(1);
  });
});
