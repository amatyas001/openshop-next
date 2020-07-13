import { create, act } from 'react-test-renderer';
import { mockProduct } from '@app/mocks';
import { ProductControlsColor } from '@app/components';

let tree;
const product = { ...mockProduct(1)[0], color: ['mock_color'] };
const set = jest.fn();
const details = {
  ...product,
  buy: {
    color: 'mock_color',
    amount: 0,
  },
};

describe('<ProductControlsColor />', () => {
  beforeAll(() => {
    act(() => {
      tree = create(<ProductControlsColor product={product} details={details} setDetails={set} />);
    });
  });

  it('should render with required props', () => {
    expect.assertions(1);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should call handler', () => {
    expect.assertions(2);
    const value = 'mock_value';
    act(() => {
      tree.root.findByType('select').props.onChange({ target: { value } });
    });
    expect(set).toHaveBeenCalledTimes(1);
    expect(set).toHaveBeenCalledWith(value);
  });
});
