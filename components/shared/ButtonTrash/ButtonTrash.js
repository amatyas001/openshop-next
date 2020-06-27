import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/core';
import { FaTrashAlt } from 'react-icons/fa';
import { Button } from '@app/components';

/**
 * Renders a trash icon as custum [Button](#button) with a click-handler attached.
 *
 * @example
 * ```jsx
 * <ButtonTrash handler={clickHandler} />
 * ```
 */
export const ButtonTrash = (props) => {
  const { handler } = props;
  return (
    <Button
      as={Box}
      role='button'
      aria-label='Delete'
      color='red.600'
      backgroundColor='transparent'
      border='0'
      onClick={handler}
      _hover={{ color: 'red.400' }}
      {...props}
    >
      <FaTrashAlt />
    </Button>
  );
};

ButtonTrash.propTypes = {
  /**
   * Handler function for `click` event
   */
  handler: PropTypes.func.isRequired,
};
