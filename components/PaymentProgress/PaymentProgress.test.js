import { Provider } from 'react-redux';
import createStore from 'redux-mock-store';
import { create, act } from 'react-test-renderer';
import { PaymentProgress } from './PaymentProgress';

const mockStore = createStore([]);

describe('<PaymentProgress />', () => {
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
