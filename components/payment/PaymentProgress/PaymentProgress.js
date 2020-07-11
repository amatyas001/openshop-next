import { useSelector } from 'react-redux';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { Flex, Box, Text } from '@chakra-ui/core';

/**
 * @see https://amatyas001.github.io/openshop-next/#section-payment-process
 * @ignore
 */
export const PaymentProgress = (props) => {
  const { payment } = useSelector((state) => state);
  const [details, setDetails] = React.useState(false);
  const [finished, setFinished] = React.useState(false);

  React.useEffect(() => {
    switch (payment.status) {
      case 'review':
        setDetails(false);
        setFinished(false);
        break;
      case 'form':
      case 'confirm':
        setDetails(true);
        setFinished(false);
        break;
      case 'success':
      case 'cancelled':
      case 'error':
        setDetails(true);
        setFinished(true);
        break;
    }
  }, [payment]);

  return (
    <Flex
      width='100%'
      fontSize='1.3rem'
      color='gray.600'
      justifyContent='space-around'
      alignItems='center'
      borderBottom='1px'
      {...props}
    >
      {/* review */}
      <Text style={{ color: '#44337A', fontWeight: 'bold' }}>Review</Text>

      {/* details */}
      <Box
        style={details ? { color: '#44337A', fontWeight: 'bold' } : {}}
        as={FaLongArrowAltRight}
      />
      <Text style={details ? { color: '#44337A', fontWeight: 'bold' } : {}}>
        Payment Details
      </Text>

      {/* finished */}
      <Box
        style={finished ? { color: '#44337A', fontWeight: 'bold' } : {}}
        as={FaLongArrowAltRight}
      />
      <Text style={finished ? { color: '#44337A', fontWeight: 'bold' } : {}}>
        Finished
      </Text>
    </Flex>
  );
};
