import Head from 'next/head';
import { Heading, Flex, Divider, Skeleton } from '@chakra-ui/core';
import { Card } from '../../components';
import useRequest from '../../libs/useRequest';

export async function getStaticProps() {
  const res = await fetch(
    'https://openshop.netlify.app/.netlify/functions/storedata'
  );
  const items = await res.json();

  return {
    props: {
      items,
    },
  };
}

export default function Items({ items }) {
  const { data } = useRequest({
    url: '/api/storedata',
  });

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
          <>
            <Divider orientation='vertical' />
            <Card item={item} />
            <Divider orientation='vertical' />
          </>
        ))}
      </Flex>
    </>
  );
}
