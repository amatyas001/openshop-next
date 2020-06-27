import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import * as actions from '@app/redux/thunk/cancel';
import { PaymentConfirmControls } from '@app/components';

const mockStore = configureStore([thunk]);

const mock_confirm = jest.fn();
const mock_load = jest.fn();

describe('<PaymentConfirmControls />', () => {
  let tree,
    store = mockStore({
      payment: {
        intent: { id: 'mock_id' },
      },
    });

  it('should render with required props', () => {
    act(() => {
      tree = create(
        <Provider store={store}>
          <PaymentConfirmControls
            confirmHandler={mock_confirm}
            loadHandler={mock_load}
            complete={false}
          />
        </Provider>
      );
    });

    expect(tree.toJSON()).toMatchSnapshot();
  });

  describe('Cancel Button', () => {
    let cancel;

    beforeAll(() => {
      cancel = jest
        .spyOn(actions, 'paymentCancel')
        .mockImplementation(() => jest.fn());

      act(() => {
        tree = create(
          <Provider store={store}>
            <PaymentConfirmControls
              confirmHandler={mock_confirm}
              loadHandler={mock_load}
              complete={false}
            />
          </Provider>
        );
      });

      act(() => {
        tree.root
          .findByProps({
            'data-testid': 'confirm-controls-cancel',
          })
          .props.onClick();
      });
    });

    it('should set loading state with passed handler', () => {
      expect(mock_load).toHaveBeenCalledTimes(1);
      expect(mock_load).toHaveBeenCalledWith(true);
    });

    it('should dispatch cancel state', () => {
      expect(cancel).toHaveBeenCalledTimes(1);
      expect(cancel).toHaveBeenCalledWith(store.getState().payment.intent.id);
    });
  });

  describe('Confrim Button', () => {
    beforeAll(() => {
      act(() => {
        tree = create(
          <Provider store={store}>
            <PaymentConfirmControls
              confirmHandler={mock_confirm}
              loadHandler={mock_load}
              complete={true}
            />
          </Provider>
        );
      });

      act(() => {
        tree.root
          .findByProps({
            'data-testid': 'confirm-controls-confirm',
          })
          .props.onClick();
      });
    });

    it('should call passed handler', () => {
      expect(mock_load).toHaveBeenCalledTimes(1);
    });
  });
});
