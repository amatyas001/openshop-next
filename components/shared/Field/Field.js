import PropTypes from 'prop-types';
import { Box, Heading, Input } from '@chakra-ui/core';
import * as COLORS from '@app/config/colors';

/**
 * Wrapper for dynamic input field generation. Renders any properly
 * set HTML input. Confgurable by props.
 *
 * @example
 * ```jsx
 * <Field type={inputType} label={inputLabelText}>
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

Field.defaultProps = {
  placeholder: '',
  required: false,
  autoComplete: false,
  value: null,
  onChange: () => null,
};

Field.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'email', 'password', 'tel']).isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  autoComplete: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.func,
  ]),
  onChange: PropTypes.func,
};
