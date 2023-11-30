import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Layout from '../components/layout';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

const Providers = ({ children }) => {
  const persistor = persistStore(store);
  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <Layout>{children}</Layout>
      </Provider>
    </PersistGate>
  );
};

export default Providers;
