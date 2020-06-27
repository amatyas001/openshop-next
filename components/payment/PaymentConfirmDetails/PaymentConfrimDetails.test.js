import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { PaymentConfirmDetails } from '@app/components';

const mockStore = configureStore([]);

const _state = {
  cart: [
    {
      id: 'mock_id',
      name: 'mock_name',
      desc: 'mock_desc',
      img: 'mock_img',
      price: 10,
      rating: 5,
    },
  ],
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
};

describe('<PaymentConfirm />', () => {
  let tree, store;

  beforeAll(() => {
    store = mockStore(_state);

    act(() => {
      tree = create(
        <Provider store={store}>
          <PaymentConfirmDetails />
        </Provider>
      );
    });
  });

  it('should render without props', () => {
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
