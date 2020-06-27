import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { Flex, Box, Text } from '@chakra-ui/core';

/**
 * Displays the actual stage of the payment process.
 *
 * ***State Dependencies***
 * - `payment.status`
 *
 * @example
 * ```jsx
 * <PaymentProgress activeStyle={styleObject} />
 */
export const PaymentProgress = (props) => {
  const { activeStyle } = props;
  const { payment = {} } = useSelector((state) => state);

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
      width={props.width || '100%'}
      fontSize={props.fontSize || '1.3rem'}
      color={props.color || 'gray.600'}
      justifyContent={props.justifyContent || 'space-around'}
      alignItems={props.alignItems || 'center'}
      borderBottom={props.borderBottom || '1px'}
      {...props}
    >
      {/* review */}
      <Text style={activeStyle || { color: '#44337A', fontWeight: 'bold' }}>
        Review
      </Text>

      {/* details */}
      <Box
        style={
          details ? activeStyle || { color: '#44337A', fontWeight: 'bold' } : {}
        }
        as={FaLongArrowAltRight}
      />
      <Text
        style={
          details ? activeStyle || { color: '#44337A', fontWeight: 'bold' } : {}
        }
      >
        Payment Details
      </Text>

      {/* finished */}
      <Box
        style={
          finished
            ? activeStyle || { color: '#44337A', fontWeight: 'bold' }
            : {}
        }
        as={FaLongArrowAltRight}
      />
      <Text
        style={
          finished
            ? activeStyle || { color: '#44337A', fontWeight: 'bold' }
            : {}
        }
      >
        Finished
      </Text>
    </Flex>
  );
};

PaymentProgress.defaultProps = {
  activeStyle: null,
};

PaymentProgress.propTypes = {
  /**
   * [Style Props](https://chakra-ui.com/style-props) for the active stage style
   */
  activeStyle: PropTypes.object,
};
