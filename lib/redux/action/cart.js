export const MANAGE_CART = 'MANAGE_CART';

export function addToCart(item) {
  return {
    type: MANAGE_CART,
    cart: { status: 'add', item },
  };
}

export function removeFromCart(item) {
  return {
    type: MANAGE_CART,
    cart: { status: 'remove', item },
  };
}

export function getAmount() {
  return {
    type: MANAGE_CART,
    cart: { status: 'amount' },
  };
}
