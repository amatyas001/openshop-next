import { Box, Heading, Input } from '@chakra-ui/core';
import * as COLORS from '@app/config/colors';

/**
 * Wrapper for dynamic input field generation. Renders any properly
 * set HTML input. Confgurable by props.
 *
 * @example
 * ```jsx
 * <Filed type={inputType} label={inputLabelText}>
 * ```
 */
export const Field = ({
  label,
  id,
  type,
  placeholder,
  required,
  autoComplete,
  value,
  onChange,
}) => {
  return (
    <Box as='fieldset' border='0' width='96%' my='10px' ml='-12px'>
      <Heading
        as='label'
        htmlFor={id}
        fontSize='1.5rem'
        color={COLORS.HEADING.dark}
      >
        {label}
      </Heading>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        bg={COLORS.BG.dark}
        color={COLORS.TEXT.dark}
        borderColor={COLORS.SPACER.dark}
        fontWeight='bold'
        fontFamily='Khand'
        fontSize='1.6rem'
      />
    </Box>
  );
};
