import { create, act } from 'react-test-renderer';
import { Footer } from './Footer';

describe('<Footer />', () => {
  let tree;
  beforeAll(() => {
    act(() => {
      tree = create(<Footer />);
    });
  });

  it('should render without props', () => {
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
