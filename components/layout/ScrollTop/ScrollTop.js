import { IoIosArrowDropup } from 'react-icons/io';
import { PseudoBox } from '@chakra-ui/core';
import * as COLORS from '@app/config/colors';

/**
 * @see https://amatyas001.github.io/openshop-next/#section-configuration
 * @ignore
 */
export const ScrollTop = (props) => {
  const [scroll, setScroll] = React.useState(false);

  /* istanbul ignore next */
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
    return /* istanbul ignore next */ () => {
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
      right={{ sm: '1.5%', lg: '3%' }}
      bottom={{ sm: '1.5%', lg: '60px' }}
      zIndex='9999'
      opacity={/* istanbul ignore next */ scroll ? '100' : '0'}
      cursor='pointer'
      textAlign='center'
      transition='all 300ms'
      borderRadius='50%'
      color={{ sm: COLORS.BUTTON.primary.text, lg: COLORS.BUTTON.primary.base }}
      bg={{ sm: COLORS.BUTTON.primary.base, lg: 'transparent' }}
      p={{ sm: '10px', lg: 0 }}
      {...props}
    />
  );
};
