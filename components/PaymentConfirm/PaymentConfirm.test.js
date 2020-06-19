import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as thunks from '../../redux/thunk/cancel';
import * as actions from '../../redux/action/payment';
import { PaymentConfirm } from './PaymentConfirm';

const mockStore = configureStore([thunk]);

describe('<PaymentConfirm />', () => {
  let tree,
    store = mockStore({
      payment: { status: 'confirm', token: 'token' },
      cart: [{ id: 'item' }],
      amount: 100,
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

  it('should render without props', () => {
    act(() => {
      tree = create(
        <Provider store={store}>
          <PaymentConfirm />
        </Provider>
      );
    });

    expect(tree.toJSON()).toMatchSnapshot();
  });

  afterEach(() => {
    store = mockStore({
      payment: { status: 'confirm', token: 'token' },
      cart: [{ id: 'item' }],
      amount: 100,
    });
  });

  describe('with props', () => {
    beforeAll(() => {
      act(() => {
        tree = create(
          <Provider store={store}>
            <PaymentConfirm intent={intent} details={details} />
          </Provider>
        );
      });
    });

    it('should render intent id', () => {
      expect(
        tree.root.findByProps({ 'data-testid': 'confirm-intent-id' }).props
          .children
      ).toContain(intent.id);
    });

    for (let key in details) {
      it(`should render details ${key}`, () => {
        expect(
          tree.root.findByProps({ 'data-testid': `confirm-intent-${key}` })
            .props.children
        ).toContain(details[key]);
      });
    }

    it('should render cancel button', () => {
      expect(
        tree.root.findByProps({ 'data-testid': 'confirm-button-cancel' })
      ).toBeTruthy();
    });

    it('should render confirm button', () => {
      expect(
        tree.root.findByProps({ 'data-testid': 'confirm-button-confirm' })
      ).toBeTruthy();
    });

    it('should not display spinner', () => {
      try {
        tree.root.findByProps({ 'data-testid': 'confirm-spinner' });
      } catch (e) {
        expect(e).toMatchSnapshot();
      }
    });
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

  describe('on confirm', () => {
    let success, error;

    beforeAll(async () => {
      success = jest
        .spyOn(actions, 'paymentSuccess')
        .mockImplementation(() => jest.fn());

      error = jest
        .spyOn(actions, 'paymentError')
        .mockImplementation(() => jest.fn());

      await act(async () => {
        await tree.root
          .findByProps({ 'data-testid': 'confirm-button-confirm' })
          .props.onClick();
      });
    });

    it('should display spinner', () => {
      expect(
        tree.root.findByProps({ 'data-testid': 'confirm-spinner' })
      ).toBeTruthy();
    });

    it('should push success state', async () => {
      expect(success).toHaveBeenCalledTimes(1);
    });

    it('should push error state', async () => {
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

      await act(async () => {
        await tree.root
          .findByProps({ 'data-testid': 'confirm-button-confirm' })
          .props.onClick();
      });

      expect(error).toHaveBeenCalledTimes(1);
    });
  });
});
