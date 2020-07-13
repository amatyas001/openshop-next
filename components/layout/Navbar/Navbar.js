import Link from 'next/link';
import { Flex, Heading } from '@chakra-ui/core';
import { Button, CartPanel } from '@app/components';
import { NAVBAR_LINKS } from '@app/config';
import * as COLORS from '@app/config/colors';

/**
 * Renders a fixed top navigation containing configured list of items.
 *
 * @see https://amatyas001.github.io/openshop-next/#section-configuration
 */
export const Navbar = (props) => {
  return (
    <Flex
      as='header'
      data-cy='nav-container'
      position='fixed'
      top='0'
      right='0'
      left='0'
      py='5px'
      px='10px'
      bg='white'
      boxShadow='2px 5px 7px black'
      transition='all 400ms'
      zIndex='10'
      {...props}
    >
      <Link href='/' passHref>
        <Heading
          as='a'
          d={{ sm: 'none', md: 'inline-block' }}
          pl='15px'
          m='0'
          lineHeight='50px'
          color={COLORS.HEADING.light}
          textDecoration='none'
          data-testid='navbar-brand'
        >
          openshop
        </Heading>
      </Link>
      <Flex
        as='nav'
        id='header-nav'
        aria-label='Main'
        mr={{ sm: 'auto', md: '0' }}
        ml={{ sm: '15px', md: 'auto' }}
        data-cy='nav-navbar'
      >
        <ul style={{ margin: 0, padding: 0 }}>
          {NAVBAR_LINKS.map((link) => {
            return (
              <li
                key={link.text}
                style={{
                  listStyleType: 'none',
                  display: 'inline-block',
                }}
                data-cy='nav-item'
              >
                <Link href={link.link} passHref>
                  <Button width={{ sm: 'auto', md: '100px' }} variant='transparent'>
                    {link.text}
                  </Button>
                </Link>
              </li>
            );
          })}
        </ul>
      </Flex>
      <CartPanel />
    </Flex>
  );
};
