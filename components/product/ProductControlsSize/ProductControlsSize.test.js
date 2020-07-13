import { create, act } from 'react-test-renderer';
import { mockProduct } from '@app/mocks';
import { ProductControlsSize } from '@app/components';

let tree;
const set = jest.fn();
const product = {
  ...mockProduct(1)[0],
  sizes: ['mock_size_0', 'mock_size_1'],
};
const details = {
  ...product,
  buy: {
    amount: 0,
  },
};

describe('<ProductControlsSize />', () => {
  beforeAll(() => {
    act(() => {
      tree = create(<ProductControlsSize product={product} details={details} setDetails={set} />);
    });
  });

  it('should render with required props', () => {
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should call handler', () => {
    const value = 'mock_value';
    act(() => {
      tree.root.findByType('select').props.onChange({ target: { value } });
    });
    expect(set).toHaveBeenCalledTimes(1);
    expect(set).toHaveBeenCalledWith(value);
  });

  it('should render static value if no sizes available for the product', () => {
    act(() => {
      tree = create(
        <ProductControlsSize
          product={{ ...product, sizes: undefined }}
          details={details}
          setDetails={set}
        />
      );
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
