import '@app/styles/global.css';
import '@brainhubeu/react-carousel/lib/style.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider, Flex } from '@chakra-ui/core';
import customTheme from '@app/styles/theme';
import { Navbar, Footer, ScrollTop } from '@app/components';
import { useStore } from '@app/redux/store';

const links = [
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

export default function ({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <PersistGate persistor={store.__PERSISTOR} loading={null}>
        <ThemeProvider theme={customTheme}>
          <Flex
            align='center'
            alignItems='start'
            flexDirection='column'
            justifyContent='center'
            bg='purple.200'
          >
            <Navbar links={links} />
            <Flex
              flexDirection='column'
              justifyContent='start'
              width={{ sm: '100%', lg: '80%' }}
              minHeight={{ lg: '50vh' }}
              mx='auto'
              my='50px'
              bg='white'
              boxShadow='0 0 25px #9F7AEA'
            >
              <Component {...pageProps} />
            </Flex>
          </Flex>
          <Footer />
          <ScrollTop />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
