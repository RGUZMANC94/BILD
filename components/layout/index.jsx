import React, { useContext, useState } from 'react';
import styles from './layout.module.css';
import Header from '../header';
import { useRouter } from 'next/router';
// import { Quicksand } from 'next/font/google';
import { Inter } from 'next/font/google';
import BildContext from '../context';

// const quicksand = Quicksand({
//   weight: ['300', '400', '500', '600', '700'],
//   style: ['normal'],
//   subsets: ['latin'],
// });
const inter = Inter({
  weight: ['300', '700', '900'],
  style: ['normal'],
  subsets: ['latin'],
});

const Layout = ({ children }) => {
  const router = useRouter();
  const { pathname } = router;
  const { isDark, setIsDark } = useContext(BildContext);

  // const [isDark, setIsDark] = useState(false);
  const toogleDarkMode = () => {
    setIsDark(!isDark);
  };

  return (
    <main
      className={`${inter.className} ${styles.layoutMovil} ${
        isDark ? 'dark' : ''
      }`}>
      <div className="transition text-dark-4 dark:text-light-1 min-h-screen bg-[url(/images/bg.jpg)] dark:bg-none dark:bg-dark-4 bg-cover bg-no-repeat bg-center w-full">
        {pathname !== '/login' && <Header />}
        {children}
      </div>
      <div
        onClick={toogleDarkMode}
        className="fixed bottom-4 transition left-4 rounded-full bg-dark-1 dark:bg-light-2 z-10 cursor-pointer w-8 h-8 max-sm:bottom-24 max-sm:right-2 max-sm:left-auto max-sm:w-6 max-sm:h-6"></div>
    </main>
  );
};

export default Layout;
