import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import createStore from 'redux-mock-store';
import { FilterName } from '@app/components';
import { INITIAL_STATE } from '@app/config';
import { filterName } from '@app/lib/redux/actions';

const mockStore = createStore([]);
const mock_text = 'MoCk_TeXt';

describe('<FilterName />', () => {
  let tree, store;

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
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should handle debounced filter change', async () => {
    const clock = jest.useFakeTimers();

    await act(async () => {
      tree.root
        .findByType('input')
        .props.onChange({ target: { value: mock_text } });
    });

    expect(store.getActions()).toEqual([]);

    clock.runAllTimers();

    expect(store.getActions()).toEqual([filterName(mock_text.toLowerCase())]);
  });
});
