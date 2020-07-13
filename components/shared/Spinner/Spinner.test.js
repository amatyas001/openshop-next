import { create, act } from 'react-test-renderer';
import { Spinner } from '@app/components';

let tree;

describe('<Spinner />', () => {
  beforeAll(() => {
    act(() => {
      tree = create(<Spinner />);
    });
  });

  it('should render without props', () => {
    expect.assertions(1);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
