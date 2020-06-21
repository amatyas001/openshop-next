import { useSelector } from 'react-redux';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { Flex, Box, Text } from '@chakra-ui/core';

// Displays the actual state of the payment process
// active state can be customised by the activeStyle prop
export const PaymentProgress = (props) => {
  const [details, setDetails] = React.useState(false);
  const [finished, setFinished] = React.useState(false);
  const { payment = {} } = useSelector((state) => state);

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
      width={props.width || '100%'}
      fontSize={props.fontSize || '1.3rem'}
      color={props.color || 'gray.400'}
      justifyContent={props.justifyContent || 'space-around'}
      alignItems={props.alignItems || 'center'}
      borderBottom={props.borderBottom || '1px'}
      {...props}
    >
      {/* review */}
      <Text
        style={props.activeStyle || { color: '#44337A', fontWeight: 'bold' }}
      >
        Review
      </Text>

      {/* details */}
      <Box
        style={
          details
            ? props.activeStyle || { color: '#44337A', fontWeight: 'bold' }
            : {}
        }
        as={FaLongArrowAltRight}
      />
      <Text
        style={
          details
            ? props.activeStyle || { color: '#44337A', fontWeight: 'bold' }
            : {}
        }
      >
        Payment Details
      </Text>

      {/* finished */}
      <Box
        style={
          finished
            ? props.activeStyle || { color: '#44337A', fontWeight: 'bold' }
            : {}
        }
        as={FaLongArrowAltRight}
      />
      <Text
        style={
          finished
            ? props.activeStyle || { color: '#44337A', fontWeight: 'bold' }
            : {}
        }
      >
        Finished
      </Text>
    </Flex>
  );
};
