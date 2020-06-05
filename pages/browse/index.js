import Head from 'next/head';
import { Heading, Flex, Divider, Skeleton } from '@chakra-ui/core';
import { Card } from '../../components';
import useRequest from '../../libs/useRequest';

export default function Items() {
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
        {data ? (
          data.map((item) => (
            <>
              <Divider orientation='vertical' />
              <Card item={item} />
              <Divider orientation='vertical' />
            </>
          ))
        ) : (
          <Skeleton colorStart='black' colorEnd='white' height='20px' />
        )}
      </Flex>
    </>
  );
}
