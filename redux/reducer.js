import axios from 'axios';

import { ADD_TO_CART, REMOVE_FROM_CART, INTENT_CART } from './actions';

export function reducer(state, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return { ...state, cart: [...state.cart, action.payload] };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: [...state.cart].filter((item) => item.id !== action.payload.id),
      };
    case INTENT_CART:
      return { ...state };
    default:
      return { ...state };
  }
}
