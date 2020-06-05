import { Link, Button as ChakraButton } from '@chakra-ui/core';

export const Button = React.forwardRef((props, ref) => {
  return (
    <ChakraButton
      ref={ref}
      {...props}
      as={Link}
      height='50px'
      lineHeight='2.5'
      borderColor='pink.400'
      borderTop='1px'
      borderBottom='1px'
      transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
      px='15px'
      rounded='2px'
      fontSize='1.1rem'
      fontWeight='semibold'
      bg='none'
      color='gray.800'
      _hover={{ bg: 'gray.800', color: 'gray.100' }}
      _active={{
        bg: 'gray.600',
        color: 'gray.100',
        transform: 'scale(0.98)',
      }}
      data-cy='navlink'
    >
      {props.children}
    </ChakraButton>
  );
});
