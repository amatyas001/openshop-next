export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const INTENT_CART = 'INTENT_CART';
export const GET_AMOUNT = 'GET_AMOUNT';

export function addToCart(item) {
  return {
    type: ADD_TO_CART,
    payload: item,
  };
}

export function removeFromCart(item) {
  return {
    type: REMOVE_FROM_CART,
    payload: item,
  };
}

export function intentCart(cart) {
  return {
    type: INTENT_CART,
    cart,
  };
}

export function getAmount() {
  return {
    type: GET_AMOUNT,
  };
}
