import React from 'react';
import '@app/styles/global.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider, Flex } from '@chakra-ui/core';
import customTheme from '@app/styles/theme';
import { useStore } from '@app/redux/store';

export default ({ children }) => {
  const store = useStore({});
  return (
    <Provider store={store}>
      <PersistGate persistor={store.__PERSISTOR} loading={null}>
        <ThemeProvider theme={customTheme}>
          <Flex flexDirection='column' width={{ sm: '100%' }} mx='auto'>
            {children}
          </Flex>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};
