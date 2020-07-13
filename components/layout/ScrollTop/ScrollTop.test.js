import { create, act } from 'react-test-renderer';
import { ScrollTop } from '@app/components';

let tree;

describe('<ScrollTop />', () => {
  const scroll = jest.spyOn(window, 'scrollTo').mockImplementation((options) => {
    window.pageYOffset = options.top;
  });

  beforeAll(() => {
    window.pageYOffset = 301;
    act(() => {
      tree = create(<ScrollTop />);
    });
  });

  it('should render without props', () => {
    expect.assertions(1);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should scroll to offset 0 on click', () => {
    expect.assertions(2);
    act(() => {
      tree.root.findByType('svg').props.onClick();
    });
    expect(scroll).toHaveBeenCalledTimes(1);
    expect(global.window.pageYOffset).toEqual(0);
  });
});
