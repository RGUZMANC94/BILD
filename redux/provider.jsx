import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Layout from '../components/layout';
// import { persistStore } from 'redux-persist';
import BildContext from '../components/context';
import { Quicksand } from 'next/font/google';

const Providers = ({ children }) => {
  // const persistor = persistStore(store);
  return (
    // <PersistGate persistor={persistor}>
    <Provider store={store}>{children}</Provider>
    // </PersistGate>
  );
};

export default Providers;
