import { Box, Heading, Input } from '@chakra-ui/core';

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
      <Heading as='label' htmlFor={id} fontSize='1.5rem'>
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
      />
    </Box>
  );
};
