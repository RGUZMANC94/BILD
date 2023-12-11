import React, { useEffect } from 'react';
import styles from './layout.module.css';
import Header from '../header';
import { useRouter } from 'next/router';
import { Lexend, Quicksand } from 'next/font/google';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/userSlice';
import { getSessionToken } from '../../utils/getSessionToken';

const lexend = Lexend({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal'],
  subsets: ['latin'],
});

const quicksand = Quicksand({
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
});

const Layout = ({ children }) => {
  const router = useRouter();
  const { pathname } = router;
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.userState);

  const getUserLogged = async (token) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
      }),
    });
    const loginData = await response.json();
    dispatch(setUser(loginData));
  };

  // useEffect(() => {
  //   if (id) {
  //     getUserLogged(getSessionToken());
  //   }
  // }, []);

  return (
    <main className={`${quicksand.className}  ${styles.layoutMovil}`}>
      {pathname !== '/login' && <Header />}

      {children}
    </main>
  );
};

export default Layout;
