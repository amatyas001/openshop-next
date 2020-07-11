import { Heading, Flex, Text } from '@chakra-ui/core';

/**
 * Display information message on `/checkout` page, when payment
 * process has not been started yet.
 *
 * @visibleName Payment Unauthourized
 * @example
 * ```jsx
 * <PaymentUnauthorized />
 * ```
 */
export const PaymentUnauthorized = (props) => {
  return (
    <Flex flexDirection='column' alignItems='center' {...props}>
      <Heading>You are not authorized to view this page!</Heading>
      <Text>Please start the payment process from your cart!</Text>
    </Flex>
  );
};
