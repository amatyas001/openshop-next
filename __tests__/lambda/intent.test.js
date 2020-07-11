import { handler } from '@app/lib/lambda/intent';
import axios from 'axios';
import { mockProduct } from '@app/__mocks__/@app/mocks';

jest.mock('axios');

const mock_token = 'token';
const mock_intent_id = 'id';
const mock_intent_secret = 'secret';
const mock_intent_error = 'intent_error';
const mock_error = Error('error');
const mock_products = mockProduct(5).map((c) => {
  return {
    ...c,
    buy: {
      amount: 1,
    },
  };
});

const mock_create = jest
  .fn()
  .mockImplementationOnce(() => ({
    id: mock_intent_id,
    client_secret: mock_intent_secret,
  }))
  .mockImplementationOnce(() => ({
    error: { message: mock_intent_error },
  }))
  .mockImplementationOnce(() => {
    throw mock_error;
  });

const mock_cancel = jest
  .fn()
  .mockImplementationOnce(() => ({
    id: mock_intent_id,
  }))
  .mockImplementationOnce(() => ({
    error: { message: mock_intent_error },
  }))
  .mockImplementationOnce(() => {
    throw mock_error;
  });

describe('Intent Handler', () => {
  let event, expected;

  beforeAll(() => {
    const { Stripe } = require('stripe');

    Stripe.prototype.paymentIntents = {
      create: mock_create,
      cancel: mock_cancel,
    };
  });

  it('should set cors headers', async () => {
    event = {
      httpMethod: 'OPTIONS',
    };

    await expect(handler(event)).resolves.toHaveProperty('headers', {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
  });

  afterEach(() => {
    mock_create.mockClear();
    mock_cancel.mockClear();
  });

  describe('on cancel request', () => {
    beforeAll(() => {
      event = {
        httpMethod: 'POST',
        body: JSON.stringify({
          cancel: mock_intent_id,
        }),
      };

      expected = {
        id: mock_intent_id,
        options: {
          cancellation_reason: 'requested_by_customer',
        },
      };
    });

    it('should send back intent id', async () => {
      await expect(handler(event)).resolves.toHaveProperty(
        'body',
        JSON.stringify({
          id: mock_intent_id,
        })
      );
      expect(mock_cancel).toHaveBeenCalledTimes(1);
      expect(mock_cancel).toHaveBeenCalledWith(expected.id, expected.options);
    });

    it('should send back intent error', async () => {
      await expect(handler(event)).resolves.toHaveProperty(
        'body',
        JSON.stringify({
          status: mock_intent_error,
        })
      );
      expect(mock_cancel).toHaveBeenCalledTimes(1);
      expect(mock_cancel).toHaveBeenCalledWith(expected.id, expected.options);
    });

    it('should send back error', async () => {
      await expect(handler(event)).resolves.toHaveProperty(
        'body',
        JSON.stringify({ status: mock_error })
      );
      expect(mock_cancel).toHaveBeenCalledTimes(1);
      expect(mock_cancel).toHaveBeenCalledWith(expected.id, expected.options);
    });
  });

  describe('on insufficent request', () => {
    beforeAll(() => {
      expected = JSON.stringify({
        status: {
          message: 'Missing parameters!',
        },
      });
    });

    it('should send back error if no items', async () => {
      event = {
        httpMethod: 'POST',
        body: JSON.stringify({
          token: mock_token,
        }),
      };

      await expect(handler(event)).resolves.toHaveProperty('body', expected);
    });

    it('should send back error if no token', async () => {
      event = {
        httpMethod: 'POST',
        body: JSON.stringify({
          items: mock_products,
        }),
      };

      await expect(handler(event)).resolves.toHaveProperty('body', expected);
    });
  });

  describe('on proper request', () => {
    beforeAll(() => {
      axios.get.mockImplementation(() =>
        Promise.resolve({
          data: {
            items: mock_products,
          },
        })
      );

      event = {
        httpMethod: 'POST',
        body: JSON.stringify({
          items: mock_products,
          token: mock_token,
        }),
      };

      expected = {
        config: {
          amount: mock_products.reduce(
            (a, c) => (a += c.price * 100 * c.buy.amount),
            0
          ),
          currency: 'usd',
          description: 'Order from store',
        },
        key: { idempotencyKey: mock_token },
      };
    });

    it('should send back intent details', async () => {
      await expect(handler(event)).resolves.toHaveProperty(
        'body',
        JSON.stringify({
          id: mock_intent_id,
          secret: mock_intent_secret,
        })
      );
      expect(mock_create).toHaveBeenCalledTimes(1);
      expect(mock_create).toHaveBeenCalledWith(expected.config, expected.key);
    });

    it('should send back intent error', async () => {
      await expect(handler(event)).resolves.toHaveProperty(
        'body',
        JSON.stringify({
          status: mock_intent_error,
        })
      );
      expect(mock_create).toHaveBeenCalledTimes(1);
      expect(mock_create).toHaveBeenCalledWith(expected.config, expected.key);
    });

    it('should send back error', async () => {
      await expect(handler(event)).resolves.toHaveProperty(
        'body',
        JSON.stringify({ status: mock_error })
      );
      expect(mock_create).toHaveBeenCalledTimes(1);
      expect(mock_create).toHaveBeenCalledWith(expected.config, expected.key);
    });
  });
});
