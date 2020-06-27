import PropTypes from 'prop-types';
import { FaInfo } from 'react-icons/fa';
import { Box } from '@chakra-ui/core';
import { Button } from '@app/components';

/**
 * Renders an info icon as custum [Button](#button) with a click-handler attached.
 *
 * @example
 * ```jsx
 * <ButtonInfo handler={clickHandler} />
 * ```
 */
export const ButtonInfo = (props) => {
  const { handler } = props;
  return (
    <Button
      as={Box}
      role='button'
      aria-label='Info'
      color='blue.600'
      backgroundColor='transparent'
      border='0'
      onClick={handler}
      _hover={{ color: 'blue.400' }}
      {...props}
    >
      <FaInfo />
    </Button>
  );
};

ButtonInfo.propTypes = {
  /**
   * Handler function for `click` event
   */
  handler: PropTypes.func.isRequired,
};
