import React, { useState } from 'react';
import styles from './Button.module.css';
import Link from 'next/link';
import Portal from '../../HOC/portal';

const Button = ({
  inheritClass,
  classNameInherit,
  buttonType,
  iconImage,
  label,
  link,
  clickFunction,
  preventDefault,
  isDisabled,
  needConfirmation,
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleButtonClick = (e) => {
    if (preventDefault) {
      e.preventDefault();
    }
    if (needConfirmation) {
      setShowConfirmation(true); // Mostrar el popup de confirmación
    } else {
      clickFunction && clickFunction();
    }
  };

  const confirmAction = () => {
    setShowConfirmation(false); // Ocultar el popup
    clickFunction && clickFunction(); // Ejecutar la acción
  };

  const cancelAction = () => {
    setShowConfirmation(false); // Ocultar el popup sin realizar ninguna acción
  };

  return (
    <>
      {link ? (
        <Link
          href={link}
          className={`bg-button ${buttonType} ${styles.siteButton} ${
            styles[classNameInherit]
          } ${inheritClass ?? ''}`}>
          {iconImage && (
            <span
              className={`${styles.iconImage} bg-ct`}
              style={{ backgroundImage: `url(${iconImage})` }}></span>
          )}
          <span>{label}</span>
        </Link>
      ) : (
        <button
          onClick={handleButtonClick}
          className={`bg-button ${
            isDisabled && styles.disabledButton
          } ${buttonType} ${styles.siteButton} ${styles[classNameInherit]} ${
            inheritClass ?? ''
          }`}
          disabled={isDisabled}>
          {iconImage && <span className={`${styles.iconImage} bg-ct`}></span>}
          <span>{label}</span>
        </button>
      )}

      {showConfirmation && (
        <Portal>
          <div
            className={`bg-backg-popup ${styles.confirmationOverlay}`}
            onClick={cancelAction}>
            <div className={`bg-popup ${styles.confirmationDialog}`}>
              <p className={`${styles.confirmationText}`}>
                ¿Desea eliminar esta oportunidad?
              </p>

              <div className={styles.buttonsSection}>
                <button
                  className={`bg-button secondary ${styles.confirmationButton} ${styles.siteButton}`}
                  onClick={cancelAction}>
                  Volver
                </button>
                <button
                  className={`bg-button primary ${styles.confirmationButton} ${styles.siteButton}`}
                  onClick={confirmAction}>
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};

export default Button;
