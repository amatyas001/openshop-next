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
  const { variant } = props;
  return (
    <Collapse
      isOpen={props.toggle}
      bg={COLORS.PANEL[variant].base}
      border='1px'
      borderColor={COLORS.PANEL[variant].border}
      borderTop='0px'
      p='3%'
      maxHeight='80vh'
      {...props}
    >
      {props.children}
    </Collapse>
  );
};

Panel.defaultProps = {
  variant: 'primary',
};
