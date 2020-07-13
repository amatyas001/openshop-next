import { create, act } from 'react-test-renderer';
import { Content } from '@app/components';

let tree;
const children = React.createElement('MockElement');

describe('<Content />', () => {
  beforeAll(() => {
    act(() => {
      tree = create(<Content>{children}</Content>);
    });
  });

  it('should render with required props', () => {
    expect.assertions(1);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should render children', () => {
    expect.assertions(1);
    expect(
      tree.root.findByProps({
        'data-testid': 'content',
      }).props.children
    ).toMatchObject(children);
  });
});
