import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import * as actions from '@app/lib/redux/payment/paymentCancel';
import { PaymentConfirmControls } from '@app/components';

let tree;
const confirm = jest.fn();
const load = jest.fn();
const mockStore = configureStore([thunk]);
const store = mockStore({
  payment: {
    intent: { id: 'mock_id' },
  },
});

describe('<PaymentConfirmControls />', () => {
  it('should render with required props', () => {
    act(() => {
      tree = create(
        <Provider store={store}>
          <PaymentConfirmControls confirmHandler={confirm} loadHandler={load} complete={false} />
        </Provider>
      );
    });
    expect.assertions(1);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  describe('Cancel Button', () => {
    let cancel;

    beforeAll(() => {
      cancel = jest.spyOn(actions, 'paymentCancel').mockImplementation(() => jest.fn());
      act(() => {
        tree = create(
          <Provider store={store}>
            <PaymentConfirmControls confirmHandler={confirm} loadHandler={load} complete={false} />
          </Provider>
        );
      });
      act(() => {
        tree.root.findByProps({ 'data-testid': 'confirm-controls-cancel' }).props.onClick();
      });
    });

    it('should set loading state with passed handler', () => {
      expect.assertions(2);
      expect(load).toHaveBeenCalledTimes(1);
      expect(load).toHaveBeenCalledWith(true);
    });

    it('should dispatch cancel state', () => {
      expect.assertions(2);
      expect(cancel).toHaveBeenCalledTimes(1);
      expect(cancel).toHaveBeenCalledWith(store.getState().payment.intent.id);
    });
  });

  describe('Confrim Button', () => {
    const createWithStatus = (complete) => {
      act(() => {
        tree = create(
          <Provider store={store}>
            <PaymentConfirmControls
              confirmHandler={confirm}
              loadHandler={load}
              complete={complete}
            />
          </Provider>
        );
      });
      act(() => {
        tree.root.findByProps({ 'data-testid': 'confirm-controls-confirm' }).props.onClick();
      });
    };

    it('should call passed handler', () => {
      expect.assertions(1);
      createWithStatus(true);
      expect(load).toHaveBeenCalledTimes(1);
    });

    it('should be disabled', () => {
      expect.assertions(1);
      createWithStatus(false);
      expect(
        tree.root.findByProps({ 'data-testid': 'confirm-controls-confirm' }).props.disabled
      ).toBeTruthy();
    });
  });
});
