import React, { createContext, useState } from 'react';
import '../styles/reset.css';
import '../styles/globals.css';
import Providers from '../redux/provider';
import { QueryClient, QueryClientProvider } from 'react-query';

// Crear el Context
export const MyContext = createContext();

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  // Crear el estado para el valor del Context
  const [contextValue, setContextValue] = useState(null);

  return (
    <QueryClientProvider client={queryClient}>
      <Providers>
        {/* Pasar el estado y la función de actualización de estado al valor del proveedor de contexto */}
        <MyContext.Provider value={{ contextValue, setContextValue }}>
          <Component {...pageProps} />
        </MyContext.Provider>
      </Providers>
    </QueryClientProvider>
  );
}

export default MyApp;