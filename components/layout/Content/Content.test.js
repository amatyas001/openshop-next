import { create, act } from 'react-test-renderer';
import { Content } from '@app/components';

const mock_children = React.createElement('MockElement');

describe('<Content />', () => {
  let tree;

  beforeAll(() => {
    act(() => {
      tree = create(<Content children={mock_children} />);
    });
  });

  it('should render with required props', () => {
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should render children', () => {
    expect(
      tree.root.findByProps({
        'data-testid': 'content',
      }).props.children
    ).toMatchObject(mock_children);
  });
});
