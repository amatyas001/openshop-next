export const ITEM_FILTER = 'ITEM_FILTER';

export function filterColor(color) {
  return {
    type: ITEM_FILTER,
    filters: { color },
  };
}

export function filterPrice(price) {
  return {
    type: ITEM_FILTER,
    filters: { price },
  };
}

export function filterName(name) {
  return {
    type: ITEM_FILTER,
    filters: { name },
  };
}

export function filterReset() {
  return {
    type: ITEM_FILTER,
    filters: { name: '', color: 'All', price: Number.POSITIVE_INFINITY },
  };
}
