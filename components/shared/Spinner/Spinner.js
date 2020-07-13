import PropTypes from 'prop-types';
import { Flex, Heading, Spinner as ChakraSpinner } from '@chakra-ui/core';

export const Spinner = (props) => {
  const { text, size } = props;
  return (
    <Flex height='600px' width='100%' flexDirection='column' {...props}>
      <Heading mt='150px' mx='auto'>
        {text}
      </Heading>

      <ChakraSpinner mx='auto' size={size} />
    </Flex>
  );
};

Spinner.defaultProps = {
  text: 'Loading...',
  size: '150px',
};

Spinner.propTypes = {
  /**
   * Display text while spinner is active
   */
  text: PropTypes.string,

  /**
   * Diagonal size of the spinner animation
   */
  size: PropTypes.string,
};
