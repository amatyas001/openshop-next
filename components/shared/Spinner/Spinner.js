import { Flex, Heading, Spinner as ChakraSpinner } from '@chakra-ui/core';

export const Spinner = (props) => {
  return (
    <Flex
      h={props.h || '600px'}
      w={props.w || '100%'}
      flexDirection={props.flexDirection || 'column'}
      {...props}
    >
      {props.text && (
        <Heading mt='150px' mx='auto'>
          {props.text}
        </Heading>
      )}
      <ChakraSpinner mx='auto' size={props.size || '150px'} />
    </Flex>
  );
};
