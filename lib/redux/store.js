import { useMemo } from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { reducer } from '@app/redux/reducer';

const persisted = persistReducer(
  {
    key: 'openshop',
    storage,
  },
  reducer
);

function initStore(reducers, initialState) {
  return createStore(reducers, initialState, applyMiddleware(thunkMiddleware));
}

export const initializeStore = (preloadedState) => {
  let store;

  // client side
  if (typeof window !== 'undefined') {
    store = initStore(persisted, {
      ...preloadedState,
    });
    store.__PERSISTOR = persistStore(store);
  }

  // server side
  else {
    store = initStore(reducer, preloadedState);
  }

  return store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}