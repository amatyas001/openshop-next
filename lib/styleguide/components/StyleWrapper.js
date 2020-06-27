import React from 'react';
import '@app/styles/global.css';
import { Provider } from 'react-redux';
import { ThemeProvider, Flex } from '@chakra-ui/core';
import customTheme from '@app/styles/theme';
import { reducer } from '@app/redux/reducer';
import { initStore } from '@app/redux/store';

export default ({ children }) => {
  const store = initStore(reducer, {
    filters: { color: 'All', name: '', price: 200 },
  });
  return (
    <Provider store={store}>
      <ThemeProvider theme={customTheme}>
        <Flex
          flexDirection='column'
          width={{ sm: '90%' }}
          mx='auto'
          px='5%'
          py='2%'
          background='white'
          transform='translate3d(0, 0, 0)'
        >
          {children}
        </Flex>
      </ThemeProvider>
    </Provider>
  );
};
