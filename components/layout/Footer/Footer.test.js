import { create, act } from 'react-test-renderer';
import { Footer } from './Footer';

let tree;

describe('<Footer />', () => {
  beforeAll(() => {
    act(() => {
      tree = create(<Footer />);
    });
  });

  it('should render without props', () => {
    expect.assertions(1);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
