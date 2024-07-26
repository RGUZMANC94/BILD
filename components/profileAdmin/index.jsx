import Link from 'next/link';
import React, { useContext } from 'react';
import styles from './ProfileAdmin.module.css';
import BildContext from '../context';

const ProfileOptions = () => {
  const { isDark } = useContext(BildContext);
  console.log(isDark);
  return (
    <>
      <div className={`${styles.optionsProfileAdmin} flex j-c a-c`}>
        {/*
        <Link href="/profile/all-users" className={styles.btn}>
          <div className="usuarios">
            <img src="/images/users.svg" />
            <div className={styles['btn-text']}>usuarios</div>
          </div>
        </Link>
        <Link href="/profile/roles" className={styles.btn}>
          <div className="roles">
            <img src="/images/roles.svg" />
            <div className={styles['btn-text']}>Roles</div>
          </div>
        </Link> 
        */}

        <Link href="/profile/admin" className={`${styles.btn} bg-card`}>
          <div className={styles.perfil}>
            <img
              alt=""
              src={
                isDark ? '/images/user-circle.svg' : '/images/light/profile.png'
              }
            />
            <div className={styles['btn-text']}>Mi Perfil</div>
          </div>
        </Link>

        <Link href="/profile/consultants" className={`${styles.btn} bg-card`}>
          <div className={styles.perfil}>
            <img
              alt=""
              src={
                isDark
                  ? '/images/profiles-icon.png'
                  : '/images/light/people.png'
              }
            />
            <div className={styles['btn-text']}>Asesores</div>
          </div>
        </Link>

        <Link href="/profile/login" className={`${styles.btn} bg-card`}>
          <div className={styles.perfil}>
            <img
              alt=""
              src={isDark ? '/images/close-white.svg' : '/images/close.svg'}
              className={styles['close-session']}
            />
            <div className={styles['btn-text']}>Cerrar Sesión</div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ProfileOptions;
