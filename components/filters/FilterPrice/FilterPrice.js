import { useDispatch } from 'react-redux';
import {
  Heading,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/core';
import { filterPrice } from '@app/redux/actions';

export const FilterPrice = () => {
  const dispatch = useDispatch();
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
      }, 300);
    }
  }, [price]);

  return (
    <>
      <Heading as='label' htmlFor='price' fontSize='1.3rem'>
        Price
      </Heading>
      <Slider
        value={price}
        onChange={(e) => setPrice(e)}
        defaultValue='200'
        name='price'
        d='inline-block'
        ml='11%'
        mt='-30px'
        width='89%'
        min={5}
        max={200}
        steps='1'
      >
        <SliderTrack bg='gray.100' />
        <SliderFilledTrack bg='gray.800' />
        <SliderThumb bg='gray.800' />
        <Text fontSize='1.2rem' fontWeight='bold' ml='-60px'>
          {price} $
        </Text>
      </Slider>
    </>
  );
};
