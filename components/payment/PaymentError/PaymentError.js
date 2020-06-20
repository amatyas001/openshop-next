import { useDispatch } from 'react-redux';
import { Flex, Text } from '@chakra-ui/core';
import { paymentReset } from '@app/redux/actions';
import { Button } from '@app/components';

export const PaymentError = ({ error = {} }) => {
  const dispatch = useDispatch();

  return (
    <Flex flexDirection='column' alignItems='center' width='100%'>
      <Text
        py='15px'
        px='20px'
        my='50px'
        fontSize='1.3rem'
        bg='red.400'
        color='gray.100'
        borderRadius='5px'
        d='block'
        width='100%'
      >
        <strong>Error:</strong>
        <br />
        <em>{error.message}</em>
      </Text>
      <Button
        data-testid='error-button-retry'
        width='100%'
        onClick={() => dispatch(paymentReset())}
      >
        retry
      </Button>
    </Flex>
  );
};
