export const mockProduct = (repeat = 1) => {
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
      sizes: [`mock_size_0_${index}`, `mock_size_1_${index}`],
      starrating: 1,
    });
  } while (--repeat !== 0);
  return items;
};
