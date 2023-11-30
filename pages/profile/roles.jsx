import Link from 'next/link';
import React from 'react';
import styles from '../../styles/Roles.module.css';

const Roles = () => {
  return (
    <div className="container">
      <div className={`${styles['wrap-gerente']} flex j-c a-c`}>
        <Link href="/" className={styles.rol}>
          <div className={styles.roles}>
            <img src="images/edit-blue.png" />
            <div className={styles['btn-text-rol']}>Gerente</div>
            <span className={styles['rol-text']}>
              Lorem ipsum dolor sit amet consectetur.
            </span>
          </div>
        </Link>
        <Link href="/" className={styles.rol}>
          <div className={styles.roles}>
            <img src="images/edit-blue.png" />
            <div className={styles['btn-text-rol']}>Asesor</div>
            <span className={styles['rol-text']}>
              Lorem ipsum dolor sit amet consectetur.
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Roles;
