import Link from 'next/link';
import { Flex, Heading } from '@chakra-ui/core';
import { Button, CartPanel } from '../../components';

export const Navbar = ({ links }) => {
  return (
    <Flex
      as={'header'}
      data-cy='nav-container'
      position='fixed'
      top='0'
      right='0'
      left='0'
      zIndex='2'
      py='5px'
      px='10px'
      bg='white'
      boxShadow='2px 2px 7px black'
      transition='all 400ms'
    >
      <Heading
        d={{ sm: 'none', md: 'inline-block' }}
        pl='15px'
        m='0'
        lineHeight='50px'
        data-cy='nav-brand-text'
      >
        openshop
      </Heading>
      <Flex
        as={'nav'}
        id='header-nav'
        aria-label='Main'
        mr={{ sm: 'auto', md: '0' }}
        ml={{ sm: '15px', md: 'auto' }}
        data-cy='nav-navbar'
      >
        <ul style={{ margin: 0, padding: 0 }}>
          {links &&
            links.map((link) => {
              return (
                <li
                  key={link.text}
                  style={{
                    listStyleType: 'none',
                    display: 'inline-block',
                  }}
                  data-cy='nav-item'
                >
                  <Link href={link.path} passHref>
                    <Button
                      width={{ sm: 'auto', md: '100px' }}
                      backgroundColor='transparent'
                      color='gray.800'
                      border='0'
                      _hover={{
                        bg: '',
                        color: 'purple.400',
                      }}
                    >
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
