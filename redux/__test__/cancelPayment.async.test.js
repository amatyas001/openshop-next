import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import { cancelPayment, paymentCanceled, paymentError } from '../actions';

jest.mock('axios');

const mockStore = configureStore([thunk]);

describe('cancelPayment', () => {
  let store, payload;
  beforeEach(() => {
    store = mockStore();
    payload = 'intent';
  });

  afterEach(() => {
    axios.post.mockRestore();
  });

  it('should push cancelled state', () => {
    axios.post.mockImplementationOnce(() => {
      return Promise.resolve({ data: payload });
    });
    return store.dispatch(cancelPayment(payload)).then(() => {
      expect(store.getActions()).toEqual([paymentCanceled(payload)]);
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:9000/.netlify/functions/intent',
        { cancel: payload },
        { headers: { 'Content-Type': 'application/json' } }
      );
    });
  });

  it('should push error state', () => {
    const error = 'error';
    axios.post.mockImplementationOnce(() => {
      return Promise.reject(new Error(error));
    });
    return store.dispatch(cancelPayment(payload)).then(() => {
      expect(store.getActions()).toEqual([paymentError(error)]);
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:9000/.netlify/functions/intent',
        { cancel: payload },
        { headers: { 'Content-Type': 'application/json' } }
      );
    });
  });
});
