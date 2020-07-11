import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import createStore from 'redux-mock-store';
import { FilterReset } from '@app/components';
import { INITIAL_STATE } from '@app/config';
import { filterReset } from '@app/lib/redux/filter';

const mockStore = createStore([]);

describe('<FilterReset />', () => {
  let tree, store;

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
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should reset filters', () => {
    act(() => {
      tree.root.findByType('button').props.onClick();
    });

    expect(store.getActions()).toEqual([filterReset()]);
  });
});
