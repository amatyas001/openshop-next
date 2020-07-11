import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Heading,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/core';
import { filterPrice } from '@app/lib/redux/actions';
import * as COLORS from '@app/config';

/**
 * Renders a range input from zero to the highest price value from
 * the given product list.
 *
 * @see https://amatyas001.github.io/openshop-next/#filterpanel
 */
export const FilterPrice = (props) => {
  const dispatch = useDispatch();
  const { filters } = useSelector((store) => store);
  const { products } = props;
  const [max, setMax] = React.useState(0);
  const [price, setPrice] = React.useState(false);

  React.useEffect(() => {
    setMax(Math.max(...products.map((item) => item.price)));
    /* istanbul ignore next */
    setPrice(filters.price === Number.POSITIVE_INFINITY ? max : filters.price);
  }, [filters.price, products]);

  return (
    <Box mb={{ sm: '35px', lg: 0 }} {...props}>
      <Heading
        as='label'
        d='flex'
        htmlFor='price'
        fontSize='1.3rem'
        color={COLORS.HEADING.dark}
      >
        Price
      </Heading>
      <Heading
        as='span'
        data-testid='filter-price-current'
        position='absolute'
        fontSize='1.5rem'
        fontWeight='bold'
        color={COLORS.HEADING.light}
      >
        {price || max} $
      </Heading>

      <Slider
        data-testid='filter-price-slider'
        value={price || max}
        onChange={(e) => setPrice(e)}
        defaultValue={max}
        name='price'
        d='inline-block'
        mb='-35px'
        width='98%'
        min={1}
        max={max}
        onMouseUp={() => dispatch(filterPrice(price))}
        step={0.01}
      >
        <SliderTrack aria-label='price-track' bg={COLORS.SPACER.light} />
        <SliderFilledTrack aria-label='price-filled' bg={COLORS.SPACER.dark} />
        <SliderThumb aria-label='price-thumb' bg={COLORS.SPACER.dark} />
      </Slider>
    </Box>
  );
};

FilterPrice.propTypes = {
  /**
   * Product list where the maximum price is extracted from
   */
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};
