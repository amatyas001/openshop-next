import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { Box, Flex, Image, Text, Spinner, SimpleGrid } from '@chakra-ui/core';
import { addToCart } from '@app/redux/actions';
import { Button, Rating } from '@app/components';

export const Card = ({ item, controls = true }) => {
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();
  return (
    <Box height='400px' width='300px' p='15px' m='auto' bg='white'>
      {loading && <Spinner size='200px' m='auto' label='Loading content' />}
      <Image
        d={loading ? `none` : 'block'}
        width='100%'
        height='200px'
        objectFit='contain'
        rounded='md'
        onLoad={() => setLoading(false)}
        src={`/images/products/${item.img}`}
      />
      <Text
        textAlign='center'
        textTransform='uppercase'
        fontSize='md'
        fontWeight='bold'
        color='gray.800'
      >
        {item.name}
      </Text>
      <Flex mt='auto' alignItems='baseline' justifyContent='space-between'>
        <Text fontSize='1.5rem'>{item.price} $</Text>
        <Box>
          <Rating fontSize='1.4rem' ratings={item.starrating} />
        </Box>
      </Flex>
      {controls && (
        <SimpleGrid columns='2' spacing='5px' width='100%'>
          <Link href={`/items/[id]`} as={`/items/${item.id}`}>
            <Button bg='transparent' color='gray.800' border='0' width='100%'>
              view
            </Button>
          </Link>
          <Button
            width='100%'
            bg='purple.800'
            border='1px'
            borderColor='purple.200'
            color='gray.100'
            onClick={() => dispatch(addToCart(item))}
          >
            buy
          </Button>
        </SimpleGrid>
      )}
    </Box>
  );
};
