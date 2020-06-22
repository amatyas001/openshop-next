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
 * Displays a HTML Range Input element and the current value next to it.
 * Changing the value with the slider **dispatches filter event** to the
 * redux store. This action is *debounced* for performance reasons.
 * This component should be wrapped in [FilterPanel](#filterpanel) for
 * proper presentation of the input. Maximum value is calculated from the
 * given items array.
 *
 * For more information: [Chakra/Slider](https://chakra-ui.com/slider)
 */
export const FilterPrice = ({ items }) => {
  const dispatch = useDispatch();
  const { filters = {} } = useSelector((store) => store);
  const [max, setMax] = React.useState(0);
  const [price, setPrice] = React.useState(10000);
  const [tick, setTick] = React.useState(false);

  React.useEffect(() => {
    let ordered = [];
    items.forEach((item) => ordered.push(item['price']));
    setMax(ordered.sort((a, b) => a > b)[0]);
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
      >
        <SliderTrack bg='gray.100' />
        <SliderFilledTrack bg='gray.800' />
        <SliderThumb bg='gray.800' />
        <Text fontSize='1.2rem' fontWeight='bold' ml='-60px'>
          {filters.price > max ? max : price} $
        </Text>
      </Slider>
    </>
  );
};

FilterPrice.propTypes = {
  /**
   * Array of available items
   */
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};
