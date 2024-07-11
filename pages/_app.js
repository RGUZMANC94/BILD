import '../styles/reset.css';
import '../styles/globals.css';
import Providers from '../redux/provider';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BildContextProvider } from '../components/context';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Providers>
        {/*<BildContextProvider>*/}
          <Component {...pageProps} />
        {/*</BildContextProvider>*/}
      </Providers>
    </QueryClientProvider>
  );
}

export default MyApp;
