import {
  Flex,
  Box,
  Heading,
  Text,
  Link,
  List,
  ListItem,
  ListIcon,
  SimpleGrid,
} from '@chakra-ui/core';
import { FaHandsHelping, FaAt, FaShoppingBag } from 'react-icons/fa';

export const Footer = (props) => {
  return (
    <>
      <SimpleGrid
        minHeight='200px'
        borderBottom='1px'
        bordercolor='gray.100'
        color='gray.200'
        bg='purple.800'
        py='2rem'
        px={{ sm: '2%' }}
        columns='3'
        {...props}
      >
        <Flex mx='auto' flexDirection='column'>
          <Heading fontSize='1.5rem'>
            <Box as={FaHandsHelping} mb='-5px' mr='5px' />
            support
          </Heading>
          <List spacing={3}>
            <ListItem>
              <Link color='purple.200'>Terms of Service</Link>
            </ListItem>
            <ListItem>
              <Link color='purple.200'>Privacy Policy</Link>
            </ListItem>
            <ListItem>
              <Link color='purple.200'>Sitemap</Link>
            </ListItem>
            <ListItem>
              <Link color='purple.200'>Helpdesk</Link>
            </ListItem>
          </List>
        </Flex>
        <Flex mx='auto' flexDirection='column'>
          <Heading fontSize='1.5rem'>
            <Box as={FaAt} mb='-2px' mr='5px' />
            social
          </Heading>
          <List spacing={3} textAlign='left'>
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
        </Flex>
        <Flex mx='auto' flexDirection='column'>
          <Heading fontSize='1.5rem'>
            <Box as={FaShoppingBag} mb='-5px' mr='5px' />
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
        </Flex>
      </SimpleGrid>
      <Flex bg='purple.900' height='70px' flexWrap='wrap'>
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
