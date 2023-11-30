import React from 'react';
import styles from './Button.module.css';
import Link from 'next/link';

const Button = ({
  inheritClass,
  classNameInherit,
  buttonType,
  iconImage,
  label,
  link,
  clickFunction,
}) => {
  return (
    <>
      {link && (
        <Link
          href={link}
          className={`${styles[buttonType]} ${styles.siteButton} ${
            styles[classNameInherit]
          } ${inheritClass ?? ''}`}>
          {iconImage ? (
            <span
              className={`${styles.iconImage} bg-ct`}
              style={{ backgroundImage: `url(${iconImage})` }}></span>
          ) : (
            ''
          )}
          <span>{label}</span>
        </Link>
      )}
      {!link && (
        <button
          onClick={(e) => {
            clickFunction ? clickFunction() : '';
          }}
          className={`${styles[buttonType]} ${styles.siteButton} ${
            styles[classNameInherit]
          } ${inheritClass ?? ''}`}>
          {iconImage ? (
            <span className={`${styles.iconImage} bg-ct`}></span>
          ) : (
            ''
          )}
          <span>{label}</span>
        </button>
      )}
    </>
  );
};

export default Button;
