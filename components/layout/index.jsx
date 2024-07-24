import React, { useEffect, useState } from 'react';
import styles from './layout.module.css';
import Header from '../header';
import { useRouter } from 'next/router';
// import { Quicksand } from 'next/font/google';
import { Inter } from 'next/font/google';

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
  const [isDark, setIsDark] = useState(false);
  const toogleDarkMode = (e) => {
    console.log(e.code);
    console.log(isDark);
    setIsDark(!isDark);
    console.log(isDark);
  };

  useEffect(() => {
    document.addEventListener('keydown', toogleDarkMode);

    return () => document.removeEventListener('keydown', toogleDarkMode);
  }, []);

  return (
    <main
      className={`${inter.className} ${styles.layoutMovil} ${
        isDark ? 'dark' : ''
      }`}>
      <div className="text-dark-4 dark:text-light-1 min-h-screen bg-[url(/images/bg.jpg)] dark:bg-none dark:bg-dark-2 bg-cover bg-no-repeat bg-center w-full">
        {pathname !== '/login' && <Header />}
        {children}
      </div>
      <div
        onClick={() => setIsDark(!isDark)}
        className="fixed bottom-4 left-4 rounded-full bg-dark-1 dark:bg-light-4 z-10 cursor-pointer w-8 h-8"></div>
    </main>
  );
};

export default Layout;
