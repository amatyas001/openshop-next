import PropTypes from 'prop-types';
import { Collapse } from '@chakra-ui/core';
import * as COLORS from '@app/config/colors';

/**
 * Wrapper for collapsable content. Color style variant can be applied.
 *
 * @example
 * ```jsx
 * <Panel toggle={toggleBool} children={panelContent}>
 * ```
 */
export const Panel = (props) => {
  const { variant, toggle, children } = props;
  return (
    <Collapse
      isOpen={toggle}
      bg={COLORS.PANEL[variant].base}
      border='1px'
      borderColor={COLORS.PANEL[variant].border}
      borderTop='0px'
      p='3%'
      maxHeight='80vh'
      {...props}
    >
      {children}
    </Collapse>
  );
};

Panel.defaultProps = {
  variant: 'primary',
};

Panel.propTypes = {
  /**
   * Panel style variant. See [Configuration](https://amatyas001.github.io/openshop-next/#configuration)
   */
  variant: PropTypes.string,

  /**
   * Boolean value for toggle panel visibility
   */
  toggle: PropTypes.bool.isRequired,

  /**
   * Panel content
   */
  children: PropTypes.oneOfType([PropTypes.any]).isRequired,
};
