import {
  Flex,
  SimpleGrid,
  Box,
  Heading,
  Text,
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
              Terms of Service
            </ListItem>
            <ListItem>
              <ListIcon color='gray.500' />
              Privacy Policy
            </ListItem>
            <ListItem>
              <ListIcon color='gray.500' />
              Sitemap
            </ListItem>
            <ListItem>
              <ListIcon color='gray.500' />
              Helpdesk
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
              Facebook
            </ListItem>
            <ListItem>
              <ListIcon color='gray.500' />
              Twitter
            </ListItem>
            <ListItem>
              <ListIcon color='gray.500' />
              Pinterest
            </ListItem>
            <ListItem>
              <ListIcon color='gray.500' />
              Youtube
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
              24/7 Service
            </ListItem>
            <ListItem>
              <ListIcon color='gray.500' />
              About the company
            </ListItem>
            <ListItem>
              <ListIcon color='gray.500' />
              Contact us
            </ListItem>
            <ListItem>
              <ListIcon color='gray.500' />
              Report an issue
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
            <em>React / Next / Node / Git / Netlify </em>
          </strong>
        </Text>
      </Flex>
    </>
  );
};
