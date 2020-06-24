import { PseudoBox } from '@chakra-ui/core';

export const Button = React.forwardRef((props, ref) => {
  return (
    <PseudoBox
      as={props.as || 'button'}
      ref={ref}
      href={props.href || '#void'}
      height={props.height || '50px'}
      px={props.px || '15px'}
      fontSize={props.fotSize || '1.5rem'}
      fontWeight={props.fontWeight || 'semibold'}
      fontFamily={props.fontFamily || 'Khand, sans-serif'}
      lineHeight={props.lineHeight || '50px'}
      textAlign={props.textAlign || 'center'}
      textDecoration={props.textDecoration || 'none'}
      backgroundColor={props.backgroundColor || 'purple.800'}
      color={props.color || 'gray.100'}
      border={props.border || '1px'}
      borderColor={props.borderColor || 'purple.400'}
      cursor={props.cursor || 'pointer'}
      onClick={props.onClick || null}
      onKeyDown={(e) =>
        e.key === ' ' || e.key === 'Enter' || e.key === 'Spacebar'
          ? props.onClick || null
          : null
      }
      _focus={
        props._focus || {
          outline: 0,
          color: 'purple.600',
        }
      }
      _selected={
        props._selected || {
          outline: 0,
          color: 'purple.600',
        }
      }
      _hover={
        props._hover || {
          bg: 'purple.400',
          color: 'gray.100',
          borderColor: 'purple.800',
          border: '1px',
          textDecoration: 'underline',
        }
      }
      _active={
        props._active || {
          bg: 'gray.600',
          color: 'gray.100',
          transform: 'scale(0.98)',
        }
      }
      _disabled={
        props._disabled || {
          bg: 'gray.400',
          color: 'gray.900',
          cursor: 'not-allowed',
          textDecoration: 'none',
        }
      }
      transition={props.transition || 'all 300ms cubic-bezier(.08,.52,.52,1)'}
      tabIndex={props.tabIndex || 0}
      data-cy='button'
      {...props}
    >
      {props.children}
    </PseudoBox>
  );
});
