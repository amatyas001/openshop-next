import { Heading, Box, Text } from '@chakra-ui/core';
import { IoIosArrowDropup } from 'react-icons/io';

export const ScrollTop = () => {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const toggle = () => {
      window.pageYOffset > 300 ? setShow(true) : setShow(false);
    };
    document.addEventListener('scroll', toggle);
    return () => {
      document.removeEventListener('scroll', toggle);
    };
  }, []);

  return (
    <Box
      position='fixed'
      d='block'
      right='15px'
      bottom='10px'
      zIndex='9999'
      opacity={show ? '100' : '0'}
      cursor='pointer'
      color='gray.600'
      textAlign='center'
    >
      <Text
        as={IoIosArrowDropup}
        fontSize='3.5rem'
        mb='-35px'
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }}
      />
      <Heading>top</Heading>
    </Box>
  );
};
