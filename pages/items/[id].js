import Head from 'next/head';
import Link from 'next/link';
import { Heading, Flex, Text, Divider, SimpleGrid, Box } from '@chakra-ui/core';
import { Card, Button } from '../../components';
import { MdInvertColors } from 'react-icons/md';
import { FaFemale, FaMale } from 'react-icons/fa';

export async function getStaticPaths() {
  const items = await import('../../public/storedata.json');

  const paths = items.items.map((item) => `/items/${item.id}`);

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const items = await import('../../public/storedata.json');

  return {
    props: {
      item: items.items.filter((item) => item.id === params.id)[0],
    },
  };
}

export default function Item({ item }) {
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
            <Link href={`purchase/${item.id}`}>
              <Button width='100%' mt='-150px'>
                add to cart
              </Button>
            </Link>
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
}
