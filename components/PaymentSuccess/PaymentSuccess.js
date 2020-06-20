import { Heading, Text, Flex } from '@chakra-ui/core';

export const PaymentSuccess = ({ intent = {} }) => {
  return (
    <Flex flexDirection='column' width='100%' alignItems='center'>
      <Heading>Payment Successful</Heading>
      <Text fontSize='1.5rem'>
        Received intent number:{' '}
        <Text as='span' fontWeight='bold' color='purple.800'>
          {intent.id}
        </Text>
      </Text>
      <Text>
        This was a sample transaction to demonstrate the payment flow. Thank
        you!
      </Text>
    </Flex>
  );
};
