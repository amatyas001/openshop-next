import '../styles/global.css';
import customTheme from '../styles/theme';
import { ThemeProvider, Flex, Image } from '@chakra-ui/core';
import { Navbar } from '../components';

const App = ({ Component, pageProps }) => {
  const navigation = [
    {
      text: 'home',
      path: '/',
    },
    {
      text: 'featured',
      path: '/featured',
    },
    {
      text: 'browse',
      path: '/browse',
    },
    {
      text: 'support',
      path: '/support',
    },
  ];

  return (
    <ThemeProvider theme={customTheme}>
      <Flex
        align='center'
        alignItems='start'
        flexDirection='column'
        justifyContent='center'
        py='3%'
        px='10%'
        bg='white'
      >
        <Image
          width='100%'
          height='25vh'
          objectFit='contain'
          src='images/group1.jpg'
          alt='Group of clipart people'
        />
        <Navbar links={navigation} />
        <Component {...pageProps} />
      </Flex>
    </ThemeProvider>
  );
};

export default App;
