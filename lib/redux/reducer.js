import {
  CART_MANAGE,
  PAYMENT_STAGE,
  ITEM_FILTER,
  PANEL_TOGGLE,
} from '@app/lib/redux/actions';

export const reducer = (state, action) => {
  switch (action.type) {
    case PANEL_TOGGLE: {
      // Toggle UI panel collapse states
      return {
        ...state,
        panel: { ...state.panel, [action.panel.panel]: action.panel.value },
      };
    }
    case ITEM_FILTER: {
      // Merge item filters
      return {
        ...state,
        filters: { ...state.filters, ...action.filters },
      };
    }

    case CART_MANAGE:
      switch (action.cart.status) {
        case 'add':
          // Increase the amount of an existing item or add a new entry
          // to the beginning of the cart
          return {
            ...state,
            cart:
              [...state.cart].filter(
                (c) =>
                  c.id === action.cart.item.id &&
                  c.buy.size === action.cart.item.buy.size &&
                  c.buy.color === action.cart.item.buy.color
              ).length > 0
                ? [...state.cart].reduce((a, c) => {
                    a.push(
                      /* istanbul ignore next */
                      c.id === action.cart.item.id
                        ? {
                            ...c,
                            buy: {
                              ...c.buy,
                              amount:
                                c.buy.amount + action.cart.item.buy.amount,
                            },
                          }
                        : c
                    );
                    return a;
                  }, [])
                : [action.cart.item, ...state.cart],
          };

        case 'remove':
          // Decrease the amount of a cart item or skip it when amount is zero
          return {
            ...state,
            cart: [...state.cart].reduce((a, c) => {
              /* istanbul ignore next */
              c.id === action.cart.item.id
                ? c.buy.amount - 1 > 0 &&
                  a.push({
                    ...c,
                    buy: { ...c.buy, amount: c.buy.amount - 1 },
                  })
                : a.push(c);
              return a;
            }, []),
          };
      }

    case PAYMENT_STAGE: {
      // Put a new token if its not set and pass payment data to state
      return action.payment.status === 'review'
        ? state.payment && state.payment.token
          ? {
              ...state,
              payment: {
                ...state.payment,
                status: action.payment.status,
              },
            }
          : {
              ...state,
              payment: {
                ...action.payment,
              },
            }
        : {
            ...state,
            payment: {
              ...state.payment,
              ...action.payment,
            },
            cart: /* istanbul ignore next */ action.cart
              ? [...action.cart]
              : [...state.cart],
          };
    }

    default:
      return { ...state };
  }
};
