import Link from 'next/link';
import { Box, Flex, Image, Text, Spinner } from '@chakra-ui/core';
import { Button, Rating } from '../../components';
import { FaStar } from 'react-icons/fa';

export const Card = ({ item }) => {
  const [loading, setLoading] = React.useState(true);
  return (
    <Box
      height='400px'
      width='250px'
      p='15px'
      m={{ sm: 'auto', xl: '20px' }}
      bg='white'
    >
      {loading && <Spinner size='200px' m='auto' label='Loading content' />}
      <Image
        d={loading ? `none` : 'block'}
        width='100%'
        height='200px'
        objectFit='contain'
        rounded='md'
        onLoad={() => setLoading(false)}
        src={`images/products/${item.img}`}
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
      <Flex mt='auto' alignItems='baseline'>
        <Text fontSize='1.5rem'>{item.price} $</Text>
        <Box ml='auto' mr='-1.7rem'>
          <Rating fontSize='1.4rem' ratings={item.starrating} />
        </Box>
      </Flex>
      <Link href={`browse/${item.id}`}>
        <Button width='100%'>view</Button>
      </Link>
    </Box>
  );
};
