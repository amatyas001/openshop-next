import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import createStore from 'redux-mock-store';
import { INITIAL_STATE } from '@app/config';
import { filterName } from '@app/lib/redux/actions';
import { FilterName } from '@app/components';

let tree;
let store;
const mockStore = createStore([]);

describe('<FilterName />', () => {
  beforeAll(() => {
    store = mockStore(INITIAL_STATE);
    act(() => {
      tree = create(
        <Provider store={store}>
          <FilterName />
        </Provider>
      );
    });
  });

  it('should render without props', () => {
    expect.assertions(1);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should handle debounced filter change', async () => {
    expect.assertions(2);
    const value = 'MOCK_TEXT';
    const clock = jest.useFakeTimers();
    await act(async () => {
      tree.root.findByType('input').props.onChange({ target: { value } });
    });
    expect(store.getActions()).toEqual([]);
    clock.runAllTimers();
    expect(store.getActions()).toEqual([filterName(value.toLowerCase())]);
  });
});
