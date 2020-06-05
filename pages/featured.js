import Head from 'next/head';
import { Heading, Flex, Text, Divider, SimpleGrid, Box } from '@chakra-ui/core';
import { Card } from '../components';
import { MdInvertColors } from 'react-icons/md';
import { FaFemale, FaMale } from 'react-icons/fa';

export async function getStaticProps() {
  const items = await import('../public/storedata.json');

  return {
    props: {
      items: items.items.filter((item) => item.starrating > 4),
    },
  };
}

export default function Items({ items }) {
  return (
    <>
      <Head>
        <title>OpenShop - Featured</title>
        <meta name='description' content='OpenShop - Featured items' />
      </Head>
      <Heading as='h1' size='2x1' d='none'>
        Featured
      </Heading>
      <Flex
        mx='auto'
        width={{ sm: '95%', lg: '80%', xl: '60%' }}
        flexDirection='column'
      >
        {items.map((item) => (
          <SimpleGrid columns={{ sm: 1, lg: 2 }} spacing='2vw' key={item.name}>
            <Card item={item} />
            <Box my='auto'>
              <Heading>{item.name}</Heading>
              <Text mb='md'>
                <strong>Item ID:</strong> <em>{item.id.split('-')[0]}</em>
              </Text>
              <Text>{item.description}</Text>
              <SimpleGrid columns='2'>
                <Text
                  fontSize='1.7rem'
                  ml='auto'
                  mb='-4px'
                  as={MdInvertColors}
                />
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
            <Divider />
          </SimpleGrid>
        ))}
      </Flex>
    </>
  );
}
