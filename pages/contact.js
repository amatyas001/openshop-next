import Head from 'next/head';
import { Heading } from '@chakra-ui/core';

export default function Contact() {
  return (
    <>
      <Head>
        <title>OpenShop - Contact</title>
        <meta name='description' content='OpenShop contact' />
      </Head>
      <Heading as='h1' size='2x1'>
        Contact
      </Heading>
    </>
  );
}
