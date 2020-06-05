import Head from 'next/head';
import { Heading, SimpleGrid, Image, Text, Flex } from '@chakra-ui/core';
import {
  FaParachuteBox,
  FaHeartbeat,
  FaUserShield,
  FaHandHoldingUsd,
  FaShoppingCart,
  FaSmileBeam,
} from 'react-icons/fa';

export default function Home() {
  return (
    <>
      <Head>
        <title>OpenShop</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Heading as='h1' size='2x1' data-cy='heading' d='none'>
        Home
      </Heading>
      <Heading as='h2' fontSize='5vw' mx='auto'>
        WE ARE OPENSHOP
      </Heading>
      <Flex
        width='100%'
        height='15vh'
        alignItems='center'
        justifyContent='space-around'
        fontSize='10vw'
      >
        <Text as={FaShoppingCart}></Text>
        &nbsp;
        <Heading fontSize='10vw'>+</Heading>
        &nbsp;
        <Text as={FaHeartbeat} color='red.400'></Text>
        &nbsp;
        <Heading fontSize='10vw'>=</Heading>
        &nbsp;
        <Text as={FaSmileBeam}></Text>
      </Flex>
      <Heading as='h2' fontSize='5vw' mx='auto'>
        ONLINE SHOPPING MADE WITH LOVE
      </Heading>
      <SimpleGrid columns='3' spacing='2vw' width='80vw' mx='auto'>
        <Flex
          alignItems='center'
          flexDirection='column'
          width='20vw'
          py='15px'
          px='25px'
        >
          <Text as={FaHandHoldingUsd} fontSize='7vw'></Text>
          <Text fontSize='2vh' textAlign='center'>
            Satisfaction
            <br />
            <strong>30 DAYS ONLINE RETURNS</strong>
          </Text>
        </Flex>
        <Flex
          alignItems='center'
          flexDirection='column'
          width='20vw'
          py='15px'
          px='25px'
        >
          <Text as={FaUserShield} fontSize='7vw'></Text>
          <Text fontSize='2vh' textAlign='center'>
            Online Safety
            <br />
            <strong>A-CLASS PAYMENT SECURITY</strong>
          </Text>
        </Flex>
        <Flex
          alignItems='center'
          flexDirection='column'
          width='20vw'
          py='15px'
          px='25px'
        >
          <Text as={FaParachuteBox} fontSize='7vw'></Text>
          <Text fontSize='2vh' textAlign='center'>
            Lightning Fast
            <br />
            <strong>DELIVERY IN 3 WORKDAYS</strong>
          </Text>
        </Flex>
      </SimpleGrid>
    </>
  );
}
