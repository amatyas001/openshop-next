/* eslint react/prop-types: "off" */
import PropTypes from 'prop-types';
import { Button } from '@app/components';
import * as COLORS from '@app/config/colors';

const ButtonIconFWR = (props, ref) => {
  const { handler, icon, variant } = props;

  return (
    <Button
      ref={ref}
      onClick={handler}
      bg='transparent'
      color={COLORS.BUTTON[variant].focus.bg}
      _hover={{
        bg: 'transparent',
        color: COLORS.BUTTON[variant].dark,
        outline: 0,
      }}
      _focus={{
        bg: 'transparent',
        color: COLORS.BUTTON[variant].dark,
        outline: 0,
      }}
      _selected={{
        bg: 'transparent',
        color: COLORS.BUTTON[variant].dark,
        outline: 0,
      }}
      _active={{
        bg: 'transparent',
        color: COLORS.BUTTON[variant].dark,
        outline: 0,
      }}
      {...props}
    >
      {React.createElement(icon)}
    </Button>
  );
};

/**
 * Wrapper for rendering imported icon as a [Button](#button) component.
 *
 * @visibleName Button Icon
 * @example
 * ```jsx
 * import { Icon } from './path/to/icon'
 * <ButtonIcon handler={clickHandler} icon={Icon} />
 * ```
 */
export const ButtonIcon = React.forwardRef(ButtonIconFWR);

ButtonIcon.defaultProps = {
  variant: 'primary',
};

ButtonIcon.propTypes = {
  /**
   * Handler function for `click` event
   */
  handler: PropTypes.func.isRequired,

  /**
   * Icon to display as clickable button
   */
  icon: PropTypes.func.isRequired,

  /**
   * Button style variant. See [Button](#button)
   */
  variant: PropTypes.string,
};
