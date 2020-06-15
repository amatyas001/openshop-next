import { useScroll } from '../index';
import { PseudoBox } from '@chakra-ui/core';
import { IoIosArrowDropup } from 'react-icons/io';

export const ScrollTop = () => {
  const show = useScroll();

  return (
    <PseudoBox
      as={IoIosArrowDropup}
      fontSize='3rem'
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }}
      position='fixed'
      d='block'
      right='3%'
      bottom='60px'
      zIndex='9999'
      opacity={show ? '100' : '0'}
      cursor='pointer'
      color='gray.600'
      textAlign='center'
      transition='all 300ms'
      _hover={{
        color: 'purple.400',
      }}
    />
  );
};
