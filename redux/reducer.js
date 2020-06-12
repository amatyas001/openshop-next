import {
  SCROLL,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  GET_AMOUNT,
  CHECKOUT_PROGRESS,
  PAYMENT_PROGRESS,
  PAYMENT_RESET,
  PAYMENT_TOKEN,
} from './actions';

export function reducer(state, action) {
  switch (action.type) {
    case SCROLL:
      return { ...state, scroll: action.payload };
    case ADD_TO_CART:
      return { ...state, cart: [...state.cart, action.payload] };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: [...state.cart].filter((item) => item.id !== action.payload.id),
      };
    case CLEAR_CART:
      return { ...state, cart: [], checkout: 'success' };
    case GET_AMOUNT:
      return {
        ...state,
        amount:
          state.cart &&
          state.cart.reduce((a, c) => (a += parseFloat(c.price)), 0).toFixed(2),
      };
    case CHECKOUT_PROGRESS: {
      return {
        ...state,
        checkout: action.payload,
      };
    }
    case PAYMENT_PROGRESS: {
      return {
        ...state,
        payment: action.payload,
        checkout:
          action.payload.status === true
            ? { status: 'review' }
            : state.checkout,
      };
    }
    case PAYMENT_RESET: {
      return {
        ...state,
        checkout: { status: 'review' },
        payment: { status: 'reset' },
      };
    }
    case PAYMENT_TOKEN: {
      if (state.payment.token) return { ...state };
      return {
        ...state,
        payment: { ...state.payment, token: action.payload },
      };
    }
    default:
      return { ...state };
  }
}
