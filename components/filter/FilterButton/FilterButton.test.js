import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import createStore from 'redux-mock-store';
import { FilterButton } from '@app/components';
import { INITIAL_STATE } from '@app/config';
import { panelToggle } from '@app/lib/redux/actions';

let tree;
let store;
const mockStore = createStore([]);

describe('<FilterButton />', () => {
  beforeAll(() => {
    store = mockStore(INITIAL_STATE);
    act(() => {
      tree = create(
        <Provider store={store}>
          <FilterButton />
        </Provider>
      );
    });
  });

  it('should render without props', () => {
    expect.assertions(1);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should toggle panel visibility', async () => {
    await act(async () => {
      tree.root.findByType('button').props.onClick();
    });
    expect.assertions(1);
    expect(store.getActions()).toEqual([
      panelToggle('filters', !store.getState().panel.filters),
    ]);
  });

  it('should toggle button text', () => {
    store = mockStore({ ...INITIAL_STATE, panel: { filters: true } });
    act(() => {
      tree = create(
        <Provider store={store}>
          <FilterButton />
        </Provider>
      );
    });
    expect.assertions(1);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
