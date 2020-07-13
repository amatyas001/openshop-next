import { CART_MANAGE, PAYMENT_STAGE, ITEM_FILTER, PANEL_TOGGLE } from '@app/lib/redux/actions';

export const reducer = (state, action) => {
  switch (action.type) {
    case PANEL_TOGGLE: {
      return {
        ...state,
        panel: { ...state.panel, [action.panel.panel]: action.panel.value },
      };
    }
    case ITEM_FILTER: {
      return {
        ...state,
        filters: { ...state.filters, ...action.filters },
      };
    }

    case CART_MANAGE:
      switch (action.cart.status) {
        case 'add':
          // Increase the buying amount of an existing product or add it as a new entry
          // to the beginning of the cart if not present yet.
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
                            buy: { ...c.buy, amount: c.buy.amount + action.cart.item.buy.amount },
                          }
                        : c
                    );
                    return a;
                  }, [])
                : [action.cart.item, ...state.cart],
          };

        case 'remove':
          // Decrease the buying amount of product in the cart by one and remove it when reaches zero.
          return {
            ...state,
            cart: [...state.cart].reduce((a, c) => {
              /* istanbul ignore next */
              if (c.id === action.cart.item.id && c.buy.amount - 1 > 0)
                a.push({ ...c, buy: { ...c.buy, amount: c.buy.amount - 1 } });
              return a;
            }, []),
          };
        default:
          break;
      }
      break;

    case PAYMENT_STAGE: {
      // Put a new token if its not set and pass payment data to state
      if (action.payment.status === 'review')
        return state.payment && state.payment.token
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
            };
      return {
        ...state,
        payment: {
          ...state.payment,
          ...action.payment,
        },
        cart: /* istanbul ignore next */ action.cart ? [...action.cart] : [...state.cart],
      };
    }

    default:
      break;
  }
  return { ...state };
};
