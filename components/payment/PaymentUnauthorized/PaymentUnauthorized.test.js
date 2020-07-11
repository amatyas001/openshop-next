import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { PaymentUnauthorized } from '@app/components/';
import { INITIAL_STATE } from '@app/config/';

const mockStore = configureStore([]);

describe('<PaymentUnauthorized />', () => {
  let tree;

  beforeAll(() => {
    act(() => {
      tree = create(
        <Provider store={mockStore(INITIAL_STATE)}>
          <PaymentUnauthorized />
        </Provider>
      );
    });
  });

  it('should render without props', () => {
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
