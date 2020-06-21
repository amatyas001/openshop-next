import { IoIosArrowDropup } from 'react-icons/io';
import { PseudoBox } from '@chakra-ui/core';

export const ScrollTop = () => {
  const [scroll, setScroll] = React.useState(false);

  React.useEffect(() => {
    let tick;

    const handler = () => {
      if (!tick) {
        setScroll(window.pageYOffset > 300);
        tick = true;
        setTimeout(() => {
          tick = false;
        }, 200);
      }
    };

    window.addEventListener('scroll', handler, { passive: true });
    return () => {
      window.removeEventListener('scroll', handler);
    };
  }, []);

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
      opacity={scroll ? '100' : '0'}
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
