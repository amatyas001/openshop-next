import React from 'react';
import '@app/styles/global.css';
import { Provider } from 'react-redux';
import { ThemeProvider, Flex } from '@chakra-ui/core';
import customTheme from '@app/styles/theme';
import { reducer } from '@app/lib/redux/reducer';
import { initStore } from '@app/lib/redux/store';
import { INITIAL_STATE } from '@app/config';

export default ({ children }) => {
  const store = initStore(reducer, {
    ...INITIAL_STATE,
    cart: [
      {
        id: 'cartitemid',
        img: '1.jpg',
        name: 'My fancy item',
        description: 'The best item in the world',
        color: 'Rainbow',
        price: 100,
        amount: 10,
        starrating: 4,
        buy: {
          size: 'One Size',
          color: 'Rainbow',
          amount: 1,
        },
      },
    ],
  });
  return (
    <Provider store={store}>
      <ThemeProvider theme={customTheme}>
        <Flex
          flexDirection='column'
          width='100%'
          background='white'
          transform='translate3d(0, 0, 0)'
        >
          {children}
        </Flex>
      </ThemeProvider>
    </Provider>
  );
};
