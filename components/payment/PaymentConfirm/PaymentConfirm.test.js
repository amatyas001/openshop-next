import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import * as thunks from '@app/redux/thunk/cancel';
import { paymentError, paymentSuccess } from '@app/redux/action/payment';
import { PaymentConfirm } from '@app/components';

const mockStore = configureStore([thunk]);

jest
  .spyOn(require('../../cart/CartContent/CartContent'), 'CartContent')
  .mockImplementation(() => 'CartContent');

describe('<PaymentConfirm />', () => {
  let tree;
  it('should render without props', () => {
    const store = mockStore({
      payment: { status: 'confirm', token: 'token' },
    });
    act(() => {
      tree = create(
        <Provider store={store}>
          <PaymentConfirm />
        </Provider>
      );
    });

    expect(tree.toJSON()).toMatchSnapshot();
  });
});

describe('<PaymentConfirm />', () => {
  let tree,
    store = mockStore({
      payment: { status: 'confirm', token: 'token' },
    }),
    intent = {
      id: 'mock_id',
      secret: 'secret',
    },
    details = {
      name: 'mock_name',
      email: 'mock_email',
      phone: 'mock_phone',
      address: 'mock_address',
    };

  beforeAll(() => {
    act(() => {
      tree = create(
        <Provider store={store}>
          <PaymentConfirm intent={intent} details={details} />
        </Provider>
      );
    });
  });

  it('should render with props', () => {
    expect(tree.toJSON()).toMatchSnapshot();
  });

  describe('on cancel', () => {
    let cancel;

    beforeAll(() => {
      cancel = jest
        .spyOn(thunks, 'paymentCancel')
        .mockImplementation(() => jest.fn());

      act(() => {
        tree.root
          .findByProps({ 'data-testid': 'confirm-button-cancel' })
          .props.onClick();
      });
    });

    it('should display spinner', () => {
      expect(
        tree.root.findByProps({ 'data-testid': 'confirm-spinner' })
      ).toBeTruthy();
    });

    it('should push cancel state', () => {
      expect(cancel).toHaveBeenCalledTimes(1);
      expect(cancel).toHaveBeenCalledWith(intent.id);
    });
  });

  describe('on confirm success', () => {
    beforeAll(() => {
      act(() => {
        tree.root
          .findByProps({ 'data-testid': 'confirm-button-confirm' })
          .props.onClick();
      });
    });

    it('should display spinner', () => {
      expect(
        tree.root.findByProps({ 'data-testid': 'confirm-spinner' })
      ).toBeTruthy();
    });

    it('should push success state', () => {
      expect(store.getActions()).toEqual([
        paymentSuccess({ ...intent, status: 'succeeded' }),
      ]);
    });
  });

  describe('on confirm error', () => {
    let store, tree;

    beforeAll(() => {
      store = mockStore({
        payment: { status: 'confirm', token: 'token' },
      });

      act(() => {
        tree = create(
          <Provider store={store}>
            <PaymentConfirm
              intent={{ ...intent, secret: 'error' }}
              details={details}
            />
          </Provider>
        );
      });

      act(() => {
        tree.root
          .findByProps({ 'data-testid': 'confirm-button-confirm' })
          .props.onClick();
      });
    });

    it('should display spinner', () => {
      expect(
        tree.root.findByProps({ 'data-testid': 'confirm-spinner' })
      ).toBeTruthy();
    });

    it('should push error state', async () => {
      expect(store.getActions()).toEqual([paymentError('mock_error')]);
    });
  });
});
