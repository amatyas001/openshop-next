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
 * proper presentation of the input.
 */
export const FilterPrice = () => {
  const dispatch = useDispatch();
  const storePrice = useSelector((store) => store.filters.price);
  const [price, setPrice] = React.useState(200);
  const [tick, setTick] = React.useState(false);

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
        value={storePrice === 200 ? storePrice : price}
        onChange={(e) => setPrice(e)}
        defaultValue='200'
        name='price'
        d='inline-block'
        ml='11%'
        mt='-30px'
        width='89%'
        min={1}
        max={200}
      >
        <SliderTrack bg='gray.100' />
        <SliderFilledTrack bg='gray.800' />
        <SliderThumb bg='gray.800' />
        <Text fontSize='1.2rem' fontWeight='bold' ml='-60px'>
          {storePrice} $
        </Text>
      </Slider>
    </>
  );
};
