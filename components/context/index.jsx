import { createContext, useEffect, useState } from 'react';
import Loader from '../lodaer';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import Layout from '../layout';

const BildContext = createContext();

export const BildContextProvider = ({ children }) => {
  const userTkCookie = getCookie('user_tk');
  const [initialState, setInitialState] = useState({});
  const [isDark, setIsDark] = useState(false);
  const router = useRouter();
  const { pathname } = router;
  useEffect(() => {
    if (!userTkCookie) {
      return;
    }

    setInitialState((prevState) =>
      JSON.parse(decodeURIComponent(userTkCookie))
    );
  }, [userTkCookie]);

  if (pathname !== '/login') {
    if (
      Object.entries(initialState).length === 0 ||
      typeof initialState === 'string'
    ) {
      return <Loader></Loader>;
    }
  }

  return (
    <BildContext.Provider
      value={{ initialState, setInitialState, isDark, setIsDark }}>
      <Layout>{children}</Layout>
    </BildContext.Provider>
  );
};

export default BildContext;
