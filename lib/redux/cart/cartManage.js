export const CART_MANAGE = 'MANAGE_CART';

export function addToCart(item) {
  return {
    type: CART_MANAGE,
    cart: { status: 'add', item },
  };
}

export function removeFromCart(item) {
  return {
    type: CART_MANAGE,
    cart: { status: 'remove', item },
  };
}
