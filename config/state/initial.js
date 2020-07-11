export const INITIAL_STATE = {
  payment: {
    status: '',
    intent: {},
    details: {},
    error: {},
    token: false,
  },
  cart: [],
  filters: {
    name: '',
    color: 'All',
    price: Number.POSITIVE_INFINITY,
  },
  panel: {
    cart: false,
    filters: false,
  },
};
