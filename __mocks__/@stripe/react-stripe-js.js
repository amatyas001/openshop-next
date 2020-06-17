import { createElement } from 'react';

export function useElements() {
  return jest.fn();
}

export function useStripe() {
  return true;
}

export function Elements(props) {
  return createElement('Elements', props, [...props.children]);
}
export function CardElement(props) {
  return createElement('CardElement', props, props.children);
}
