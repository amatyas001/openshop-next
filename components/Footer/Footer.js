import {
  Flex,
  Box,
  Heading,
  Text,
  Link,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/core';
import { FaHandsHelping, FaAt, FaShoppingBag } from 'react-icons/fa';

export const Footer = () => {
  return (
    <>
      <Flex
        minHeight='200px'
        borderTop='1px'
        borderBottom='1px'
        bordercolor='gray.100'
        color='gray.200'
        bg='black'
        py='2rem'
        px='5rem'
        justifyContent='space-around'
        flexWrap='wrap'
      >
        <Box minWidth='200px'>
          <Heading fontSize='1.5rem'>
            <Text as={FaHandsHelping} mb='-5px' mr='5px' />
            support
          </Heading>
          <List spacing={3}>
            <ListItem>
              <ListIcon color='gray.500' />
              <Link color='purple.200'>Terms of Service</Link>
            </ListItem>
            <ListItem>
              <ListIcon color='gray.500' />
              <Link color='purple.200'>Privacy Policy</Link>
            </ListItem>
            <ListItem>
              <ListIcon color='gray.500' />
              <Link color='purple.200'>Sitemap</Link>
            </ListItem>
            <ListItem>
              <ListIcon color='gray.500' />
              <Link color='purple.200'>Helpdesk</Link>
            </ListItem>
          </List>
        </Box>
        <Box minWidth='200px'>
          <Heading fontSize='1.5rem'>
            <Text as={FaAt} mb='-5px' mr='5px' />
            social
          </Heading>
          <List spacing={3}>
            <ListItem>
              <ListIcon color='gray.500' />
              <Link color='purple.200'>Facebook</Link>
            </ListItem>
            <ListItem>
              <ListIcon color='gray.500' />
              <Link color='purple.200'>Twitter</Link>
            </ListItem>
            <ListItem>
              <ListIcon color='gray.500' />
              <Link color='purple.200'>Pinterest</Link>
            </ListItem>
            <ListItem>
              <ListIcon color='gray.500' />
              <Link color='purple.200'>Youtube</Link>
            </ListItem>
          </List>
        </Box>
        <Box minWidth='200px'>
          <Heading fontSize='1.5rem'>
            <Text as={FaShoppingBag} mb='-5px' mr='5px' />
            openshop
          </Heading>
          <List spacing={3}>
            <ListItem>
              <ListIcon color='gray.500' />
              <Link color='purple.200'>24/7 Service</Link>
            </ListItem>
            <ListItem>
              <ListIcon color='gray.500' />
              <Link color='purple.200'>About the company</Link>
            </ListItem>
            <ListItem>
              <ListIcon color='gray.500' />
              <Link color='purple.200'>Contact us</Link>
            </ListItem>
            <ListItem>
              <ListIcon color='gray.500' />
              <Link color='purple.200'>Report an issue</Link>
            </ListItem>
          </List>
        </Box>
      </Flex>
      <Flex bg='black' height='70px'>
        <Text d='block' m='auto' color='gray.200'>
          This is a sample webiste made by <strong>Mátyás Angyal</strong>
          {' - '}
          <strong>amatyas001@gmail.com</strong>
        </Text>
        <Text m='auto' color='gray.200'>
          <strong>
            <em>React / Redux / Next / Git / Netlify </em>
          </strong>
        </Text>
      </Flex>
    </>
  );
};
