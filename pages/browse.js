import Head from 'next/head';
import { Heading } from '@chakra-ui/core';

export default function Items() {
  return (
    <>
      <Head>
        <title>OpenShop - Browse</title>
        <meta name='description' content='OpenShop public items' />
      </Head>
      <Heading as='h1' size='2x1'>
        Browse
      </Heading>
    </>
  );
}
