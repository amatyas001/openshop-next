import Link from 'next/link';
import { Button } from '../../components';
import { Flex } from '@chakra-ui/core';

export const Navbar = ({ links }) => {
  return (
    <Flex
      as='ul'
      p='0'
      mx='auto'
      data-cy='navbar'
      width='100'
      flexWrap='nowrap'
    >
      {links.map((link) => {
        return (
          <li
            key={link.text}
            style={{ listStyleType: 'none' }}
            data-cy='navitem'
          >
            <Link href={link.path}>
              <Button width={`${45 / links.length}vw`}>{link.text}</Button>
            </Link>
          </li>
        );
      })}
    </Flex>
  );
};
