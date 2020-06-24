import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import { MdInvertColors } from 'react-icons/md';
import { FaFemale, FaMale } from 'react-icons/fa';
import { Heading, Flex, Text, Divider, SimpleGrid, Box } from '@chakra-ui/core';
import { addToCart, removeFromCart } from '@app/redux/actions';
import { Card, Button } from '@app/components';

/** @ignore */
export async function getStaticPaths() {
  const items = await import('../../public/storedata.json');

  const paths = items.items.map((item) => `/items/${item.id}`);

  return { paths, fallback: false };
}

/** @ignore */
export async function getStaticProps({ params }) {
  const items = await import('../../public/storedata.json');

  return {
    props: {
      item: items.items.filter((item) => item.id === params.id)[0],
      initialReduxState: {
        cart: [],
      },
    },
  };
}

/** @component */
const Item = ({ item }) => {
  const cart = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  return (
    <>
      <Head>
        <title>OpenShop - {item.name}</title>
        <meta
          name='description'
          content={item.name + ' - ' + item.description}
        />
      </Head>
      <Heading as='h1' size='2x1' d='none'>
        {item.name}
      </Heading>
      <Flex
        mx='auto'
        width={{ sm: '95%', lg: '80%', xl: '60%' }}
        flexDirection='column'
      >
        <SimpleGrid columns={{ sm: 1, lg: 2 }} spacing='2vw' key={item.name}>
          <Box>
            <Card item={item} controls={false} />
            {cart.filter((c) => c.id === item.id).length ? (
              <Button
                width='100%'
                mt='-150px'
                onClick={() => dispatch(removeFromCart(item))}
              >
                remove from cart
              </Button>
            ) : (
              <Button
                width='100%'
                mt='-150px'
                onClick={() => dispatch(addToCart(item))}
              >
                add to cart
              </Button>
            )}
          </Box>
          <Box my='auto' p='1rem'>
            <Heading>{item.name}</Heading>
            <Text mb='md'>
              <strong>Item ID:</strong> <em>{item.id.split('-')[0]}</em>
            </Text>
            <Text>{item.description}</Text>
            <SimpleGrid columns='2'>
              <Text fontSize='1.7rem' ml='auto' mb='-4px' as={MdInvertColors} />
              <Heading as='span' fontSize='1.5rem'>
                {item.color}
              </Heading>
            </SimpleGrid>
            <SimpleGrid columns='2'>
              <Box ml='auto'>
                <Text fontSize='1.7rem' mb='-4px' as={FaFemale} />
                <Text fontSize='1.7rem' mb='-4px' ml='-13px' as={FaMale} />
              </Box>
              <Heading as='span' fontSize='1.5rem'>
                {item.gender}
              </Heading>
            </SimpleGrid>
          </Box>
        </SimpleGrid>
        <Divider />
      </Flex>
    </>
  );
};

export default Item;
