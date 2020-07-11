import PropTypes from 'prop-types';
import { PseudoBox } from '@chakra-ui/core';
import * as COLORS from '@app/config/colors';

/**
 * Basic button element with [predefined style variants](#section-configuration)
 * and ARIA-compatible accessibility features. See [PseudoBox](https://chakra-ui/pseudobox)
 * for available styling.
 *
 * @example
 * ```jsx
 * <Button variant={predefinedStyle} />
 * ```
 */
export const Button = React.forwardRef((props, ref) => {
  const { variant } = props;

  return (
    <PseudoBox
      as='button'
      type='button'
      ref={ref}
      href='#void'
      height='50px'
      width='100%'
      px='5px'
      fontSize='1.5rem'
      fontWeight='semibold'
      fontFamily='Khand, sans-serif'
      lineHeight='50px'
      textAlign='center'
      textDecoration='none'
      bg={COLORS.BUTTON[variant].base}
      color={COLORS.BUTTON[variant].text}
      border='0px'
      borderColor={COLORS.BUTTON[variant].border}
      cursor='pointer'
      onKeyDown={
        /* istanbul ignore next */ (e) =>
          e.key === ' ' || e.key === 'Enter' || e.key === 'Spacebar'
            ? props.onClick
            : null
      }
      transition='all 300ms cubic-bezier(.08,.52,.52,1)'
      tabIndex='0'
      {...props}
      _focus={{ ...COLORS.BUTTON[variant].focus, ...props._focus }}
      _selected={{ ...COLORS.BUTTON[variant].selected, ...props._selected }}
      _hover={{ ...COLORS.BUTTON[variant].hover, ...props._hover }}
      _active={{ ...COLORS.BUTTON[variant].active, ...props._active }}
      _disabled={{
        bg: 'gray.100',
        color: 'gray.400',
        cursor: 'not-allowed',
        textDecoration: 'none',
        ...props._disabled,
      }}
    >
      {props.children}
    </PseudoBox>
  );
});

Button.defaultProps = {
  onClick: null,
  variant: 'primary',
};

Button.propTypes = {
  /**
   * Handler function
   */
  onClick: PropTypes.func,

  /**
   * Color variant
   */
  variant: PropTypes.string,
};
