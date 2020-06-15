import { create, act } from 'react-test-renderer';
import { ScrollTop } from './ScrollTop';

describe('<ScrollTop />', () => {
  let tree;

  const mock_scroll = jest
    .spyOn(window, 'scrollTo')
    .mockImplementation(() => jest.fn());

  beforeEach(() => {
    act(() => {
      tree = create(<ScrollTop />);
    });
  });

  it('should render without props', () => {
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should scroll to offset 0 on click', () => {
    act(() => {
      tree.root.findByType('svg').props.onClick();
    });
    expect(mock_scroll).toHaveBeenCalledTimes(1);
    expect(window.pageYOffset).toEqual(0);
  });
});
