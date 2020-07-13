import { create, act } from 'react-test-renderer';
import { Image } from '@app/components';

let tree;
const src = 'mock_src';

describe('<Image />', () => {
  beforeAll(() => {
    act(() => {
      tree = create(<Image src={src} />);
    });
  });

  it('should render without props', () => {
    expect.assertions(1);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
