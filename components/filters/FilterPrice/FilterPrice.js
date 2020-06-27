import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  Heading,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/core';
import { filterPrice } from '@app/redux/actions';

/**
 * Displays a [Slider](https://chakra-ui.com/slider) element and actual set
 * price value. Maximum range value is calculated from the items array.
 *
 * > ***State***
 * > - `filters.price`
 *
 * > ***Elements***
 * > - [Slider](https://chakra-ui.com/slider)
 *
 * @example
 * ```jsx
 * <FilterPrice items={itemsArray} track={trackStyle} filled={filledStyle} thumb={thumbStyle} actual={priceStyle} />
 * ```
 */
export const FilterPrice = (props) => {
  const dispatch = useDispatch();
  const { filters = {} } = useSelector((store) => store);
  const [max, setMax] = React.useState(0);
  const [price, setPrice] = React.useState(10000);
  const [tick, setTick] = React.useState(false);

  React.useEffect(() => {
    setMax(Math.max(...props.items.map((item) => item.price)));
  }, []);

  React.useEffect(() => {
    const handler = async () => {
      dispatch(filterPrice(price));
      setTick(true);
    };

    if (!tick) {
      handler();
      setTimeout(() => {
        setTick(false);
      }, 100);
    }
  }, [price]);

  return (
    <>
      <Heading as='label' htmlFor='price' fontSize='1.3rem'>
        Price
      </Heading>
      <Slider
        value={filters.price > max ? max : price}
        onChange={(e) => setPrice(e)}
        defaultValue={max}
        name='price'
        d='inline-block'
        ml='11%'
        mt='-30px'
        width='89%'
        min={1}
        max={max}
        {...props}
      >
        <SliderTrack aria-label='price-track' bg='gray.100' {...props.track} />
        <SliderFilledTrack
          aria-label='price-filled'
          bg='gray.800'
          {...props.filled}
        />
        <SliderThumb aria-label='price-thumb' bg='gray.800' {...props.thumb} />
        <Text fontSize='1.2rem' fontWeight='bold' ml='-60px' {...props.actual}>
          {filters.price > max ? max : price} $
        </Text>
      </Slider>
    </>
  );
};

FilterPrice.defaultProps = {
  track: null,
  filled: null,
  thumb: null,
  actual: null,
};

FilterPrice.propTypes = {
  /**
   * Array of items to be filtered
   */
  items: PropTypes.arrayOf(PropTypes.object).isRequired,

  /**
   * [Style Props Object](https://chakra-ui.com/style-props) for slider track
   */
  track: PropTypes.object,

  /**
   * [Style Props Object](https://chakra-ui.com/style-props) for slider filled track
   */
  filled: PropTypes.object,

  /**
   * [Style Props Object](https://chakra-ui.com/style-props) for  slider thumb
   */
  thumb: PropTypes.object,

  /**
   * [Style Props Object](https://chakra-ui.com/style-props) for actual price text
   */
  actual: PropTypes.object,
};
