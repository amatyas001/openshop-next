import { create, act } from 'react-test-renderer';
import { Spinner } from '@app/components';

describe('<Spinner />', () => {
  let tree;

  beforeAll(() => {
    act(() => {
      tree = create(<Spinner />);
    });
  });

  it('should render without props', () => {
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
