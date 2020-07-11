import { Provider } from 'react-redux';
import createStore from 'redux-mock-store';
import { create, act } from 'react-test-renderer';
import { PaymentProgress } from '@app/components';
import { INITIAL_STATE } from '@app/config';

const mockStore = createStore([]);

describe('<PaymentProgress />', () => {
  it('should render with initial state', () => {
    let tree;

    act(() => {
      tree = create(
        <Provider store={mockStore(INITIAL_STATE)}>
          <PaymentProgress />
        </Provider>
      );
    });

    expect(tree.toJSON()).toMatchSnapshot();
  });

  const status = ['review', 'form', 'confirm', 'success', 'cancelled', 'error'];

  status.map((item) => {
    it(`should render properly on ${item} state`, () => {
      let tree;

      const store = mockStore({
        payment: {
          status: item,
        },
      });

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
