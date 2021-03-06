import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import { paymentCancel, paymentCancelled, paymentError } from '@app/lib/redux/actions';

let store;
let payload;
const mockStore = configureStore([thunk]);

jest.mock('axios');

describe('[thunk] paymentCancel', () => {
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
    return store.dispatch(paymentCancel(payload)).then(() => {
      expect.assertions(3);
      expect(store.getActions()).toEqual([paymentCancelled(payload)]);
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
    return store.dispatch(paymentCancel(payload)).then(() => {
      expect.assertions(3);
      expect(store.getActions()).toEqual([paymentError(Error(error))]);
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:9000/.netlify/functions/intent',
        { cancel: payload },
        { headers: { 'Content-Type': 'application/json' } }
      );
    });
  });
});
