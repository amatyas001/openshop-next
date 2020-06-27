import { createElement } from 'react';

export function useElements() {
  return {
    getElement: () => CardElement({ children: '' }),
  };
}

export function useStripe() {
  return {
    confirmCardPayment: jest.fn((secret) => {
      if (secret !== 'error') {
        return {
          paymentIntent: {
            status: 'succeeded',
            id: 'mock_id',
            secret,
          },
        };
      }

      return {
        error: 'mock_error',
      };
    }),
  };
}

export function Elements(props) {
  return createElement('Elements', props, props.children);
}
export function CardElement(props) {
  return createElement('CardElement', props, props.children);
}
