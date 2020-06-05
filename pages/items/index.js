import Head from 'next/head';
import {
  Heading,
  Flex,
  Divider,
  Box,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SimpleGrid,
} from '@chakra-ui/core';
import { Card } from '../../components';

export async function getStaticProps() {
  const items = await import('../../public/storedata.json');

  return {
    props: {
      items: items.items,
    },
  };
}

export default function Items({ items }) {
  const [price, setPrice] = React.useState(200);
  return (
    <>
      <Head>
        <title>OpenShop - Browse</title>
        <meta name='description' content='OpenShop public items' />
      </Head>
      <Heading as='h1' size='2x1' d='none'>
        Browse
      </Heading>
      <Heading fontSize='1.3rem'>Price</Heading>
      <Slider
        color='pink'
        value={price}
        min={1}
        max={200}
        onChange={(value) => setPrice(value)}
        width={{ sm: '70%', md: '50%', lg: '35%', xl: '20%' }}
      >
        <Text mx='auto' fontSize='1.2rem' fontWeight='bold' mb='-55px' ml='45%'>
          {price} $
        </Text>
        <SliderTrack bg='gray.100' />
        <SliderFilledTrack bg='gray.400' />
        <SliderThumb bg='gray.800' />
      </Slider>
      <Flex
        width='100%'
        flexWrap='wrap'
        alignItems='center'
        justifyContent='space-around'
      >
        {items
          .filter((item) => item.price <= price)
          .map((item) => (
            <Box key={item.name}>
              <Divider orientation='vertical' />
              <Card item={item} />
              <Divider orientation='vertical' />
            </Box>
          ))}
      </Flex>
    </>
  );
}
