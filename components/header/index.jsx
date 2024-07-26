import Link from 'next/link';
import React, { useContext, useState } from 'react';
import styles from './header.module.css';
import Filter from '../filter';
import AdvancedFilter from '../advancedFilter';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import BildContext from '../context';

const Header = () => {
  // const [showFilter, setShowFilter] = useState(false);
  // const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const { isDark } = useContext(BildContext);
  const router = useRouter();
  const { pathname } = router;
  const { user_rol } = useSelector((state) => state.userState);
  return (
    <>
      <header
        className={`bg-light-2 dark:bg-dark-1 ${styles.siteHeader} shadow-md shadow-dark-4/10 transition font-black`}>
        <div className={`${styles.containerHeader}`}>
          <div className={styles.logo}>
            {pathname !== '/' && (
              <Link href="/">
                <img
                  src={`${
                    isDark ? '/images/logo-white.png' : '/images/logo-azul.png'
                  }`}
                  alt="Logo BILD"
                />
              </Link>
            )}
            {pathname === '/' && (
              <img
                src={`${
                  isDark ? '/images/logo-white.png' : '/images/light/logo.png'
                }`}
                alt="Logo BILD"
              />
            )}
          </div>

          <div className={`${styles['menu-top']} `}>
            <div className={styles.menuPpal}>
              <Link
                href={pathname === '/' ? '' : '/'}
                className={`${
                  pathname === '/'
                    ? `${styles.active} border-light-4 text-light-4 dark:border-bild-1 dark:text-light-1`
                    : 'border-transparent group'
                }  hover:border-light-4 dark:hover:border-bild-1  border-b-[3px] border-solid group transition font-black`}>
                <div className={styles.imageMenu}>
                  <img
                    className={`${
                      isDark
                        ? pathname === '/'
                          ? 'mt-[-34px]'
                          : 'mt-0 group-hover:mt-[-34px]'
                        : 'mt-0'
                    }`}
                    alt=""
                    src={`${
                      isDark
                        ? '/images/header/building.png'
                        : '/images/header/building-light.png'
                    }`}
                  />
                </div>
                Inmuebles
              </Link>
              <Link
                href={pathname === '/contacts' ? '' : '/contacts'}
                className={`${
                  pathname === '/contacts'
                    ? `${styles.active} border-light-4 text-light-4 dark:border-bild-1 dark:text-light-1`
                    : 'border-transparent group'
                }  hover:border-light-4 dark:hover:border-bild-1 border-b-[3px] border-solid transition font-black`}>
                <div className={styles.imageMenu}>
                  <img
                    className={`${
                      isDark
                        ? pathname === '/contacts'
                          ? 'mt-[-34px]'
                          : 'mt-0 group-hover:mt-[-34px]'
                        : 'mt-0'
                    }`}
                    alt=""
                    src={`${
                      isDark
                        ? '/images/header/phone.png'
                        : '/images/header/phone-light.png'
                    }`}
                  />
                </div>
                Contactos
              </Link>
              {/*  
              <Link
                href={pathname === '/dashboard' ? '' : '/dashboard'}
                className={`${pathname === '/dashboard' ? `${styles.active} border-light-4 text-light-4 dark:border-bild-1 dark:text-light-1` : 'border-transparent'}  hover:border-light-4 dark:hover:border-bild-1 border-b-[3px] border-solid`}>
                <div className={styles.imageMenu}>
                  <img alt="" src="/images/header/dashboard.png" />
                </div>
                Dashboard
              </Link> 
              */}

              <Link
                href={pathname === '/opportunities' ? '' : '/opportunities'}
                className={`${
                  pathname === '/opportunities'
                    ? `${styles.active} border-light-4 text-light-4 dark:border-bild-1 dark:text-light-1`
                    : 'border-transparent group'
                }  hover:border-light-4 dark:hover:border-bild-1 border-b-[3px] border-solid transition font-black`}>
                <div className={styles.imageMenu}>
                  <img
                    className={`${
                      isDark
                        ? pathname === '/opportunities'
                          ? 'mt-[-34px]'
                          : 'mt-0 group-hover:mt-[-34px]'
                        : 'mt-0'
                    }`}
                    alt=""
                    src={`${
                      isDark
                        ? '/images/header/key.png'
                        : '/images/header/key-light.png'
                    }`}
                  />
                </div>
                Oportunidades
                <div className={styles.smallNumber}>5</div>
              </Link>
              <Link
                href={pathname === '/profile' ? '' : '/profile'}
                className={`${
                  pathname === '/profile'
                    ? `${styles.active} border-light-4 text-light-4 dark:border-bild-1 dark:text-light-1`
                    : 'border-transparent group'
                }  hover:border-light-4 dark:hover:border-bild-1 border-b-[3px] border-solid transition font-black`}>
                <div className={styles.imageMenu}>
                  <img
                    className={`${
                      isDark
                        ? pathname === '/profile'
                          ? 'mt-[-34px]'
                          : 'mt-0 group-hover:mt-[-34px]'
                        : 'mt-0'
                    }`}
                    alt=""
                    src={
                      user_rol === 'ADMIN'
                        ? isDark
                          ? '/images/header/settings.svg'
                          : '/images/header/settings-light.png'
                        : isDark
                          ? '/images/header/person.png'
                          : '/images/header/person-light.png'
                    }
                  />
                </div>
                {user_rol === 'ADMIN' ? 'Ajustes' : 'Perfil'}
              </Link>
              {/*
              <div
                className={styles.search}
                onClick={() => setShowFilter(true)}>
                <div className={`${styles.glass} bg-ct`}></div>
              </div>
              */}
            </div>
          </div>
        </div>
      </header>
      {/*
      <Filter show={showFilter} setShowFilter={setShowFilter} />
      <AdvancedFilter
        show={showAdvancedFilter}
        setShowFilter={setShowAdvancedFilter}
      /> 
      */}
    </>
  );
};

export default Header;
