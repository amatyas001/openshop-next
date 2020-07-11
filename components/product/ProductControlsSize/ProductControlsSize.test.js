import { create, act } from 'react-test-renderer';
import { ProductControlsSize } from './ProductControlsSize';
import { mockProduct } from '@app/__mocks__/@app/mocks';

describe('<ProductControlsSize />', () => {
  let tree;

  const mock_product = {
    ...mockProduct(1)[0],
    sizes: ['mock_size_0', 'mock_size_1'],
  };

  const mock_details = {
    ...mock_product,
    buy: {
      amount: 0,
    },
  };

  const mock_setDetails = jest.fn();

  const mock_value = 'mock_value';

  beforeAll(() => {
    act(() => {
      tree = create(
        <ProductControlsSize
          product={mock_product}
          details={mock_details}
          setDetails={mock_setDetails}
        />
      );
    });
  });

  it('should render with required props', () => {
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should call handler', () => {
    act(() => {
      tree.root
        .findByType('select')
        .props.onChange({ target: { value: mock_value } });
    });
    expect(mock_setDetails).toHaveBeenCalledTimes(1);
    expect(mock_setDetails).toHaveBeenCalledWith(mock_value);
  });

  it('should render static value if no sizes available for the product', () => {
    act(() => {
      tree = create(
        <ProductControlsSize
          product={{ ...mock_product, sizes: undefined }}
          details={mock_details}
          setDetails={mock_setDetails}
        />
      );
    });

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
