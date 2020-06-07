import '../styles/global.css';
import customTheme from '../styles/theme';
import { ThemeProvider, Flex, Image, Skeleton } from '@chakra-ui/core';
import { Provider } from 'react-redux';
import { useStore } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Navbar, Footer, Cart } from '../components';

export default function ({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

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
      path: '/items',
    },
  ];

  return (
    <Provider store={store}>
      <PersistGate persistor={store.__PERSISTOR} loading={null}>
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
              src='/images/group1.jpg'
              alt='Group of clipart people'
            />
            <Navbar links={navigation} />
            <Cart mx='auto' mt='10px' />
            <Component {...pageProps} />
          </Flex>
          <Footer />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
