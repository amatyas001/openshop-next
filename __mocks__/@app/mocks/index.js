/**
 * Generates mock products with unique attributes.
 *
 * @param {*} count
 * @returns List of mock items with dynamic values
 */
export const mockProduct = (count = 1) => {
  let index = 0;
  let items = [];
  do {
    items.push({
      id: `mock_id_${index}`,
      amount: 1,
      color: `mock_color_${index}`,
      description: `mock_description_${index}`,
      gender: `mock_gender_${index}`,
      img: `mock_img_${index}`,
      name: `mock_name_${index}`,
      price: 1,
      review: `mock_review_${index}`,
      starrating: 1,
    });
    index++;
  } while (--count !== 0);
  return items;
};

/**
 * Generates mock products with buying amount details.
 *
 * @param {*} count Number of products to generate
 * @param {*} amount Mock amount attached to the listed products
 * @returns List of mock products with mock buying amount details
 */
export const mockProductWithBuyAmount = (count, amount = 1) => {
  return mockProduct(count).map((c) => ({
    ...c,
    buy: { amount },
  }));
};

/**
 * Generates mock products with unique price attributes.
 *
 * @param {*} count Number of products to generate
 * @param {*} value Base value of prices attached to generated products
 * @returns List of mock products with dynamic values and prices
 */
export const mockProductWithPrice = (count, value) => {
  const generatePrices = function* (base) {
    let index = 1;
    while (true) yield base * index++;
  };
  const generator = generatePrices(value);
  return mockProduct(count).map((c) => ({
    ...c,
    price: generator.next().value,
  }));
};

/**
 * Generates mock products with unique color attributes.
 * Each odd products has an array format color property.
 *
 * @param {number} count Number of products to generate
 * @returns Object with exact shape of
 * - `colors`: List of generated unique colors.
 * - `products`: List of mock items with dynamic values and colors.
 */
export const mockProductWithColor = (count) => {
  const generateColors = function* () {
    let index = 0;
    while (true) {
      yield index % 2 ? `mock_color_${index}` : [`mock_color_${index}`, `mock_color_${index + 1}`];
      index++;
    }
  };
  const generator = generateColors();
  const products = mockProduct(count).map((c, i) => ({
    ...c,
    color: generator.next().value,
  }));
  return {
    colors: [...new Set(products.reduce((a, c) => a.concat(c.color), ['All']))],
    products,
  };
};
