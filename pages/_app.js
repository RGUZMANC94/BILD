import "../styles/reset.css";
import "../styles/globals.css";
import Providers from "../redux/provider";

function MyApp({ Component, pageProps }) {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
}

export default MyApp;
