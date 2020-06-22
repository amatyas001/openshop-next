export const FILTER_ITEMS = 'FILTER_ITEMS';

export function filterColor(color) {
  return {
    type: FILTER_ITEMS,
    filters: { color },
  };
}

export function filterPrice(price) {
  return {
    type: FILTER_ITEMS,
    filters: { price },
  };
}

export function filterName(name) {
  return {
    type: FILTER_ITEMS,
    filters: { name },
  };
}

export function filterReset() {
  return {
    type: FILTER_ITEMS,
    filters: {
      name: '',
      color: 'All',
      // should be greater than any price
      // handled at FilterPrice
      price: 100000,
    },
  };
}
