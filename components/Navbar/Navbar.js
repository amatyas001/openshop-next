import styles from './Navbar.module.css';
import Link from 'next/link';
import { Link as ChakraLink, Button, Flex } from '@chakra-ui/core';

export const Navbar = ({ links }) => {
  return (
    <Flex as='ul' p='0' m='0' data-cy='navbar' width='100%' flexWrap='nowrap'>
      {links.map((link) => {
        return (
          <li key={link.text} className={styles.navitem} data-cy='navitem'>
            <Link href={link.path}>
              <Button
                as={ChakraLink}
                height='50px'
                width={`${40 / links.length}vw`}
                lineHeight='2.5'
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
                {link.text}
              </Button>
            </Link>
          </li>
        );
      })}
    </Flex>
  );
};
