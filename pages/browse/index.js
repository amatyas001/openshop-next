import Head from 'next/head';
import { Heading, Flex, Divider, Box } from '@chakra-ui/core';
import { Card } from '../../components';
import useRequest from '../../libs/useRequest';

export async function getStaticProps() {
  const items = await import('../../public/storedata.json');

  return {
    props: {
      items: items.items,
    },
  };
}

export default function Items({ items }) {
  return (
    <>
      <Head>
        <title>OpenShop - Browse</title>
        <meta name='description' content='OpenShop public items' />
      </Head>
      <Heading as='h1' size='2x1' d='none'>
        Browse
      </Heading>
      <Flex
        width='100%'
        flexWrap='wrap'
        alignItems='center'
        justifyContent='space-around'
      >
        {items.map((item) => (
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
