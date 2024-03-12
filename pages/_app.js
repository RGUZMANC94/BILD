import '../styles/reset.css';
import '../styles/globals.css';
import Providers from '../redux/provider';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Providers>
        <Component {...pageProps} />
      </Providers>
    </QueryClientProvider>
  );
}

export default MyApp;
