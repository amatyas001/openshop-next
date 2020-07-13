import { Provider } from 'react-redux';
import createStore from 'redux-mock-store';
import { create, act } from 'react-test-renderer';
import { PaymentProgress } from '@app/components';
import { INITIAL_STATE } from '@app/config';

let tree;
const mockStore = createStore([]);
const statuses = ['review', 'form', 'confirm', 'success', 'cancelled', 'error'];

describe('<PaymentProgress />', () => {
  it('should render with initial state', () => {
    expect.assertions(1);
    act(() => {
      tree = create(
        <Provider store={mockStore(INITIAL_STATE)}>
          <PaymentProgress />
        </Provider>
      );
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  statuses.forEach((status) => {
    it(`should render properly on ${status} state`, () => {
      expect.assertions(1);
      const store = mockStore({ ...INITIAL_STATE, payment: { status } });
      act(() => {
        tree = create(
          <Provider store={store}>
            <PaymentProgress />
          </Provider>
        );
      });
      expect(tree.toJSON()).toMatchSnapshot();
    });
  });
});
