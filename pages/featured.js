import Head from 'next/head';
import { Heading } from '@chakra-ui/core';

export default function Blog() {
  return (
    <>
      <Head>
        <title>OpenShop - Blog</title>
        <meta name='description' content='OpenShop blog' />
      </Head>
      <Heading as='h1' size='2x1'>
        Blog
      </Heading>
    </>
  );
}
