import {
  ITEM_FILTER,
  filterColor,
  filterName,
  filterPrice,
  filterReset,
} from '@app/lib/redux/actions';

describe('ITEM_FILTER', () => {
  const filters = [
    { action: filterColor, name: 'color' },
    { action: filterName, name: 'name' },
    { action: filterPrice, name: 'price' },
  ];

  filters.forEach((filter) => {
    describe(filter.name, () => {
      it(`should create proper action without payload`, () => {
        const expected = {
          type: ITEM_FILTER,
          filters: {},
        };
        expect(filter.action()).toEqual(expected);
      });

      it('should create proper action with payload', () => {
        const payload = 'payload';
        const expected = {
          type: ITEM_FILTER,
          filters: { [filter.name]: payload },
        };
        expect(filter.action(payload)).toEqual(expected);
      });
    });
  });

  describe('Reset', () => {
    const expected = {
      type: ITEM_FILTER,
      filters: { name: '', color: 'All', price: Number.POSITIVE_INFINITY },
    };

    it('should create proper action without payload', () => {
      expect(filterReset()).toEqual(expected);
    });

    it('should create proper action with payload', () => {
      const payload = 'payload';
      expect(filterReset(payload)).toEqual(expected);
    });
  });
});
