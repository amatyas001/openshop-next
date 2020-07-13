import { create, act } from 'react-test-renderer';
import { Panel } from '@app/components';

let tree;
let toggle;
const content = 'Content';

describe('<Panel />', () => {
  beforeAll(() => {
    toggle = false;
    act(() => {
      tree = create(<Panel toggle={toggle}>{content}</Panel>);
    });
  });

  it('should render without props', () => {
    expect.assertions(1);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
