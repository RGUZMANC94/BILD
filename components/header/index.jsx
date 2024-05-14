import Link from 'next/link';
import React, { useState } from 'react';
import styles from './header.module.css';
import Filter from '../filter';
import AdvancedFilter from '../advancedFilter';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const Header = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const router = useRouter();
  const { pathname } = router;
  const { user_rol } = useSelector((state) => state.userState);
  return (
    <>
      <header className={styles.siteHeader}>
        <div className={`${styles.containerHeader}`}>
          <div className={styles.logo}>
            {pathname !== '/' && (
              <Link href="/">
                <img src="/images/logo-white.png" alt="Logo BILD" />
              </Link>
            )}
            {pathname === '/' && (
              <img src="/images/logo-white.png" alt="Logo BILD" />
            )}
          </div>

          <div className={`${styles['menu-top']} `}>
            <div className={styles.menuPpal}>
              <Link
                href={pathname === '/' ? '' : '/'}
                className={pathname === '/' ? styles.active : ''}>
                <div className={styles.imageMenu}>
                  <img alt="" src="/images/header/building.png" />
                </div>
                Inmuebles
              </Link>
              <Link
                href={pathname === '/contacts' ? '' : '/contacts'}
                className={pathname === '/contacts' ? styles.active : ''}>
                <div className={styles.imageMenu}>
                  <img alt="" src="/images/header/phone.png" />
                </div>
                Contactos
              </Link>
              {/*  
              <Link
                href={pathname === '/dashboard' ? '' : '/dashboard'}
                className={pathname === '/dashboard' ? styles.active : ''}>
                <div className={styles.imageMenu}>
                  <img alt="" src="/images/header/dashboard.png" />
                </div>
                Dashboard
              </Link> 
              */}
            
              <Link
                href={pathname === '/oportunities' ? '' : '/oportunities'}
                className={pathname === '/oportunities' ? styles.active : ''}>
                <div className={styles.imageMenu}>
                  <img alt="" src="/images/header/key.png" />
                </div>
                Oportunidades
                <div className={styles.smallNumber}>5</div>
              </Link>
              <Link
                href={pathname === '/profile' ? '' : '/profile'}
                className={pathname === '/profile' ? styles.active : ''}>
                <div className={styles.imageMenu}>
                  <img
                    alt=""
                    src={
                      user_rol === 'ADMIN'
                        ? '/images/header/settings.svg'
                        : '/images/header/person.png'
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
