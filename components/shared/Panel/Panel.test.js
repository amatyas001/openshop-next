import { create, act } from 'react-test-renderer';
import { Panel } from '@app/components';

describe('<Panel />', () => {
  let tree;

  beforeAll(() => {
    act(() => {
      tree = create(<Panel />);
    });
  });

  it('should render without props', () => {
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
