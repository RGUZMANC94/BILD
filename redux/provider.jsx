import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Layout from '../components/layout';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import BildContext from '../components/context';
import { Quicksand } from 'next/font/google';

const quicksand = Quicksand({
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
});

const Providers = ({ children }) => {
  const persistor = persistStore(store);
  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <BildContext.Provider value={{ quicksand }}>
          <Layout>{children}</Layout>
        </BildContext.Provider>
      </Provider>
    </PersistGate>
  );
};

export default Providers;
