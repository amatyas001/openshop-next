import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import { paymentCreate, paymentConfirm, paymentError } from '@app/lib/redux/actions';

let store;
let details;
let items;
let token;
const mockStore = configureStore([thunk]);

jest.mock('axios');

describe('[thunk] paymentCreate', () => {
  beforeEach(() => {
    store = mockStore();
    details = {
      name: 'name',
      email: 'eamil',
      address: 'address',
      phone: 'phone',
    };
    items = [{ item: 'item' }];
    token = 'token';
  });

  afterEach(() => {
    axios.post.mockRestore();
  });

  it('should push confirm state', () => {
    const response = 'response';
    axios.post.mockImplementationOnce(() => {
      return Promise.resolve({ data: response });
    });
    return store.dispatch(paymentCreate(details, items, token)).then(() => {
      expect.assertions(3);
      expect(store.getActions()).toEqual([paymentConfirm(details, response)]);
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:9000/.netlify/functions/intent',
        { items, token },
        { headers: { 'Content-Type': 'application/json' } }
      );
    });
  });

  it('should push error state', () => {
    const error = 'error';
    axios.post.mockImplementationOnce(() => {
      return Promise.reject(new Error(error));
    });
    return store.dispatch(paymentCreate(details, items, token)).then(() => {
      expect.assertions(3);
      expect(store.getActions()).toEqual([paymentError(Error(error))]);
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:9000/.netlify/functions/intent',
        { items, token },
        { headers: { 'Content-Type': 'application/json' } }
      );
    });
  });
});
