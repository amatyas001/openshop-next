import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import createStore from 'redux-mock-store';
import { INITIAL_STATE } from '@app/config';
import { filterReset } from '@app/lib/redux/filter';
import { FilterReset } from '@app/components';

let tree;
let store;
const mockStore = createStore([]);

describe('<FilterReset />', () => {
  beforeAll(() => {
    store = mockStore(INITIAL_STATE);
    act(() => {
      tree = create(
        <Provider store={store}>
          <FilterReset />
        </Provider>
      );
    });
  });

  it('should render without props', () => {
    expect.assertions(1);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should reset filters', () => {
    expect.assertions(1);
    act(() => {
      tree.root.findByType('button').props.onClick();
    });
    expect(store.getActions()).toEqual([filterReset()]);
  });
});
