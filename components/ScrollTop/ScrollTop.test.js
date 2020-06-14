import { create } from 'react-test-renderer';
import { ScrollTop } from './ScrollTop';

jest.mock('../useScroll/useScroll');

describe('<ScrollTop />', () => {
  it('should render without props', () => {
    const tree = create(<ScrollTop />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
