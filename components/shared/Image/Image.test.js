import { create, act } from 'react-test-renderer';
import { Image } from '@app/components';

const mock_src = 'mock_src';

describe('<Image />', () => {
  let tree;

  beforeAll(() => {
    act(() => {
      tree = create(<Image src={mock_src} />);
    });
  });

  it('should render without props', () => {
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
