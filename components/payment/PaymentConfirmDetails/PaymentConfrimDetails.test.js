import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mockProductWithBuyAmount } from '@app/mocks';
import { INITIAL_STATE } from '@app/config';
import { PaymentConfirmDetails } from '@app/components';

let tree;
let store;
const mockStore = configureStore([]);

describe('<PaymentConfirm />', () => {
  beforeAll(() => {
    store = mockStore({
      ...INITIAL_STATE,
      cart: mockProductWithBuyAmount(1),
      payment: {
        status: 'confirm',
        details: {
          name: 'mock_name',
          email: 'mock_email',
          phone: 'mock_phone',
          address: 'mock_address',
        },
        intent: {
          id: 'mock_id',
          secret: 'mock_secret',
        },
        token: 'token',
      },
    });
    act(() => {
      tree = create(
        <Provider store={store}>
          <PaymentConfirmDetails />
        </Provider>
      );
    });
  });

  it('should render without props', () => {
    expect.assertions(1);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
