import Head from 'next/head';
import { Heading } from '@chakra-ui/core';

export default function Home() {
  return (
    <>
      <Head>
        <title>OpenShop</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Heading as='h1' size='2x1' data-cy='heading'>
        Home
      </Heading>
    </>
  );
}
