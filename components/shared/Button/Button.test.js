import { create, act } from 'react-test-renderer';
import { Button } from '@app/components';

let tree;

describe('<Button />', () => {
  beforeAll(() => {
    act(() => {
      tree = create(<Button />);
    });
  });

  it('should render without props', () => {
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
