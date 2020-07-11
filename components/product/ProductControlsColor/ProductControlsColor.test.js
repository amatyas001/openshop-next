import { create, act } from 'react-test-renderer';
import { ProductControlsColor } from './ProductControlsColor';

describe('<ProductControlsColor />', () => {
  let tree;

  const mock_product = {
    id: 'mock_id',
    name: 'mock_name',
    price: 10,
    color: ['mock_color_0', 'mock_color_1'],
    amount: 10,
    starrating: 3,
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
        <ProductControlsColor
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
});
