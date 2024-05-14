import Link from 'next/link';
import React, { useState } from 'react';
import styles from './ProfileAdmin.module.css';

const ProfileOptions = () => {
  return (
    <>
      <div className={`${styles.optionsProfileAdmin} flex j-c a-c`}>

        {
          /*
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
        */
        }
        
        <Link href="/profile/admin" className={styles.btn}>
          <div className="perfil">
            <img src="/images/user-circle.svg" />
            <div className={styles['btn-text']}>Mi Perfil</div>
          </div>
        </Link>

        <Link href="/profile/login" className={styles.btn}>
          <div className="perfil">
            <img src="/images/user-circle.svg" />
            <div className={styles['btn-text']}>Cerrar Sesión</div>
          </div>
        </Link>

      </div>
    </>
  );
};

export default ProfileOptions;
