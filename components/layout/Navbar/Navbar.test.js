import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import createStore from 'redux-mock-store';
import { Navbar } from '@app/components';
import { INITIAL_STATE } from '@app/config';

const mockStore = createStore([]);

describe('<Navbar />', () => {
  let tree, store;

  beforeAll(() => {
    store = mockStore(INITIAL_STATE);

    act(() => {
      tree = create(
        <Provider store={store}>
          <Navbar />
        </Provider>
      );
    });
  });

  it('should render without props', () => {
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
