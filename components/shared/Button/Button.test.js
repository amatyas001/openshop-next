import { create, act } from 'react-test-renderer';
import { Button } from '@app/components';

describe('<Button />', () => {
  let tree;

  beforeAll(() => {
    act(() => {
      tree = create(<Button />);
    });
  });

  it('should render without props', () => {
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
