import { Heading, Flex, Text } from '@chakra-ui/core';

export const PaymentCancelled = ({ intent }) => {
  return (
    <Flex alignItems='center' flexDirection='column' width='100%'>
      <Heading>Payment Cancelled</Heading>
      <Text fontSize='1.5rem'>
        Successfuly cancelled intent:{' '}
        <Text as='span' fontWeight='bold' color='purple.800'>
          {intent.id}
        </Text>
      </Text>
    </Flex>
  );
};
