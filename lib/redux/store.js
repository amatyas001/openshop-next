import { useMemo } from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { reducer } from '@app/lib/redux/reducer';

export const initStore = (reducers, initialState) => {
  return createStore(reducers, initialState, applyMiddleware(thunkMiddleware));
};

export const initializeStore = (preloadedState) => {
  let store;

  if (typeof window !== 'undefined') {
    store = initStore(
      persistReducer(
        {
          key: 'openshop',
          storage,
        },
        reducer
      ),
      {
        ...preloadedState,
      }
    );
    store.__PERSISTOR = persistStore(store);
  } else {
    store = initStore(reducer, preloadedState);
  }

  return store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
