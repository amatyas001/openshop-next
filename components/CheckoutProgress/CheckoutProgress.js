import { useSelector } from 'react-redux';
import { Flex, Text } from '@chakra-ui/core';
import { FaLongArrowAltRight } from 'react-icons/fa';

export const CheckoutProgress = () => {
  const [details, setDetails] = React.useState(false);
  const [finished, setFinished] = React.useState(false);
  const checkout = useSelector((state) => state.checkout);

  React.useEffect(() => {
    switch (checkout.status) {
      case 'review':
        setDetails(false);
        setFinished(false);
        break;
      case 'details':
        setDetails(true);
        setFinished(false);
        break;
      case 'finished':
        setDetails(true);
        setFinished(true);
        break;
    }
  }, [checkout]);

  return (
    <Flex
      width={{ sm: '100%', md: '80%', lg: '60%', xl: '50%' }}
      fontSize='1.3rem'
      color='gray.400'
      mx='auto'
      justifyContent='space-around'
      alignItems='center'
      borderBottom='1px'
    >
      <Text style={{ color: '#44337A', fontWeight: 'bold' }}>Review</Text>
      <Text
        style={details ? { color: '#44337A', fontWeight: 'bold' } : null}
        as={FaLongArrowAltRight}
      />
      <Text style={details ? { color: '#44337A', fontWeight: 'bold' } : null}>
        Payment Details
      </Text>
      <Text
        style={finished ? { color: '#44337A', fontWeight: 'bold' } : null}
        as={FaLongArrowAltRight}
      />
      <Text style={finished ? { color: '#44337A', fontWeight: 'bold' } : null}>
        Finished
      </Text>
    </Flex>
  );
};
