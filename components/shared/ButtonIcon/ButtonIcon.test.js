import { create, act } from 'react-test-renderer';
import { ButtonIcon } from '@app/components';

let tree;
const icon = () => 'MockIcon';
const handler = jest.fn();

describe('<ButtonIcon />', () => {
  beforeAll(() => {
    act(() => {
      tree = create(<ButtonIcon icon={icon} handler={handler} />);
    });
  });

  it('should render without props', () => {
    expect.assertions(1);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should call handler method', () => {
    expect.assertions(1);
    act(() => {
      tree.root.findByType('button').props.onClick();
    });
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
