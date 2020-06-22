import {
  MANAGE_CART,
  PAYMENT_PROGRESS,
  FILTER_ITEMS,
} from '@app/redux/actions';

export function reducer(state, action) {
  switch (action.type) {
    case FILTER_ITEMS:
      return {
        ...state,
        filters: { ...state.filters, ...action.filters },
      };
    case MANAGE_CART:
      const stateCart = state.cart ?? [];
      switch (action.cart.status) {
        // add an item to the cart
        case 'add':
          return {
            ...state,
            cart: [action.cart.item, ...stateCart],
          };

        // remove an item from the cart
        case 'remove':
          return {
            ...state,
            cart: [...state.cart].filter(
              (item) => item.id !== action.cart.item.id
            ),
          };

        // get cart total value
        case 'amount':
          return {
            ...state,
            amount:
              state.cart &&
              state.cart
                .reduce((a, c) => (a += parseFloat(c.price)), 0)
                .toFixed(2),
          };
      }
    case PAYMENT_PROGRESS: {
      return action.payment.status === 'review'
        ? state.payment && state.payment.token
          ? {
              ...state,
              payment: { ...state.payment, status: action.payment.status },
            }
          : {
              ...state,
              payment: {
                ...action.payment,
              },
            }
        : // update payment and cart according to the action
          {
            ...state,
            payment: { ...state.payment, ...action.payment },
            cart: action.cart ? [...action.cart] : [...state.cart],
          };
    }
    default:
      return { ...state };
  }
}
