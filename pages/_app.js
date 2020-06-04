import '../styles/global.css';
import customTheme from '../styles/theme';
import { ThemeProvider, Flex, Image, Text, SimpleGrid } from '@chakra-ui/core';
import { Navbar } from '../components';

export default function MyApp({ Component, pageProps }) {
  const navigation = [
    {
      text: 'home',
      path: '/',
    },
    {
      text: 'blog',
      path: '/blog',
    },
    {
      text: 'browse',
      path: '/browse',
    },
    {
      text: 'contact',
      path: '/contact',
    },
    {
      text: 'support',
      path: '/support',
    },
  ];
  return (
    <ThemeProvider theme={customTheme}>
      <Flex align='center' alignItems='start' flexDirection='column' mx='15%'>
        <Image
          width='100%'
          height='370px'
          objectFit='cover'
          src='images/main_header.jpg'
          alt='Shop front door with "open" sign by Mike Petrucci from Unsplah.com'
        />
        <SimpleGrid columns={2} spacing={3} width='100%'>
          <Navbar links={navigation} />
          {/*<UserNav />*/}
        </SimpleGrid>
        <Component {...pageProps} />
      </Flex>
    </ThemeProvider>
  );
}
