import { create, act } from 'react-test-renderer';
import { ButtonIcon } from '@app/components';

const mock_icon = () => 'MockIcon';

const mock_handler = jest.fn();

describe('<ButtonIcon />', () => {
  let tree;

  beforeAll(() => {
    act(() => {
      tree = create(<ButtonIcon icon={mock_icon} handler={mock_handler} />);
    });
  });

  it('should render without props', () => {
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should call handler method', () => {
    act(() => {
      tree.root.findByType('button').props.onClick();
    });

    expect(mock_handler).toHaveBeenCalledTimes(1);
  });
});
