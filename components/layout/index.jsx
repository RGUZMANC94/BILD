import React, { useEffect } from 'react';
import styles from './layout.module.css';
import Header from '../header';
import { useRouter } from 'next/router';
import { Quicksand } from 'next/font/google';

const quicksand = Quicksand({
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
});

const Layout = ({ children }) => {
  const router = useRouter();
  const { pathname } = router;

  return (
    <main className={`${quicksand.className}  ${styles.layoutMovil}`}>
      {pathname !== '/login' && <Header />}
      {children}
    </main>
  );
};

export default Layout;
