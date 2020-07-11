import '@app/styles/global.css';
import '@brainhubeu/react-carousel/lib/style.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider as ChakraProvider } from '@chakra-ui/core';
import theme from '@app/styles/theme';
import { useStore } from '@app/lib/redux/store';
import { INITIAL_STATE } from '@app/config';
import { Navbar, Content, Footer, ScrollTop } from '@app/components';

const App = ({ Component, pageProps }) => {
  const store = useStore(INITIAL_STATE);
  return (
    <Provider store={store}>
      <PersistGate persistor={store.__PERSISTOR} loading={null}>
        <ChakraProvider theme={theme}>
          <Navbar />
          <Content>
            <Component {...pageProps} />
          </Content>
          <Footer />
          <ScrollTop />
        </ChakraProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
